import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers, Navigation2, ZoomIn, ZoomOut, Coffee, WashingMachine, Flame, ArrowUpDown } from "lucide-react";

interface MapViewProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const POI_ICONS: { [key: string]: any } = {
  cafeteria: Coffee,
  toilet: WashingMachine,
  exit: Flame,
  lift: ArrowUpDown,
};

const POIS = [
  { id: 1, type: "cafeteria", x: 20, y: 60, label: "Cafeteria" },
  { id: 2, type: "toilet", x: 70, y: 30, label: "Restroom" },
  { id: 3, type: "exit", x: 85, y: 70, label: "Emergency Exit" },
  { id: 4, type: "lift", x: 50, y: 45, label: "Elevator" },
];

export const MapView = ({ onNavigate, onBack }: MapViewProps) => {
  const [floor, setFloor] = useState(2);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass-effect border-b border-border/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold">3D Floor Map</h2>
            <p className="text-sm text-muted-foreground">Floor {floor}</p>
          </div>
        </div>
        
        <Button 
          onClick={() => onNavigate('ar')}
          size="sm"
          className="bg-gradient-to-r from-primary to-secondary"
        >
          <Navigation2 className="w-4 h-4 mr-2" />
          AR View
        </Button>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* 3D Map Mockup */}
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>

          {/* Floor plan mockup */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Main building outline */}
            <rect x="10" y="15" width="80" height="70" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="0.5" rx="2" />
            
            {/* Rooms */}
            <rect x="15" y="20" width="25" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" />
            <text x="27.5" y="32" fontSize="3" fill="hsl(var(--foreground))" textAnchor="middle">Lab 203</text>
            
            <rect x="45" y="20" width="20" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" />
            <text x="55" y="32" fontSize="3" fill="hsl(var(--foreground))" textAnchor="middle">Office</text>
            
            <rect x="70" y="20" width="15" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" />
            <text x="77.5" y="32" fontSize="3" fill="hsl(var(--foreground))" textAnchor="middle">Hall</text>
            
            <rect x="15" y="50" width="30" height="30" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" />
            <text x="30" y="67" fontSize="3" fill="hsl(var(--foreground))" textAnchor="middle">Auditorium</text>
            
            <rect x="50" y="50" width="35" height="30" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" />
            <text x="67.5" y="67" fontSize="3" fill="hsl(var(--foreground))" textAnchor="middle">Library</text>
            
            {/* Corridors */}
            <rect x="15" y="42" width="70" height="6" fill="hsl(var(--background))" opacity="0.5" />
            
            {/* Navigation path (animated) */}
            <path 
              d="M 50 10 L 50 30 L 70 30 L 70 65" 
              stroke="hsl(var(--secondary))" 
              strokeWidth="1.5" 
              fill="none"
              strokeDasharray="3 3"
              className="animate-path-animate ar-path-glow"
              style={{ strokeDashoffset: 1000 }}
            />
            
            {/* Current location */}
            <circle cx="50" cy="10" r="2" fill="hsl(var(--primary))" className="animate-pulse-glow" />
            <circle cx="50" cy="10" r="2" fill="hsl(var(--primary))" opacity="0.3" className="animate-ar-ping" />
            
            {/* Destination */}
            <circle cx="70" cy="65" r="2.5" fill="hsl(var(--accent))" className="animate-pulse-glow" />
          </svg>

          {/* POI Markers */}
          {POIS.map((poi) => {
            const Icon = POI_ICONS[poi.type];
            return (
              <div
                key={poi.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-card border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-xs bg-card px-2 py-1 rounded border border-border/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {poi.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-4 top-24 flex flex-col gap-2">
        <Button 
          size="icon"
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          className="glass-effect hover:bg-primary/20"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button 
          size="icon"
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          className="glass-effect hover:bg-primary/20"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Floor selector */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 glass-effect rounded-full p-2 flex items-center gap-2">
        <Layers className="w-4 h-4 text-muted-foreground" />
        {[1, 2, 3].map((f) => (
          <Button
            key={f}
            size="sm"
            variant={floor === f ? "default" : "ghost"}
            onClick={() => setFloor(f)}
            className={floor === f ? "bg-gradient-to-r from-primary to-secondary" : "hover:bg-primary/10"}
          >
            {f}F
          </Button>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-effect rounded-xl p-3 space-y-2">
        <p className="text-xs font-medium">Points of Interest</p>
        <div className="space-y-1">
          {Object.entries(POI_ICONS).map(([type, Icon]) => (
            <div key={type} className="flex items-center gap-2">
              <Icon className="w-3 h-3 text-primary" />
              <span className="text-xs capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
