"use client";

import React from "react";
import { Candidate } from "@/types/candidate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Trophy,
  DollarSign,
  MapPin,
  GraduationCap,
  Award,
  Eye,
  X,
} from "lucide-react";
import { calculateCandidateScore } from "@/lib/utils";

interface SelectedCandidatesDashboardProps {
  selectedCandidates: Candidate[];
  onViewCandidate: (candidate: Candidate) => void;
  onUnselectCandidate: (candidateId: string) => void;
  onClearAllSelections: () => void;
}

export function SelectedCandidatesDashboard({
  selectedCandidates,
  onViewCandidate,
  onUnselectCandidate,
  onClearAllSelections,
}: SelectedCandidatesDashboardProps) {
  const totalSelected = selectedCandidates.length;
  const averageScore =
    selectedCandidates.length > 0
      ? selectedCandidates.reduce(
          (sum, candidate) => sum + calculateCandidateScore(candidate),
          0
        ) / selectedCandidates.length
      : 0;

  const averageSalary =
    selectedCandidates.length > 0
      ? selectedCandidates
          .filter((c) => c.annual_salary_expectation["full-time"])
          .reduce(
            (sum, c) =>
              sum +
              parseInt(
                c.annual_salary_expectation["full-time"]!.replace(/[$,]/g, "")
              ),
            0
          ) /
        selectedCandidates.filter(
          (c) => c.annual_salary_expectation["full-time"]
        ).length
      : 0;

  const locationDistribution = selectedCandidates.reduce((acc, candidate) => {
    acc[candidate.location] = (acc[candidate.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const skillsDistribution = selectedCandidates.reduce((acc, candidate) => {
    candidate.skills.forEach((skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topSkills = Object.entries(skillsDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const educationDistribution = selectedCandidates.reduce((acc, candidate) => {
    acc[candidate.education.highest_level] =
      (acc[candidate.education.highest_level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (totalSelected === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">
              No candidates selected
            </h3>
            <p className="text-muted-foreground">
              Start selecting candidates to see your hiring dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Selected Candidates Dashboard</h2>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-sm">
            {totalSelected} / 5 selected
          </Badge>
          {totalSelected > 0 && (
            <Button variant="outline" size="sm" onClick={onClearAllSelections}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{totalSelected}</div>
                <div className="text-sm text-muted-foreground">Candidates</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(averageScore)}
                </div>
                <div className="text-sm text-muted-foreground">Avg Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  ${Math.round(averageSalary / 1000)}k
                </div>
                <div className="text-sm text-muted-foreground">Avg Salary</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {Object.keys(locationDistribution).length}
                </div>
                <div className="text-sm text-muted-foreground">Locations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Selected Team ({totalSelected}/5)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-medium">{candidate.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {candidate.location}
                          <span>•</span>
                          <Trophy className="h-3 w-3" />
                          {calculateCandidateScore(candidate)} pts
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {candidate.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewCandidate(candidate)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUnselectCandidate(candidate.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topSkills.map(([skill, count]) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(count / totalSelected) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(educationDistribution).map(([level, count]) => (
                  <div
                    key={level}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{level}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(count / totalSelected) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(locationDistribution).map(
                  ([location, count]) => (
                    <div
                      key={location}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{location}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(count / totalSelected) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {count}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {totalSelected === 5 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  Perfect Team Selected! 🎉
                </h3>
                <p className="text-green-700">
                  You've selected 5 candidates for your startup. Review their
                  profiles and skills to finalize your hiring decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
