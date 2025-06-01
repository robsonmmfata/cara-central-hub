
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function HelpChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('reserva')) {
      return 'Para questões sobre reservas, você pode verificar o status no menu "Reservas" ou entrar em contato pelo WhatsApp (11) 99999-9999.';
    } else if (input.includes('pagamento')) {
      return 'Para pagamentos, acesse o menu "Pagamentos" onde você pode ver todas as transações. Aceitamos PIX, cartão e transferência.';
    } else if (input.includes('problema') || input.includes('erro')) {
      return 'Descreva melhor o problema que você está enfrentando. Nossa equipe técnica está disponível 24h por dia.';
    } else if (input.includes('contato')) {
      return 'Você pode nos contatar por: WhatsApp: (11) 99999-9999, Email: suporte@chacara.com, ou telefone: (11) 3333-3333.';
    } else {
      return 'Entendi sua mensagem. Nossa equipe de suporte analisará sua solicitação. Enquanto isso, você pode verificar nossa central de ajuda ou entrar em contato pelos canais de atendimento.';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <MessageSquare className="h-12 w-12 text-farm-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Central de Ajuda</h2>
        <p className="text-gray-600">Tire suas dúvidas com nosso assistente virtual</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        {/* Chat Messages */}
        <div className="h-96 p-4 overflow-y-auto border-b">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-farm-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-farm-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <form onSubmit={sendMessage} className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-farm-blue-500 hover:bg-farm-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* Quick Actions */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">Suporte Técnico</h4>
            <p className="text-sm text-gray-600">24h por dia</p>
            <p className="text-sm font-medium text-farm-blue-600">(11) 3333-3333</p>
          </Card>
          
          <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">WhatsApp</h4>
            <p className="text-sm text-gray-600">Atendimento rápido</p>
            <p className="text-sm font-medium text-farm-blue-600">(11) 99999-9999</p>
          </Card>
          
          <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">E-mail</h4>
            <p className="text-sm text-gray-600">Suporte por e-mail</p>
            <p className="text-sm font-medium text-farm-blue-600">suporte@chacara.com</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
