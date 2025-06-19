
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Brain, Languages, Lightbulb, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';
import AnalysisOptions from '@/components/AnalysisOptions';
import ResultsDisplay from '@/components/ResultsDisplay';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisType, setAnalysisType] = useState<string>('summary');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<string>('');
  const [documentText, setDocumentText] = useState<string>('');

  const handleFileUpload = useCallback((file: File) => {
    setUploadedFile(file);
    setResults('');
    
    // Simulate document text extraction
    setTimeout(() => {
      const sampleText = `Document: ${file.name}
      
This is a sample document analysis. In a real implementation, this would extract actual text from your ${file.type} file using libraries like PDF.js for PDFs, mammoth for Word documents, or other appropriate parsers.

Key sections detected:
• Introduction and overview
• Main content analysis
• Technical specifications
• Conclusion and recommendations

The document appears to contain structured information that can be effectively processed for various analysis tasks including summarization, translation, and key insight extraction.`;
      
      setDocumentText(sampleText);
      toast({
        title: "Document uploaded successfully!",
        description: `${file.name} is ready for analysis.`,
      });
    }, 1000);
  }, []);

  const handleAnalysis = useCallback(async () => {
    if (!uploadedFile || !documentText) {
      toast({
        title: "No document",
        description: "Please upload a document first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      let analysisResult = '';
      
      switch (analysisType) {
        case 'summary':
          analysisResult = `📄 **Document Summary**

**File:** ${uploadedFile.name}

**Key Points:**
• This document contains structured information suitable for various analytical processes
• Multiple sections identified including introduction, main content, and conclusions
• Technical specifications and recommendations are present
• Content is well-organized and ready for further processing

**Overview:** The uploaded document represents a comprehensive resource with clear organization and detailed information that can be effectively utilized for business intelligence, research, or educational purposes.`;
          break;
          
        case 'translate':
          analysisResult = `🌍 **Translation Analysis**

**Source Language:** English (detected)
**Target Language:** Spanish (example)

**Translated Content:**
"Documento: ${uploadedFile.name}

Este es un análisis de documento de muestra. En una implementación real, esto extraería texto real de su archivo ${uploadedFile.type} utilizando bibliotecas como PDF.js para PDFs, mammoth para documentos de Word, u otros analizadores apropiados."

**Translation Notes:**
• High confidence translation
• Technical terms preserved
• Context maintained throughout
• Ready for review and export`;
          break;
          
        case 'insights':
          analysisResult = `💡 **Key Insights & Analysis**

**Document Intelligence Report for:** ${uploadedFile.name}

**Structural Analysis:**
• Document follows standard formatting conventions
• Clear hierarchical organization detected
• Technical content with actionable recommendations

**Content Insights:**
• Primary focus on document processing capabilities
• Integration potential with multiple file formats
• Scalable architecture for various analysis types

**Recommendations:**
• Implement real-time processing for larger documents
• Consider batch processing for multiple files
• Enhance user feedback during analysis phases

**Confidence Score:** 94% - High quality analysis ready for implementation`;
          break;
          
        default:
          analysisResult = 'Analysis type not recognized. Please select a valid analysis option.';
      }
      
      setResults(analysisResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: `${analysisType} generated successfully.`,
      });
    }, 3000);
  }, [uploadedFile, documentText, analysisType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Document Analyzer
              </h1>
              <p className="text-gray-600 text-sm">
                Upload, analyze, and extract insights from any document
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Options */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border border-purple-200 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Upload className="h-5 w-5 text-purple-600" />
                <span>Upload Document</span>
              </h2>
              <FileUpload onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-sm border border-purple-200 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>Analysis Options</span>
              </h2>
              <AnalysisOptions 
                selectedType={analysisType} 
                onTypeChange={setAnalysisType}
                onAnalyze={handleAnalysis}
                isAnalyzing={isAnalyzing}
                disabled={!uploadedFile}
              />
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border border-purple-200 shadow-xl min-h-[600px]">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <span>Analysis Results</span>
              </h2>
              
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-96 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
                  <p className="text-lg font-medium text-gray-700">Analyzing document...</p>
                  <p className="text-sm text-gray-500">This may take a few moments</p>
                </div>
              ) : (
                <ResultsDisplay results={results} />
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-purple-100 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">Powered by AI • Supports PDF, DOCX, TXT, and more</p>
            <div className="flex justify-center space-x-6 text-sm">
              <span className="flex items-center space-x-1">
                <Brain className="h-4 w-4" />
                <span>Smart Analysis</span>
              </span>
              <span className="flex items-center space-x-1">
                <Languages className="h-4 w-4" />
                <span>Multi-language</span>
              </span>
              <span className="flex items-center space-x-1">
                <Lightbulb className="h-4 w-4" />
                <span>Key Insights</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
