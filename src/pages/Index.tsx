import { useState } from "react";
import { HomePage } from "@/components/HomePage";
import { SelectStartLocation } from "@/components/SelectStartLocation";
import { SearchDestination } from "@/components/SearchDestination";
import { MapView } from "@/components/MapView";
import { ARCameraView } from "@/components/ARCameraView";
import { NavigationActive } from "@/components/NavigationActive";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>("home");
  const [startLocation, setStartLocation] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("Lab 203");

  const handleNavigate = (screen: string, location?: string) => {
    setCurrentScreen(screen);
    if (location) {
      if (screen === "search") {
        setStartLocation(location);
      } else {
        setSelectedDestination(location);
      }
    }
  };

  const handleBack = () => {
    if (currentScreen === "ar") {
      setCurrentScreen("search");
    } else if (currentScreen === "map") {
      setCurrentScreen("selectStart");
    } else if (currentScreen === "navigation") {
      setCurrentScreen("search");
    } else if (currentScreen === "search") {
      setCurrentScreen("selectStart");
    } else {
      setCurrentScreen("home");
    }
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "home" && <HomePage onNavigate={handleNavigate} />}
      {currentScreen === "selectStart" && <SelectStartLocation onNavigate={handleNavigate} onBack={handleBack} />}
      {currentScreen === "search" && <SearchDestination onNavigate={handleNavigate} onBack={handleBack} startLocation={startLocation} />}
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
