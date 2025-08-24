"use client";

import React, { useState, useEffect } from "react";
import { Candidate } from "@/types/candidate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  GraduationCap,
  Briefcase,
  Award,
  Clock,
  X,
} from "lucide-react";
import { formatSalary, calculateCandidateScore } from "@/lib/utils";

interface CandidateDetailsModalProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (candidateId: string) => void;
  onUnselect?: (candidateId: string) => void;
}

export function CandidateDetailsModal({
  candidate,
  open,
  onOpenChange,
  onSelect,
}: CandidateDetailsModalProps) {
  const [localIsSelected, setLocalIsSelected] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (candidate && open) {
      setLocalIsSelected(null); 
    }
  }, [candidate?.id, open]);

  useEffect(() => {
    if (
      candidate &&
      localIsSelected !== null &&
      localIsSelected === candidate.isSelected
    ) {
      setLocalIsSelected(null);
      setIsProcessing(false);
    }
  }, [candidate?.isSelected, localIsSelected]);

  if (!candidate || !open) return null;

  const currentIsSelected =
    localIsSelected !== null ? localIsSelected : candidate.isSelected;

  const score = calculateCandidateScore(candidate);
  const submittedDate = new Date(candidate.submitted_at).toLocaleDateString();

  const educationScore = Math.min(
    candidate.education.degrees.length * 5 +
      (candidate.education.degrees.some((d) => d.isTop50) ? 5 : 0),
    35
  );
  const experienceScore = Math.min(candidate.work_experiences.length * 5, 35);
  const skillsScore = Math.min(candidate.skills.length * 3, 30);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-default"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-default rounded-lg">
        <div className="w-[60vw] h-[85vh] bg-white rounded-lg shadow-2xl flex flex-col max-w-[90vw] max-h-[90vh] relative">
          <div className="absolute top-[-10px] right-[-10px] z-10 ">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 rounded-full hover:bg-slate-200 transition-colors bg-gray-300 backdrop-blur-sm"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          <div className="flex-shrink-0 px-6 py-5 border-b bg-gradient-to-br from-slate-50 to-white rounded-t-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 max-w-[61.8%]">
                <h1 className="text-2xl font-light tracking-tight text-slate-900 mb-3">
                  {candidate.name}
                </h1>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <Mail className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-xs">
                      {candidate.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <Phone className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-xs">
                      {candidate.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-xs">
                      {candidate.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-xs">
                      Applied {submittedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="text-2xl font-light text-slate-900 mb-1">
                    {score}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">
                    Overall Score
                  </div>
                </div>
                {currentIsSelected && (
                  <Button
                    variant="outline"
                    disabled={isProcessing}
                    size="sm"
                    className="text-slate-600 border-slate-300 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 rounded-full px-4"
                  >
                    ✓ Selected
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="h-4 w-4 text-slate-600" />
                </div>
                <div className="text-xl font-light text-slate-900 mb-1">
                  {educationScore}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Education
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="h-4 w-4 text-slate-600" />
                </div>
                <div className="text-xl font-light text-slate-900 mb-1">
                  {experienceScore}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Experience
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-center">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="h-4 w-4 text-slate-600" />
                </div>
                <div className="text-xl font-light text-slate-900 mb-1">
                  {skillsScore}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  Skills
                </div>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 shadow-sm text-center text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="text-xl font-light mb-1">{score}</div>
                <div className="text-xs text-slate-300 uppercase tracking-wider">
                  Total Score
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                  <h2 className="text-lg font-light text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-slate-600" />
                    </div>
                    Application Details
                  </h2>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
                        Work Availability
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.work_availability.map((availability) => (
                          <Badge
                            key={availability}
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2 py-1 rounded-full font-medium text-xs"
                          >
                            {availability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
                        Salary Expectations
                      </h3>
                      <div className="space-y-2">
                        {candidate.annual_salary_expectation["full-time"] && (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-3 w-3 text-slate-600" />
                            </div>
                            <div>
                              <span className="text-xs text-slate-600">
                                Full-time:
                              </span>
                              <span className="ml-1 font-semibold text-slate-900 text-sm">
                                {formatSalary(
                                  candidate.annual_salary_expectation[
                                    "full-time"
                                  ]
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                        {candidate.annual_salary_expectation["part-time"] && (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-3 w-3 text-slate-600" />
                            </div>
                            <div>
                              <span className="text-xs text-slate-600">
                                Part-time:
                              </span>
                              <span className="ml-1 font-semibold text-slate-900 text-sm">
                                {formatSalary(
                                  candidate.annual_salary_expectation[
                                    "part-time"
                                  ]
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                  <h2 className="text-lg font-light text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-slate-600" />
                    </div>
                    Skills & Technologies
                    <span className="ml-1 text-xs text-slate-500">
                      ({candidate.skills.length})
                    </span>
                  </h2>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1 rounded-full font-medium text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                  <h2 className="text-lg font-light text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-slate-600" />
                    </div>
                    Education Background
                  </h2>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <Badge
                      variant="default"
                      className="bg-slate-900 text-white px-3 py-1 rounded-full font-medium mr-2 text-xs"
                    >
                      {candidate.education.highest_level}
                    </Badge>
                    {candidate.education.degrees.some((d) => d.isTop50) && (
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium text-xs"
                      >
                        ⭐ Top 50 School
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-3">
                    {candidate.education.degrees.map((degree, index) => (
                      <div
                        key={index}
                        className="py-2 border-b border-slate-100 last:border-0"
                      >
                        <h4 className="text-sm font-medium text-slate-900 mb-1">
                          {degree.degree} in {degree.subject}
                        </h4>
                        <p className="text-slate-600 text-sm mb-1">
                          {degree.originalSchool}
                        </p>
                        <p className="text-xs text-slate-500">
                          {degree.startDate} - {degree.endDate} • GPA:{" "}
                          {degree.gpa}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                  <h2 className="text-lg font-light text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-slate-600" />
                    </div>
                    Work Experience
                    <span className="ml-1 text-xs text-slate-500">
                      ({candidate.work_experiences.length})
                    </span>
                  </h2>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    {candidate.work_experiences.map((experience, index) => (
                      <div
                        key={index}
                        className="py-2 border-b border-slate-100 last:border-0"
                      >
                        <h4 className="text-sm font-medium text-slate-900 mb-1">
                          {experience.roleName}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {experience.company}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
