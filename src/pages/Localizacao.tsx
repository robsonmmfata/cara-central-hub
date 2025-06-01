
import { Layout } from "@/components/Layout";
import { MapComponent } from "@/components/MapComponent";

const Localizacao = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Localização das Propriedades</h1>
          <p className="text-gray-600">Visualize a localização de todas as chácaras no mapa</p>
        </div>
        
        <MapComponent />
      </div>
    </Layout>
  );
};

export default Localizacao;
