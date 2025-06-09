
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Reservation {
  id: string;
  propertyId: string;
  propertyName: string;
  clientName: string;
  clientEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'confirmada' | 'pendente' | 'cancelada';
  paymentStatus: 'pago' | 'pendente' | 'atrasado';
  createdAt: string;
  userId?: string;
}

export interface Payment {
  id: string;
  reservationId: string;
  client: string;
  property: string;
  amount: number;
  status: 'pendente' | 'pago' | 'atrasado';
  dueDate: string;
  paymentDate?: string;
  method?: string;
}

interface ReservationContextType {
  reservations: Reservation[];
  payments: Payment[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => string;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  confirmPayment: (paymentId: string) => void;
  getCurrentReservation: () => Reservation | null;
  setCurrentReservation: (reservation: Reservation | null) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const mockInitialReservations: Reservation[] = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'Chácara Vista Verde',
    clientName: 'João Silva',
    clientEmail: 'joao@email.com',
    checkIn: '2024-12-15',
    checkOut: '2024-12-17',
    guests: 8,
    totalAmount: 1200,
    status: 'confirmada',
    paymentStatus: 'pago',
    createdAt: '2024-12-01',
    userId: '2'
  },
  {
    id: '2',
    propertyId: '2',
    propertyName: 'Sítio do Sol',
    clientName: 'Maria Santos',
    clientEmail: 'maria@email.com',
    checkIn: '2024-12-22',
    checkOut: '2024-12-24',
    guests: 6,
    totalAmount: 800,
    status: 'pendente',
    paymentStatus: 'pendente',
    createdAt: '2024-12-02',
    userId: '3'
  },
  {
    id: '3',
    propertyId: '1',
    propertyName: 'Chácara Recanto Feliz',
    clientName: 'Carlos Oliveira',
    clientEmail: 'carlos@email.com',
    checkIn: '2024-12-20',
    checkOut: '2024-12-22',
    guests: 12,
    totalAmount: 950,
    status: 'confirmada',
    paymentStatus: 'atrasado',
    createdAt: '2024-12-03',
    userId: '2'
  }
];

const mockInitialPayments: Payment[] = [
  {
    id: '1',
    reservationId: '1',
    client: 'João Silva',
    property: 'Chácara Vista Verde',
    amount: 1200,
    status: 'pago',
    dueDate: '2024-03-15',
    paymentDate: '2024-03-14',
    method: 'PIX'
  },
  {
    id: '2',
    reservationId: '2',
    client: 'Maria Santos',
    property: 'Sítio do Sol',
    amount: 800,
    status: 'pendente',
    dueDate: '2024-04-05'
  },
  {
    id: '3',
    reservationId: '3',
    client: 'Carlos Oliveira',
    property: 'Chácara Recanto Feliz',
    amount: 950,
    status: 'atrasado',
    dueDate: '2024-03-20'
  }
];

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : mockInitialReservations;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('payments');
    return saved ? JSON.parse(saved) : mockInitialPayments;
  });

  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(() => {
    const saved = localStorage.getItem('currentReservation');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    if (currentReservation) {
      localStorage.setItem('currentReservation', JSON.stringify(currentReservation));
    } else {
      localStorage.removeItem('currentReservation');
    }
  }, [currentReservation]);

  const addReservation = (reservationData: Omit<Reservation, 'id' | 'createdAt'>) => {
    const id = Date.now().toString();
    const newReservation: Reservation = {
      ...reservationData,
      id,
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [...prev, newReservation]);

    // Criar pagamento correspondente
    const newPayment: Payment = {
      id: `payment_${id}`,
      reservationId: id,
      client: reservationData.clientName,
      property: reservationData.propertyName,
      amount: reservationData.totalAmount,
      status: 'pendente',
      dueDate: reservationData.checkIn
    };

    setPayments(prev => [...prev, newPayment]);
    return id;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
  };

  const confirmPayment = (paymentId: string) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: 'pago' as const, 
            paymentDate: new Date().toISOString().split('T')[0], 
            method: 'PIX' 
          }
        : payment
    ));

    // Atualizar status do pagamento na reserva correspondente
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      setReservations(prev => prev.map(res => 
        res.id === payment.reservationId 
          ? { ...res, paymentStatus: 'pago' as const }
          : res
      ));
    }
  };

  const getCurrentReservation = () => currentReservation;

  return (
    <ReservationContext.Provider value={{
      reservations,
      payments,
      addReservation,
      updateReservationStatus,
      confirmPayment,
      getCurrentReservation,
      setCurrentReservation
    }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
}
