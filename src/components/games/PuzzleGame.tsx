import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
type Difficulty = 'easy' | 'medium' | 'difficult';

interface PuzzleGameProps {
  difficulty: Difficulty;
  onBack: () => void;
}

interface PuzzlePiece {
  id: number;
  currentIndex: number;
  correctIndex: number;
  image: string;
}

const images = [
  { name: 'Newton', src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=600&fit=crop' },
  { name: 'Nature', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop' },
  { name: 'Robot', src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop' },
  { name: 'Space', src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=600&fit=crop' },
  { name: 'Ocean', src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=600&fit=crop' },
  { name: 'Mountain', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop' },
  { name: 'Forest', src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=600&fit=crop' },
  { name: 'City', src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=600&fit=crop' },
  { name: 'Animal', src: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=600&fit=crop' },
];

const PuzzleGame = ({ difficulty, onBack }: PuzzleGameProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const gridSize = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    if (selectedImage) {
      initializePuzzle();
    }
  }, [selectedImage, difficulty]);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      currentIndex: i,
      correctIndex: i,
      image: selectedImage!,
    }));

    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i].currentIndex, newPieces[j].currentIndex] = [newPieces[j].currentIndex, newPieces[i].currentIndex];
    }

    setPieces(newPieces);
    setMoves(0);
    setIsComplete(false);
  };

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      // Swap pieces
      const newPieces = [...pieces];
      const piece1 = newPieces.find(p => p.currentIndex === selectedPiece)!;
      const piece2 = newPieces.find(p => p.currentIndex === index)!;
      
      [piece1.currentIndex, piece2.currentIndex] = [piece2.currentIndex, piece1.currentIndex];
      
      setPieces(newPieces);
      setSelectedPiece(null);
      setMoves(moves + 1);

      // Check if puzzle is complete
      if (newPieces.every(p => p.currentIndex === p.correctIndex)) {
        setIsComplete(true);
        toast.success(`Puzzle completed in ${moves + 1} moves! 🎉`);
      }
    }
  };

  const availableImages = difficulty === 'easy' ? images.slice(0, 3) : difficulty === 'medium' ? images.slice(0, 6) : images;

  if (!selectedImage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">Choose an Image</h2>
          <Button onClick={onBack} variant="outline">Back</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {availableImages.map((img) => (
            <Card
              key={img.name}
              className="cursor-pointer hover:scale-105 transition-all overflow-hidden"
              onClick={() => setSelectedImage(img.src)}
            >
              <img src={img.src} alt={img.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-center">{img.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Puzzle Game</h2>
          <p className="text-muted-foreground">Moves: {moves}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={initializePuzzle} variant="outline">Reset</Button>
          <Button onClick={() => setSelectedImage(null)} variant="outline">Change Image</Button>
          <Button onClick={onBack} variant="outline">Back</Button>
        </div>
      </div>

      {isComplete && (
        <Card className="p-4 bg-primary/10 border-primary">
          <p className="text-center font-bold">🎉 Congratulations! You completed the puzzle in {moves} moves!</p>
        </Card>
      )}

      <div 
        className="grid gap-1 mx-auto max-w-2xl"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: totalPieces }, (_, index) => {
          const piece = pieces.find(p => p.currentIndex === index);
          if (!piece) return null;

          const row = piece.correctIndex % gridSize;
          const col = Math.floor(piece.correctIndex / gridSize);
          const pieceSize = 100 / gridSize;

          return (
            <div
              key={index}
              onClick={() => handlePieceClick(index)}
              className={`aspect-square cursor-pointer border-2 transition-all ${
                selectedPiece === index ? 'border-primary scale-95' : 'border-border'
              } ${isComplete ? 'cursor-default' : ''}`}
              style={{
                backgroundImage: `url(${piece.image})`,
                backgroundSize: `${gridSize * 100}%`,
                backgroundPosition: `${row * pieceSize}% ${col * pieceSize}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleGame;
