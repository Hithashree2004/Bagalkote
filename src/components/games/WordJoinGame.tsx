import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type Difficulty = 'easy' | 'medium' | 'difficult';

interface WordJoinGameProps {
  difficulty: Difficulty;
  onBack: () => void;
}

interface Puzzle {
  clue: string;
  answer: string;
  jumbled: string[];
}

const puzzleSets = {
  easy: [
    { clue: 'The thing used to write', answer: 'PEN', jumbled: [] },
    { clue: 'Animal that barks', answer: 'DOG', jumbled: [] },
    { clue: 'Yellow fruit', answer: 'BANANA', jumbled: [] },
    { clue: 'Device to call people', answer: 'PHONE', jumbled: [] },
    { clue: 'Place to sleep', answer: 'BED', jumbled: [] },
    { clue: 'Hot drink in morning', answer: 'COFFEE', jumbled: [] },
    { clue: 'Round fruit that grows on trees', answer: 'APPLE', jumbled: [] },
    { clue: 'Used to unlock doors', answer: 'KEY', jumbled: [] },
    { clue: 'Vehicle with four wheels', answer: 'CAR', jumbled: [] },
    { clue: 'Tool to cut paper', answer: 'SCISSORS', jumbled: [] },
  ],
  medium: [
    { clue: 'Device to cool a room', answer: 'AIRCONDITIONER', jumbled: [] },
    { clue: 'Place to watch movies', answer: 'CINEMA', jumbled: [] },
    { clue: 'Person who teaches', answer: 'TEACHER', jumbled: [] },
    { clue: 'Flying vehicle', answer: 'AIRPLANE', jumbled: [] },
    { clue: 'Storage for clothes', answer: 'WARDROBE', jumbled: [] },
    { clue: 'Device to take photos', answer: 'CAMERA', jumbled: [] },
    { clue: 'Frozen water', answer: 'ICE', jumbled: [] },
    { clue: 'Place to buy things', answer: 'STORE', jumbled: [] },
    { clue: 'Light from the sun', answer: 'SUNLIGHT', jumbled: [] },
    { clue: 'Book with blank pages', answer: 'NOTEBOOK', jumbled: [] },
  ],
  difficult: [
    { clue: 'Study of living organisms', answer: 'BIOLOGY', jumbled: [] },
    { clue: 'Ancient Egyptian tomb', answer: 'PYRAMID', jumbled: [] },
    { clue: 'Collection of words and meanings', answer: 'DICTIONARY', jumbled: [] },
    { clue: 'Person who explores space', answer: 'ASTRONAUT', jumbled: [] },
    { clue: 'Large body of salt water', answer: 'OCEAN', jumbled: [] },
    { clue: 'Device to measure temperature', answer: 'THERMOMETER', jumbled: [] },
    { clue: 'Extinct giant reptile', answer: 'DINOSAUR', jumbled: [] },
    { clue: 'Study of stars and planets', answer: 'ASTRONOMY', jumbled: [] },
    { clue: 'Person who designs buildings', answer: 'ARCHITECT', jumbled: [] },
    { clue: 'Musical performance venue', answer: 'AUDITORIUM', jumbled: [] },
  ],
};

const WordJoinGame = ({ difficulty, onBack }: WordJoinGameProps) => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [solvedPuzzles, setSolvedPuzzles] = useState<number[]>([]);

  useEffect(() => {
    initializePuzzles();
  }, [difficulty]);

  const initializePuzzles = () => {
    const basePuzzles = puzzleSets[difficulty];
    const shuffledPuzzles = basePuzzles.map(puzzle => ({
      ...puzzle,
      jumbled: puzzle.answer.split('').sort(() => Math.random() - 0.5),
    }));
    setPuzzles(shuffledPuzzles);
    setCurrentIndex(0);
    setSolvedPuzzles([]);
    setSelectedLetters([]);
    setCurrentWord('');
  };

  const handleLetterClick = (index: number) => {
    if (selectedLetters.includes(index)) return;
    
    const newSelected = [...selectedLetters, index];
    setSelectedLetters(newSelected);
    setCurrentWord(currentWord + puzzles[currentIndex].jumbled[index]);
  };

  const handleRemoveLetter = (selectedIndex: number) => {
    const newSelected = selectedLetters.filter((_, i) => i !== selectedIndex);
    setSelectedLetters(newSelected);
    setCurrentWord(newSelected.map(i => puzzles[currentIndex].jumbled[i]).join(''));
  };

  const handleSubmit = () => {
    if (currentWord === puzzles[currentIndex].answer) {
      toast.success('Correct! 🎉');
      setSolvedPuzzles([...solvedPuzzles, currentIndex]);
      
      if (currentIndex < puzzles.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setSelectedLetters([]);
          setCurrentWord('');
        }, 500);
      } else {
        toast.success('🎉 Congratulations! You solved all puzzles!');
      }
    } else {
      toast.error('Incorrect! Try again.');
      setSelectedLetters([]);
      setCurrentWord('');
    }
  };

  const handleSkip = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedLetters([]);
      setCurrentWord('');
    }
  };

  if (puzzles.length === 0) return null;

  const currentPuzzle = puzzles[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Word Join</h2>
          <p className="text-muted-foreground">
            Puzzle {currentIndex + 1}/{puzzles.length} - Solved: {solvedPuzzles.length}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={initializePuzzles} variant="outline">New Game</Button>
          <Button onClick={onBack} variant="outline">Back</Button>
        </div>
      </div>

      <Card className="p-8 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground font-semibold">CLUE:</div>
          <div className="text-2xl font-bold gradient-text">{currentPuzzle.clue}</div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground font-semibold text-center">YOUR ANSWER:</div>
          <div className="min-h-[80px] flex items-center justify-center gap-2 flex-wrap bg-accent/50 rounded-lg p-4">
            {currentWord.split('').map((letter, i) => (
              <div
                key={i}
                onClick={() => handleRemoveLetter(i)}
                className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-lg font-bold text-xl cursor-pointer hover:scale-110 transition-all"
              >
                {letter}
              </div>
            ))}
            {currentWord === '' && (
              <div className="text-muted-foreground">Click letters below to form the answer</div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground font-semibold text-center">AVAILABLE LETTERS:</div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {currentPuzzle.jumbled.map((letter, i) => (
              <div
                key={i}
                onClick={() => handleLetterClick(i)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold text-xl cursor-pointer transition-all ${
                  selectedLetters.includes(i)
                    ? 'bg-accent text-muted-foreground cursor-not-allowed opacity-50'
                    : 'bg-card border-2 border-primary hover:scale-110'
                }`}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSubmit} className="flex-1" disabled={currentWord === ''}>
            Submit Answer
          </Button>
          <Button onClick={handleSkip} variant="outline" disabled={currentIndex === puzzles.length - 1}>
            Skip
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WordJoinGame;
