
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle, Clock, AlertTriangle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'em-andamento' | 'concluida';
  dueDate: string;
  assignedTo: string;
}

export function TasksManager() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Limpar piscina da Chácara Vista Verde',
      description: 'Fazer limpeza completa da piscina antes da próxima reserva',
      priority: 'alta',
      status: 'pendente',
      dueDate: '2024-04-05',
      assignedTo: 'João Silva'
    },
    {
      id: '2',
      title: 'Verificar equipamentos de som',
      description: 'Testar e configurar sistema de som do salão',
      priority: 'media',
      status: 'em-andamento',
      dueDate: '2024-04-03',
      assignedTo: 'Maria Santos'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'media' as const,
    dueDate: '',
    assignedTo: ''
  });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      status: 'pendente'
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'media',
      dueDate: '',
      assignedTo: ''
    });
    setShowAddForm(false);
    toast({
      title: "Tarefa criada!",
      description: "A tarefa foi adicionada com sucesso.",
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast({
      title: "Status atualizado!",
      description: "O status da tarefa foi atualizado.",
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Tarefa excluída!",
      description: "A tarefa foi removida com sucesso.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'em-andamento': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pendente': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Tarefas</h2>
        <Button onClick={() => setShowAddForm(true)} className="bg-farm-blue-500 hover:bg-farm-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{tasks.filter(t => t.status === 'pendente').length}</p>
            <p className="text-sm text-gray-600">Pendentes</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'em-andamento').length}</p>
            <p className="text-sm text-gray-600">Em Andamento</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'concluida').length}</p>
            <p className="text-sm text-gray-600">Concluídas</p>
          </div>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(task.status)}
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{task.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Responsável: {task.assignedTo}</span>
                  <span>Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="pendente">Pendente</option>
                  <option value="em-andamento">Em Andamento</option>
                  <option value="concluida">Concluída</option>
                </select>
                <Button variant="outline" size="sm" onClick={() => deleteTask(task.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Nova Tarefa</h3>
              <form onSubmit={addTask} className="space-y-4">
                <Input
                  placeholder="Título da tarefa"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Descrição"
                  className="w-full border border-gray-300 rounded-lg p-2 h-20"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="baixa">Prioridade Baixa</option>
                  <option value="media">Prioridade Média</option>
                  <option value="alta">Prioridade Alta</option>
                </select>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  required
                />
                <Input
                  placeholder="Responsável"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  required
                />
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    Criar Tarefa
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
