
import React from 'react';
import { FileText, Languages, Lightbulb, Brain, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AnalysisOptionsProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  disabled: boolean;
}

const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({
  selectedType,
  onTypeChange,
  onAnalyze,
  isAnalyzing,
  disabled
}) => {
  const options = [
    {
      id: 'summary',
      title: 'Summarize',
      description: 'Generate a concise summary of the document',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'translate',
      title: 'Translate',
      description: 'Translate document to different languages',
      icon: Languages,
      color: 'green'
    },
    {
      id: 'insights',
      title: 'Extract Insights',
      description: 'Identify key points and actionable insights',
      icon: Lightbulb,
      color: 'purple'
    }
  ];

  const getOptionClasses = (optionId: string, color: string) => {
    const isSelected = selectedType === optionId;
    const baseClasses = "p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:scale-105";
    
    if (isSelected) {
      return `${baseClasses} border-${color}-300 bg-${color}-50/50 shadow-md`;
    }
    return `${baseClasses} border-gray-200 hover:border-${color}-200 hover:bg-${color}-50/30`;
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedType === option.id;
          
          return (
            <div
              key={option.id}
              className={`
                p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:scale-105
                ${isSelected 
                  ? `border-purple-300 bg-purple-50/50 shadow-md` 
                  : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/30'
                }
              `}
              onClick={() => onTypeChange(option.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  p-2 rounded-lg
                  ${isSelected ? 'bg-purple-100' : 'bg-gray-100'}
                `}>
                  <IconComponent className={`
                    h-5 w-5
                    ${isSelected ? 'text-purple-600' : 'text-gray-600'}
                  `} />
                </div>
                <div className="flex-1">
                  <h3 className={`
                    font-medium
                    ${isSelected ? 'text-purple-900' : 'text-gray-900'}
                  `}>
                    {option.title}
                  </h3>
                  <p className={`
                    text-sm mt-1
                    ${isSelected ? 'text-purple-700' : 'text-gray-600'}
                  `}>
                    {option.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={onAnalyze}
        disabled={disabled || isAnalyzing}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Brain className="h-5 w-5 mr-2" />
            Start Analysis
          </>
        )}
      </Button>

      {disabled && (
        <p className="text-sm text-gray-500 text-center">
          Please upload a document to begin analysis
        </p>
      )}
    </div>
  );
};

export default AnalysisOptions;
