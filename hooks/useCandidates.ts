"use client";

import { useState, useEffect, useCallback } from "react";
import { Candidate } from "@/types/candidate";

interface UseCandidatesReturn {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  selectedCount: number;
  refreshCandidates: () => Promise<void>;
  selectCandidate: (candidateId: string) => Promise<void>;
  unselectCandidate: (candidateId: string) => Promise<void>;
  selectMultipleCandidates: (candidateIds: string[]) => Promise<void>;
  clearAllSelections: () => Promise<void>;
  resetCandidates: () => Promise<void>;
  updateCandidate: (id: string, updates: Partial<Candidate>) => Promise<void>;
}

export function useCandidates(): UseCandidatesReturn {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false); // Start with false since we expect no data initially
  const [error, setError] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);

  const refreshCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/candidates");
      if (!response.ok) {
        throw new Error("Failed to fetch candidates");
      }

      const data = await response.json();
      setCandidates(data.candidates || []);
      setSelectedCount(
        (data.candidates || []).filter((c: Candidate) => c.isSelected).length
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setCandidates([]); // Set empty array on error
      setSelectedCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const performAction = useCallback(
    async (action: string, payload: any = {}) => {
      try {
        const response = await fetch("/api/candidates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action, ...payload }),
        });

        if (!response.ok) {
          throw new Error("Failed to perform action");
        }

        const data = await response.json();
        setCandidates(data.candidates);
        setSelectedCount(data.selectedCount);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    },
    []
  );

  const selectCandidate = useCallback(
    async (candidateId: string) => {
      await performAction("select", { candidateId });
    },
    [performAction]
  );

  const unselectCandidate = useCallback(
    async (candidateId: string) => {
      await performAction("unselect", { candidateId });
    },
    [performAction]
  );

  const selectMultipleCandidates = useCallback(
    async (candidateIds: string[]) => {
      await performAction("selectMultiple", { candidateIds });
    },
    [performAction]
  );

  const clearAllSelections = useCallback(async () => {
    await performAction("clearAll");
  }, [performAction]);

  const resetCandidates = useCallback(async () => {
    await performAction("reset");
  }, [performAction]);

  const updateCandidate = useCallback(
    async (id: string, updates: Partial<Candidate>) => {
      try {
        const response = await fetch("/api/candidates", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...updates }),
        });

        if (!response.ok) {
          throw new Error("Failed to update candidate");
        }

        const data = await response.json();
        setCandidates((prev) =>
          prev.map((c) => (c.id === id ? data.candidate : c))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    refreshCandidates();
  }, [refreshCandidates]);

  return {
    candidates,
    loading,
    error,
    selectedCount,
    refreshCandidates,
    selectCandidate,
    unselectCandidate,
    selectMultipleCandidates,
    clearAllSelections,
    resetCandidates,
    updateCandidate,
  };
}
