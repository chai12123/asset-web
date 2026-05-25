import { useState, useEffect } from "react";
import List from "./components/List";
import Detail from "./components/Detail";
import Admin from "./components/Admin";
import { Property, ViewState } from "./types";
import { SEED_PROPERTIES } from "./data";

export default function App() {
  const [view, setView] = useState<ViewState>("list");
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("properties");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setProperties(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse properties from localStorage", e);
      }
    }
    // Seed on first load or if empty
    setProperties(SEED_PROPERTIES);
    localStorage.setItem("properties", JSON.stringify(SEED_PROPERTIES));
  }, []);

  const handlePropertiesChange = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem("properties", JSON.stringify(newProperties));
  };

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="font-sans antialiased text-charcoal selection:bg-gold/20 selection:text-navy">
      {view === "list" && (
        <List 
          properties={properties} 
          onPropertyClick={(id) => {
            setSelectedPropertyId(id);
            setView("detail");
            window.scrollTo(0, 0);
          }}
          onAdminClick={() => {
            setView("admin-pin");
            window.scrollTo(0, 0);
          }}
        />
      )}
      
      {view === "detail" && selectedProperty && (
        <Detail 
          property={selectedProperty} 
          onBack={() => {
            setView("list");
            setSelectedPropertyId(null);
            window.scrollTo(0, 0);
          }}
        />
      )}

      {(view === "admin-pin" || view === "admin-dashboard" || view === "admin-form") && (
        <Admin 
          properties={properties}
          onPropertiesChange={handlePropertiesChange}
          onExit={() => {
            setView("list");
            window.scrollTo(0, 0);
          }}
        />
      )}
    </div>
  );
}
