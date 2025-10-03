import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers, Navigation2, Coffee, WashingMachine, Flame, ArrowUpDown } from "lucide-react";
import { FloorPlan2D } from "./FloorPlan2D";
import { floorPlanData } from "@/data/floorPlanData";

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
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);

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
            <h2 className="font-semibold">Floor Map</h2>
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
      <div className="flex-1 relative overflow-hidden bg-background">
        <FloorPlan2D selectedRoom={selectedRoom} />
      </div>

      {/* Room selector */}
      <div className="absolute right-4 top-24 glass-effect rounded-xl p-3 max-h-[400px] overflow-y-auto w-48">
        <p className="text-xs font-medium mb-2">Select Room</p>
        <div className="space-y-1">
          {floorPlanData.rooms.map((room, index) => (
            <button
              key={index}
              onClick={() => setSelectedRoom(room.name)}
              className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                selectedRoom === room.name
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              {room.name.replace('\n', ' ')}
            </button>
          ))}
        </div>
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
