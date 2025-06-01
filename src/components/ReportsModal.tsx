
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, FileText, BarChart3, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportsModal({ isOpen, onClose }: ReportsModalProps) {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const reports = [
    { id: 'clientes', name: 'Relatório de Clientes', icon: FileText },
    { id: 'reservas', name: 'Relatório de Reservas', icon: BarChart3 },
    { id: 'financeiro', name: 'Relatório Financeiro', icon: TrendingUp },
    { id: 'ocupacao', name: 'Relatório de Ocupação', icon: BarChart3 }
  ];

  const generateReport = () => {
    if (!selectedReport) {
      toast({
        title: "Erro",
        description: "Selecione um tipo de relatório.",
        variant: "destructive"
      });
      return;
    }

    console.log('Gerando relatório:', { selectedReport, dateRange });
    toast({
      title: "Relatório gerado!",
      description: `O relatório foi gerado e está sendo baixado.`,
    });
    
    // Simulação de download
    const link = document.createElement('a');
    link.download = `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.pdf`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Gerar Relatórios</h2>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de Relatório</label>
              <div className="space-y-2">
                {reports.map((report) => (
                  <div 
                    key={report.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedReport === report.id 
                        ? 'border-farm-blue-500 bg-farm-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <div className="flex items-center gap-3">
                      <report.icon className="h-5 w-5 text-farm-blue-500" />
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Data inicial</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Data final</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={generateReport} className="bg-farm-blue-500 hover:bg-farm-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
