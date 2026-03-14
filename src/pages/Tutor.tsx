import { GraduationCap } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import TutorWidget from '@/components/tutor/TutorWidget';

export default function Tutor() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex flex-col items-center pt-24 pb-12">
      <ParticleBackground />

      {/* Ambient glows */}
      <div
        className="fixed top-[20%] left-[20%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.5) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="fixed bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="fixed top-[50%] right-[10%] w-[350px] h-[350px] rounded-full opacity-15 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full px-4 flex-1 flex flex-col">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 shadow-lg glow-pink">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider uppercase">Lumina AI Platform</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-sm">
            PCMB Tutor
          </h1>
        </div>

        {/* The new AI Search Widget */}
        <div className="flex-1 w-full flex justify-center">
          <TutorWidget />
        </div>
      </div>
    </div>
  );
}
