import { useState, useEffect, useRef } from 'react';
import { Users, Plus, Key, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ParticleBackground from '@/components/ParticleBackground';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

type Room = {
  id: string;
  roomKey: string;
  roomName: string;
  roomPurpose: string;
  hostUserId: string;
  hostName: string;
  createdAt: string;
};

type Participant = {
  id: string;
  userId: string;
  userName: string;
  isHost: boolean;
  joinedAt: string;
};

type Message = {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
};

const ROOMS_STORAGE_KEY = 'study_rooms';
const CURRENT_ROOM_KEY = 'current_room_session';

const Rooms = () => {
  const { t } = useLanguage();
  const [roomKey, setRoomKey] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomPurpose, setRoomPurpose] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [inRoom, setInRoom] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [currentRoomData, setCurrentRoomData] = useState<Room | null>(null);
  const [generatedKey, setGeneratedKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem(CURRENT_ROOM_KEY);
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setCurrentUserId(session.userId);
        setCurrentRoomData(session.room);
        setRoomName(session.room.roomName);
        setRoomPurpose(session.room.roomPurpose);
        setRoomKey(session.room.roomKey);
        loadRoomData(session.room.id);
        setInRoom(true);
      } catch (error) {
        console.error('Error loading session:', error);
        localStorage.removeItem(CURRENT_ROOM_KEY);
      }
    }
  }, []);

  // Poll for updates when in a room
  useEffect(() => {
    if (inRoom && currentRoomData) {
      pollIntervalRef.current = setInterval(() => {
        loadRoomData(currentRoomData.id);
      }, 2000); // Poll every 2 seconds

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      };
    }
  }, [inRoom, currentRoomData]);

  const getAllRooms = (): Record<string, any> => {
    const roomsData = localStorage.getItem(ROOMS_STORAGE_KEY);
    return roomsData ? JSON.parse(roomsData) : {};
  };

  const saveRoom = (roomId: string, roomData: any) => {
    const allRooms = getAllRooms();
    allRooms[roomId] = roomData;
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(allRooms));
  };

  const loadRoomData = (roomId: string) => {
    const allRooms = getAllRooms();
    const room = allRooms[roomId];
    if (room) {
      setParticipants(room.participants || []);
      setMessages(room.messages || []);
    }
  };

  const generateRandomKey = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generateRoomKey = () => {
    if (!roomName.trim() || !roomPurpose.trim()) {
      toast.error('Please enter room name and purpose');
      return;
    }

    const key = generateRandomKey();
    const userId = Math.random().toString(36).substring(2, 15);
    const roomId = Math.random().toString(36).substring(2, 15);

    const room: Room = {
      id: roomId,
      roomKey: key,
      roomName: roomName.trim(),
      roomPurpose: roomPurpose.trim(),
      hostUserId: userId,
      hostName: 'You (Host)',
      createdAt: new Date().toISOString()
    };

    const hostParticipant: Participant = {
      id: Math.random().toString(36).substring(2, 15),
      userId: userId,
      userName: 'You (Host)',
      isHost: true,
      joinedAt: new Date().toISOString()
    };

    const welcomeMessage: Message = {
      id: 'welcome',
      userId: 'system',
      userName: 'System',
      content: `Welcome to "${roomName}"! Share the room key: ${key}`,
      timestamp: new Date().toISOString()
    };

    const roomData = {
      room,
      participants: [hostParticipant],
      messages: [welcomeMessage]
    };

    saveRoom(roomId, roomData);

    // Save current session
    localStorage.setItem(CURRENT_ROOM_KEY, JSON.stringify({
      userId,
      room
    }));

    setRoomKey(key);
    setGeneratedKey(key);
    setCurrentUserId(userId);
    setCurrentRoomData(room);
    setParticipants([hostParticipant]);
    setMessages([welcomeMessage]);
    setInRoom(true);
    
    toast.success(`Room "${roomName}" created with key: ${key}`);
  };

  const joinRoom = () => {
    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!roomKey.trim()) {
      toast.error('Please enter a room key');
      return;
    }

    const allRooms = getAllRooms();
    const roomEntry = Object.entries(allRooms).find(
      ([_, data]: [string, any]) => data.room.roomKey === roomKey.toUpperCase()
    );

    if (!roomEntry) {
      toast.error('Room not found. Please check the room key.');
      return;
    }

    const [roomId, roomData] = roomEntry;
    const room = roomData.room;
    const userId = Math.random().toString(36).substring(2, 15);

    const newParticipant: Participant = {
      id: Math.random().toString(36).substring(2, 15),
      userId: userId,
      userName: userName.trim(),
      isHost: false,
      joinedAt: new Date().toISOString()
    };

    const joinMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      userId: 'system',
      userName: 'System',
      content: `${userName.trim()} joined the room`,
      timestamp: new Date().toISOString()
    };

    const updatedRoomData = {
      ...roomData,
      participants: [...roomData.participants, newParticipant],
      messages: [...roomData.messages, joinMessage]
    };

    saveRoom(roomId, updatedRoomData);

    // Save current session
    localStorage.setItem(CURRENT_ROOM_KEY, JSON.stringify({
      userId,
      room
    }));

    setCurrentUserId(userId);
    setCurrentRoomData(room);
    setRoomName(room.roomName);
    setRoomPurpose(room.roomPurpose);
    setParticipants(updatedRoomData.participants);
    setMessages(updatedRoomData.messages);
    setInRoom(true);
    
    toast.success('Joined room successfully!');
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentRoomData) return;

    const currentParticipant = participants.find(p => p.userId === currentUserId);
    const displayName = currentParticipant?.userName.replace(' (You)', '') || 'You';

    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      userId: currentUserId,
      userName: displayName,
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    const allRooms = getAllRooms();
    const roomData = allRooms[currentRoomData.id];
    
    if (roomData) {
      roomData.messages = [...roomData.messages, newMessage];
      saveRoom(currentRoomData.id, roomData);
      setMessages(roomData.messages);
    }

    setMessage('');
  };

  const leaveRoom = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    localStorage.removeItem(CURRENT_ROOM_KEY);
    setInRoom(false);
    setShowCreateForm(false);
    setRoomName('');
    setRoomPurpose('');
    setRoomKey('');
    setGeneratedKey('');
    setUserName('');
    setMessages([]);
    setParticipants([]);
    setCurrentUserId('');
    setCurrentRoomData(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />
      
      <div 
        className="fixed bottom-[25%] left-[33%] w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.6) 0%, rgba(0, 217, 255, 0.4) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div 
        className="fixed top-[20%] right-[25%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              Study Rooms
            </h1>
            <p className="text-muted-foreground">Learn together, grow together</p>
          </div>

          {!inRoom ? (
            /* Join/Create Room */
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="rounded-3xl bg-card border border-primary/30 p-8 glow-pink">
                <div className="space-y-6">
                  <div className="text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Create a Room
                    </h2>
                    <p className="text-muted-foreground">
                      Enter room details and start your study session
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomName">Room Name</Label>
                      <Input
                        id="roomName"
                        type="text"
                        placeholder="e.g., Math Study Group"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="roomPurpose">Purpose</Label>
                      <Input
                        id="roomPurpose"
                        type="text"
                        placeholder="e.g., Prepare for final exam"
                        value={roomPurpose}
                        onChange={(e) => setRoomPurpose(e.target.value)}
                        className="bg-input border-primary/30 focus:border-primary glow-pink rounded-xl"
                      />
                    </div>

                    <Button
                      onClick={generateRoomKey}
                      className="w-full bg-gradient-to-r from-primary to-accent py-6 text-lg glow-pink hover:scale-105 transition-all"
                      size="lg"
                    >
                      <Key className="w-5 h-5 mr-2" />
                      Generate Room Key
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center text-muted-foreground">OR</div>

              <div className="rounded-3xl bg-card border border-secondary/30 p-8 glow-blue">
                <div className="space-y-6">
                  <div className="text-center">
                    <Key className="w-16 h-16 mx-auto mb-4 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Join a Room
                    </h2>
                    <p className="text-muted-foreground">
                      Enter a room key to join an existing study session
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userName">{t('yourName')}</Label>
                      <Input
                        id="userName"
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-input border-secondary/30 focus:border-secondary rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="roomKey">{t('roomKey')}</Label>
                      <Input
                        id="roomKey"
                        type="text"
                        placeholder="Enter room key"
                        value={roomKey}
                        onChange={(e) => setRoomKey(e.target.value.toUpperCase())}
                        className="text-center text-2xl font-bold tracking-widest bg-input border-secondary/30 focus:border-secondary rounded-xl py-6"
                        maxLength={6}
                      />
                    </div>

                    <Button
                      onClick={joinRoom}
                      className="w-full bg-secondary hover:bg-secondary/90 py-6 text-lg glow-blue hover:scale-105 transition-all"
                      size="lg"
                    >
                      Join Room
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Inside Room */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Chat Area */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-3xl bg-card border border-primary/30 p-6 glow-pink">
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-card/50 rounded-xl border border-primary/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Room Name</p>
                          <p className="text-xl font-bold gradient-text">{roomName}</p>
                        </div>
                        <Button
                          onClick={leaveRoom}
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive/10"
                        >
                          Leave Room
                        </Button>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Purpose</p>
                        <p className="text-sm text-foreground">{roomPurpose}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Room Key</p>
                        <p className="text-2xl font-bold text-primary tracking-widest">{roomKey}</p>
                      </div>
                      {currentRoomData && (
                        <div>
                          <p className="text-sm text-muted-foreground">Created By</p>
                          <p className="text-sm text-foreground">{currentRoomData.hostName}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-4 h-96 overflow-y-auto mb-4 p-4 rounded-xl bg-input">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          msg.userId === 'system'
                            ? 'bg-gray-500'
                            : msg.userId === currentUserId
                              ? 'bg-primary'
                              : 'bg-secondary'
                        }`}>
                          {msg.userId === 'system' ? 'S' : msg.userName[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-foreground">{msg.userName}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className={`p-3 rounded-lg border ${
                            msg.userId === currentUserId
                              ? 'bg-primary/10 border-primary/30 ml-auto max-w-[80%]'
                              : msg.userId === 'system'
                                ? 'bg-gray-100 border-gray-300 italic'
                                : 'bg-card border-primary/20'
                          }`}>
                            <p className="text-foreground">{msg.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 bg-input border-primary/30 focus:border-primary rounded-xl"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="bg-gradient-to-r from-primary to-accent glow-pink rounded-xl"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </div>

              {/* Members Sidebar */}
              <div className="space-y-6">
                <div className="rounded-3xl bg-card border border-secondary/30 p-6 glow-blue">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-secondary" />
                    {t('members')}
                  </h3>
                  <div className="space-y-3">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3 p-3 rounded-xl bg-input">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          participant.isHost ? 'bg-accent' : 'bg-primary'
                        }`}>
                          {participant.userName[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-foreground flex items-center gap-2">
                            {participant.userName}
                            {participant.isHost && (
                              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                                Host
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-green-400 flex items-center gap-1">
                            <span>●</span>
                            Online
                            {participant.userId === currentUserId && (
                              <span className="text-xs text-muted-foreground">(You)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;