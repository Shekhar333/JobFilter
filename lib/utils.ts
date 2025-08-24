import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: string): number {
  return parseInt(value.replace(/[$,]/g, "")) || 0;
}

export function formatSalary(salary: string): string {
  const numericValue = formatCurrency(salary);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(numericValue);
}

export function calculateCandidateScore(candidate: any): number {
  let score = 0;
  
  // Education score (0-30 points)
  const educationLevels = {
    "High School": 10,
    "Associate's Degree": 15,
    "Bachelor's Degree": 20,
    "Master's Degree": 25,
    "Doctorate": 30,
  };
  score += educationLevels[candidate.education.highest_level as keyof typeof educationLevels] || 0;
  
  // Experience score (5 points per role, max 35)
  score += Math.min(candidate.work_experiences.length * 5, 35);
  
  // Skills score (3 points per skill, max 30)
  score += Math.min(candidate.skills.length * 3, 30);
  
  // Top50 school bonus (5 points)
  if (candidate.education.degrees.some((d: any) => d.isTop50)) {
    score += 5;
  }
  
  return score;
}

export function getUniqueValues<T>(array: T[], key: keyof T): string[] {
  const values = array.flatMap(item => {
    const value = item[key];
    return Array.isArray(value) ? value : [value];
  }).filter(Boolean);
  
  return Array.from(new Set(values as string[])).sort();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
