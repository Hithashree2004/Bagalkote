import { useState, useEffect } from 'react';
import { tutorData, SubjectData, Chapter, ModeContent } from '@/data/tutorData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, BookOpen, Atom, FlaskConical, Calculator, 
  Dna, ArrowLeft, Zap, Star, Layout, ListChecks, 
  Timer, Calculator as CalcIcon, CheckCircle2, XCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

type Step = 'exam' | 'subject' | 'mode' | 'content';

const exams = ['KCET', 'NEET', 'JEE Main', 'JEE Advanced'];
const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
const modes = ['Basic', 'Intermediate', 'Pro', 'Revision'];

const MultiModeTutor = () => {
  const [step, setStep] = useState<Step>('exam');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  
  // Mock Test State
  const [mockActive, setMockActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [mcqFeedback, setMcqFeedback] = useState<Record<number, string>>({}); // Tracks selected answer for interactive MCQs

  useEffect(() => {
    // Reset selection-based states when chapter or mode changes
    setMcqFeedback({});
    setShowResults(false);
    setAnswers({});
    setMockActive(false);
    setTimeLeft(600);
  }, [selectedChapter, selectedMode, selectedSubject]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mockActive && timeLeft > 0 && !showResults) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !showResults) {
      handleMockSubmit();
    }
    return () => clearInterval(timer);
  }, [mockActive, timeLeft, showResults]);

  const resetFlow = () => {
    setStep('exam');
    setSelectedExam('');
    setSelectedSubject('');
    setSelectedMode('');
    setSelectedChapter('');
    setMockActive(false);
    setShowResults(false);
    setAnswers({});
  };

  const getSubjectIcon = (s: string) => {
    switch(s) {
      case 'Physics': return <Atom className="w-8 h-8 text-sky-400" />;
      case 'Chemistry': return <FlaskConical className="w-8 h-8 text-violet-400" />;
      case 'Mathematics': return <Calculator className="w-8 h-8 text-amber-400" />;
      case 'Biology': return <Dna className="w-8 h-8 text-green-400" />;
      default: return <BookOpen className="w-8 h-8" />;
    }
  };

  const getModeIcon = (m: string) => {
    switch(m) {
      case 'Basic': return <Star className="w-6 h-6 text-yellow-500" />;
      case 'Intermediate': return <Zap className="w-6 h-6 text-orange-500" />;
      case 'Pro': return <Layout className="w-6 h-6 text-red-500" />;
      case 'Revision': return <ListChecks className="w-6 h-6 text-blue-500" />;
      default: return null;
    }
  };

  const handleMockSubmit = () => {
    setShowResults(true);
    const chapterData = tutorData[selectedSubject]?.[selectedChapter]?.pro?.mock_test || [];
    let score = 0;
    chapterData.forEach((q, idx) => {
      if (answers[idx] === q.answer) score++;
    });
    toast.success(`Mock Test Completed! Your Score: ${score}/${chapterData.length}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentContent: ModeContent | undefined = 
    tutorData[selectedSubject]?.[selectedChapter]?.[selectedMode.toLowerCase() as keyof Chapter];

  return (
    <div className="w-full space-y-6">
      <Card className="bg-card/40 backdrop-blur-xl border-primary/20 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-accent" />
            <CardTitle className="text-xl font-bold gradient-text">Multi Mode Tutor</CardTitle>
          </div>
          {step !== 'exam' && (
            <Button variant="ghost" size="sm" onClick={() => {
              if (step === 'subject') setStep('exam');
              else if (step === 'mode') setStep('subject');
              else if (step === 'content') setStep('mode');
            }} className="hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-8">
          {step === 'exam' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Select Your Exam</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {exams.map(exam => (
                  <Card 
                    key={exam} 
                    className="group cursor-pointer bg-white/5 border-white/10 hover:border-accent hover:bg-accent/5 transition-all p-6 text-center"
                    onClick={() => { setSelectedExam(exam); setStep('subject'); }}
                  >
                    <CardTitle className="group-hover:text-accent transition-colors">{exam}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-2">Personalized prep for {exam}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'subject' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-8">Choose Subject <Badge variant="outline" className="ml-2 border-accent/50">{selectedExam}</Badge></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.map(s => (
                  <Card 
                    key={s} 
                    className="group cursor-pointer bg-white/5 border-white/10 hover:border-primary hover:bg-primary/5 transition-all p-8 flex flex-col items-center gap-4"
                    onClick={() => { 
                      setSelectedSubject(s); 
                      // Automatically select first chapter
                      const chapters = Object.keys(tutorData[s] || {});
                      if (chapters.length > 0) setSelectedChapter(chapters[0]);
                      setStep('mode'); 
                    }}
                  >
                    {getSubjectIcon(s)}
                    <CardTitle className="group-hover:text-primary transition-colors">{s}</CardTitle>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'mode' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Select Your Mode</h2>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="secondary">{selectedExam}</Badge>
                  <Badge variant="secondary">{selectedSubject}</Badge>
                  <Badge variant="outline" className="border-accent/40">{selectedChapter}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {modes.map(mode => (
                  <Card 
                    key={mode} 
                    className="group cursor-pointer bg-white/5 border-white/10 hover:border-accent hover:bg-accent/5 transition-all p-6 flex flex-col items-center gap-3"
                    onClick={() => { setSelectedMode(mode); setStep('content'); }}
                  >
                    {getModeIcon(mode)}
                    <CardTitle className="group-hover:text-accent transition-colors text-lg">{mode}</CardTitle>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'content' && currentContent && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-accent">{selectedChapter}</h2>
                  <p className="text-muted-foreground">{selectedSubject} • {selectedMode} Mode</p>
                </div>
                {selectedMode === 'Pro' && (
                   <div className="flex items-center gap-4 bg-primary/20 px-4 py-2 rounded-xl border border-primary/30">
                     <Timer className="w-5 h-5 text-primary" />
                     <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
                   </div>
                )}
              </div>

              {selectedMode === 'Basic' && (
                <div className="space-y-8">
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-white/5 pb-4"><Star className="text-yellow-400" /> High-Level Concept Overview</h3>
                    <div className="space-y-6">
                      {currentContent.points?.slice(0, 20).map((p, i) => (
                        <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all">
                           <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent font-bold">{(i+1)}</div>
                           <p className="text-lg leading-relaxed text-foreground/90">{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {currentContent.concepts && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
                         <h4 className="font-bold mb-3">Key Concepts</h4>
                         <ul className="space-y-2">
                           {currentContent.concepts.map((c, i) => <li key={i} className="flex items-center gap-2 text-sm"> <CheckCircle2 className="w-4 h-4 text-primary" /> {c}</li>)}
                         </ul>
                      </div>
                      <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20">
                         <h4 className="font-bold mb-3">Practical Examples</h4>
                         <ul className="space-y-2">
                           {currentContent.examples?.map((e, i) => <li key={i} className="flex items-center gap-2 text-sm italic"> <div className="w-1.5 h-1.5 bg-accent rounded-full" /> {e}</li>)}
                         </ul>
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-6">Interactive Quiz (30 Questions)</h3>
                    <div className="space-y-6">
                      {currentContent.mcqs?.map((q, qidx) => {
                        const userSelection = mcqFeedback[qidx];
                        const isCorrect = userSelection === q.a;
                        const hasAnswered = userSelection !== undefined;

                        return (
                          <Card key={qidx} className={`bg-white/5 border-white/10 p-6 transition-all ${hasAnswered ? (isCorrect ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5') : ''}`}>
                            <p className="font-bold mb-4 text-lg">{qidx+1}. {q.q}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {q.o.map((opt, oidx) => {
                                let btnVariant: "outline" | "default" | "destructive" = "outline";
                                let btnClass = "justify-start text-left h-auto py-3 transition-all";
                                
                                if (hasAnswered) {
                                  if (opt === q.a) {
                                    btnClass += " bg-green-500/20 border-green-500 text-green-400";
                                  } else if (opt === userSelection) {
                                    btnClass += " bg-red-500/20 border-red-500 text-red-400";
                                  } else {
                                    btnClass += " opacity-50";
                                  }
                                } else {
                                  btnClass += " hover:bg-primary/20";
                                }

                                return (
                                  <Button 
                                    key={oidx} 
                                    variant={btnVariant}
                                    disabled={hasAnswered}
                                    className={btnClass}
                                    onClick={() => {
                                      setMcqFeedback(prev => ({...prev, [qidx]: opt}));
                                      if(opt === q.a) toast.success("Correct Answer!");
                                      else toast.error(`Incorrect!`);
                                    }}
                                  >
                                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 shrink-0 text-xs">{String.fromCharCode(65 + oidx)}</span>
                                    {opt}
                                  </Button>
                                );
                              })}
                            </div>
                            {hasAnswered && (
                              <div className={`mt-6 p-4 rounded-xl border animate-in slide-in-from-top-2 duration-300 ${isCorrect ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                <h4 className={`font-bold mb-2 flex items-center gap-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                  {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                  {isCorrect ? 'Correct Answer Found!' : `Reasoning (Correct Answer was ${q.a})`}
                                </h4>
                                <p className="text-sm text-foreground/80 leading-relaxed italic">
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {selectedMode === 'Intermediate' && (
                 <div className="space-y-6">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                      <h3 className="text-xl font-bold mb-4">Detailed Notes</h3>
                      <p className="text-muted-foreground leading-relaxed">{currentContent.notes}</p>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                       <h3 className="text-xl font-bold flex items-center gap-2 mb-4"><CalcIcon className="text-primary" /> Formulas</h3>
                       <div className="flex flex-wrap gap-3">
                         {currentContent.formulas?.map((f, i) => <Badge key={i} className="text-lg py-2 px-4 bg-primary/20 border-primary/30 text-primary">{f}</Badge>)}
                       </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Concept Application (Numericals)</h3>
                      {currentContent.numericals?.map((n, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm">
                          {n}
                        </div>
                      ))}
                    </div>
                 </div>
              )}

              {selectedMode === 'Pro' && (
                <div className="space-y-8">
                  {!mockActive ? (
                    <div className="text-center space-y-6 py-12 bg-white/5 rounded-3xl border border-white/10">
                       <Layout className="w-16 h-16 text-primary mx-auto opacity-50" />
                       <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Advanced Mock Test Ready</h3>
                        <p className="text-muted-foreground">This test contains 10 high-level MCQ questions from your syllabus.</p>
                       </div>
                       <ul className="text-sm space-y-2 max-w-xs mx-auto text-left opacity-80">
                         <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Time Limit: 10 Minutes</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Auto-evaluation on finish</li>
                         <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Performance-based scoring</li>
                       </ul>
                       <Button size="lg" className="bg-primary hover:scale-105 transition-all text-white px-10" onClick={() => setMockActive(true)}>Start Mock Test</Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {showResults ? (
                        <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-500">
                           <div className="inline-block p-4 rounded-full bg-green-500/20 mb-4">
                             <CheckCircle2 className="w-12 h-12 text-green-500" />
                           </div>
                           <h3 className="text-4xl font-bold gradient-text">Test Results</h3>
                           <div className="bg-white/5 p-10 rounded-3xl border border-white/10 max-w-md mx-auto">
                              <p className="text-sm text-muted-foreground mb-2">Final Score</p>
                              <p className="text-6xl font-black text-primary">
                                {Object.keys(answers).filter((idx) => answers[Number(idx)] === currentContent.mock_test?.[Number(idx)].answer).length} / {currentContent.mock_test?.length}
                              </p>
                           </div>
                           <Button onClick={() => setStep('mode')} className="bg-accent">Try Another Mode</Button>
                        </div>
                      ) : (
                        <div className="space-y-10">
                           {currentContent.mock_test?.map((q, idx) => (
                             <Card key={idx} className="bg-card border-white/5 p-8 space-y-6">
                               <div className="flex justify-between items-center">
                                 <Badge className="bg-primary/20 text-primary">Question {idx + 1}</Badge>
                                 {answers[idx] && <Badge className="bg-green-500/20 text-green-400">Answered</Badge>}
                               </div>
                               <p className="text-xl font-semibold leading-relaxed">{q.q}</p>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {q.options.map((opt, oidx) => (
                                   <Button 
                                     key={oidx} 
                                     variant={answers[idx] === opt ? 'default' : 'outline'}
                                     className={`justify-start text-left h-auto py-5 px-6 whitespace-normal text-base ${answers[idx] === opt ? 'bg-primary border-primary' : 'border-white/10 hover:bg-white/5'}`}
                                     onClick={() => setAnswers({...answers, [idx]: opt})}
                                   >
                                     <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mr-4 shrink-0">{String.fromCharCode(65 + oidx)}</span>
                                     {opt}
                                   </Button>
                                 ))}
                               </div>
                             </Card>
                           ))}
                           <div className="flex flex-col items-center gap-4 pt-10 border-t border-white/10">
                              <p className="text-muted-foreground">Are you sure you want to submit? No changes after this.</p>
                              <Button size="lg" className="px-20 bg-gradient-to-r from-primary to-accent" onClick={handleMockSubmit}>Submit Final Answers</Button>
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {selectedMode === 'Revision' && (
                 <div className="grid lg:grid-cols-2 gap-8">
                   <div className="space-y-6">
                     <h3 className="text-xl font-bold border-b border-primary/20 pb-3">30 Essential Revision Points</h3>
                     <div className="space-y-3 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
                       {currentContent.points?.map((p, i) => (
                         <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-primary/5 transition-all">
                           <span className="text-primary font-black text-lg">{(i+1).toString().padStart(2, '0')}</span>
                           <p className="text-sm leading-relaxed group-hover:text-foreground transition-colors">{p}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div className="space-y-6 h-full">
                      <div className="bg-accent/5 border border-accent/20 p-8 rounded-3xl h-full flex flex-col">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ListChecks className="text-accent" /> Quick Study Guide</h3>
                        <p className="text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-6 flex-grow">{currentContent.notes}</p>
                        <div className="mt-8 pt-6 border-t border-white/5 opacity-60 text-xs">
                          <p>Tip: Focus on the bold points for maximum exam efficiency.</p>
                        </div>
                      </div>
                   </div>
                 </div>
              )}

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiModeTutor;
