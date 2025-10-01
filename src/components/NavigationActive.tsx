import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Camera, Map, Navigation, Phone, Volume2 } from "lucide-react";

interface NavigationActiveProps {
  destination: string;
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const STEPS = [
  { instruction: "Head north towards main corridor", distance: "20m" },
  { instruction: "Turn right at the water fountain", distance: "35m" },
  { instruction: "Take the stairs to 2nd floor", distance: "15m" },
  { instruction: "Continue straight for 50 meters", distance: "50m" },
  { instruction: "Turn left at the end of corridor", distance: "30m" },
  { instruction: "Destination on your right", distance: "10m" },
];

export const NavigationActive = ({ destination, onNavigate, onBack }: NavigationActiveProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalDistance = "160m";
  const estimatedTime = "3 min";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass-effect border-b border-border/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2">
            <Button 
              size="icon"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button 
              size="icon"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-1">{destination}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{totalDistance}</span>
            <span>•</span>
            <span>{estimatedTime}</span>
          </div>
        </div>
      </div>

      {/* Mini Map Preview */}
      <div className="relative h-48 bg-card border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        
        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
          {/* Simplified path */}
          <path 
            d="M 10 40 L 30 40 L 30 25 L 50 25 L 50 15 L 75 15" 
            stroke="hsl(var(--secondary))" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="3 2"
            className="ar-path-glow"
          />
          
          {/* Current position */}
          <circle cx="10" cy="40" r="3" fill="hsl(var(--primary))" className="animate-pulse-glow" />
          
          {/* Destination */}
          <circle cx="75" cy="15" r="3" fill="hsl(var(--accent))" className="animate-pulse-glow" />
        </svg>

        <Button 
          onClick={() => onNavigate('map')}
          size="sm"
          variant="outline"
          className="absolute top-3 right-3 glass-effect border-primary/50 hover:bg-primary/10"
        >
          <Map className="w-4 h-4 mr-2" />
          Full Map
        </Button>
      </div>

      {/* Current Step - Large */}
      <div className="p-4">
        <Card className="glass-effect border-primary/50 p-6 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
              <Navigation className="w-8 h-8 text-foreground" />
            </div>
            
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Step {currentStep + 1} of {STEPS.length}</p>
              <p className="text-xl font-bold mb-2">{STEPS[currentStep].instruction}</p>
              <p className="text-2xl text-secondary font-bold">{STEPS[currentStep].distance}</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            ></div>
          </div>
        </Card>
      </div>

      {/* Upcoming Steps */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <p className="text-sm text-muted-foreground mb-3">Upcoming steps</p>
        <div className="space-y-2">
          {STEPS.slice(currentStep + 1).map((step, idx) => (
            <Card key={idx} className="glass-effect p-3 border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-medium">
                  {currentStep + idx + 2}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{step.instruction}</p>
                  <p className="text-xs text-muted-foreground">{step.distance}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-effect border-t border-border/50">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => onNavigate('ar')}
            className="h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Camera className="w-5 h-5 mr-2" />
            Start AR
          </Button>
          
          <Button 
            onClick={() => setCurrentStep(Math.min(currentStep + 1, STEPS.length - 1))}
            variant="outline"
            className="h-14 border-primary/50 hover:bg-primary/10"
            disabled={currentStep === STEPS.length - 1}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};
