import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock, Sparkles, ArrowRight, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { floorPlanData } from "@/data/floorPlanData";

interface SearchDestinationProps {
  onNavigate: (screen: string, destination?: string) => void;
  onBack: () => void;
}

// Generate destinations from floor plan data
const DESTINATIONS = floorPlanData.rooms.map((room, index) => ({
  name: room.name.replace('\n', ' '),
  category: room.name.includes('LAB') ? 'Laboratory' : 
            room.name.includes('ADMIN') ? 'Administration' :
            room.name.includes('SEMINAR') ? 'Events' :
            room.name.includes('TOILET') ? 'Facilities' :
            room.name.includes('LIFT') || room.name.includes('EXIT') ? 'Navigation' :
            'General',
  floor: '2nd Floor',
  distance: `${Math.floor(Math.random() * 150) + 20}m`
}));

const RECENT = [
  DESTINATIONS[0]?.name || "Workshop",
  DESTINATIONS.find(d => d.name.includes('LOBBY'))?.name || "Lobby", 
  DESTINATIONS.find(d => d.name.includes('LAB'))?.name || "Lab"
].filter(Boolean);

export const SearchDestination = ({ onNavigate, onBack }: SearchDestinationProps) => {
  const [search, setSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const filteredDestinations = DESTINATIONS.filter(dest =>
    dest.name.toLowerCase().includes(search.toLowerCase()) ||
    dest.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectDestination = (destName: string) => {
    setSelectedDestination(destName);
    onNavigate('ar', destName);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass-effect border-b border-border/50 p-4 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="hover:bg-primary/10"
        >
          <X className="w-5 h-5" />
        </Button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rooms, facilities..."
            className="pl-10 bg-input border-border/50 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recent Searches */}
        {search === "" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {RECENT.map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearch(item)}
                  className="border-border/50 hover:bg-primary/10 hover:border-primary/50"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Destination List */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>{search ? 'Search Results' : 'Popular Destinations'}</span>
          </div>
          
          <div className="space-y-2">
            {filteredDestinations.map((dest) => (
              <Card
                key={dest.name}
                onClick={() => handleSelectDestination(dest.name)}
                className="glass-effect p-4 cursor-pointer hover:bg-card/80 transition-all border-border/50 hover:border-primary/50 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{dest.category}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{dest.floor}</span>
                        <span className="text-xs text-secondary font-medium">{dest.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
