
import { Phone, Calendar, DollarSign } from "lucide-react";

interface Client {
  id: string;
  name: string;
  phone: string;
  reservations: number;
  totalSpent: number;
  status: 'VIP' | 'Regular' | 'Bloqueado';
  avatar?: string;
}

interface ClientCardProps {
  client: Client;
  onClick?: () => void;
}

export function ClientCard({ client, onClick }: ClientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Regular':
        return 'bg-farm-blue-100 text-farm-blue-800 border-farm-blue-200';
      case 'Bloqueado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-farm-blue-500 to-farm-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {getInitials(client.name)}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{client.name}</h3>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{client.phone}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
              {client.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-600">Reservas</p>
                <p className="font-semibold text-gray-900">{client.reservations}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-600">Total</p>
                <p className="font-semibold text-farm-green-600">
                  R$ {client.totalSpent.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
