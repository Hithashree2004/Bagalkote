import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

type Difficulty = 'easy' | 'medium' | 'difficult';

interface WordSearchGameProps {
  difficulty: Difficulty;
  onBack: () => void;
}

interface Cell {
  letter: string;
  row: number;
  col: number;
  isSelected: boolean;
  isFound: boolean;
}

const wordSets = {
  easy: ['REACT', 'CODE', 'GAME', 'PLAY', 'WORD', 'SEARCH', 'FIND', 'LEARN', 'STUDY', 'BRAIN'],
  medium: ['JAVASCRIPT', 'PYTHON', 'COMPUTER', 'ALGORITHM', 'FUNCTION', 'VARIABLE', 'DATABASE', 'KEYBOARD', 'MONITOR', 'NETWORK'],
  difficult: ['PROGRAMMING', 'DEVELOPMENT', 'APPLICATION', 'ENGINEERING', 'ARCHITECTURE', 'PERFORMANCE', 'OPTIMIZATION', 'INTEGRATION', 'DEPLOYMENT', 'MAINTENANCE'],
};

const WordSearchGame = ({ difficulty, onBack }: WordSearchGameProps) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [words] = useState(wordSets[difficulty]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selection, setSelection] = useState<Cell[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const GRID_SIZE = 20;

  useEffect(() => {
    initializeGrid();
  }, [difficulty]);

  const initializeGrid = () => {
    // Create empty grid
    const newGrid: Cell[][] = Array.from({ length: GRID_SIZE }, (_, row) =>
      Array.from({ length: GRID_SIZE }, (_, col) => ({
        letter: '',
        row,
        col,
        isSelected: false,
        isFound: false,
      }))
    );

    // Place words
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          placeWord(newGrid, word, row, col, direction);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty cells with random letters
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (!newGrid[i][j].letter) {
          newGrid[i][j].letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setFoundWords([]);
  };

  const canPlaceWord = (grid: Cell[][], word: string, row: number, col: number, direction: string) => {
    if (direction === 'horizontal') {
      if (col + word.length > GRID_SIZE) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i].letter && grid[row][col + i].letter !== word[i]) return false;
      }
    } else {
      if (row + word.length > GRID_SIZE) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col].letter && grid[row + i][col].letter !== word[i]) return false;
      }
    }
    return true;
  };

  const placeWord = (grid: Cell[][], word: string, row: number, col: number, direction: string) => {
    if (direction === 'horizontal') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i].letter = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col].letter = word[i];
      }
    }
  };

  const handleMouseDown = (cell: Cell) => {
    if (cell.isFound) return;
    setIsSelecting(true);
    setSelection([cell]);
    updateCellSelection(cell.row, cell.col, true);
  };

  const handleMouseEnter = (cell: Cell) => {
    if (!isSelecting || cell.isFound) return;
    
    if (!selection.find(c => c.row === cell.row && c.col === cell.col)) {
      setSelection([...selection, cell]);
      updateCellSelection(cell.row, cell.col, true);
    }
  };

  const handleMouseUp = () => {
    if (selection.length === 0) return;
    
    const selectedWord = selection.map(c => c.letter).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
      selection.forEach(cell => {
        updateCellFound(cell.row, cell.col);
      });
      toast.success(`Found: ${selectedWord}`);
      
      if (foundWords.length + 1 === words.length) {
        toast.success('🎉 Congratulations! You found all words!');
      }
    } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      setFoundWords([...foundWords, reversedWord]);
      selection.forEach(cell => {
        updateCellFound(cell.row, cell.col);
      });
      toast.success(`Found: ${reversedWord}`);
      
      if (foundWords.length + 1 === words.length) {
        toast.success('🎉 Congratulations! You found all words!');
      }
    } else {
      selection.forEach(cell => {
        updateCellSelection(cell.row, cell.col, false);
      });
    }

    setSelection([]);
    setIsSelecting(false);
  };

  const updateCellSelection = (row: number, col: number, selected: boolean) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = { ...newGrid[row][col], isSelected: selected };
      return newGrid;
    });
  };

  const updateCellFound = (row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = { ...newGrid[row][col], isFound: true, isSelected: false };
      return newGrid;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Word Search</h2>
          <p className="text-muted-foreground">Found: {foundWords.length}/{words.length}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={initializeGrid} variant="outline">New Game</Button>
          <Button onClick={onBack} variant="outline">Back</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <Card className="p-4">
          <div 
            className="grid gap-0.5 select-none"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            onMouseLeave={handleMouseUp}
          >
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`
                    aspect-square flex items-center justify-center text-xs font-bold cursor-pointer
                    transition-colors border border-border
                    ${cell.isFound ? 'bg-primary/30 text-primary-foreground' : 
                      cell.isSelected ? 'bg-primary/50' : 'bg-card hover:bg-accent'}
                  `}
                  onMouseDown={() => handleMouseDown(cell)}
                  onMouseEnter={() => handleMouseEnter(cell)}
                  onMouseUp={handleMouseUp}
                >
                  {cell.letter}
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold mb-4">Words to Find:</h3>
          <div className="space-y-2">
            {words.map(word => (
              <div
                key={word}
                className={`p-2 rounded ${
                  foundWords.includes(word) ? 'bg-primary/20 line-through' : 'bg-card'
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WordSearchGame;
