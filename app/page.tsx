"use client";

import React, { useState } from "react";
import { Candidate } from "@/types/candidate";
import { useCandidates } from "@/hooks/useCandidates";
import { useFilters } from "@/hooks/useFilters";
import { useFileUpload } from "@/hooks/useFileUpload";
import { CandidatesTable } from "@/components/candidates/CandidatesTable";
import { FilterPanel } from "@/components/candidates/FilterPanel";
import { CandidateDetailsModal } from "@/components/candidates/CandidateDetailsModal";
import { SelectedCandidatesDashboard } from "@/components/dashboard/SelectedCandidatesDashboard";
import { FileUploadDropzone } from "@/components/upload/FileUploadDropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Filter,
  BarChart3,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Star,
  Upload,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const {
    candidates,
    loading,
    error,
    selectedCount,
    refreshCandidates,
    selectCandidate,
    unselectCandidate,
    clearAllSelections,
  } = useCandidates();

  const { filters, filteredCandidates, clearFilters, updateFilters } =
    useFilters(candidates);

  const { uploadFile, isUploading, uploadError, clearError } = useFileUpload();

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("candidates");
  const [showUploadView, setShowUploadView] = useState(false);
  const [showMaxSelectionAlert, setShowMaxSelectionAlert] = useState(false);

  const selectedCandidates = candidates.filter((c) => c.isSelected);

  const handleSelectCandidate = async (candidateId: string) => {
    if (selectedCount >= 5) {
      setShowMaxSelectionAlert(true);
      setTimeout(() => setShowMaxSelectionAlert(false), 5000); // Auto-hide after 5 seconds
      return;
    }

    await selectCandidate(candidateId);
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
  };

  const handleFileUpload = async (uploadedCandidates: Candidate[]) => {
    try {
      clearError();
      await uploadFile(uploadedCandidates);
      await refreshCandidates();
      setShowUploadView(false);
    } catch (error) {
      // Error is handled by useFileUpload hook
    }
  };

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error);
  };

  const showUploadInterface = candidates.length === 0 && !loading;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading candidates...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">
              Error Loading Candidates
            </h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={refreshCandidates}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-lg"></div>
                <div className="relative rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-3 shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  JobFilter
                </h1>
                <p className="text-slate-600 text-base font-medium">
                  Find the perfect team for your startup
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {candidates.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {filteredCandidates.length} / {candidates.length} candidates
                  </Badge>
                  <Badge
                    variant={
                      selectedCount === 5
                        ? "default"
                        : selectedCount > 0
                        ? "secondary"
                        : "outline"
                    }
                    className={cn(
                      "text-xs sm:text-sm",
                      selectedCount === 5
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    )}
                  >
                    {selectedCount} / 5 selected
                    {selectedCount === 5 && (
                      <CheckCircle className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                {candidates.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      onClick={refreshCandidates}
                      size="sm"
                    >
                      <RefreshCw className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Refresh</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowUploadView(!showUploadView)}
                      size="sm"
                    >
                      <Upload className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {showUploadView ? "Hide Upload" : "Upload New Data"}
                      </span>
                      <span className="sm:hidden">Upload</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Maximum Selection Alert */}
      {showMaxSelectionAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert variant="warning" className="shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You can only select up to 5 candidates for your team.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Show upload interface when no candidates or when explicitly requested */}
        {(showUploadInterface || showUploadView) && (
          <div className="mb-8">
            {candidates.length === 0 ? (
              <div className="text-center mb-6">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to JobFilter
                </h2>
                <p className="text-muted-foreground mb-4">
                  Upload your candidate data to start filtering and building
                  your dream team
                </p>
              </div>
            ) : (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Upload New Candidate Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Upload a new JSON file to replace the current candidate
                    data.
                  </p>
                </CardContent>
              </Card>
            )}

            <FileUploadDropzone
              onFileUpload={handleFileUpload}
              onError={handleUploadError}
              isLoading={isUploading}
            />

            {uploadError && (
              <Card className="mt-4 border-destructive">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Upload Error</span>
                  </div>
                  <p className="text-sm text-destructive mt-1">{uploadError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearError}
                    className="mt-2"
                  >
                    Dismiss
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Main application interface - only show when we have candidates */}
        {candidates.length > 0 && !showUploadView && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6 h-auto">
              <TabsTrigger
                value="candidates"
                className="flex items-center gap-1 sm:gap-2 p-3"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">All</span>
                <span>Candidates</span>
              </TabsTrigger>
              <TabsTrigger
                value="selected"
                className="flex items-center gap-1 sm:gap-2 p-3"
              >
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Selected</span>
                <span>Team ({selectedCount})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="candidates" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-4">
                {/* Filter Panel */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                  <div className="lg:sticky lg:top-24">
                    <FilterPanel
                      candidates={candidates}
                      filters={filters}
                      onFiltersChange={updateFilters}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2">
                  <Card className="card-modern shadow-strong">
                    <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                            <Filter className="h-5 w-5 text-white" />
                          </div>
                          Candidate Pool
                          <Badge
                            variant="secondary"
                            className="ml-2 bg-purple-100 text-purple-700 border-purple-200"
                          >
                            {filteredCandidates.length} found
                          </Badge>
                        </CardTitle> */}
                        {/* <div className="flex items-center gap-2">
                          {Object.values(filters).some((value) =>
                            Array.isArray(value)
                              ? value.length > 0
                              : typeof value === "string"
                              ? value.length > 0
                              : typeof value === "object" && value !== null
                              ? Object.values(value).some(
                                  (v) => v !== 0 && v !== 200000
                                )
                              : value === true
                          ) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={clearFilters}
                            >
                              Clear Filters
                            </Button>
                          )}
                        </div> */}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-hidden">
                        <CandidatesTable
                          candidates={filteredCandidates}
                          onSelectCandidate={handleSelectCandidate}
                          onUnselectCandidate={unselectCandidate}
                          onViewCandidate={handleViewCandidate}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="selected">
              <SelectedCandidatesDashboard
                selectedCandidates={selectedCandidates}
                onViewCandidate={handleViewCandidate}
                onUnselectCandidate={unselectCandidate}
                onClearAllSelections={clearAllSelections}
              />
            </TabsContent>

            <TabsContent value="analytics">
              <SelectedCandidatesDashboard
                selectedCandidates={selectedCandidates}
                onViewCandidate={handleViewCandidate}
                onUnselectCandidate={unselectCandidate}
                onClearAllSelections={clearAllSelections}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Candidate Details Modal */}
      <CandidateDetailsModal
        candidate={selectedCandidate}
        open={!!selectedCandidate}
        onOpenChange={handleCloseModal}
        onSelect={handleSelectCandidate}
        onUnselect={unselectCandidate}
      />
    </div>
  );
}
