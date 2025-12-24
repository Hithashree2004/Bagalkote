import { useState } from 'react';
import { MapPin, Upload, Clock, Bus, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type StudyPlan = {
  dailySchedule: { time: string; activity: string }[];
  subjectAllocation: { subject: string; hours: number }[];
  tips: string[];
};

const RoadMapSection = () => {
  const [timetableFile, setTimetableFile] = useState<File | null>(null);
  const [timetablePreview, setTimetablePreview] = useState<string | null>(null);
  const [wakeUpTime, setWakeUpTime] = useState('06:00');
  const [sleepTime, setSleepTime] = useState('22:00');
  const [hasTravel, setHasTravel] = useState(false);
  const [travelDuration, setTravelDuration] = useState('30');
  const [userIdeas, setUserIdeas] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setTimetableFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          setTimetablePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
        toast.success('Timetable uploaded successfully!');
      } else {
        toast.error('Please upload an image file (JPG, PNG, etc.)');
      }
    }
  };

  const calculateAvailableHours = () => {
    const wake = parseInt(wakeUpTime.split(':')[0]);
    const sleep = parseInt(sleepTime.split(':')[0]);
    let totalHours = sleep > wake ? sleep - wake : 24 - wake + sleep;
    
    if (hasTravel) {
      const travelHours = parseInt(travelDuration) / 60;
      totalHours -= travelHours * 2; // Round trip
    }
    
    // Subtract time for meals, personal care (approx 4 hours)
    totalHours -= 4;
    
    return Math.max(totalHours, 0);
  };

  const generateStudyPlan = () => {
    if (!timetableFile && !userIdeas) {
      toast.error('Please upload a timetable or enter your study goals');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const availableHours = calculateAvailableHours();
      const studyHours = Math.floor(availableHours * 0.7); // 70% for study
      const breakHours = availableHours - studyHours;

      const plan: StudyPlan = {
        dailySchedule: [
          { time: wakeUpTime, activity: 'Wake up & Morning Routine' },
          { time: addHours(wakeUpTime, 1), activity: 'Breakfast' },
          { time: addHours(wakeUpTime, 1.5), activity: 'Study Session 1 - Most Important Subject' },
          { time: addHours(wakeUpTime, 3.5), activity: 'Short Break (15 min)' },
          { time: addHours(wakeUpTime, 4), activity: 'Study Session 2 - Second Priority Subject' },
          { time: addHours(wakeUpTime, 6), activity: 'Lunch Break' },
          { time: addHours(wakeUpTime, 7), activity: 'Study Session 3 - Practice & Revision' },
          { time: addHours(wakeUpTime, 9), activity: 'Evening Break / Physical Activity' },
          { time: addHours(wakeUpTime, 10), activity: 'Study Session 4 - Light Topics / Revision' },
          { time: addHours(wakeUpTime, 12), activity: 'Dinner' },
          { time: addHours(wakeUpTime, 13), activity: 'Review & Plan Next Day' },
          { time: sleepTime, activity: 'Sleep' }
        ],
        subjectAllocation: [
          { subject: 'Subject 1', hours: studyHours * 0.25 },
          { subject: 'Subject 2', hours: studyHours * 0.25 },
          { subject: 'Subject 3', hours: studyHours * 0.2 },
          { subject: 'Subject 4', hours: studyHours * 0.15 },
          { subject: 'Revision', hours: studyHours * 0.15 }
        ],
        tips: [
          '🎯 Focus on difficult subjects during morning hours when your mind is fresh',
          '📚 Use active recall and spaced repetition for better retention',
          '⏰ Take 5-minute breaks every 25-30 minutes (Pomodoro Technique)',
          '💧 Stay hydrated and maintain good posture while studying',
          '📝 Review your notes at the end of each day',
          '🎮 Reward yourself after completing study goals',
          '😴 Ensure 7-8 hours of quality sleep for better memory consolidation',
          '🏃 Include 30 minutes of physical activity daily'
        ]
      };

      setStudyPlan(plan);
      setIsAnalyzing(false);
      toast.success('Study plan generated successfully! 🎉');
    }, 2000);
  };

  const addHours = (time: string, hours: number): string => {
    const [h, m] = time.split(':').map(Number);
    const totalMinutes = h * 60 + m + hours * 60;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  const formatTime = (time: string): string => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hours = h % 12 || 12;
    return `${hours}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold gradient-text">Study Road Map</h2>
      </div>
      <p className="text-muted-foreground">
        Upload your exam timetable and let us create a personalized study plan for you!
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Timetable Upload */}
          <Card className="p-6 border-primary/30 space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Upload Exam Timetable</h3>
            </div>
            
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center space-y-3 hover:border-primary/50 transition-colors">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <Label htmlFor="timetable-upload" className="cursor-pointer text-primary hover:underline">
                  Click to upload
                </Label>
                <Input
                  id="timetable-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload image of your exam timetable
                </p>
              </div>
            </div>

            {timetablePreview && (
              <div className="relative rounded-lg overflow-hidden border border-primary/30">
                <img src={timetablePreview} alt="Timetable preview" className="w-full h-auto" />
              </div>
            )}
          </Card>

          {/* Routine Form */}
          <Card className="p-6 border-primary/30 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Daily Routine</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wake-time">Wake-up Time</Label>
                  <Input
                    id="wake-time"
                    type="time"
                    value={wakeUpTime}
                    onChange={(e) => setWakeUpTime(e.target.value)}
                    className="border-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleep-time">Sleep Time</Label>
                  <Input
                    id="sleep-time"
                    type="time"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    className="border-primary/30"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-card border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5 text-secondary" />
                  <Label htmlFor="travel-toggle" className="cursor-pointer">
                    Do you travel to college?
                  </Label>
                </div>
                <Switch
                  id="travel-toggle"
                  checked={hasTravel}
                  onCheckedChange={setHasTravel}
                />
              </div>

              {hasTravel && (
                <div className="space-y-2">
                  <Label htmlFor="travel-duration">Travel Duration (one way, in minutes)</Label>
                  <Input
                    id="travel-duration"
                    type="number"
                    value={travelDuration}
                    onChange={(e) => setTravelDuration(e.target.value)}
                    placeholder="30"
                    min="0"
                    className="border-primary/30"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Ideas/Goals */}
          <Card className="p-6 border-primary/30 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Your Study Goals & Ideas</h3>
            </div>
            <Textarea
              value={userIdeas}
              onChange={(e) => setUserIdeas(e.target.value)}
              placeholder="Share your study goals, subjects you want to focus on, exam preparation targets, or any specific requirements..."
              className="min-h-32 border-primary/30"
            />
          </Card>

          <Button
            onClick={generateStudyPlan}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all text-lg py-6"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Analyzing & Creating Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Study Plan
              </>
            )}
          </Button>
        </div>

        {/* Study Plan Display */}
        <div className="space-y-6">
          {studyPlan ? (
            <>
              <Card className="p-6 border-primary/30 space-y-4">
                <h3 className="text-xl font-bold gradient-text">📅 Your Daily Schedule</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {studyPlan.dailySchedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20"
                    >
                      <div className="text-sm font-semibold text-primary min-w-20">
                        {formatTime(item.time)}
                      </div>
                      <div className="text-sm text-foreground">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-primary/30 space-y-4">
                <h3 className="text-xl font-bold gradient-text">📚 Subject-wise Time Allocation</h3>
                <div className="space-y-3">
                  {studyPlan.subjectAllocation.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.subject}</span>
                        <span className="text-muted-foreground">{item.hours.toFixed(1)} hrs/day</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                          style={{ width: `${(item.hours / 8) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-primary/30 space-y-4">
                <h3 className="text-xl font-bold gradient-text">💡 Study Tips</h3>
                <ul className="space-y-2">
                  {studyPlan.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
                onClick={() => {
                  toast.success('Study plan saved! You can access it anytime.');
                }}
              >
                Save Study Plan
              </Button>
            </>
          ) : (
            <Card className="p-12 border-primary/30 text-center space-y-4">
              <MapPin className="w-16 h-16 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-muted-foreground">
                  Your Study Plan Will Appear Here
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fill in your details and click "Generate My Study Plan" to get started
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadMapSection;