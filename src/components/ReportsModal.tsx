
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
    // Criar conteúdo HTML mais elaborado para o PDF
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Relatório ${reportType.toUpperCase()}</title>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            margin: 0; 
            padding: 20px; 
            background-color: #f8f9fa;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
          }
          .logo { 
            color: #2563eb; 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 10px;
          }
          .report-title {
            color: #1f2937;
            font-size: 24px;
            margin: 10px 0;
          }
          .summary { 
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); 
            padding: 25px; 
            margin-bottom: 30px; 
            border-radius: 10px;
            border-left: 5px solid #2563eb;
          }
          .summary h2 {
            color: #1f2937;
            margin-bottom: 20px;
            font-size: 20px;
          }
          .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
          }
          .stat-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
          }
          .stat-label {
            color: #6b7280;
            font-size: 14px;
            margin-top: 5px;
          }
          .details { 
            margin-top: 30px; 
          }
          .details h2 {
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 15px; 
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          th, td { 
            border: 1px solid #e5e7eb; 
            padding: 12px 15px; 
            text-align: left; 
          }
          th { 
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
            color: white;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
          }
          tr:nth-child(even) { 
            background-color: #f8fafc; 
          }
          tr:hover {
            background-color: #e0f2fe;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
          }
          .date-info {
            background: #dbeafe;
            padding: 10px 15px;
            border-radius: 6px;
            color: #1e40af;
            margin-bottom: 20px;
          }
          @media print {
            body { background: white; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🏡 Sistema de Gestão de Chácaras</div>
            <h1 class="report-title">RELATÓRIO ${reportType.toUpperCase()}</h1>
            <div class="date-info">
              <strong>Período:</strong> ${dateRange.start || 'Início'} a ${dateRange.end || 'Hoje'} | 
              <strong>Gerado em:</strong> ${new Date().toLocaleString('pt-BR')}
            </div>
          </div>
    `;
    
    switch (reportType) {
      case 'clientes':
        htmlContent += `
          <div class="summary">
            <h2>📊 RESUMO EXECUTIVO - CLIENTES</h2>
            <div class="stat-grid">
              <div class="stat-card">
                <div class="stat-value">${data.total}</div>
                <div class="stat-label">Total de Clientes</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.novos}</div>
                <div class="stat-label">Novos Clientes</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.vip}</div>
                <div class="stat-label">Clientes VIP</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.regulares}</div>
                <div class="stat-label">Clientes Regulares</div>
              </div>
            </div>
          </div>
          <div class="details">
            <h2>👥 DETALHES DOS CLIENTES</h2>
            <table>
              <tr><th>Nome</th><th>Tipo</th><th>Data Cadastro</th><th>Nº Reservas</th></tr>
        `;
        data.detalhes.forEach((cliente: any) => {
          htmlContent += `<tr><td>${cliente.nome}</td><td><strong>${cliente.tipo}</strong></td><td>${cliente.cadastro}</td><td>${cliente.reservas}</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
        
      case 'reservas':
        htmlContent += `
          <div class="summary">
            <h2>📅 RESUMO EXECUTIVO - RESERVAS</h2>
            <div class="stat-grid">
              <div class="stat-card">
                <div class="stat-value">${data.total}</div>
                <div class="stat-label">Total de Reservas</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.confirmadas}</div>
                <div class="stat-label">Confirmadas</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.pendentes}</div>
                <div class="stat-label">Pendentes</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">R$ ${data.receita.toLocaleString()}</div>
                <div class="stat-label">Receita Total</div>
              </div>
            </div>
          </div>
          <div class="details">
            <h2>🏡 DETALHES DAS RESERVAS</h2>
            <table>
              <tr><th>Cliente</th><th>Chácara</th><th>Data</th><th>Valor</th><th>Status</th></tr>
        `;
        data.detalhes.forEach((reserva: any) => {
          htmlContent += `<tr><td>${reserva.cliente}</td><td>${reserva.chacara}</td><td>${reserva.data}</td><td><strong>R$ ${reserva.valor.toLocaleString()}</strong></td><td>${reserva.status}</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
        
      case 'financeiro':
        htmlContent += `
          <div class="summary">
            <h2>💰 RESUMO FINANCEIRO</h2>
            <div class="stat-grid">
              <div class="stat-card">
                <div class="stat-value">R$ ${data.receita.toLocaleString()}</div>
                <div class="stat-label">Receita Total</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">R$ ${data.despesas.toLocaleString()}</div>
                <div class="stat-label">Despesas Totais</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">R$ ${data.lucro.toLocaleString()}</div>
                <div class="stat-label">Lucro Líquido</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.pagamentosRecebidos}</div>
                <div class="stat-label">Pagamentos Recebidos</div>
              </div>
            </div>
          </div>
          <div class="details">
            <h2>💳 DETALHES FINANCEIROS</h2>
            <table>
              <tr><th>Tipo</th><th>Descrição</th><th>Valor</th></tr>
        `;
        data.detalhes.forEach((item: any) => {
          htmlContent += `<tr><td><strong>${item.tipo}</strong></td><td>${item.descricao}</td><td>R$ ${item.valor.toLocaleString()}</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
        
      case 'ocupacao':
        htmlContent += `
          <div class="summary">
            <h2>📈 RESUMO DE OCUPAÇÃO</h2>
            <div class="stat-grid">
              <div class="stat-card">
                <div class="stat-value">${data.taxaOcupacao}%</div>
                <div class="stat-label">Taxa de Ocupação</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.chacarasOcupadas}</div>
                <div class="stat-label">Chácaras Ocupadas</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.chacarasDisponiveis}</div>
                <div class="stat-label">Chácaras Disponíveis</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">${data.totalChacaras}</div>
                <div class="stat-label">Total de Chácaras</div>
              </div>
            </div>
          </div>
          <div class="details">
            <h2>🏘️ DETALHES POR CHÁCARA</h2>
            <table>
              <tr><th>Chácara</th><th>Taxa Ocupação</th><th>Dias Ocupados</th></tr>
        `;
        data.detalhes.forEach((chacara: any) => {
          htmlContent += `<tr><td><strong>${chacara.chacara}</strong></td><td>${chacara.ocupacao}%</td><td>${chacara.dias} dias</td></tr>`;
        });
        htmlContent += `</table></div>`;
        break;
    }
    
    htmlContent += `
          <div class="footer">
            <p><strong>Sistema de Gestão de Chácaras</strong> - Relatório gerado automaticamente em ${new Date().toLocaleString('pt-BR')}</p>
            <p>Este documento contém informações confidenciais e é destinado exclusivamente ao uso interno.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
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
        filename: `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.html`
      });
    }
    
    toast({
      title: "Relatório PDF gerado!",
      description: `O relatório foi gerado e está sendo baixado como arquivo HTML (pode ser salvo como PDF).`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Gerar Relatórios PDF</h2>
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
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <div className="flex items-center gap-3">
                      <report.icon className="h-5 w-5 text-blue-500" />
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
              <Button onClick={generateReport} className="bg-blue-500 hover:bg-blue-600">
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
