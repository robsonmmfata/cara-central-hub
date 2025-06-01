
import { Layout } from "@/components/Layout";
import { PaymentsManager } from "@/components/PaymentsManager";

const Pagamentos = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <PaymentsManager />
      </div>
    </Layout>
  );
};

export default Pagamentos;
