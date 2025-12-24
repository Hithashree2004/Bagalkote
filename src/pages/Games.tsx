import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Puzzle, Grid3x3, Search, Grid2x2 } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import PuzzleGame from '@/components/games/PuzzleGame';
import WordSearchGame from '@/components/games/WordSearchGame';
import WordJoinGame from '@/components/games/WordJoinGame';
import SudokuGame from '@/components/games/SudokuGame';

type Difficulty = 'easy' | 'medium' | 'difficult';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const games = [
    {
      id: 'puzzle',
      name: 'Puzzle Game',
      icon: Puzzle,
      description: 'Solve challenging puzzles',
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'word-join',
      name: 'Word Join',
      icon: Grid3x3,
      description: 'Connect letters to form words',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'word-search',
      name: 'Word Search',
      icon: Search,
      description: 'Find hidden words in the grid',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'sudoku',
      name: 'Sudoku',
      icon: Grid2x2,
      description: 'Classic number puzzle game',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  // Render game with difficulty selection
  if (selectedGame && !difficulty) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <ParticleBackground />
        
        <div 
          className="fixed top-[20%] left-[30%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 27, 141, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        
        <div className="relative z-10 min-h-screen p-8">
          <Button
            onClick={() => setSelectedGame(null)}
            variant="outline"
            className="mb-6 border-primary/30 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-text">
                {games.find(g => g.id === selectedGame)?.name}
              </h2>
              <p className="text-muted-foreground">Choose your difficulty level</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {(['easy', 'medium', 'difficult'] as Difficulty[]).map((level) => (
                <div
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-8 cursor-pointer hover:scale-105 transition-all glow-pink group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative text-center space-y-4">
                    <h3 className="text-2xl font-bold gradient-text capitalize">{level}</h3>
                    <p className="text-sm text-muted-foreground">
                      {level === 'easy' && 'Perfect for beginners'}
                      {level === 'medium' && 'A good challenge'}
                      {level === 'difficult' && 'Expert level'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render active game
  if (selectedGame && difficulty) {
    const handleBack = () => {
      setDifficulty(null);
      setSelectedGame(null);
    };

    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <ParticleBackground />
        
        <div 
          className="fixed top-[20%] left-[30%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 27, 141, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        
        <div className="relative z-10 min-h-screen p-8">
          {selectedGame === 'puzzle' && <PuzzleGame difficulty={difficulty} onBack={handleBack} />}
          {selectedGame === 'word-search' && <WordSearchGame difficulty={difficulty} onBack={handleBack} />}
          {selectedGame === 'word-join' && <WordJoinGame difficulty={difficulty} onBack={handleBack} />}
          {selectedGame === 'sudoku' && <SudokuGame difficulty={difficulty} onBack={handleBack} />}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />
      
      <div 
        className="fixed top-[20%] left-[30%] w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      <div 
        className="fixed bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">
              🎮 Gamified Learning
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn while playing! Choose a game and boost your XP
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <div
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-6 cursor-pointer hover:scale-105 transition-all glow-pink group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${game.color} glow-pink`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold gradient-text mb-2">{game.name}</h3>
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all rounded-xl"
                    >
                      Play Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/30 p-8 glow-pink">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <div className="relative text-center space-y-4">
              <h2 className="text-2xl font-bold gradient-text">Earn Rewards! 🏆</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Play games to earn XP, unlock badges, and climb the leaderboard. 
                Each game helps you learn while having fun!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
