import { useState } from "react";
import { Search, MapPin, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { floorPlanData } from "@/data/floorPlanData";

interface SelectStartLocationProps {
  onNavigate: (screen: string, startLocation?: string) => void;
  onBack: () => void;
}

const START_LOCATIONS = floorPlanData.rooms.map(room => ({
  name: room.name.replace('\n', ' '),
  category: room.name.includes('LAB') ? 'Laboratory' : 
            room.name.includes('ADMIN') ? 'Administration' :
            room.name.includes('SEMINAR') ? 'Events' :
            room.name.includes('TOILET') ? 'Facilities' :
            room.name.includes('LIFT') || room.name.includes('EXIT') ? 'Navigation' :
            'General',
  floor: 2,
}));

export const SelectStartLocation = ({ onNavigate, onBack }: SelectStartLocationProps) => {
  const [search, setSearch] = useState("");

  const filteredLocations = START_LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(search.toLowerCase()) ||
    location.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectLocation = (locationName: string) => {
    onNavigate("search", locationName);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Where are you now?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {search ? "Search Results" : "Select Your Current Location"}
          </h2>
          <div className="space-y-2">
            {filteredLocations.map((location) => (
              <Card
                key={location.name}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSelectLocation(location.name)}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {location.category} • Floor {location.floor}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
