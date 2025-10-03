import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX, Navigation, MapPin, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CameraView } from "./CameraView";
import { floorPlanData } from "@/data/floorPlanData";
import { toast } from "sonner";

interface ARCameraViewProps {
  destination?: string;
  onBack: () => void;
}

export const ARCameraView = ({ destination = "ENTRANCE\nLOBBY", onBack }: ARCameraViewProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [distance, setDistance] = useState(85);
  const [direction, setDirection] = useState("Walk straight ahead");
  const [cameraReady, setCameraReady] = useState(false);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [targetBearing, setTargetBearing] = useState(0);
  const [userPosition, setUserPosition] = useState({ x: 5, y: 5 });

  // Find destination coordinates and calculate bearing
  useEffect(() => {
    const room = floorPlanData.rooms.find(r => r.name === destination);
    if (room) {
      const centerX = room.points.reduce((sum, p) => sum + p[0], 0) / room.points.length;
      const centerY = room.points.reduce((sum, p) => sum + p[1], 0) / room.points.length;
      
      // Calculate bearing from user to destination
      const dx = centerX - userPosition.x;
      const dy = centerY - userPosition.y;
      let bearing = Math.atan2(dx, -dy) * (180 / Math.PI);
      if (bearing < 0) bearing += 360;
      setTargetBearing(bearing);
      
      // Calculate distance
      const dist = Math.sqrt(dx * dx + dy * dy);
      setDistance(Math.round(dist * 2));
    }
  }, [destination, userPosition]);

  // Request device orientation permission and track compass heading
  useEffect(() => {
    const requestOrientation = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission !== 'granted') {
            toast.error('Device orientation permission denied');
          }
        } catch (error) {
          console.error('Error requesting device orientation:', error);
        }
      }
    };

    requestOrientation();

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Alpha gives us the compass heading (0-360)
        // Adjust for device calibration
        const heading = 360 - event.alpha;
        setDeviceHeading(heading);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // Update navigation instructions and simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate relative bearing (where to turn)
      const relativeBearing = (targetBearing - deviceHeading + 360) % 360;
      
      // Update instruction based on relative bearing
      if (distance < 5) {
        setDirection("You've arrived at your destination!");
        if (!isMuted && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance("You have arrived");
          speechSynthesis.speak(utterance);
        }
      } else if (relativeBearing < 30 || relativeBearing > 330) {
        setDirection("Walk straight ahead");
      } else if (relativeBearing >= 30 && relativeBearing < 150) {
        setDirection("Turn right and continue");
      } else if (relativeBearing >= 150 && relativeBearing < 210) {
        setDirection("Turn around");
      } else {
        setDirection("Turn left and continue");
      }

      // Simulate gradual movement towards destination
      setUserPosition(prev => {
        const room = floorPlanData.rooms.find(r => r.name === destination);
        if (room) {
          const centerX = room.points.reduce((sum, p) => sum + p[0], 0) / room.points.length;
          const centerY = room.points.reduce((sum, p) => sum + p[1], 0) / room.points.length;
          const dx = centerX - prev.x;
          const dy = centerY - prev.y;
          return {
            x: prev.x + dx * 0.03,
            y: prev.y + dy * 0.03
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetBearing, deviceHeading, distance, isMuted, destination]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Real camera feed */}
      <CameraView onCameraReady={() => setCameraReady(true)} />

      {/* AR Overlays */}
      <div className="absolute inset-0">
        {/* Direction Arrow - Rotates to point to destination */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div 
            className="relative w-40 h-40 transition-transform duration-500 ease-out"
            style={{
              transform: `rotate(${(targetBearing - deviceHeading + 360) % 360}deg)`
            }}
          >
            {/* Main arrow pointing up (north) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowUp 
                className="w-32 h-32 text-primary"
                strokeWidth={3}
                style={{
                  filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.8))'
                }}
              />
            </div>
            
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 animate-ping opacity-60">
              <ArrowUp 
                className="w-32 h-32 text-primary m-4"
                strokeWidth={2}
              />
            </div>
            
            {/* Distance indicator */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card/90 px-3 py-1 rounded-full border border-primary/50 whitespace-nowrap">
              <span className="text-sm font-semibold text-primary">{distance}m</span>
            </div>
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
          <Card className="glass-effect px-4 py-2 border-primary/50 shadow-lg bg-card/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary animate-pulse-glow" />
              <div>
                <p className="text-sm font-semibold">{destination.replace('\n', ' ')}</p>
                <p className="text-xs text-muted-foreground">{distance}m ahead</p>
              </div>
            </div>
          </Card>
        </div>

        {/* POI markers from floor plan */}
        {['TOILET\nGENTS', 'LIFT', 'FIRE\nEXIT'].map((poi, index) => (
          <div 
            key={poi}
            className="absolute animate-float" 
            style={{ 
              top: `${30 + index * 15}%`, 
              left: `${20 + index * 20}%`,
              animationDelay: `${index * 0.3}s` 
            }}
          >
            <div className="w-3 h-3 rounded-full bg-accent shadow-lg animate-pulse-glow"></div>
            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs bg-card/90 px-2 py-1 rounded border border-border whitespace-nowrap">
              {poi.replace('\n', ' ')}
            </span>
          </div>
        ))}
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
