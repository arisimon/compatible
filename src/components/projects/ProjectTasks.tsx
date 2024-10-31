import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { Button } from '../ui/Button';
import { Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatDate, cn } from '../../lib/utils';

interface ProjectTasksProps {
  projectId: string;
}

export function ProjectTasks({ projectId }: ProjectTasksProps) {
  const project = useProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );

  if (!project) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'review':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {project.tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {task.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {task.description}
                </p>
              </div>
              {getStatusIcon(task.status)}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    {
                      'bg-red-100 text-red-800': task.priority === 'urgent',
                      'bg-yellow-100 text-yellow-800': task.priority === 'high',
                      'bg-blue-100 text-blue-800': task.priority === 'medium',
                      'bg-gray-100 text-gray-800': task.priority === 'low',
                    }
                  )}
                >
                  {task.priority.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">
                  Due {formatDate(task.dueDate)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Assigned to {task.assignee.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}