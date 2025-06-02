
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

  const generatePDF = (reportType: string, data: any) => {
    // Criar conteúdo HTML para o PDF
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Relatório ${reportType.toUpperCase()}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; }
          .details { margin-top: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .logo { color: #2563eb; font-size: 24px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏡 Sistema de Chácaras</div>
          <h1>RELATÓRIO ${reportType.toUpperCase()}</h1>
          <p>Período: ${dateRange.start || 'Início'} a ${dateRange.end || 'Hoje'}</p>
          <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
        </div>
    `;
    
    switch (reportType) {
      case 'clientes':
        htmlContent += `
          <div class="summary">
            <h2>RESUMO EXECUTIVO</h2>
            <p><strong>Total de Clientes:</strong> ${data.total}</p>
            <p><strong>Novos Clientes:</strong> ${data.novos}</p>
            <p><strong>Clientes VIP:</strong> ${data.vip}</p>
            <p><strong>Clientes Regulares:</strong> ${data.regulares}</p>
            <p><strong>Clientes Bloqueados:</strong> ${data.bloqueados}</p>
          </div>
          <div class="details">
            <h2>DETALHES DOS CLIENTES</h2>
            <table>
              <tr><th>Nome</th><th>Tipo</th><th>Data Cadastro</th><th>Nº Reservas</th></tr>
        `;
        data.detalhes.forEach((cliente: any) => {
          htmlContent += `<tr><td>${cliente.nome}</td><td>${cliente.tipo}</td><td>${cliente.cadastro}</td><td>${cliente.reservas}</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
        
      case 'reservas':
        htmlContent += `
          <div class="summary">
            <h2>RESUMO EXECUTIVO</h2>
            <p><strong>Total de Reservas:</strong> ${data.total}</p>
            <p><strong>Reservas Pendentes:</strong> ${data.pendentes}</p>
            <p><strong>Reservas Confirmadas:</strong> ${data.confirmadas}</p>
            <p><strong>Reservas Canceladas:</strong> ${data.canceladas}</p>
            <p><strong>Receita Total:</strong> R$ ${data.receita.toLocaleString()}</p>
          </div>
          <div class="details">
            <h2>DETALHES DAS RESERVAS</h2>
            <table>
              <tr><th>Cliente</th><th>Chácara</th><th>Data</th><th>Valor</th><th>Status</th></tr>
        `;
        data.detalhes.forEach((reserva: any) => {
          htmlContent += `<tr><td>${reserva.cliente}</td><td>${reserva.chacara}</td><td>${reserva.data}</td><td>R$ ${reserva.valor.toLocaleString()}</td><td>${reserva.status}</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
        
      case 'financeiro':
        htmlContent += `
          <div class="summary">
            <h2>RESUMO FINANCEIRO</h2>
            <p><strong>Receita Total:</strong> R$ ${data.receita.toLocaleString()}</p>
            <p><strong>Despesas Totais:</strong> R$ ${data.despesas.toLocaleString()}</p>
            <p><strong>Lucro Líquido:</strong> R$ ${data.lucro.toLocaleString()}</p>
            <p><strong>Pagamentos Recebidos:</strong> ${data.pagamentosRecebidos}</p>
            <p><strong>Pagamentos Pendentes:</strong> ${data.pagamentosPendentes}</p>
          </div>
          <div class="details">
            <h2>DETALHES FINANCEIROS</h2>
            <table>
              <tr><th>Tipo</th><th>Descrição</th><th>Valor</th></tr>
        `;
        data.detalhes.forEach((item: any) => {
          htmlContent += `<tr><td>${item.tipo}</td><td>${item.descricao}</td><td>R$ ${item.valor.toLocaleString()}</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
        
      case 'ocupacao':
        htmlContent += `
          <div class="summary">
            <h2>RESUMO DE OCUPAÇÃO</h2>
            <p><strong>Taxa de Ocupação:</strong> ${data.taxaOcupacao}%</p>
            <p><strong>Chácaras Disponíveis:</strong> ${data.chacarasDisponiveis}</p>
            <p><strong>Chácaras Ocupadas:</strong> ${data.chacarasOcupadas}</p>
            <p><strong>Total de Chácaras:</strong> ${data.totalChacaras}</p>
          </div>
          <div class="details">
            <h2>DETALHES POR CHÁCARA</h2>
            <table>
              <tr><th>Chácara</th><th>Taxa Ocupação</th><th>Dias Ocupados</th></tr>
        `;
        data.detalhes.forEach((chacara: any) => {
          htmlContent += `<tr><td>${chacara.chacara}</td><td>${chacara.ocupacao}%</td><td>${chacara.dias}</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
    }
    
    htmlContent += `</body></html>`;
    
    // Criar blob e fazer download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    generatePDF(selectedReport, reportData);

    console.log('Relatório gerado:', { selectedReport, dateRange, data: reportData });
    
    if (onReportGenerated) {
      onReportGenerated({
        type: selectedReport,
        dateRange,
        generatedAt: new Date(),
        filename: `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.pdf`
      });
    }
    
    toast({
      title: "Relatório PDF gerado!",
      description: `O relatório foi gerado e está sendo baixado como arquivo HTML (visualize como PDF).`,
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
                Gerar PDF
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
