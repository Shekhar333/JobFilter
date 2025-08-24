import { NextRequest, NextResponse } from "next/server";
import { Candidate } from "@/types/candidate";
import { candidateStorage } from "@/lib/candidateStorage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidates: uploadedCandidates } = body;

    if (!Array.isArray(uploadedCandidates)) {
      return NextResponse.json(
        { error: "Invalid data format. Expected an array of candidates." },
        { status: 400 }
      );
    }

    // Validate and process candidates
    const processedCandidates: Candidate[] = uploadedCandidates.map(
      (candidate, index) => {
        // Ensure required fields exist
        const requiredFields = [
          "name",
          "email",
          "location",
          "work_availability",
          "work_experiences",
          "education",
          "skills",
        ];

        for (const field of requiredFields) {
          if (!candidate[field]) {
            throw new Error(
              `Missing required field '${field}' for candidate ${index + 1}`
            );
          }
        }

        // Process and normalize the candidate data
        return {
          id: candidate.id || `candidate-${index + 1}`,
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone || "",
          location: candidate.location,
          submitted_at: candidate.submitted_at || new Date().toISOString(),
          work_availability: Array.isArray(candidate.work_availability)
            ? candidate.work_availability
            : [candidate.work_availability],
          annual_salary_expectation: candidate.annual_salary_expectation || {},
          work_experiences: Array.isArray(candidate.work_experiences)
            ? candidate.work_experiences
            : [],
          education: {
            highest_level: candidate.education?.highest_level || "",
            degrees: Array.isArray(candidate.education?.degrees)
              ? candidate.education.degrees
              : [],
          },
          skills: Array.isArray(candidate.skills) ? candidate.skills : [],
          isSelected: candidate.isSelected || false,
        };
      }
    );

    // Store the processed candidates using shared storage
    candidateStorage.setAll(processedCandidates);

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${processedCandidates.length} candidates`,
      candidateCount: processedCandidates.length,
      candidates: processedCandidates,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process uploaded file. Please check your data format.",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  const allCandidates = candidateStorage.getAll();
  return NextResponse.json({
    candidates: allCandidates,
    total: allCandidates.length,
  });
}
