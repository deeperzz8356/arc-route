import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX, Navigation, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ARCameraViewProps {
  destination?: string;
  onBack: () => void;
}

export const ARCameraView = ({ destination = "Lab 203", onBack }: ARCameraViewProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [distance, setDistance] = useState(85);
  const [direction, setDirection] = useState("Turn right ahead");

  useEffect(() => {
    // Simulate distance decreasing
    const interval = setInterval(() => {
      setDistance(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Camera feed simulation (gradient background) */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Simulated camera feed overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* AR Overlays */}
      <div className="absolute inset-0">
        {/* Direction arrows - animated */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Main arrow */}
            <svg width="200" height="300" className="animate-float">
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Arrow shaft */}
              <rect x="90" y="100" width="20" height="150" fill="url(#arrowGradient)" filter="url(#glow)" rx="10" />
              
              {/* Arrow head */}
              <polygon points="100,80 60,120 100,110 140,120" fill="url(#arrowGradient)" filter="url(#glow)" />
              
              {/* Pulsing rings */}
              <circle cx="100" cy="180" r="30" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" opacity="0.5" className="animate-ar-ping" />
              <circle cx="100" cy="180" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5" className="animate-ar-ping" style={{ animationDelay: '0.5s' }} />
            </svg>
          </div>
        </div>

        {/* Path line on floor */}
        <svg className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M 50% 100% L 50% 0%"
            stroke="url(#pathGradient)"
            strokeWidth="40"
            fill="none"
            strokeDasharray="20 10"
            className="animate-path-animate ar-path-glow"
            style={{ strokeDashoffset: 1000 }}
          />
        </svg>

        {/* Floating label at destination */}
        <div className="absolute top-1/4 right-1/4 animate-float">
          <Card className="glass-effect px-4 py-2 border-primary/50 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary animate-pulse-glow" />
              <div>
                <p className="text-sm font-semibold">{destination}</p>
                <p className="text-xs text-secondary">{distance}m ahead</p>
              </div>
            </div>
          </Card>
        </div>

        {/* POI markers in view */}
        <div className="absolute top-1/3 left-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse-glow"></div>
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs bg-card/80 px-2 py-1 rounded border border-accent/50 whitespace-nowrap">
            Cafeteria
          </span>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="glass-effect hover:bg-card/80"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Card className="glass-effect px-4 py-2 border-primary/30">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-medium">AR Navigation Active</span>
            </div>
          </Card>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="glass-effect hover:bg-card/80"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-primary" />}
          </Button>
        </div>
      </div>

      {/* Bottom instruction card */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <Card className="glass-effect border-primary/30 p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
              <Navigation className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <p className="text-lg font-semibold mb-1">{direction}</p>
              <p className="text-sm text-muted-foreground">
                Continue for {distance}m to reach {destination}
              </p>
              
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 rounded-full"
                    style={{ width: `${Math.max(10, 100 - distance)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">{distance}m</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
