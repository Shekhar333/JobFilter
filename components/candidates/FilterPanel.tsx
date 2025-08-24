"use client";

import React, { useState, useMemo } from "react";
import { Candidate, FilterState } from "@/types/candidate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Filter,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  DollarSign,
  Clock,
} from "lucide-react";
import { getUniqueValues, formatCurrency } from "@/lib/utils";

interface FilterPanelProps {
  candidates: Candidate[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  candidates,
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [locationsSearch, setLocationsSearch] = useState("");
  const [educationLevelsSearch, setEducationLevelsSearch] = useState("");
  const [subjectsSearch, setSubjectsSearch] = useState("");
  const [skillsSearch, setSkillsSearch] = useState("");
  const [rolesSearch, setRolesSearch] = useState("");

  const uniqueValues = useMemo(() => {
    return {
      locations: getUniqueValues(candidates, "location"),
      skills: getUniqueValues(
        candidates.map((c) => ({ skills: c.skills })),
        "skills"
      ),
      educationLevels: getUniqueValues(
        candidates.map((c) => ({ level: c.education.highest_level })),
        "level"
      ),
      companies: getUniqueValues(
        candidates.flatMap((c) =>
          c.work_experiences.map((exp) => ({ company: exp.company }))
        ),
        "company"
      ),
      roleNames: getUniqueValues(
        candidates.flatMap((c) =>
          c.work_experiences.map((exp) => ({ roleName: exp.roleName }))
        ),
        "roleName"
      ),
      subjects: getUniqueValues(
        candidates.flatMap((c) =>
          c.education.degrees.map((degree) => ({ subject: degree.subject }))
        ),
        "subject"
      ),
      schools: getUniqueValues(
        candidates.flatMap((c) =>
          c.education.degrees.map((degree) => ({
            school: degree.originalSchool,
          }))
        ),
        "school"
      ),
    };
  }, [candidates]);

  const filteredValues = useMemo(() => {
    return {
      locations: uniqueValues.locations.filter((location) =>
        location.toLowerCase().includes(locationsSearch.toLowerCase())
      ),
      educationLevels: uniqueValues.educationLevels.filter((level) =>
        level.toLowerCase().includes(educationLevelsSearch.toLowerCase())
      ),
      subjects: uniqueValues.subjects.filter((subject) =>
        subject.toLowerCase().includes(subjectsSearch.toLowerCase())
      ),
      skills: uniqueValues.skills.filter((skill) =>
        skill.toLowerCase().includes(skillsSearch.toLowerCase())
      ),
      roleNames: uniqueValues.roleNames.filter((role) =>
        role.toLowerCase().includes(rolesSearch.toLowerCase())
      ),
    };
  }, [
    uniqueValues,
    locationsSearch,
    educationLevelsSearch,
    subjectsSearch,
    skillsSearch,
    rolesSearch,
  ]);

  const salaryRange = useMemo(() => {
    const salaries = candidates
      .map((c) => c.annual_salary_expectation["full-time"])
      .filter((salary): salary is string => Boolean(salary))
      .map(formatCurrency)
      .filter((s) => s > 0);

    return {
      min: Math.min(...salaries) || 0,
      max: Math.max(...salaries) || 200000,
    };
  }, [candidates]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayFilter = (
    key:
      | "skills"
      | "locations"
      | "educationLevels"
      | "roleNames"
      | "subjects"
      | "availability",
    value: string
  ) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFilter(key, newArray);
  };

  const activeFiltersCount = [
    filters.search,
    filters.skills.length > 0,
    filters.locations.length > 0,
    filters.availability.length > 0,
    filters.educationLevels.length > 0,
    filters.experienceCompanies.length > 0,
    filters.salaryRange.min > 0 || filters.salaryRange.max < 200000,
    filters.selectedOnly,
  ].filter(Boolean).length;

  return (
    <Card className="h-fit border-slate-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-base font-medium text-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <Filter className="h-4 w-4 text-slate-600" />
            </div>
            Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto pt-0">
        {isExpanded && (
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-md p-2">
              <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-700">
                <Clock className="h-4 w-4 text-slate-500" />
                Work Availability
              </label>
              <div className="space-y-2">
                {["full-time", "part-time"].map((availability) => (
                  <div
                    key={availability}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`availability-${availability}`}
                      checked={filters.availability.includes(
                        availability as any
                      )}
                      onChange={() =>
                        toggleArrayFilter("availability", availability)
                      }
                    />
                    <label
                      htmlFor={`availability-${availability}`}
                      className="text-sm text-slate-600"
                    >
                      {availability}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {uniqueValues.locations.length > 0 && (
              <div className="border border-slate-200 rounded-md p-2">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-700">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  Locations ({uniqueValues.locations.length})
                </label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search locations..."
                    value={locationsSearch}
                    onChange={(e) => setLocationsSearch(e.target.value)}
                    className="w-full text-sm"
                  />
                  <div className="max-h-32 overflow-y-auto space-y-2 bord">
                    {filteredValues.locations.map((location) => (
                      <div
                        key={location}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={`location-${location}`}
                          checked={filters.locations.includes(location)}
                          onChange={() =>
                            toggleArrayFilter("locations", location)
                          }
                        />
                        <label
                          htmlFor={`location-${location}`}
                          className="text-sm text-slate-600 truncate"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                    {filteredValues.locations.length === 0 &&
                      locationsSearch && (
                        <div className="text-sm text-slate-500 text-center py-2">
                          No locations found
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            {uniqueValues.educationLevels.length > 0 && (
              <div className="border border-slate-200 rounded-md p-2">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-700">
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                  Education Level ({uniqueValues.educationLevels.length})
                </label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search education levels..."
                    value={educationLevelsSearch}
                    onChange={(e) => setEducationLevelsSearch(e.target.value)}
                    className="w-full border-slate-300 text-sm"
                  />
                  <div className="max-h-32 overflow-y-auto space-y-2 ">
                    {filteredValues.educationLevels.map((level) => (
                      <div key={level} className="flex items-center space-x-3">
                        <Checkbox
                          id={`education-${level}`}
                          checked={filters.educationLevels.includes(level)}
                          onChange={() =>
                            toggleArrayFilter("educationLevels", level)
                          }
                        />
                        <label
                          htmlFor={`education-${level}`}
                          className="text-sm text-slate-600 truncate"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                    {filteredValues.educationLevels.length === 0 &&
                      educationLevelsSearch && (
                        <div className="text-sm text-slate-500 text-center py-2">
                          No education levels found
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            {uniqueValues.subjects.length > 0 && (
              <div className="border border-slate-200 rounded-md p-2">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-700">
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                  Subjects ({uniqueValues.subjects.length})
                </label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search subjects..."
                    value={subjectsSearch}
                    onChange={(e) => setSubjectsSearch(e.target.value)}
                    className="w-full border-slate-300 text-sm"
                  />
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {filteredValues.subjects.map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={filters.subjects.includes(subject)}
                          onChange={() =>
                            toggleArrayFilter("subjects", subject)
                          }
                        />
                        <label
                          htmlFor={`subject-${subject}`}
                          className="text-sm text-slate-600 truncate"
                        >
                          {subject}
                        </label>
                      </div>
                    ))}
                    {filteredValues.subjects.length === 0 && subjectsSearch && (
                      <div className="text-sm text-slate-500 text-center py-2">
                        No subjects found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {uniqueValues.skills.length > 0 && (
              <div className="border border-slate-200 rounded-md p-2">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-700">
                  <Award className="h-4 w-4 text-slate-500" />
                  Skills ({uniqueValues.skills.length})
                </label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search skills..."
                    value={skillsSearch}
                    onChange={(e) => setSkillsSearch(e.target.value)}
                    className="w-full border-slate-300 text-sm"
                  />
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {filteredValues.skills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-3">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onChange={() => toggleArrayFilter("skills", skill)}
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="text-sm text-slate-600 truncate"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                    {filteredValues.skills.length === 0 && skillsSearch && (
                      <div className="text-sm text-slate-500 text-center py-2">
                        No skills found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {uniqueValues.roleNames.length > 0 && (
              <div className="border border-slate-200 rounded-md p-2">
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-700">
                  <Briefcase className="h-4 w-4 text-slate-500" />
                  Roles ({uniqueValues.roleNames.length})
                </label>
                <div className="space-y-2">
                  <Input
                    placeholder="Search roles..."
                    value={rolesSearch}
                    onChange={(e) => setRolesSearch(e.target.value)}
                    className="w-full border-slate-300 text-sm"
                  />
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {filteredValues.roleNames.map((role) => (
                      <div key={role} className="flex items-center space-x-3">
                        <Checkbox
                          id={`role-${role}`}
                          checked={filters.roleNames.includes(role)}
                          onChange={() => toggleArrayFilter("roleNames", role)}
                        />
                        <label
                          htmlFor={`role-${role}`}
                          className="text-sm text-slate-600 truncate"
                        >
                          {role}
                        </label>
                      </div>
                    ))}
                    {filteredValues.roleNames.length === 0 && rolesSearch && (
                      <div className="text-sm text-slate-500 text-center py-2">
                        No roles found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
    
            <div className="border border-slate-200 rounded-md p-2">
              <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-700">
                <DollarSign className="h-4 w-4 text-slate-500" />
                Salary Range
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.salaryRange.min || ""}
                    onChange={(e) =>
                      updateFilter("salaryRange", {
                        ...filters.salaryRange,
                        min: parseInt(e.target.value) || 0,
                      })
                    }
                    className="text-sm border-slate-300"
                  />
                  <span className="text-sm text-slate-500">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.salaryRange.max || ""}
                    onChange={(e) =>
                      updateFilter("salaryRange", {
                        ...filters.salaryRange,
                        max: parseInt(e.target.value) || 200000,
                      })
                    }
                    className="text-sm border-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
