
import React, { useState, useEffect, useRef } from 'react';
import Terminal from './Terminal';

interface CRTMonitorProps {
  isExpanded: boolean;
  onExpand: () => void;
}

const CRTMonitor: React.FC<CRTMonitorProps> = ({ isExpanded, onExpand }) => {
  const [isBooting, setIsBooting] = useState(true);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const lastScrollY = useRef(0);
  const scrollThreshold = 50;

  useEffect(() => {
    const messages = [
      "GNU GRAND UNIFIED BOOTLOADER VER 2.2",
      "-Display 1-",
      "PLEASE SELECT OPERATING SYSTEM TO BOOT:",
      "Portfolio OS",
      "STANDBY FOR AUTOMATIC BOOT IN 20",
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

  useEffect(() => {
    if (!isExpanded) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isExpanded && currentScrollY < lastScrollY.current && currentScrollY < scrollThreshold) {
        returnToPage();
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  const returnToPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const monitorClasses = isExpanded 
    ? "fixed inset-0 w-full h-full z-50 transition-all duration-500 ease-out scale-100" 
    : "w-full max-w-4xl mx-auto relative transition-all duration-500 ease-out scale-95";

  return (
    <div 
      className={`crt-monitor ${monitorClasses}`}
    >
      <div className={`relative ${isExpanded ? "h-screen border-0" : "aspect-[4/3] border-[12px]"} bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border-zinc-800`}>
        
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg overflow-hidden">
          <div className="absolute inset-2 bg-black rounded-2xl overflow-hidden border-2 border-zinc-700">
            <div className="absolute inset-0 bg-[#111] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 box-shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/2 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_3px] pointer-events-none"></div>
              <div className="absolute inset-0 animate-flicker opacity-95 pointer-events-none"></div>
              <div className="absolute inset-0 box-border bg-terminal-amber opacity-[0.025] mix-blend-overlay pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl bg-transparent shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(70,70,70,0.2)_50%,transparent_100%)] opacity-40 h-[20px] w-full animate-scanline pointer-events-none"></div>
              <div className="absolute top-[10%] right-[10%] w-[100px] h-[100px] bg-white opacity-[0.08] rounded-full blur-xl pointer-events-none"></div>
              
              <div className="absolute inset-0 overflow-auto p-6 rounded-xl">
                {isBooting ? (
                  <div className="flex flex-col h-full justify-between text-terminal-amber font-terminal animate-boot-up">
                    <div className="w-full space-y-6">
                      {bootMessages.map((msg, i) => (
                        <div key={i} className={`${i === 0 ? "text-2xl font-bold text-center" : i === 1 || i === 2 ? "text-xl text-center" : ""} mb-1`}>
                          {i === 3 && <span className="mr-3">© </span>}
                          <span className="text-md">{msg}</span>
                          {i === bootMessages.length - 1 && (
                            <span className="inline-block w-3 h-5 ml-1 bg-terminal-amber animate-blink"></span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-8 flex justify-between text-sm">
                      <span>↑/↓ - NAVIGATE</span>
                      <span>C - COMMAND</span>
                      <span>↵ - CONFIRM</span>
                    </div>
                  </div>
                ) : (
                  <Terminal textColor="amber" />
                )}
              </div>
            </div>
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute bottom-2 right-4 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-terminal-amber animate-pulse"></div>
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