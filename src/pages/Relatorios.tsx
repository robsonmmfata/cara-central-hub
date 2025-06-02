
import { Layout } from "@/components/Layout";
import { ReportsModal } from "@/components/ReportsModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, TrendingUp, Download } from "lucide-react";
import { useState } from "react";

interface GeneratedReport {
  type: string;
  dateRange: { start: string; end: string };
  generatedAt: Date;
  filename: string;
}

const Relatorios = () => {
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [recentReports, setRecentReports] = useState<GeneratedReport[]>([
    {
      type: 'clientes',
      dateRange: { start: '2024-03-01', end: '2024-03-31' },
      generatedAt: new Date('2024-04-01'),
      filename: 'relatorio_clientes_2024-04-01.txt'
    },
    {
      type: 'financeiro',
      dateRange: { start: '2024-03-01', end: '2024-03-31' },
      generatedAt: new Date('2024-03-31'),
      filename: 'relatorio_financeiro_2024-03-31.txt'
    }
  ]);

  const reportTypes = [
    {
      id: 'clientes',
      name: 'Relatório de Clientes',
      description: 'Lista completa de clientes com informações detalhadas',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'reservas',
      name: 'Relatório de Reservas',
      description: 'Histórico de reservas e ocupação das propriedades',
      icon: BarChart3,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'financeiro',
      name: 'Relatório Financeiro',
      description: 'Receitas, despesas e análise financeira',
      icon: TrendingUp,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'ocupacao',
      name: 'Relatório de Ocupação',
      description: 'Taxa de ocupação e disponibilidade das chácaras',
      icon: BarChart3,
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const handleReportGenerated = (reportData: GeneratedReport) => {
    setRecentReports(prev => [reportData, ...prev].slice(0, 10)); // Manter apenas os 10 mais recentes
  };

  const handleDownloadReport = (filename: string) => {
    // Simular download do relatório
    console.log('Baixando relatório:', filename);
    // Em um caso real, você faria uma requisição para buscar o arquivo
  };

  const getReportTypeName = (type: string) => {
    const reportType = reportTypes.find(r => r.id === type);
    return reportType?.name || type;
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
          <p className="text-gray-600">Gere relatórios detalhados sobre seu negócio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => (
            <Card key={report.id} className={`p-6 ${report.color} hover:shadow-lg transition-shadow`}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <report.icon className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {report.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {report.description}
                  </p>
                  <Button 
                    onClick={() => setShowReportsModal(true)}
                    className="bg-farm-blue-500 hover:bg-farm-blue-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Relatórios Recentes</h2>
          {recentReports.length > 0 ? (
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {getReportTypeName(report.type)} - {report.dateRange.start || 'Início'} a {report.dateRange.end || 'Hoje'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Gerado em {report.generatedAt.toLocaleDateString('pt-BR')} às {report.generatedAt.toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadReport(report.filename)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum relatório gerado ainda</p>
          )}
        </Card>

        <ReportsModal 
          isOpen={showReportsModal} 
          onClose={() => setShowReportsModal(false)}
          onReportGenerated={handleReportGenerated}
        />
      </div>
    </Layout>
  );
};

export default Relatorios;
