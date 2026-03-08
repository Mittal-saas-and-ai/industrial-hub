import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  className?: string;
}

export function VoiceSearch({ onResult, className }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error('Voice search is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      if (event.results[0].isFinal) {
        onResult(transcript);
        setIsListening(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        toast.error('Microphone access denied. Please allow microphone permissions.');
      } else {
        toast.error('Voice recognition failed. Please try again.');
      }
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  }, [onResult]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'relative transition-all',
        isListening && 'border-destructive bg-destructive/10 text-destructive animate-pulse',
        className
      )}
      onClick={isListening ? stopListening : startListening}
      title={isListening ? 'Stop listening' : 'Voice search'}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
      {isListening && (
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive animate-ping" />
      )}
    </Button>
  );
}
