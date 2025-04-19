import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';

interface CRTMonitorProps {
  isExpanded: boolean;
  onExpand: () => void;
}

const CRTMonitor: React.FC<CRTMonitorProps> = ({ isExpanded, onExpand }) => {
  const [isBooting, setIsBooting] = useState(true);
  const [bootMessages, setBootMessages] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      "Initializing system...",
      "Running memory check...",
      "Memory OK: 640K",
      "Loading terminal...",
      "Initializing display adapter...",
      "Loading content modules...",
      "System ready."
    ];

    let index = 0;
    const timer = setInterval(() => {
      if (index < messages.length) {
        setBootMessages(prev => [...prev, messages[index]]);
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsBooting(false);
        }, 1000);
      }
    }, 300);

    return () => clearInterval(timer);
  }, []);

  const monitorClasses = isExpanded 
    ? "fixed inset-0 w-full h-full z-50 animate-zoom-out" 
    : "w-full max-w-4xl mx-auto relative cursor-pointer";

  return (
    <div 
      className={`crt-monitor ${monitorClasses}`}
      onClick={() => !isExpanded && onExpand()}
    >
      {/* CRT Frame */}
      <div className={`relative ${isExpanded ? "h-screen" : "aspect-[4/3]"} bg-zinc-800 rounded-lg overflow-hidden shadow-2xl border-4 border-zinc-900`}>
        
        {/* Screen Bezel */}
        <div className="absolute inset-1 bg-black rounded-md overflow-hidden">
          {/* Screen with Curved Effect */}
          <div className="absolute inset-0 bg-terminal-dark overflow-hidden">
            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
            
            {/* Screen Flicker */}
            <div className="absolute inset-0 animate-flicker opacity-95 pointer-events-none"></div>
            
            {/* Screen Glow */}
            <div className="absolute inset-0 box-border bg-terminal-green opacity-[0.015] mix-blend-overlay pointer-events-none"></div>
            
            {/* Screen Content */}
            <div className="absolute inset-0 overflow-auto p-6">
              {isBooting ? (
                <div className="flex flex-col h-full justify-start items-start text-terminal-green font-terminal animate-boot-up">
                  <pre className="text-xl mb-4">
                    {`
   ____            _    __       _ _       
  |  _ \\ ___  _ __| |_ / _| ___ | (_) ___  
  | |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\ 
  |  __/ (_) | |  | |_|  _| (_) | | | (_) |
  |_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ 
                                          
  BIOS v1.0.4 - Terminal Interface System
`}
                  </pre>
                  {bootMessages.map((msg, i) => (
                    <div key={i} className="mb-1 flex items-center">
                      <span className="text-md">{msg}</span>
                      {i === bootMessages.length - 1 && msg === "System ready." && (
                        <span className="inline-block w-3 h-5 ml-1 bg-terminal-green animate-blink"></span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Terminal />
              )}
            </div>
            
            {/* CRT Curvature Effect */}
            <div className="absolute inset-0 rounded-lg bg-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none"></div>
            
            {/* Moving Scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(50,50,50,0.3)_50%,transparent_100%)] opacity-40 h-[20px] w-full animate-scanline pointer-events-none"></div>
          </div>
        </div>

        {/* Power Button and Status Light - only visible when not expanded */}
        {!isExpanded && (
          <div className="absolute bottom-2 right-4 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></div>
            <div className="w-8 h-3 rounded-sm bg-zinc-900"></div>
          </div>
        )}
      </div>

      {/* Instructions when not expanded */}
      {!isExpanded && (
        <div className="text-center mt-4 text-gray-400 text-sm animate-pulse">
          Click the monitor to expand
        </div>
      )}
    </div>
  );
};

export default CRTMonitor;