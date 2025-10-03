import { useState } from "react";
import { HomePage } from "@/components/HomePage";
import { SearchDestination } from "@/components/SearchDestination";
import { MapView } from "@/components/MapView";
import { ARCameraView } from "@/components/ARCameraView";
import { NavigationActive } from "@/components/NavigationActive";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>("home");
  const [selectedDestination, setSelectedDestination] = useState<string>("Lab 203");

  const handleNavigate = (screen: string, destination?: string) => {
    setCurrentScreen(screen);
    if (destination) {
      setSelectedDestination(destination);
    }
  };

  const handleBack = () => {
    if (currentScreen === "ar") {
      setCurrentScreen("search");
    } else if (currentScreen === "map") {
      setCurrentScreen("search");
    } else if (currentScreen === "navigation") {
      setCurrentScreen("search");
    } else {
      setCurrentScreen("home");
    }
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "home" && <HomePage onNavigate={handleNavigate} />}
      {currentScreen === "search" && <SearchDestination onNavigate={handleNavigate} onBack={handleBack} />}
      {currentScreen === "map" && <MapView onNavigate={handleNavigate} onBack={handleBack} />}
      {currentScreen === "ar" && <ARCameraView destination={selectedDestination} onBack={handleBack} />}
      {currentScreen === "navigation" && (
        <NavigationActive 
          destination={selectedDestination} 
          onNavigate={handleNavigate} 
          onBack={handleBack} 
        />
      )}
    </div>
  );
};

export default Index;
