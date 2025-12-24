import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dices } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';
type GameMode = 'computer' | 'multiplayer';

interface Piece {
  id: number;
  position: number; // -1 = home, 0-51 = track, 52-57 = safe zone, 100 = finished
  color: PlayerColor;
}

interface GameState {
  pieces: Piece[];
  currentPlayer: PlayerColor;
  diceValue: number | null;
  canRoll: boolean;
  winner: PlayerColor | null;
}

interface LudoGameProps {
  mode: GameMode;
  roomId?: string;
  playerColor?: PlayerColor;
  onBack: () => void;
}

const COLORS: PlayerColor[] = ['red', 'blue', 'green', 'yellow'];
const PIECES_PER_PLAYER = 4;
const TRACK_LENGTH = 52;
const SAFE_ZONE_LENGTH = 6;

const LudoGame = ({ mode, roomId, playerColor = 'red', onBack }: LudoGameProps) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    pieces: [],
    currentPlayer: 'red',
    diceValue: null,
    canRoll: true,
    winner: null
  });
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  // Initialize game
  useEffect(() => {
    const initialPieces: Piece[] = [];
    COLORS.forEach((color, colorIndex) => {
      for (let i = 0; i < PIECES_PER_PLAYER; i++) {
        initialPieces.push({
          id: colorIndex * PIECES_PER_PLAYER + i,
          position: -1,
          color
        });
      }
    });
    setGameState(prev => ({ ...prev, pieces: initialPieces }));

    // Subscribe to multiplayer updates
    if (mode === 'multiplayer' && roomId) {
      const channel = supabase
        .channel(`ludo-game-${roomId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'ludo_game_state',
            filter: `room_id=eq.${roomId}`
          },
          (payload) => {
            const newData = payload.new as any;
            setGameState(JSON.parse(newData.game_data));
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [mode, roomId]);

  // Roll dice
  const rollDice = async () => {
    if (!gameState.canRoll || isRolling || gameState.winner) return;

    setIsRolling(true);
    
    // Animate dice roll
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setGameState(prev => ({ ...prev, diceValue: Math.floor(Math.random() * 6) + 1 }));
      rolls++;
      if (rolls >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setGameState(prev => ({ 
          ...prev, 
          diceValue: finalValue, 
          canRoll: false 
        }));
        setIsRolling(false);

        // Check if player has any valid moves
        setTimeout(() => {
          checkValidMoves(finalValue);
        }, 500);
      }
    }, 100);
  };

  // Check if player has valid moves
  const checkValidMoves = (diceValue: number) => {
    const currentPlayerPieces = gameState.pieces.filter(p => p.color === gameState.currentPlayer);
    const hasValidMove = currentPlayerPieces.some(piece => {
      if (piece.position === -1) return diceValue === 6;
      if (piece.position >= 100) return false;
      return true;
    });

    if (!hasValidMove) {
      toast({
        title: "No valid moves!",
        description: "Passing turn to next player",
      });
      setTimeout(() => nextTurn(), 1500);
    }
  };

  // Get starting position for each color
  const getStartPosition = (color: PlayerColor): number => {
    const starts = { red: 0, blue: 13, green: 26, yellow: 39 };
    return starts[color];
  };

  // Move piece
  const movePiece = async (pieceId: number) => {
    const piece = gameState.pieces.find(p => p.id === pieceId);
    if (!piece || piece.color !== gameState.currentPlayer || !gameState.diceValue) return;

    const newPieces = [...gameState.pieces];
    const pieceIndex = newPieces.findIndex(p => p.id === pieceId);

    // Move from home
    if (piece.position === -1) {
      if (gameState.diceValue === 6) {
        newPieces[pieceIndex].position = getStartPosition(piece.color);
      } else {
        return;
      }
    } else if (piece.position < TRACK_LENGTH) {
      // Move on track
      const startPos = getStartPosition(piece.color);
      const relativePos = (piece.position - startPos + TRACK_LENGTH) % TRACK_LENGTH;
      const newRelativePos = relativePos + gameState.diceValue;

      if (newRelativePos >= TRACK_LENGTH - 1) {
        // Enter safe zone
        const overflow = newRelativePos - (TRACK_LENGTH - 1);
        if (overflow <= SAFE_ZONE_LENGTH) {
          newPieces[pieceIndex].position = TRACK_LENGTH + overflow;
        }
      } else {
        newPieces[pieceIndex].position = (startPos + newRelativePos) % TRACK_LENGTH;
      }

      // Check for captures
      const capturedPiece = newPieces.find(
        p => p.id !== pieceId && 
        p.position === newPieces[pieceIndex].position && 
        p.position >= 0 && 
        p.position < TRACK_LENGTH &&
        p.color !== piece.color
      );
      if (capturedPiece) {
        const capturedIndex = newPieces.findIndex(p => p.id === capturedPiece.id);
        newPieces[capturedIndex].position = -1;
        toast({
          title: "Piece captured!",
          description: `${piece.color} captured ${capturedPiece.color}'s piece`,
        });
      }
    } else if (piece.position < TRACK_LENGTH + SAFE_ZONE_LENGTH) {
      // Move in safe zone
      const newPos = piece.position + gameState.diceValue;
      if (newPos === TRACK_LENGTH + SAFE_ZONE_LENGTH) {
        newPieces[pieceIndex].position = 100; // Finished
        toast({
          title: "Piece finished!",
          description: `${piece.color} moved a piece home!`,
        });
      } else if (newPos < TRACK_LENGTH + SAFE_ZONE_LENGTH) {
        newPieces[pieceIndex].position = newPos;
      }
    }

    const newGameState = {
      ...gameState,
      pieces: newPieces,
      canRoll: true,
      selectedPiece: null
    };

    // Check for winner
    const finishedPieces = newPieces.filter(p => p.color === piece.color && p.position === 100).length;
    if (finishedPieces === PIECES_PER_PLAYER) {
      newGameState.winner = piece.color;
      toast({
        title: "🎉 Winner!",
        description: `${piece.color} wins the game!`,
      });
    }

    setGameState(newGameState);

    // Update multiplayer state
    if (mode === 'multiplayer' && roomId) {
      await supabase
        .from('ludo_game_state')
        .update({
          game_data: JSON.stringify(newGameState),
          current_turn: newGameState.currentPlayer
        })
        .eq('room_id', roomId);
    }

    // Next turn if didn't roll a 6
    if (gameState.diceValue !== 6) {
      setTimeout(() => nextTurn(), 1000);
    }
  };

  // Next turn
  const nextTurn = () => {
    const currentIndex = COLORS.indexOf(gameState.currentPlayer);
    const nextColor = COLORS[(currentIndex + 1) % COLORS.length];
    
    setGameState(prev => ({
      ...prev,
      currentPlayer: nextColor,
      diceValue: null,
      canRoll: true
    }));

    // Computer's turn
    if (mode === 'computer' && nextColor !== 'red') {
      setTimeout(() => computerTurn(nextColor), 1500);
    }
  };

  // Computer AI turn
  const computerTurn = async (color: PlayerColor) => {
    // Roll dice
    await new Promise(resolve => setTimeout(resolve, 500));
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setGameState(prev => ({ ...prev, diceValue, canRoll: false }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find best move
    const colorPieces = gameState.pieces.filter(p => p.color === color);
    let bestPiece: Piece | null = null;

    // Priority: finish pieces > capture > move forward > get out of home
    for (const piece of colorPieces) {
      if (piece.position === -1 && diceValue === 6) {
        bestPiece = piece;
        break;
      }
      if (piece.position >= TRACK_LENGTH && piece.position < TRACK_LENGTH + SAFE_ZONE_LENGTH) {
        if (piece.position + diceValue === TRACK_LENGTH + SAFE_ZONE_LENGTH) {
          bestPiece = piece;
          break;
        }
      }
      if (piece.position >= 0 && piece.position < TRACK_LENGTH && !bestPiece) {
        bestPiece = piece;
      }
    }

    if (bestPiece) {
      await movePiece(bestPiece.id);
    } else {
      setTimeout(() => nextTurn(), 500);
    }
  };

  // Get piece position on board
  const getPieceStyle = (piece: Piece) => {
    if (piece.position === -1) {
      // Home positions
      const homePositions = {
        red: { top: '10%', left: '10%' },
        blue: { top: '10%', right: '10%' },
        green: { top: 'auto', bottom: '10%', right: '10%' },
        yellow: { top: 'auto', bottom: '10%', left: '10%' }
      };
      return homePositions[piece.color];
    }

    // Calculate position on track (simplified)
    const angle = (piece.position * (360 / TRACK_LENGTH)) * (Math.PI / 180);
    const radius = 35; // 35% from center
    const centerX = 50;
    const centerY = 50;
    
    return {
      left: `${centerX + radius * Math.cos(angle)}%`,
      top: `${centerY + radius * Math.sin(angle)}%`,
    };
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={onBack}
        variant="outline"
        className="border-primary/30 hover:bg-primary/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold gradient-text">
          LUDO - {mode === 'computer' ? 'vs Computer' : 'Multiplayer'}
        </h2>
        {gameState.winner ? (
          <p className="text-xl text-primary font-bold">
            🎉 {gameState.winner.toUpperCase()} WINS! 🎉
          </p>
        ) : (
          <p className="text-muted-foreground">
            Current Turn: <span className={`font-bold text-${gameState.currentPlayer}-500`}>
              {gameState.currentPlayer.toUpperCase()}
            </span>
          </p>
        )}
      </div>

      {/* Game Board */}
      <div className="relative mx-auto max-w-2xl aspect-square bg-card border-2 border-primary/30 rounded-3xl overflow-hidden">
        {/* Center area */}
        <div className="absolute inset-[35%] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full" />

        {/* Dice */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-background/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-primary/30 pointer-events-auto">
            {gameState.diceValue ? (
              <div className="text-6xl font-bold gradient-text">
                {gameState.diceValue}
              </div>
            ) : (
              <Dices className="w-16 h-16 text-muted-foreground" />
            )}
            {gameState.currentPlayer === playerColor && gameState.canRoll && !gameState.winner && (
              <Button
                onClick={rollDice}
                disabled={isRolling}
                className="mt-4 w-full bg-gradient-to-r from-primary to-accent"
              >
                Roll Dice
              </Button>
            )}
          </div>
        </div>

        {/* Pieces */}
        {gameState.pieces.map((piece) => (
          <div
            key={piece.id}
            style={{
              ...getPieceStyle(piece),
              backgroundColor: piece.color,
              cursor: piece.color === gameState.currentPlayer && !gameState.canRoll ? 'pointer' : 'default'
            }}
            onClick={() => {
              if (piece.color === gameState.currentPlayer && !gameState.canRoll) {
                movePiece(piece.id);
              }
            }}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all ${
              piece.position === 100 ? 'opacity-50' : ''
            }`}
          />
        ))}

        {/* Home areas - colored corners */}
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-red-500/20 border-2 border-red-500/30 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/20 border-2 border-blue-500/30 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-yellow-500/20 border-2 border-yellow-500/30 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-green-500/20 border-2 border-green-500/30 rounded-br-3xl" />
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {COLORS.map((color) => {
          const finishedCount = gameState.pieces.filter(
            p => p.color === color && p.position === 100
          ).length;
          return (
            <div
              key={color}
              className={`p-4 rounded-xl border-2 ${
                gameState.currentPlayer === color ? 'border-primary' : 'border-primary/30'
              } bg-card`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-bold capitalize">{color}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Finished: {finishedCount}/{PIECES_PER_PLAYER}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LudoGame;
