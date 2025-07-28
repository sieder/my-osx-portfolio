import React, { useState, useEffect, useCallback } from 'react';

interface RPGGameProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  isDarkMode: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface NPC {
  id: string;
  x: number;
  y: number;
  emoji: string;
  name: string;
  dialogue: string[];
}

const npcs: NPC[] = [
  {
    id: 'mentor',
    x: 150,
    y: 200,
    emoji: '🧙‍♂️',
    name: 'Tech Mentor',
    dialogue: [
      "Sieder is an exceptional developer!",
      "He has mastered React, TypeScript, and Node.js",
      "His problem-solving skills are outstanding"
    ]
  },
  {
    id: 'colleague',
    x: 400,
    y: 150,
    emoji: '🧝‍♀️',
    name: 'Fellow Developer',
    dialogue: [
      "Sieder is very good at what he does!",
      "He's always willing to help teammates",
      "His code quality is consistently excellent"
    ]
  },
  {
    id: 'client',
    x: 600,
    y: 300,
    emoji: '👑',
    name: 'Happy Client',
    dialogue: [
      "Sieder delivered our project perfectly!",
      "He understood our requirements immediately",
      "We'll definitely work with him again"
    ]
  },
  {
    id: 'teacher',
    x: 200,
    y: 400,
    emoji: '🧙‍♂️',
    name: 'Professor',
    dialogue: [
      "Sieder was one of my best students",
      "He's based in the Philippines",
      "His passion for technology is inspiring"
    ]
  },
  {
    id: 'friend',
    x: 500,
    y: 350,
    emoji: '🗡️',
    name: 'University Friend',
    dialogue: [
      "Sieder loves building interactive applications",
      "He's always learning new technologies",
      "Let's build something awesome together!"
    ]
  },
  {
    id: 'blacksmith',
    x: 300,
    y: 250,
    emoji: '⚒️',
    name: 'Village Blacksmith',
    dialogue: [
      "I've heard tales of Sieder's coding prowess!",
      "They say he can forge applications from pure logic",
      "His tools are React, TypeScript, and Node.js"
    ]
  },
  {
    id: 'merchant',
    x: 450,
    y: 200,
    emoji: '💰',
    name: 'Traveling Merchant',
    dialogue: [
      "Sieder's reputation travels far and wide!",
      "Clients from distant lands seek his services",
      "His work brings prosperity to all who hire him"
    ]
  },
  {
    id: 'guard',
    x: 350,
    y: 380,
    emoji: '🛡️',
    name: 'Village Guard',
    dialogue: [
      "Sieder protects our digital realm!",
      "His secure coding practices keep us safe",
      "No bug can breach his defenses!"
    ]
  }
];

export const RPGGame: React.FC<RPGGameProps> = ({ isOpen, onClose, onMinimize, onMaximize, isMaximized, isDarkMode }) => {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 50, y: 250 });
  const [facingDirection, setFacingDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [showDialogue, setShowDialogue] = useState(false);
  const [currentNPC, setCurrentNPC] = useState<NPC | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [nearbyNPC, setNearbyNPC] = useState<NPC | null>(null);

  const checkNearbyNPC = useCallback((playerPos: Position) => {
    const nearby = npcs.find(npc => {
      const distance = Math.sqrt(
        Math.pow(npc.x - playerPos.x, 2) + Math.pow(npc.y - playerPos.y, 2)
      );
      return distance < 60;
    });
    setNearbyNPC(nearby || null);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    if (showDialogue) {
      if (event.key === 'q' || event.key === 'Q' || event.key === 'Enter') {
        if (currentNPC && dialogueIndex < currentNPC.dialogue.length - 1) {
          setDialogueIndex(prev => prev + 1);
        } else {
          setShowDialogue(false);
          setCurrentNPC(null);
          setDialogueIndex(0);
        }
      }
      return;
    }

    const moveSpeed = 15;
    let newPosition = { ...playerPosition };
    let newDirection = facingDirection;

    switch (event.key.toLowerCase()) {
      case 'arrowup':
      case 'w':
        newPosition.y = Math.max(playerPosition.y - moveSpeed, 50);
        newDirection = 'up';
        break;
      case 'arrowdown':
      case 's':
        newPosition.y = Math.min(playerPosition.y + moveSpeed, 450);
        newDirection = 'down';
        break;
      case 'arrowleft':
      case 'a':
        newPosition.x = Math.max(playerPosition.x - moveSpeed, 30);
        newDirection = 'left';
        break;
      case 'arrowright':
      case 'd':
        newPosition.x = Math.min(playerPosition.x + moveSpeed, 750);
        newDirection = 'right';
        break;
      case 'q':
        if (nearbyNPC) {
          setCurrentNPC(nearbyNPC);
          setShowDialogue(true);
          setDialogueIndex(0);
        }
        return;
    }

    setPlayerPosition(newPosition);
    setFacingDirection(newDirection);
    checkNearbyNPC(newPosition);
  }, [isOpen, playerPosition, facingDirection, showDialogue, currentNPC, dialogueIndex, nearbyNPC, checkNearbyNPC]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    checkNearbyNPC(playerPosition);
  }, [playerPosition, checkNearbyNPC]);

  if (!isOpen) return null;

  const getPlayerEmoji = () => {
    switch (facingDirection) {
      case 'up': return '🧙‍♂️';
      case 'down': return '🧙‍♂️';
      case 'left': return '🧙‍♂️';
      case 'right': return '🧙‍♂️';
      default: return '🧙‍♂️';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${
        isMaximized 
          ? 'w-full h-full' 
          : 'w-[95vw] h-[90vh] sm:w-[90vw] sm:h-[85vh] md:w-[85vw] md:h-[80vh] lg:max-w-6xl'
      } ${
        isMaximized ? 'rounded-none' : 'rounded-lg'
      } shadow-2xl overflow-hidden transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Window Title Bar */}
        <div className={`flex items-center justify-between px-4 py-2 border-b ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-gray-100 border-gray-300 text-black'
        }`}>
          <div className="flex items-center space-x-3">
            {/* Traffic Light Buttons */}
            <div className="flex space-x-2">
              <button 
                onClick={onClose}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                title="Close"
              />
              <button 
                onClick={onMinimize}
                className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                title="Minimize"
              />
              <button 
                onClick={onMaximize}
                className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                title={isMaximized ? "Restore" : "Maximize"}
              />
            </div>
            <span className="text-sm font-medium">About Me - RPG Adventure</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative w-full h-full bg-gradient-to-b from-blue-400 via-green-300 to-green-600 overflow-hidden">
          {/* Mountains Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-600 to-gray-400" style={{
            clipPath: 'polygon(0 100%, 15% 60%, 25% 80%, 40% 40%, 55% 70%, 70% 30%, 85% 60%, 100% 50%, 100% 100%)'
          }}></div>
          <div className="absolute top-8 left-0 w-full h-28 bg-gradient-to-b from-gray-500 to-gray-300" style={{
            clipPath: 'polygon(0 100%, 20% 80%, 35% 50%, 50% 70%, 65% 40%, 80% 60%, 95% 45%, 100% 100%)'
          }}></div>
          
          {/* Sky Elements */}
          <div className="absolute top-10 left-20 text-white text-4xl animate-pulse">☁️</div>
          <div className="absolute top-16 right-32 text-white text-3xl animate-pulse" style={{ animationDelay: '1s' }}>☁️</div>
          <div className="absolute top-8 left-1/2 text-white text-5xl animate-pulse" style={{ animationDelay: '2s' }}>☁️</div>
          <div className="absolute top-5 right-10 text-yellow-300 text-6xl animate-bounce">☀️</div>

          {/* Village Buildings */}
          <div className="absolute bottom-32 left-100 text-6xl">🏘️</div>
          <div className="absolute bottom-32 right-150 text-5xl">🏠</div>
          <div className="absolute bottom-32 left-300 text-4xl">🏡</div>
          <div className="absolute bottom-32 right-300 text-5xl">🏰</div>

          {/* Forest Elements */}
          <div className="absolute top-20 left-50 text-6xl">🌲</div>
          <div className="absolute top-40 left-120 text-5xl">🌳</div>
          <div className="absolute top-30 right-80 text-6xl">🌲</div>
          <div className="absolute top-60 right-120 text-5xl">🌳</div>
          <div className="absolute bottom-80 left-200 text-4xl">🌲</div>
          <div className="absolute bottom-90 right-200 text-4xl">🌳</div>

          {/* Ground Details */}
          <div className="absolute bottom-60 left-80 text-3xl">🌸</div>
          <div className="absolute bottom-70 left-250 text-3xl">🌺</div>
          <div className="absolute bottom-65 right-180 text-3xl">🌸</div>
          <div className="absolute bottom-75 right-350 text-3xl">🌺</div>
          <div className="absolute bottom-50 left-400 text-2xl">🍄</div>
          <div className="absolute bottom-55 right-250 text-2xl">🍄</div>

          {/* Rocks and Terrain */}
          <div className="absolute bottom-45 left-150 text-3xl">🪨</div>
          <div className="absolute bottom-40 right-100 text-3xl">🪨</div>
          <div className="absolute bottom-35 left-500 text-2xl">🪨</div>
          <div className="absolute bottom-50 right-400 text-2xl">🪨</div>

          {/* Water Feature */}
          <div className="absolute bottom-30 left-600 text-4xl animate-pulse">💧</div>
          <div className="absolute bottom-25 left-620 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>💧</div>

          {/* NPCs */}
          {npcs.map(npc => (
            <div
              key={npc.id}
              className="absolute transition-all duration-200"
              style={{ left: `${npc.x}px`, top: `${npc.y}px` }}
            >
              <div className="text-4xl animate-bounce">{npc.emoji}</div>
              {nearbyNPC?.id === npc.id && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-black px-2 py-1 rounded text-xs whitespace-nowrap">
                  Press Q to talk
                </div>
              )}
            </div>
          ))}

          {/* Player Character */}
          <div 
            className="absolute transition-all duration-200 z-10"
            style={{ 
              left: `${playerPosition.x}px`, 
              top: `${playerPosition.y}px`,
              transform: facingDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
            }}
          >
            <div className="text-4xl">{getPlayerEmoji()}</div>
          </div>

          {/* Dialogue Box */}
          {showDialogue && currentNPC && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-blue-400 max-w-lg w-full mx-4">
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{currentNPC.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800 mb-2">{currentNPC.name}</div>
                  <p className="text-gray-700 mb-3">{currentNPC.dialogue[dialogueIndex]}</p>
                  <div className="text-sm text-gray-500 text-right">
                    Press Q to continue ({dialogueIndex + 1}/{currentNPC.dialogue.length})
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm">
            <div className="font-bold mb-1">Controls:</div>
            <div>WASD or Arrow keys to move</div>
            <div>Q to interact with NPCs</div>
            <div className="mt-2 text-yellow-300">Find NPCs and learn about Sieder!</div>
          </div>

          {/* Progress */}
          <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
            <div className="font-bold mb-1">NPCs Found:</div>
            <div>{npcs.filter(npc => {
              const distance = Math.sqrt(
                Math.pow(npc.x - playerPosition.x, 2) + Math.pow(npc.y - playerPosition.y, 2)
              );
              return distance < 100;
            }).length} / {npcs.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep the same export name for compatibility
export const MarioGame = RPGGame;
