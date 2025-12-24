import { useState, useEffect } from 'react';
import { Trophy, Target, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import { toast } from 'sonner';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
  category: string;
};

const questionPools: Record<string, Record<string, Question[]>> = {
  '1st': {
    'regular study': [
      { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
      { question: 'What color is the sky?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Blue', difficulty: 'Easy', category: 'Science' },
      { question: 'How many legs does a cat have?', options: ['2', '4', '6', '8'], correctAnswer: '4', difficulty: 'Easy', category: 'Science' },
      { question: 'What is the first letter of the alphabet?', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A', difficulty: 'Easy', category: 'Language' },
    ],
  },
  '2nd': {
    'regular study': [
      { question: 'What is 5 + 3?', options: ['6', '7', '8', '9'], correctAnswer: '8', difficulty: 'Easy', category: 'Math' },
      { question: 'What do bees make?', options: ['Milk', 'Honey', 'Bread', 'Cheese'], correctAnswer: 'Honey', difficulty: 'Easy', category: 'Science' },
      { question: 'How many days are in a week?', options: ['5', '6', '7', '8'], correctAnswer: '7', difficulty: 'Easy', category: 'General' },
    ],
  },
  '3rd': {
    'regular study': [
      { question: 'What is 10 - 4?', options: ['5', '6', '7', '8'], correctAnswer: '6', difficulty: 'Easy', category: 'Math' },
      { question: 'What is the largest planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Jupiter', difficulty: 'Medium', category: 'Science' },
    ],
  },
  // Add more grades up to 12th
  '10th': {
    'regular study': [
      { question: 'What is the square root of 16?', options: ['2', '4', '6', '8'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
      { question: 'Who wrote Romeo and Juliet?', options: ['Shakespeare', 'Dickens', 'Hemingway', 'Twain'], correctAnswer: 'Shakespeare', difficulty: 'Medium', category: 'Literature' },
    ],
    'jee': [
      { question: 'What is the acceleration due to gravity?', options: ['8.9 m/s²', '9.8 m/s²', '10.2 m/s²', '7.5 m/s²'], correctAnswer: '9.8 m/s²', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the chemical formula for water?', options: ['H2O', 'CO2', 'O2', 'H2O2'], correctAnswer: 'H2O', difficulty: 'Easy', category: 'Chemistry' },
    ],
    'neet': [
      { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'], correctAnswer: 'Mitochondria', difficulty: 'Medium', category: 'Biology' },
    ],
  },
  '12th': {
    'engineering': [
      { question: 'What is Ohm\'s law?', options: ['V=IR', 'F=ma', 'E=mc²', 'PV=nRT'], correctAnswer: 'V=IR', difficulty: 'Medium', category: 'Physics' },
    ],
    'medical': [
      { question: 'What is the normal pH of blood?', options: ['6.5', '7.0', '7.35', '8.0'], correctAnswer: '7.35', difficulty: 'Hard', category: 'Biology' },
    ],
    'upsc': [
      { question: 'Who is the current Prime Minister of India?', options: ['Narendra Modi', 'Rahul Gandhi', 'Amit Shah', 'Yogi Adityanath'], correctAnswer: 'Narendra Modi', difficulty: 'Easy', category: 'Polity' },
    ],
  },
};

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const grade = userData.classLevel || '10th';
      const purpose = userData.purpose?.toLowerCase() || 'regular study';
      const pool = questionPools[grade]?.[purpose] || questionPools['10th']['regular study'];
      if (pool) {
        // Shuffle and repeat for infinite
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setCurrentQuestion(shuffled[0]);
      }
    }
  }, [userData]);

  const leaderboard = [
    { rank: 1, name: 'Alex Thunder', xp: 12500, badge: '🏆' },
    { rank: 2, name: 'Sarah Nova', xp: 11200, badge: '🥈' },
    { rank: 3, name: 'Mike Storm', xp: 10800, badge: '🥉' },
    { rank: 4, name: 'Emma Blaze', xp: 9500, badge: '⭐' },
    { rank: 5, name: 'You', xp: 8900, badge: '🔥' },
  ];

  const handleAnswer = (correct: boolean) => {
    setAnswered(answered + 1);
    if (correct) {
      setScore(score + 100);
      toast.success('🎉 Correct! +100 XP');
    } else {
      toast.error('❌ Not quite right. Keep trying!');
    }
    // Move to next question
    const nextIndex = (questionIndex + 1) % questions.length;
    setQuestionIndex(nextIndex);
    setCurrentQuestion(questions[nextIndex]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />
      
      <div 
        className="fixed top-[30%] left-[25%] w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div 
        className="fixed bottom-[25%] right-[30%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              Quiz Arena
            </h1>
            <p className="text-muted-foreground">Test your knowledge and compete</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quiz Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-card border border-primary/30 p-6 text-center glow-pink">
                  <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold text-foreground">{score}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
                <div className="rounded-2xl bg-card border border-secondary/30 p-6 text-center glow-blue">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <div className="text-3xl font-bold text-foreground">{answered}</div>
                  <div className="text-sm text-muted-foreground">Answered</div>
                </div>
                <div className="rounded-2xl bg-card border border-accent/30 p-6 text-center glow-purple">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-3xl font-bold text-foreground">
                    {answered > 0 ? Math.round((score / (answered * 100)) * 100) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>

              {/* Question */}
              <div className="rounded-3xl bg-card border border-primary/30 p-8 glow-pink">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Question {answered + 1}</span>
                    <span className="text-sm text-primary font-bold">{currentQuestion?.difficulty || 'EASY'}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground">
                    {currentQuestion?.question || 'Loading question...'}
                  </h2>

                  <div className="space-y-4">
                    {currentQuestion?.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option === currentQuestion.correctAnswer)}
                        className="w-full justify-start text-left h-auto py-4 px-6 bg-input border border-primary/20 hover:border-primary hover:bg-primary/10 rounded-xl transition-all"
                        variant="outline"
                      >
                        <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 text-primary font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-foreground">{option}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-card border border-secondary/30 p-6 glow-blue">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-bold text-foreground">Leaderboard</h3>
                </div>
                
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        entry.name === 'You'
                          ? 'bg-primary/10 border border-primary/30'
                          : 'bg-input'
                      }`}
                    >
                      <span className="text-2xl">{entry.badge}</span>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">{entry.xp} XP</div>
                      </div>
                      <div className="text-xl font-bold text-primary">#{entry.rank}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="rounded-3xl bg-card border border-accent/30 p-6 glow-purple">
                <h3 className="text-xl font-bold text-foreground mb-4">Your Badges</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['🏆', '⭐', '🔥', '💎', '🎯', '⚡'].map((badge, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-input flex items-center justify-center text-3xl hover:scale-110 transition-transform cursor-pointer"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
