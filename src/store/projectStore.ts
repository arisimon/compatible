import { create } from 'zustand';
import { Project, Campaign, ProjectTask, ProjectMilestone } from '../types/project';

interface ProjectStore {
  projects: Project[];
  campaigns: Campaign[];
  selectedProjectId: string | null;
  selectedCampaignId: string | null;

  // Project actions
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  
  // Task actions
  addTask: (projectId: string, task: ProjectTask) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<ProjectTask>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  
  // Milestone actions
  addMilestone: (projectId: string, milestone: ProjectMilestone) => void;
  updateMilestone: (projectId: string, milestoneId: string, updates: Partial<ProjectMilestone>) => void;
  deleteMilestone: (projectId: string, milestoneId: string) => void;
  
  // Campaign actions
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaignId: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (campaignId: string) => void;
  
  // Selection actions
  setSelectedProject: (projectId: string | null) => void;
  setSelectedCampaign: (campaignId: string | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  campaigns: [],
  selectedProjectId: null,
  selectedCampaignId: null,

  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),

  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      ),
    })),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
    })),

  addTask: (projectId, task) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, task] }
          : project
      ),
    })),

  updateTask: (projectId, taskId, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
              ),
            }
          : project
      ),
    })),

  deleteTask: (projectId, taskId) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((t) => t.id !== taskId),
            }
          : project
      ),
    })),

  addMilestone: (projectId, milestone) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? { ...project, milestones: [...project.milestones, milestone] }
          : project
      ),
    })),

  updateMilestone: (projectId, milestoneId, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              milestones: project.milestones.map((milestone) =>
                milestone.id === milestoneId
                  ? { ...milestone, ...updates }
                  : milestone
              ),
            }
          : project
      ),
    })),

  deleteMilestone: (projectId, milestoneId) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              milestones: project.milestones.filter((m) => m.id !== milestoneId),
            }
          : project
      ),
    })),

  addCampaign: (campaign) =>
    set((state) => ({ campaigns: [...state.campaigns, campaign] })),

  updateCampaign: (campaignId, updates) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === campaignId ? { ...campaign, ...updates } : campaign
      ),
    })),

  deleteCampaign: (campaignId) =>
    set((state) => ({
      campaigns: state.campaigns.filter((c) => c.id !== campaignId),
    })),

  setSelectedProject: (projectId) =>
    set({ selectedProjectId: projectId }),

  setSelectedCampaign: (campaignId) =>
    set({ selectedCampaignId: campaignId }),
}));