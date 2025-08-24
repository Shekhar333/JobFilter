import { Candidate } from "@/types/candidate";

// Shared in-memory storage for demo purposes
// In a real application, this would be a database
let candidates: Candidate[] = [];

export const candidateStorage = {
  getAll: (): Candidate[] => {
    return candidates;
  },

  setAll: (newCandidates: Candidate[]): void => {
    candidates = newCandidates;
  },

  add: (candidate: Candidate): void => {
    candidates.push(candidate);
  },

  update: (id: string, updates: Partial<Candidate>): Candidate | null => {
    const index = candidates.findIndex(c => c.id === id);
    if (index !== -1) {
      candidates[index] = { ...candidates[index], ...updates };
      return candidates[index];
    }
    return null;
  },

  remove: (id: string): boolean => {
    const initialLength = candidates.length;
    candidates = candidates.filter(c => c.id !== id);
    return candidates.length < initialLength;
  },

  clear: (): void => {
    candidates = [];
  },

  count: (): number => {
    return candidates.length;
  },

  getSelected: (): Candidate[] => {
    return candidates.filter(c => c.isSelected);
  },

  getById: (id: string): Candidate | null => {
    return candidates.find(c => c.id === id) || null;
  }
};
