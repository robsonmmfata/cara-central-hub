
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, FileText, BarChart3, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportGenerated?: (reportData: any) => void;
}

export function ReportsModal({ isOpen, onClose, onReportGenerated }: ReportsModalProps) {
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

  const generateReportData = (type: string) => {
    const baseData = {
      clientes: {
        total: 45,
        novos: 12,
        vip: 8,
        regulares: 35,
        bloqueados: 2,
        detalhes: [
          { nome: 'João Silva', tipo: 'VIP', cadastro: '2024-01-15', reservas: 5 },
          { nome: 'Maria Santos', tipo: 'Regular', cadastro: '2024-02-20', reservas: 2 },
          { nome: 'Carlos Oliveira', tipo: 'VIP', cadastro: '2024-03-10', reservas: 8 }
        ]
      },
      reservas: {
        total: 123,
        pendentes: 15,
        confirmadas: 95,
        canceladas: 13,
        receita: 45600,
        detalhes: [
          { cliente: 'João Silva', chacara: 'Vista Verde', data: '2024-04-15', valor: 1200, status: 'Confirmada' },
          { cliente: 'Maria Santos', chacara: 'Sítio do Sol', data: '2024-04-20', valor: 800, status: 'Pendente' }
        ]
      },
      financeiro: {
        receita: 78950,
        despesas: 23400,
        lucro: 55550,
        pagamentosRecebidos: 89,
        pagamentosPendentes: 12,
        detalhes: [
          { tipo: 'Receita', descricao: 'Reservas', valor: 78950 },
          { tipo: 'Despesa', descricao: 'Manutenção', valor: 15600 },
          { tipo: 'Despesa', descricao: 'Marketing', valor: 7800 }
        ]
      },
      ocupacao: {
        taxaOcupacao: 85,
        chacarasDisponiveis: 3,
        chacarasOcupadas: 17,
        totalChacaras: 20,
        detalhes: [
          { chacara: 'Vista Verde', ocupacao: 95, dias: 28 },
          { chacara: 'Sítio do Sol', ocupacao: 78, dias: 23 },
          { chacara: 'Recanto Feliz', ocupacao: 82, dias: 24 }
        ]
      }
    };
    return baseData[type as keyof typeof baseData];
  };

  const generatePDFContent = (reportType: string, data: any) => {
    let content = `RELATÓRIO ${reportType.toUpperCase()}\n`;
    content += `Período: ${dateRange.start || 'Início'} a ${dateRange.end || 'Hoje'}\n`;
    content += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`;
    
    switch (reportType) {
      case 'clientes':
        content += `RESUMO:\n`;
        content += `Total de Clientes: ${data.total}\n`;
        content += `Novos Clientes: ${data.novos}\n`;
        content += `Clientes VIP: ${data.vip}\n`;
        content += `Clientes Regulares: ${data.regulares}\n`;
        content += `Clientes Bloqueados: ${data.bloqueados}\n\n`;
        content += `DETALHES:\n`;
        data.detalhes.forEach((cliente: any, index: number) => {
          content += `${index + 1}. ${cliente.nome} - ${cliente.tipo} - Cadastro: ${cliente.cadastro} - Reservas: ${cliente.reservas}\n`;
        });
        break;
        
      case 'reservas':
        content += `RESUMO:\n`;
        content += `Total de Reservas: ${data.total}\n`;
        content += `Reservas Pendentes: ${data.pendentes}\n`;
        content += `Reservas Confirmadas: ${data.confirmadas}\n`;
        content += `Reservas Canceladas: ${data.canceladas}\n`;
        content += `Receita Total: R$ ${data.receita.toLocaleString()}\n\n`;
        content += `DETALHES:\n`;
        data.detalhes.forEach((reserva: any, index: number) => {
          content += `${index + 1}. ${reserva.cliente} - ${reserva.chacara} - ${reserva.data} - R$ ${reserva.valor} - ${reserva.status}\n`;
        });
        break;
        
      case 'financeiro':
        content += `RESUMO FINANCEIRO:\n`;
        content += `Receita Total: R$ ${data.receita.toLocaleString()}\n`;
        content += `Despesas Totais: R$ ${data.despesas.toLocaleString()}\n`;
        content += `Lucro Líquido: R$ ${data.lucro.toLocaleString()}\n`;
        content += `Pagamentos Recebidos: ${data.pagamentosRecebidos}\n`;
        content += `Pagamentos Pendentes: ${data.pagamentosPendentes}\n\n`;
        content += `DETALHES:\n`;
        data.detalhes.forEach((item: any, index: number) => {
          content += `${index + 1}. ${item.tipo}: ${item.descricao} - R$ ${item.valor.toLocaleString()}\n`;
        });
        break;
        
      case 'ocupacao':
        content += `RESUMO DE OCUPAÇÃO:\n`;
        content += `Taxa de Ocupação: ${data.taxaOcupacao}%\n`;
        content += `Chácaras Disponíveis: ${data.chacarasDisponiveis}\n`;
        content += `Chácaras Ocupadas: ${data.chacarasOcupadas}\n`;
        content += `Total de Chácaras: ${data.totalChacaras}\n\n`;
        content += `DETALHES POR CHÁCARA:\n`;
        data.detalhes.forEach((chacara: any, index: number) => {
          content += `${index + 1}. ${chacara.chacara} - Ocupação: ${chacara.ocupacao}% - Dias ocupados: ${chacara.dias}\n`;
        });
        break;
    }
    
    return content;
  };

  const generateReport = () => {
    if (!selectedReport) {
      toast({
        title: "Erro",
        description: "Selecione um tipo de relatório.",
        variant: "destructive"
      });
      return;
    }

    const reportData = generateReportData(selectedReport);
    const pdfContent = generatePDFContent(selectedReport, reportData);
    
    // Criar blob com o conteúdo do relatório
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Criar link para download
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('Relatório gerado:', { selectedReport, dateRange, data: reportData });
    
    // Notificar componente pai sobre o relatório gerado
    if (onReportGenerated) {
      onReportGenerated({
        type: selectedReport,
        dateRange,
        generatedAt: new Date(),
        filename: `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.txt`
      });
    }
    
    toast({
      title: "Relatório gerado!",
      description: `O relatório foi gerado e está sendo baixado.`,
    });
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
