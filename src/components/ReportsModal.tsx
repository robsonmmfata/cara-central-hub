
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, FileText, BarChart3, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

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
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('🏡 Sistema de Gestão de Chácaras', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 15;
    doc.setFontSize(16);
    doc.text(`RELATÓRIO ${reportType.toUpperCase()}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const dateInfo = `Período: ${dateRange.start || 'Início'} a ${dateRange.end || 'Hoje'} | Gerado em: ${new Date().toLocaleString('pt-BR')}`;
    doc.text(dateInfo, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 20;

    // Content based on report type
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    
    switch (reportType) {
      case 'clientes':
        doc.text('📊 RESUMO EXECUTIVO - CLIENTES', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Total de Clientes: ${data.total}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Novos Clientes: ${data.novos}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Clientes VIP: ${data.vip}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Clientes Regulares: ${data.regulares}`, 20, yPosition);
        yPosition += 15;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('👥 DETALHES DOS CLIENTES', 20, yPosition);
        yPosition += 15;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Nome', 20, yPosition);
        doc.text('Tipo', 80, yPosition);
        doc.text('Cadastro', 120, yPosition);
        doc.text('Reservas', 160, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        data.detalhes.forEach((cliente: any) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(cliente.nome, 20, yPosition);
          doc.text(cliente.tipo, 80, yPosition);
          doc.text(cliente.cadastro, 120, yPosition);
          doc.text(cliente.reservas.toString(), 160, yPosition);
          yPosition += 8;
        });
        break;

      case 'reservas':
        doc.text('📅 RESUMO EXECUTIVO - RESERVAS', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Total de Reservas: ${data.total}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Confirmadas: ${data.confirmadas}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Pendentes: ${data.pendentes}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Receita Total: R$ ${data.receita.toLocaleString()}`, 20, yPosition);
        yPosition += 15;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('🏡 DETALHES DAS RESERVAS', 20, yPosition);
        yPosition += 15;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Cliente', 20, yPosition);
        doc.text('Chácara', 70, yPosition);
        doc.text('Data', 120, yPosition);
        doc.text('Valor', 150, yPosition);
        doc.text('Status', 180, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        data.detalhes.forEach((reserva: any) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(reserva.cliente, 20, yPosition);
          doc.text(reserva.chacara, 70, yPosition);
          doc.text(reserva.data, 120, yPosition);
          doc.text(`R$ ${reserva.valor.toLocaleString()}`, 150, yPosition);
          doc.text(reserva.status, 180, yPosition);
          yPosition += 8;
        });
        break;

      case 'financeiro':
        doc.text('💰 RESUMO FINANCEIRO', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Receita Total: R$ ${data.receita.toLocaleString()}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Despesas Totais: R$ ${data.despesas.toLocaleString()}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Lucro Líquido: R$ ${data.lucro.toLocaleString()}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Pagamentos Recebidos: ${data.pagamentosRecebidos}`, 20, yPosition);
        yPosition += 15;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('💳 DETALHES FINANCEIROS', 20, yPosition);
        yPosition += 15;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Tipo', 20, yPosition);
        doc.text('Descrição', 80, yPosition);
        doc.text('Valor', 150, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        data.detalhes.forEach((item: any) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(item.tipo, 20, yPosition);
          doc.text(item.descricao, 80, yPosition);
          doc.text(`R$ ${item.valor.toLocaleString()}`, 150, yPosition);
          yPosition += 8;
        });
        break;

      case 'ocupacao':
        doc.text('📈 RESUMO DE OCUPAÇÃO', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Taxa de Ocupação: ${data.taxaOcupacao}%`, 20, yPosition);
        yPosition += 8;
        doc.text(`Chácaras Ocupadas: ${data.chacarasOcupadas}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Chácaras Disponíveis: ${data.chacarasDisponiveis}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Total de Chácaras: ${data.totalChacaras}`, 20, yPosition);
        yPosition += 15;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('🏘️ DETALHES POR CHÁCARA', 20, yPosition);
        yPosition += 15;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Chácara', 20, yPosition);
        doc.text('Ocupação', 100, yPosition);
        doc.text('Dias Ocupados', 150, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        data.detalhes.forEach((chacara: any) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(chacara.chacara, 20, yPosition);
          doc.text(`${chacara.ocupacao}%`, 100, yPosition);
          doc.text(`${chacara.dias} dias`, 150, yPosition);
          yPosition += 8;
        });
        break;
    }

    // Footer
    const footerY = pageHeight - 20;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Sistema de Gestão de Chácaras - Relatório gerado automaticamente', pageWidth / 2, footerY, { align: 'center' });

    // Save PDF
    const filename = `relatorio_${selectedReport}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
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

    console.log('Relatório PDF gerado:', { selectedReport, dateRange, data: reportData });
    
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
      description: `O relatório em PDF foi gerado e está sendo baixado.`,
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
