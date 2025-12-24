import { User, Award, Target, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';

const Profile = () => {
  const stats = [
    { icon: Target, label: 'Total XP', value: '8,900', color: 'primary' },
    { icon: Award, label: 'Badges', value: '12', color: 'secondary' },
    { icon: Zap, label: 'Streak', value: '15 days', color: 'accent' },
    { icon: TrendingUp, label: 'Rank', value: '#5', color: 'primary' },
  ];

  const achievements = [
    { emoji: '🏆', name: 'First Win', desc: 'Complete your first quiz' },
    { emoji: '🔥', name: 'On Fire', desc: 'Maintain 7-day streak' },
    { emoji: '⭐', name: 'Rising Star', desc: 'Earn 1,000 XP' },
    { emoji: '💎', name: 'Diamond', desc: 'Reach top 10' },
    { emoji: '🎯', name: 'Sharpshooter', desc: '90% accuracy' },
    { emoji: '⚡', name: 'Speed Demon', desc: 'Answer in 5 seconds' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />
      
      <div 
        className="fixed top-[25%] right-[33%] w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(255, 27, 141, 0.4) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div 
        className="fixed bottom-[30%] left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="rounded-3xl bg-card border border-primary/30 p-8 glow-pink">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-pink">
                <User className="w-16 h-16 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-4xl font-bold gradient-text">Learning Master</h1>
                <p className="text-xl text-muted-foreground">@learner123</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                    Level 12
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-semibold">
                    Pro Member
                  </span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent glow-pink hover:scale-105 transition-all">
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`rounded-2xl bg-card border border-${stat.color}/30 p-6 text-center glow-pink hover:scale-105 transition-all`}
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 text-${stat.color}`} />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="rounded-3xl bg-card border border-secondary/30 p-8 glow-blue">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Award className="w-7 h-7 text-secondary" />
              Achievements
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-input border border-primary/20 p-4 hover:border-primary hover:scale-105 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">{achievement.emoji}</div>
                  <h3 className="font-bold text-foreground mb-1">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-3xl bg-card border border-accent/30 p-8 glow-purple">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-accent" />
              Learning Progress
            </h2>
            <div className="space-y-4">
              {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map((subject, index) => {
                const progress = [75, 60, 85, 45][index];
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-semibold">{subject}</span>
                      <span className="text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-input overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent glow-pink transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
