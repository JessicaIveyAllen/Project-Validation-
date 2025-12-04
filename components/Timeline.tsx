import React, { useState } from 'react';
import { TIMELINE_PHASES } from '../constants';
import { ChevronRight, ChevronDown, Clock, FileText } from 'lucide-react';

const Timeline: React.FC = () => {
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({ 'p1': true });

  const togglePhase = (id: string) => {
    setExpandedPhases(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="relative pl-4 sm:pl-8 py-4">
      {TIMELINE_PHASES.map((phase, index) => {
        const isExpanded = expandedPhases[phase.id];
        const isLast = index === TIMELINE_PHASES.length - 1;

        return (
          <div key={phase.id} className="relative mb-8 last:mb-0">
            {/* Timeline Line */}
            {!isLast && (
               <div className="absolute left-[7px] top-8 bottom-[-32px] w-0.5 bg-gradient-to-b from-indigo-500 to-indigo-200/20"></div>
            )}
            
            {/* Timeline Dot */}
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 z-10 border-2 border-white"></div>

            <div className="ml-8 sm:ml-12">
              <div 
                className={`
                  glass-card rounded-xl overflow-hidden transition-all duration-300 border border-white/50
                  ${isExpanded ? 'shadow-lg ring-1 ring-indigo-500/20' : 'hover:shadow-md'}
                `}
              >
                <div 
                  onClick={() => togglePhase(phase.id)}
                  className="p-4 sm:p-5 cursor-pointer flex justify-between items-center group bg-white/60"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 font-display group-hover:text-indigo-600 transition-colors">
                      {phase.title}
                    </h3>
                    <div className="flex items-center text-xs text-slate-500 mt-1 space-x-2">
                      <Clock size={12} />
                      <span>{phase.duration}</span>
                    </div>
                  </div>
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${isExpanded ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}
                  `}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                <div className={`
                  transition-all duration-500 ease-in-out overflow-hidden bg-slate-50/50
                  ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="p-5 sm:p-6 border-t border-indigo-100/50">
                    <p className="text-slate-600 mb-6 italic">{phase.description}</p>
                    
                    <div className="space-y-6">
                      {phase.items.map((item, idx) => (
                        <div key={idx} className="relative pl-4 border-l-2 border-indigo-200">
                          <h4 className="font-semibold text-slate-800 text-sm mb-2">{item.title}</h4>
                          <ul className="mb-3 space-y-1">
                            {item.points.map((point, pIdx) => (
                              <li key={pIdx} className="text-xs sm:text-sm text-slate-600 flex items-start">
                                <span className="mr-2 text-indigo-400">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full w-fit">
                            <FileText size={12} className="mr-1.5" />
                            Deliverable: {item.deliverable}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
