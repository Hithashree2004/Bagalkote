-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create ludo_rooms table for multiplayer games
CREATE TABLE public.ludo_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_code TEXT NOT NULL UNIQUE,
  host_user_id UUID NOT NULL,
  player_count INTEGER NOT NULL DEFAULT 1,
  max_players INTEGER NOT NULL DEFAULT 4,
  game_started BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ludo_game_state table for real-time game updates
CREATE TABLE public.ludo_game_state (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.ludo_rooms(id) ON DELETE CASCADE,
  game_data JSONB NOT NULL,
  current_turn TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ludo_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ludo_game_state ENABLE ROW LEVEL SECURITY;

-- Policies for ludo_rooms
CREATE POLICY "Anyone can view ludo rooms"
ON public.ludo_rooms
FOR SELECT
USING (true);

CREATE POLICY "Users can create ludo rooms"
ON public.ludo_rooms
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Host can update their ludo rooms"
ON public.ludo_rooms
FOR UPDATE
USING (true);

CREATE POLICY "Host can delete their ludo rooms"
ON public.ludo_rooms
FOR DELETE
USING (host_user_id = auth.uid());

-- Policies for ludo_game_state
CREATE POLICY "Anyone in room can view game state"
ON public.ludo_game_state
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert game state"
ON public.ludo_game_state
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update game state"
ON public.ludo_game_state
FOR UPDATE
USING (true);

-- Enable realtime
ALTER TABLE public.ludo_rooms REPLICA IDENTITY FULL;
ALTER TABLE public.ludo_game_state REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.ludo_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ludo_game_state;

-- Create trigger for updated_at
CREATE TRIGGER update_ludo_rooms_updated_at
BEFORE UPDATE ON public.ludo_rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ludo_game_state_updated_at
BEFORE UPDATE ON public.ludo_game_state
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();