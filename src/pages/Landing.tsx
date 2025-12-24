import { Link } from 'react-router-dom';
import { Target, Trophy, Zap, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />
      
      {/* Large glowing gradient orbs - matching reference */}
      <div 
        className="fixed top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div 
        className="fixed top-[15%] left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div 
        className="fixed bottom-[20%] right-[25%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <main className="max-w-5xl mx-auto text-center space-y-12">
          {/* Hero Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold gradient-text animate-float">
              LUMINA
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/80 font-light">
              Learn. Play. Evolve. <span className="inline-block animate-glow">⚡</span>
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Gateway to AI-Powered Learning Adventure
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-primary/30 p-8 transition-all hover:border-primary hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center glow-pink">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Learn Anything</h3>
                <p className="text-muted-foreground text-sm">
                  Text, Audio & Video powered by AI
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-secondary/30 p-8 transition-all hover:border-secondary hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center glow-blue">
                  <Trophy className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Take Quizzes</h3>
                <p className="text-muted-foreground text-sm">
                  Test your knowledge and compete
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-accent/30 p-8 transition-all hover:border-accent hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center glow-purple">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Earn XP & Badges</h3>
                <p className="text-muted-foreground text-sm">
                  Level up your learning journey
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Link to="/auth">
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-lg px-8 py-6 rounded-full glow-pink hover:scale-105 transition-all"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 rounded-full transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create Account
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
