"use client";

import { useState, useMemo } from "react";
import { Candidate, FilterState } from "@/types/candidate";
import { formatCurrency, debounce } from "@/lib/utils";

const initialFilters: FilterState = {
  search: "",
  skills: [],
  locations: [],
  availability: [],
  educationLevels: [],
  experienceCompanies: [],
  roleNames: [],
  subjects: [],
  schools: [],
  salaryRange: {
    min: 0,
    max: 200000,
  },
  selectedOnly: false,
};

export function useFilters(candidates: Candidate[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const debouncedSetFilters = useMemo(() => debounce(setFilters, 300), []);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          candidate.name.toLowerCase().includes(searchLower) ||
          candidate.email.toLowerCase().includes(searchLower) ||
          candidate.location.toLowerCase().includes(searchLower) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          ) ||
          candidate.work_experiences.some(
            (exp) =>
              exp.company.toLowerCase().includes(searchLower) ||
              exp.roleName.toLowerCase().includes(searchLower)
          );

        if (!matchesSearch) return false;
      }

      // Selected only filter
      if (filters.selectedOnly && !candidate.isSelected) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasMatchingSkills = filters.skills.every((filterSkill) =>
          candidate.skills.some((candidateSkill) =>
            candidateSkill.toLowerCase().includes(filterSkill.toLowerCase())
          )
        );
        if (!hasMatchingSkills) return false;
      }

      // Locations filter
      if (filters.locations.length > 0) {
        if (!filters.locations.includes(candidate.location)) return false;
      }

      // Availability filter
      if (filters.availability.length > 0) {
        const hasMatchingAvailability = filters.availability.some(
          (availability) => candidate.work_availability.includes(availability)
        );
        if (!hasMatchingAvailability) return false;
      }

      // Education levels filter
      if (filters.educationLevels.length > 0) {
        if (
          !filters.educationLevels.includes(candidate.education.highest_level)
        )
          return false;
      }

      // Experience companies filter
      if (filters.experienceCompanies.length > 0) {
        const hasMatchingCompany = candidate.work_experiences.some((exp) =>
          filters.experienceCompanies.includes(exp.company)
        );
        if (!hasMatchingCompany) return false;
      }

      // Role names filter
      if (filters.roleNames.length > 0) {
        const hasMatchingRole = candidate.work_experiences.some((exp) =>
          filters.roleNames.includes(exp.roleName)
        );
        if (!hasMatchingRole) return false;
      }

      // Education subjects filter
      if (filters.subjects.length > 0) {
        const hasMatchingSubject = candidate.education.degrees.some((degree) =>
          filters.subjects.includes(degree.subject)
        );
        if (!hasMatchingSubject) return false;
      }

      // Schools filter
      if (filters.schools.length > 0) {
        const hasMatchingSchool = candidate.education.degrees.some((degree) =>
          filters.schools.includes(degree.originalSchool)
        );
        if (!hasMatchingSchool) return false;
      }

      // Salary range filter
      if (candidate.annual_salary_expectation["full-time"]) {
        const salary = formatCurrency(
          candidate.annual_salary_expectation["full-time"]
        );
        if (
          salary < filters.salaryRange.min ||
          salary > filters.salaryRange.max
        ) {
          return false;
        }
      }

      return true;
    });
  }, [candidates, filters]);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return {
    filters,
    filteredCandidates,
    clearFilters,
    updateFilters,
    setFilters: debouncedSetFilters,
  };
}
