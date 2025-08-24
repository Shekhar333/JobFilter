export interface WorkExperience {
  company: string;
  roleName: string;
}

export interface Degree {
  degree: string;
  subject: string;
  school: string;
  gpa: string;
  startDate: string;
  endDate: string;
  originalSchool: string;
  isTop50: boolean;
}

export interface Education {
  highest_level: string;
  degrees: Degree[];
}

export interface AnnualSalaryExpectation {
  "full-time"?: string;
  "part-time"?: string;
}

export type WorkAvailability = "full-time" | "part-time";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  submitted_at: string;
  work_availability: WorkAvailability[];
  annual_salary_expectation: AnnualSalaryExpectation;
  work_experiences: WorkExperience[];
  education: Education;
  skills: string[];
  isSelected?: boolean;
  score?: number;
}

export interface FilterState {
  search: string;
  skills: string[];
  locations: string[];
  availability: WorkAvailability[];
  educationLevels: string[];
  experienceCompanies: string[];
  roleNames: string[];
  subjects: string[];
  schools: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  selectedOnly: boolean;
}

export interface ColumnFilter {
  id: string;
  value: unknown;
}

export interface SortingState {
  id: string;
  desc: boolean;
}
[];
