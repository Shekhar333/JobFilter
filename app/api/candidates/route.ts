import { NextRequest, NextResponse } from "next/server";
import { candidateStorage } from "@/lib/candidateStorage";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const selectedOnly = searchParams.get("selectedOnly") === "true";

  const allCandidates = candidateStorage.getAll();
  let filteredCandidates = allCandidates;

  if (selectedOnly) {
    filteredCandidates = candidateStorage.getSelected();
  }

  return NextResponse.json({
    candidates: filteredCandidates,
    total: filteredCandidates.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, candidateId, candidateIds } = body;

    switch (action) {
      case "select":
        if (candidateId) {
          const updatedCandidate = candidateStorage.update(candidateId, {
            isSelected: true,
          });
          if (!updatedCandidate) {
            return NextResponse.json(
              { error: "Candidate not found" },
              { status: 404 }
            );
          }
        }
        break;

      case "unselect":
        if (candidateId) {
          const updatedCandidate = candidateStorage.update(candidateId, {
            isSelected: false,
          });
          if (!updatedCandidate) {
            return NextResponse.json(
              { error: "Candidate not found" },
              { status: 404 }
            );
          }
        }
        break;

      case "selectMultiple":
        if (candidateIds && Array.isArray(candidateIds)) {
          candidateIds.forEach((id: string) => {
            candidateStorage.update(id, { isSelected: true });
          });
        }
        break;

      case "clearAll":
        const allCandidates = candidateStorage.getAll();
        allCandidates.forEach((candidate) => {
          candidateStorage.update(candidate.id, { isSelected: false });
        });
        break;

      case "reset":
        candidateStorage.clear();
        return NextResponse.json({
          success: true,
          message: "All candidates cleared",
          candidates: [],
        });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const allCandidates = candidateStorage.getAll();
    const selectedCount = candidateStorage.getSelected().length;

    return NextResponse.json({
      success: true,
      selectedCount,
      candidates: allCandidates,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const updatedCandidate = candidateStorage.update(id, updates);
    if (!updatedCandidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      candidate: updatedCandidate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
