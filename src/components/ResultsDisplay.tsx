
import React, { useState } from 'react';
import { Copy, Download, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ResultsDisplayProps {
  results: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(results);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Results have been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy results to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Results have been downloaded as a text file.",
    });
  };

  const formatResults = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Handle markdown-style formatting
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      }
      
      if (line.startsWith('•')) {
        return (
          <li key={index} className="text-gray-700 ml-4 mb-1">
            {line.substring(1).trim()}
          </li>
        );
      }
      
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      return (
        <p key={index} className="text-gray-700 mb-2 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="p-4 bg-gray-100 rounded-full">
          <FileText className="h-12 w-12 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No analysis results yet
          </h3>
          <p className="text-gray-500 max-w-md">
            Upload a document and select an analysis type to see results here. 
            Your AI-powered insights will appear in this area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex space-x-2 pb-4 border-b border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center space-x-2"
        >
          {copied ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      </div>

      {/* Results Content */}
      <div className="prose prose-sm max-w-none">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
          <div className="font-mono text-sm leading-relaxed">
            {formatResults(results)}
          </div>
        </div>
      </div>

      {/* Analysis Info */}
      <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
        <p>Analysis completed at {new Date().toLocaleString()}</p>
        <p>Results are AI-generated and should be reviewed for accuracy.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
