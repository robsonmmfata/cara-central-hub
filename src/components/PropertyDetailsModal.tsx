
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Users, Star, Wifi, Car, Utensils, Waves } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: number;
  nome: string;
  localizacao: string;
  preco: string;
  capacidade: string;
  rating: number;
  favorito: boolean;
  imagem: string;
  descricao?: string;
  comodidades?: string[];
}

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onFavorite: (propertyId: number) => void;
}

export function PropertyDetailsModal({ property, isOpen, onClose, onFavorite }: PropertyDetailsModalProps) {
  const { toast } = useToast();

  if (!isOpen || !property) return null;

  const handleReservar = () => {
    toast({
      title: "Reserva iniciada!",
      description: `Redirecionando para reserva de ${property.nome}`,
    });
    // Aqui você implementaria a lógica de reserva
  };

  const handleFavorite = () => {
    onFavorite(property.id);
    toast({
      title: property.favorito ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: property.nome,
    });
  };

  const comodidades = property.comodidades || ['Wi-Fi', 'Estacionamento', 'Cozinha', 'Piscina'];
  const icons = [Wifi, Car, Utensils, Waves];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{property.nome}</h2>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={property.imagem} 
                alt={property.nome}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{property.localizacao}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{property.capacidade}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{property.rating} (127 avaliações)</span>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Comodidades</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {comodidades.map((comodidade, index) => {
                      const IconComponent = icons[index] || Wifi;
                      return (
                        <div key={comodidade} className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-teal-500" />
                          <span className="text-sm">{comodidade}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="text-2xl font-bold text-teal-600 mb-2">{property.preco}</div>
                <Badge variant="secondary" className="mb-4">Disponível</Badge>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleReservar}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    Reservar Agora
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleFavorite}
                    className="w-full"
                  >
                    {property.favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Sobre a propriedade</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {property.descricao || 'Linda chácara com amplo espaço para eventos e confraternizações. Ambiente familiar e aconchegante, ideal para momentos especiais com quem você ama. Localizada em área privilegiada com fácil acesso.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
