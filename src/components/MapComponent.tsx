
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockChacaras = [
  {
    id: 1,
    nome: "Chácara Vista Verde",
    localizacao: "Atibaia, SP",
    coordinates: [-46.5509, -23.1167] as [number, number],
    disponivel: true,
    preco: "R$ 350/dia"
  },
  {
    id: 2,
    nome: "Sítio do Sol",
    localizacao: "Ibiúna, SP", 
    coordinates: [-47.2233, -23.6567] as [number, number],
    disponivel: true,
    preco: "R$ 280/dia"
  },
  {
    id: 3,
    nome: "Chácara Recanto Feliz",
    localizacao: "Mairiporã, SP",
    coordinates: [-46.5867, -23.3167] as [number, number],
    disponivel: false,
    preco: "R$ 420/dia"
  }
];

export function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-46.6333, -23.5505],
      zoom: 9
    });

    // Adicionar marcadores para cada chácara
    mockChacaras.forEach((chacara) => {
      const marker = new mapboxgl.Marker({
        color: chacara.disponivel ? '#10B981' : '#EF4444'
      })
        .setLngLat(chacara.coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${chacara.nome}</h3>
              <p class="text-sm text-gray-600">${chacara.localizacao}</p>
              <p class="text-sm font-medium">${chacara.preco}</p>
              <p class="text-xs ${chacara.disponivel ? 'text-green-600' : 'text-red-600'}">
                ${chacara.disponivel ? 'Disponível' : 'Ocupada'}
              </p>
            </div>
          `)
        );

      if (map.current) {
        marker.addTo(map.current);
      }
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setShowTokenInput(false);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Configurar Mapbox</h3>
        <p className="text-sm text-gray-600 mb-4">
          Para visualizar o mapa, insira seu token público do Mapbox. 
          Você pode obtê-lo em <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="Token público do Mapbox"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            type="password"
          />
          <Button onClick={initializeMap} disabled={!mapboxToken}>
            Carregar Mapa
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{mockChacaras.filter(c => c.disponivel).length}</p>
            <p className="text-sm text-gray-600">Disponíveis</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{mockChacaras.filter(c => !c.disponivel).length}</p>
            <p className="text-sm text-gray-600">Ocupadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{mockChacaras.length}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">85%</p>
            <p className="text-sm text-gray-600">Ocupação</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div ref={mapContainer} className="w-full h-96 rounded-lg" />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Legenda</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm">Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm">Ocupada</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
