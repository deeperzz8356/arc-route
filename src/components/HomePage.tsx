import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Map, Scan, Search } from "lucide-react";

interface HomePageProps {
  onNavigate: (screen: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full space-y-8">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.5)]">
            <Navigation className="w-12 h-12 text-foreground" />
          </div>
          <div className="absolute inset-0 w-24 h-24 bg-primary/20 rounded-3xl animate-ar-ping"></div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold neon-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ARNav
          </h1>
          <p className="text-lg text-muted-foreground">
            Navigate indoor spaces with AR precision
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="glass-effect rounded-2xl p-4 space-y-2 hover:bg-card/60 transition-all cursor-pointer">
            <Scan className="w-6 h-6 text-primary" />
            <p className="text-sm font-medium">AR Camera</p>
            <p className="text-xs text-muted-foreground">Real-time guidance</p>
          </div>
          
          <div className="glass-effect rounded-2xl p-4 space-y-2 hover:bg-card/60 transition-all cursor-pointer">
            <Map className="w-6 h-6 text-secondary" />
            <p className="text-sm font-medium">3D Maps</p>
            <p className="text-xs text-muted-foreground">Interactive floors</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={() => onNavigate('selectStart')}
            className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(147,51,234,0.4)]"
          >
            <Search className="mr-2 w-5 h-5" />
            Find Destination
          </Button>
          
          <Button 
            onClick={() => onNavigate('map')}
            variant="outline"
            className="w-full h-12 border-primary/50 hover:bg-muted"
          >
            <Map className="mr-2 w-5 h-5" />
            View Map
          </Button>
        </div>
      </div>
    </div>
  );
};
