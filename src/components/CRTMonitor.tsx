
import React, { useState, useEffect, useRef } from 'react';
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

  // Apply appropriate classes based on expanded state
  const monitorClasses = isExpanded 
    ? "fixed inset-0 w-full h-full z-50 transition-all duration-500 ease-out scale-100" 
    : "w-full max-w-4xl mx-auto relative transition-all duration-500 ease-out scale-105";

  return (
    <div 
      className={`crt-monitor ${monitorClasses}`}
    >
      <div className={`relative ${isExpanded ? "h-screen border-0" : "aspect-[4/3] border-8"} bg-zinc-800 rounded-lg overflow-hidden shadow-2xl border-zinc-700`}>
        
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-lg overflow-hidden">
          <div className="absolute inset-2 bg-black rounded-md overflow-hidden border border-zinc-600">
            <div className="absolute inset-0 bg-terminal-dark overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.04)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
              <div className="absolute inset-0 animate-flicker opacity-95 pointer-events-none"></div>
              <div className="absolute inset-0 box-border bg-terminal-green opacity-[0.015] mix-blend-overlay pointer-events-none"></div>
              <div className="absolute inset-0 rounded-lg bg-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(50,50,50,0.3)_50%,transparent_100%)] opacity-40 h-[20px] w-full animate-scanline pointer-events-none"></div>
              <div className="absolute inset-0 overflow-auto p-6 rounded-md">
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
            </div>
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute bottom-2 right-4 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></div>
            <div className="w-8 h-3 rounded-sm bg-zinc-900"></div>
          </div>
        )}
        
        {!isExpanded && (
          <>
            <div className="absolute top-10 bottom-10 left-0 w-1 bg-zinc-900">
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
            </div>
            <div className="absolute top-10 bottom-10 right-0 w-1 bg-zinc-900">
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CRTMonitor;