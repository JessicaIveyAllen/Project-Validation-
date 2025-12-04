import React, { useState } from 'react';
import { MethodItem } from '../types';
import { ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';

interface MethodCardProps {
  method: MethodItem;
  delayIndex: number;
}

const MethodCard: React.FC<MethodCardProps> = ({ method, delayIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delayIndex * 0.1}s` }}
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-5 cursor-pointer flex justify-between items-center transition-colors duration-300
          ${isOpen ? 'bg-gradient-to-r from-indigo-500/90 to-purple-600/90 text-white' : 'hover:bg-indigo-50/50 text-slate-800'}
        `}
      >
        <h3 className="font-bold text-lg font-display">{method.title}</h3>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      
      <div className={`
        overflow-hidden transition-all duration-300 ease-in-out bg-white/40
        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-6">
          <p className="text-slate-700 mb-4 leading-relaxed">{method.description}</p>
          <ul className="space-y-2">
            {method.details.map((detail, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {!isOpen && (
         <div className="px-6 pb-6 pt-2">
            <p className="text-sm text-slate-500 line-clamp-2">{method.description}</p>
         </div>
      )}
    </div>
  );
};

export default MethodCard;
