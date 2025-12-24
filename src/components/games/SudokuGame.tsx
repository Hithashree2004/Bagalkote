import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { HelpCircle, RotateCcw, Lightbulb, Play, Pause, Trophy } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'difficult';

interface SudokuGameProps {
  difficulty: Difficulty;
  onBack: () => void;
}

type Cell = {
  value: number;
  isFixed: boolean;
  isError: boolean;
};

const SudokuGame = ({ difficulty, onBack }: SudokuGameProps) => {
  const gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 9;
  const boxSize = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 2 : 3;
  
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    if (!isPaused && !isComplete) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, isComplete]);

  const generateSolution = (size: number): number[][] => {
    const solution: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
    
    const fillGrid = (row: number, col: number): boolean => {
      if (row === size) return true;
      if (col === size) return fillGrid(row + 1, 0);
      
      const numbers = Array.from({ length: size }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
      
      for (const num of numbers) {
        if (isValidPlacement(solution, row, col, num, size)) {
          solution[row][col] = num;
          if (fillGrid(row, col + 1)) return true;
          solution[row][col] = 0;
        }
      }
      return false;
    };
    
    fillGrid(0, 0);
    return solution;
  };

  const isValidPlacement = (grid: number[][], row: number, col: number, num: number, size: number): boolean => {
    // Check row
    for (let x = 0; x < size; x++) {
      if (grid[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < size; x++) {
      if (grid[x][col] === num) return false;
    }
    
    // Check box
    const boxSize = Math.sqrt(size);
    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;
    
    for (let i = 0; i < boxSize; i++) {
      for (let j = 0; j < boxSize; j++) {
        if (grid[boxRow + i][boxCol + j] === num) return false;
      }
    }
    
    return true;
  };

  const createPuzzle = (solution: number[][], difficulty: Difficulty): Cell[][] => {
    const puzzle: Cell[][] = solution.map(row => 
      row.map(value => ({ value, isFixed: true, isError: false }))
    );
    
    const cellsToRemove = difficulty === 'easy' ? 
      Math.floor(gridSize * gridSize * 0.4) : 
      difficulty === 'medium' ? 
      Math.floor(gridSize * gridSize * 0.5) : 
      Math.floor(gridSize * gridSize * 0.6);
    
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      
      if (puzzle[row][col].value !== 0) {
        puzzle[row][col] = { value: 0, isFixed: false, isError: false };
        removed++;
      }
    }
    
    return puzzle;
  };

  const initializeGame = () => {
    const solution = generateSolution(gridSize);
    const puzzle = createPuzzle(solution, difficulty);
    setGrid(puzzle);
    setSelectedCell(null);
    setTimer(0);
    setIsPaused(false);
    setIsComplete(false);
    setHintsUsed(0);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!grid[row][col].isFixed && !isComplete) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isComplete) return;
    
    const { row, col } = selectedCell;
    if (grid[row][col].isFixed) return;
    
    const newGrid = grid.map(r => r.map(c => ({ ...c })));
    newGrid[row][col].value = num;
    
    // Check for errors
    newGrid[row][col].isError = !isValidPlacement(
      newGrid.map(r => r.map(c => c.value)),
      row,
      col,
      num,
      gridSize
    );
    
    setGrid(newGrid);
    
    // Check if puzzle is complete
    checkCompletion(newGrid);
  };

  const checkCompletion = (currentGrid: Cell[][]) => {
    const isFilled = currentGrid.every(row => row.every(cell => cell.value !== 0));
    const hasNoErrors = currentGrid.every(row => row.every(cell => !cell.isError));
    
    if (isFilled && hasNoErrors) {
      setIsComplete(true);
      toast.success(`🎉 Congratulations! Puzzle solved in ${formatTime(timer)}!`);
    }
  };

  const handleHint = () => {
    if (!selectedCell || isComplete) {
      toast.error('Please select an empty cell first');
      return;
    }
    
    const { row, col } = selectedCell;
    if (grid[row][col].isFixed) {
      toast.error('This cell is already filled');
      return;
    }
    
    // Find correct number for this cell
    for (let num = 1; num <= gridSize; num++) {
      if (isValidPlacement(grid.map(r => r.map(c => c.value)), row, col, num, gridSize)) {
        const newGrid = grid.map(r => r.map(c => ({ ...c })));
        newGrid[row][col].value = num;
        newGrid[row][col].isError = false;
        setGrid(newGrid);
        setHintsUsed(prev => prev + 1);
        toast.success('Hint applied!');
        checkCompletion(newGrid);
        return;
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getCellClassName = (row: number, col: number, cell: Cell): string => {
    let className = 'aspect-square flex items-center justify-center border cursor-pointer transition-all text-lg md:text-xl font-semibold ';
    
    if (cell.isFixed) {
      className += 'bg-primary/10 text-foreground ';
    } else {
      className += 'bg-card hover:bg-primary/5 ';
    }
    
    if (cell.isError) {
      className += 'text-red-500 bg-red-500/10 ';
    }
    
    if (selectedCell?.row === row && selectedCell?.col === col) {
      className += 'ring-2 ring-primary bg-primary/20 ';
    }
    
    // Thicker borders for boxes
    if (col % boxSize === 0 && col !== 0) className += 'border-l-2 border-l-primary ';
    if (row % boxSize === 0 && row !== 0) className += 'border-t-2 border-t-primary ';
    
    return className;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Sudoku</h2>
          <p className="text-muted-foreground capitalize">{difficulty} Level - {gridSize}x{gridSize}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-card border border-primary/30 rounded-lg px-4 py-2 font-mono text-lg font-bold">
            {formatTime(timer)}
          </div>
          <Button
            onClick={() => setIsPaused(!isPaused)}
            variant="outline"
            size="icon"
            className="border-primary/30"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button onClick={() => setShowRules(true)} variant="outline" size="icon" className="border-primary/30">
            <HelpCircle className="w-4 h-4" />
          </Button>
          <Button onClick={initializeGame} variant="outline" size="icon" className="border-primary/30">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button onClick={onBack} variant="outline" className="border-primary/30">
            Back
          </Button>
        </div>
      </div>

      {isComplete && (
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary rounded-2xl p-6 text-center space-y-3">
          <Trophy className="w-16 h-16 mx-auto text-primary" />
          <h3 className="text-2xl font-bold gradient-text">Puzzle Completed! 🎉</h3>
          <p className="text-muted-foreground">
            Time: {formatTime(timer)} | Hints Used: {hintsUsed}
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr,auto] gap-6">
        {/* Sudoku Grid */}
        <div className="flex justify-center">
          <div 
            className="inline-grid gap-0 border-2 border-primary rounded-lg overflow-hidden bg-card"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClassName(rowIndex, colIndex, cell)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{ 
                    width: gridSize === 9 ? '45px' : gridSize === 6 ? '60px' : '80px',
                    height: gridSize === 9 ? '45px' : gridSize === 6 ? '60px' : '80px'
                  }}
                >
                  {cell.value !== 0 ? cell.value : ''}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-card border border-primary/30 rounded-2xl p-4 space-y-3">
            <h3 className="font-semibold text-center">Select Number</h3>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: gridSize }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  onClick={() => handleNumberInput(num)}
                  disabled={!selectedCell || isComplete}
                  className="aspect-square text-lg font-bold"
                  variant="outline"
                >
                  {num}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => selectedCell && handleNumberInput(0)}
              disabled={!selectedCell || isComplete}
              variant="outline"
              className="w-full"
            >
              Clear
            </Button>
          </div>

          <Button
            onClick={handleHint}
            disabled={!selectedCell || isComplete}
            className="w-full bg-gradient-to-r from-accent to-secondary"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Get Hint ({hintsUsed} used)
          </Button>

          <div className="bg-card border border-primary/30 rounded-2xl p-4 space-y-2 text-sm text-muted-foreground">
            <p>💡 <strong>Tip:</strong> Click a cell, then select a number</p>
            <p>⌨️ Use keyboard numbers 1-{gridSize}</p>
            <p>🎯 No repeats in rows, columns, or boxes</p>
          </div>
        </div>
      </div>

      {/* Rules Dialog */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">Sudoku Rules</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">🎯 Objective</h4>
              <p className="text-muted-foreground">
                Fill the {gridSize}x{gridSize} grid with numbers from 1 to {gridSize} so that each row, column, and {boxSize}x{boxSize} box contains all numbers exactly once.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-lg">📋 Rules</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">1.</span>
                  <span>Each <strong>row</strong> must contain the numbers 1 to {gridSize} without repetition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">2.</span>
                  <span>Each <strong>column</strong> must contain the numbers 1 to {gridSize} without repetition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">3.</span>
                  <span>Each <strong>{boxSize}x{boxSize} box</strong> must contain the numbers 1 to {gridSize} without repetition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">4.</span>
                  <span>Pre-filled numbers (darker cells) cannot be changed</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-lg">🎮 How to Play</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Click on an empty cell to select it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Click a number button or press a number key (1-{gridSize}) to fill the cell</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>If a number violates the rules, it will be highlighted in red</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use the "Get Hint" button if you're stuck (reveals correct number for selected cell)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Click "Clear" to remove a number from the selected cell</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>💡 Strategy Tip:</strong> Start by looking for rows, columns, or boxes that already have many numbers filled in. This makes it easier to deduce the missing numbers!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SudokuGame;