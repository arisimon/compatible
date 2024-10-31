import React from 'react';
import { Project } from '../../types/project';
import { formatDate, cn } from '../../lib/utils';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface ProjectTimelineProps {
  projects: Project[];
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-medium text-gray-900">Project Timeline</h2>
      <div className="mt-4 flow-root">
        <ul className="-mb-8">
          {sortedProjects.map((project, projectIdx) => (
            <li key={project.id}>
              <div className="relative pb-8">
                {projectIdx !== projects.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
                        {
                          'bg-green-500': project.status === 'completed',
                          'bg-blue-500': project.status === 'active',
                          'bg-yellow-500': project.status === 'paused',
                          'bg-gray-500': project.status === 'planning',
                        }
                      )}
                    >
                      {project.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <Calendar className="h-5 w-5 text-white" />
                      )}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {project.name}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {project.description}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}