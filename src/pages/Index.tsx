
import { useState, useEffect, useRef } from 'react';
import CRTMonitor from '../components/CRTMonitor';

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const prevScrollY = useRef(0);
  const hasExpanded = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50 && !hasExpanded.current) {
        handleExpand();
        hasExpanded.current = true;
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        document.body.classList.remove('overflow-hidden');
        hasExpanded.current = false; 
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
    document.body.classList.add('overflow-hidden');
  };

  if (!showContent) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4 sm:px-6 transition-all duration-300">
      <div className={`transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
        <header className="max-w-4xl mx-auto mb-12 text-white text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-terminal text-terminal-amber animate-text-flicker">
            Madhurjya Dasgupta Portfolio
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A vintage computer interface showcasing my projects and skills.
            Scroll down to explore the terminal.
          </p>
        </header>
      </div>

      <CRTMonitor isExpanded={isExpanded} onExpand={handleExpand} />

      <div className={`max-w-4xl mx-auto mt-8 text-center text-gray-400 transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
        <p className="mb-2">Scroll down to expand the terminal</p>
        <p className="text-sm">When expanded, try these commands: <code className="text-terminal-green">whoami</code>, <code className="text-terminal-green">projects</code>, <code className="text-terminal-green">skills</code>, <code className="text-terminal-green">help</code></p>
        <p className="text-sm mt-2">Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">ESC</kbd> or scroll up to exit full screen mode.</p>        
        <div className="h-40"></div>
      </div>
    </div>
  );
};

export default Index;