import { create } from 'zustand';
import { TeamMember, Department } from '../types/team';

interface TeamStore {
  members: TeamMember[];
  departments: Department[];
  selectedMemberId: string | null;

  // Member actions
  addMember: (member: TeamMember) => void;
  updateMember: (memberId: string, updates: Partial<TeamMember>) => void;
  removeMember: (memberId: string) => void;
  
  // Department actions
  addDepartment: (department: Department) => void;
  updateDepartment: (departmentId: string, updates: Partial<Department>) => void;
  removeDepartment: (departmentId: string) => void;
  
  // Assignment actions
  assignMemberToDepartment: (memberId: string, departmentId: string) => void;
  removeMemberFromDepartment: (memberId: string, departmentId: string) => void;
  
  // Selection actions
  setSelectedMember: (memberId: string | null) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  members: [],
  departments: [],
  selectedMemberId: null,

  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),

  updateMember: (memberId, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === memberId ? { ...member, ...updates } : member
      ),
    })),

  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== memberId),
      departments: state.departments.map((dept) => ({
        ...dept,
        members: dept.members.filter((id) => id !== memberId),
        lead: dept.lead === memberId ? undefined : dept.lead,
      })),
    })),

  addDepartment: (department) =>
    set((state) => ({ departments: [...state.departments, department] })),

  updateDepartment: (departmentId, updates) =>
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.id === departmentId ? { ...dept, ...updates } : dept
      ),
    })),

  removeDepartment: (departmentId) =>
    set((state) => ({
      departments: state.departments.filter((d) => d.id !== departmentId),
    })),

  assignMemberToDepartment: (memberId, departmentId) =>
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.id === departmentId && !dept.members.includes(memberId)
          ? { ...dept, members: [...dept.members, memberId] }
          : dept
      ),
    })),

  removeMemberFromDepartment: (memberId, departmentId) =>
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.id === departmentId
          ? { ...dept, members: dept.members.filter((id) => id !== memberId) }
          : dept
      ),
    })),

  setSelectedMember: (memberId) =>
    set({ selectedMemberId: memberId }),
}));