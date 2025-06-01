
import React, { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const { toast } = useToast();

  const initializeMap = async () => {
    if (!mapboxToken) {
      toast({
        title: "Token necessário",
        description: "Por favor, insira seu token público do Mapbox.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Dinamically import mapbox-gl
      const mapboxgl = await import('mapbox-gl');
      
      if (!mapContainer.current) return;

      mapboxgl.default.accessToken = mapboxToken;
      
      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-47.0, -23.5], // São Paulo region
        zoom: 10
      });

      // Add navigation controls
      map.addControl(new mapboxgl.default.NavigationControl());

      // Add markers for example chacaras
      const chacaras = [
        { name: 'Chácara Vista Verde', coords: [-47.1, -23.4] },
        { name: 'Sítio do Sol', coords: [-47.2, -23.6] },
        { name: 'Chácara Recanto Feliz', coords: [-46.9, -23.5] }
      ];

      chacaras.forEach(chacara => {
        new mapboxgl.default.Marker({ color: '#10B981' })
          .setLngLat(chacara.coords)
          .setPopup(new mapboxgl.default.Popup().setHTML(`<h3>${chacara.name}</h3>`))
          .addTo(map);
      });

      setShowTokenInput(false);
      toast({
        title: "Mapa carregado!",
        description: "O mapa foi carregado com sucesso.",
      });

    } catch (error) {
      console.error('Erro ao carregar mapa:', error);
      toast({
        title: "Erro ao carregar mapa",
        description: "Verifique se o token está correto.",
        variant: "destructive"
      });
    }
  };

  if (showTokenInput) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <MapPin className="h-12 w-12 text-farm-blue-500 mx-auto" />
          <h3 className="text-lg font-semibold">Configurar Mapa</h3>
          <p className="text-gray-600 text-sm">
            Para exibir o mapa, você precisa inserir seu token público do Mapbox.
            <br />
            Obtenha em: <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-farm-blue-500 underline">mapbox.com</a>
          </p>
          <div className="max-w-md mx-auto space-y-3">
            <Input
              placeholder="Token público do Mapbox"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={initializeMap} className="w-full">
              <Navigation className="h-4 w-4 mr-2" />
              Carregar Mapa
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Localização das Chácaras</h3>
        <Button variant="outline" size="sm" onClick={() => setShowTokenInput(true)}>
          Reconfigurar
        </Button>
      </div>
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg border"
        style={{ minHeight: '400px' }}
      />
    </Card>
  );
}
