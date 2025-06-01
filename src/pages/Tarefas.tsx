
import { Layout } from "@/components/Layout";
import { TasksManager } from "@/components/TasksManager";

const Tarefas = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <TasksManager />
      </div>
    </Layout>
  );
};

export default Tarefas;
