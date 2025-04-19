import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import portfolioData from '../data/portfolio.json'; type Command = {
    input: string;
    output: React.ReactNode;
}; const Terminal: React.FC = () => {
    const [commands, setCommands] = useState<Command[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);  // Initial welcome message
    useEffect(() => {
        addOutput(`Welcome to the Terminal Portfolio of ${portfolioData.personal.name}!
Type 'help' to see available commands.`);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [commands]);
    useEffect(() => {
        const handleClick = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []); const addOutput = (output: React.ReactNode) => {
        setCommands(prev => [...prev, { input: '', output }]);
    }; const processCommand = (cmd: string) => {
        setCommands(prev => [...prev, { input: cmd, output: null }]);
        setCommandHistory(prev => [cmd, ...prev]);
        setHistoryIndex(-1); const trimmedCmd = cmd.trim().toLowerCase();
        const [command, ...args] = trimmedCmd.split(' ');

        switch (command) {
            case 'help':
                return showHelp();
            case 'clear':
                return clearTerminal();
            case 'whoami':
                return showAbout();
            case 'ls':
                return listItems(args[0]);
            case 'cat':
                return showFile(args[0]);
            case 'social':
                return showSocial();
            case 'projects':
                return showProjects();
            case 'skills':
                return showSkills();
            case 'experience':
                return showExperience();
            case 'education':
                return showEducation();
            case 'contact':
                return showContact();
            case 'echo':
                return addOutput(args.join(' '));
            case 'date':
                return addOutput(new Date().toString());
            case 'reboot':
                return rebootSystem();
            case '':
                return;
            default:
                return addOutput(`Command not found: ${command}. Type 'help' for available commands.`);
        }
    };
    
    const showHelp = () => {
        addOutput(
            <div className="space-y-1">
                <div className="text-terminal-amber font-bold">Available commands:</div>
                <div><span className="text-terminal-green">help</span> - Show this help message</div>
                <div><span className="text-terminal-green">clear</span> - Clear the terminal</div>
                <div><span className="text-terminal-green">whoami</span> - About me</div>
                <div><span className="text-terminal-green">ls</span> - List directory contents</div>
                <div><span className="text-terminal-green">ls projects</span> - List projects</div>
                <div><span className="text-terminal-green">ls skills</span> - List skill categories</div>
                <div><span className="text-terminal-green">cat [filename]</span> - View file contents</div>
                <div><span className="text-terminal-green">social</span> - Social media links</div>
                <div><span className="text-terminal-green">projects</span> - View projects</div>
                <div><span className="text-terminal-green">skills</span> - View skills</div>
                <div><span className="text-terminal-green">experience</span> - View work experience</div>
                <div><span className="text-terminal-green">education</span> - View education</div>
                <div><span className="text-terminal-green">contact</span> - Contact information</div>
                <div><span className="text-terminal-green">date</span> - Display current date and time</div>
                <div><span className="text-terminal-green">reboot</span> - Reboot the system</div>
            </div>
        );
    };
    
    const clearTerminal = () => {
        setCommands([]);
    }; 
    
    const showAbout = () => {
        addOutput(
            <div className="space-y-2">
                <div className="text-xl font-bold text-terminal-amber">{portfolioData.personal.name}</div>
                <div className="text-md">{portfolioData.personal.title}</div>
                <div>{portfolioData.personal.location}</div>
                <div className="my-2">{portfolioData.personal.description}</div>
                <div className="text-terminal-green">{portfolioData.personal.availability}</div>
            </div>
        );
    };
    
    const listItems = (directory?: string) => {
        if (!directory) {
            addOutput(
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="text-terminal-green">projects/</div>
                    <div className="text-terminal-green">skills/</div>
                    <div className="text-white">about.txt</div>
                    <div className="text-white">contact.txt</div>
                    <div className="text-white">experience.json</div>
                    <div className="text-white">education.json</div>
                </div>
            );
        } else if (directory === 'projects' || directory === 'projects/') {
            addOutput(
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {portfolioData.projects.map((project, idx) => (
                        <div key={idx} className="text-white">{project.title.toLowerCase().replace(/\s+/g, '-')}.json</div>
                    ))}
                </div>
            );
        } else if (directory === 'skills' || directory === 'skills/') {
            addOutput(
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.keys(portfolioData.skills).map((category, idx) => (
                        <div key={idx} className="text-white">{category}.json</div>
                    ))}
                </div>
            );
        } else {
            addOutput(`Directory not found: ${directory}`);
        }
    }; 
    
    const showFile = (filename?: string) => {
        if (!filename) {
            addOutput('Usage: cat [filename]');
            return;
        } if (filename === 'about.txt') {
            showAbout();
        } else if (filename === 'contact.txt') {
            showContact();
        } else if (filename === 'experience.json') {
            showExperience();
        } else if (filename === 'education.json') {
            showEducation();
        } else if (filename.endsWith('.json')) {
            // Check if it's a project file
            const projectName = filename.replace('.json', '').replace(/-/g, ' ');
            const project = portfolioData.projects.find(
                p => p.title.toLowerCase() === projectName
            ); if (project) {
                showProject(project);
            } else {
                // Check if it's a skills category
                const category = filename.replace('.json', '');
                if (portfolioData.skills[category as keyof typeof portfolioData.skills]) {
                    showSkillCategory(category);
                } else {
                    addOutput(`File not found: ${filename}`);
                }
            }
        } else {
            addOutput(`File not found: ${filename}`);
        }
    }; 
    
    const showProject = (project: typeof portfolioData.projects[0]) => {
        addOutput(
            <div className="space-y-2 border border-terminal-green p-3 rounded">
                <div className="text-xl font-bold text-terminal-amber">{project.title}</div>
                <div className="my-2">{project.description}</div>
                <div className="flex flex-wrap gap-2 my-2">
                    {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-terminal-dark border border-terminal-green px-2 py-1 rounded">{tech}</span>
                    ))}
                </div>
                <div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-terminal-green underline">
                        View Project
                    </a>
                </div>
            </div>
        );
    };
    
    const showSkillCategory = (category: string) => {
        const skills = portfolioData.skills[category as keyof typeof portfolioData.skills];
        if (!skills) {
            addOutput(`Skill category not found: ${category}`);
            return;
        } addOutput(
            <div className="space-y-2">
                <div className="text-xl font-bold text-terminal-amber">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                        <span key={idx} className="bg-terminal-dark border border-terminal-green px-2 py-1 rounded">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        );
    }; 
    
    const showSocial = () => {
        addOutput(
            <div className="space-y-3">
                <div className="text-terminal-amber">Social Links:</div>
                <div className="flex flex-wrap gap-4">
                    {portfolioData.social.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-terminal-green hover:underline"
                        >
                            {link.icon === 'github' && <Github size={18} />}
                            {link.icon === 'linkedin' && <Linkedin size={18} />}
                            {link.icon === 'twitter' && <Twitter size={18} />}
                            {link.icon === 'mail' && <Mail size={18} />}
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        );
    }; 
    
    const showProjects = () => {
        addOutput(
            <div className="space-y-4">
                <div className="text-xl font-bold text-terminal-amber">Projects</div>
                <div className="grid grid-cols-1 gap-4">
                    {portfolioData.projects.map((project, idx) => (
                        <div key={idx} className="border border-terminal-green p-3 rounded">
                            <div className="text-lg font-bold">{project.title}</div>
                            <div className="my-2">{project.description}</div>
                            <div className="flex flex-wrap gap-2 my-2">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="text-xs bg-terminal-dark border border-terminal-green px-2 py-1 rounded">{tech}</span>
                                ))}
                            </div>
                            <div>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-terminal-green underline">
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }; 
    
    const showSkills = () => {
        addOutput(
            <div className="space-y-4">
                <div className="text-xl font-bold text-terminal-amber">Skills</div>
                {Object.entries(portfolioData.skills).map(([category, skills], idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="font-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="bg-terminal-dark border border-terminal-green px-2 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    const showExperience = () => {
        addOutput(
            <div className="space-y-4">
                <div className="text-xl font-bold text-terminal-amber">Work Experience</div>
                {portfolioData.experience.map((job, idx) => (
                    <div key={idx} className="border-l-2 border-terminal-green pl-4 space-y-1">
                        <div className="text-lg font-bold">{job.position}</div>
                        <div className="text-terminal-amber">{job.company}</div>
                        <div className="text-sm opacity-75">{job.period}</div>
                        <div className="mt-2">{job.description}</div>
                    </div>
                ))}
            </div>
        );
    }; 
    
    const showEducation = () => {
        addOutput(
            <div className="space-y-4">
                <div className="text-xl font-bold text-terminal-amber">Education</div>
                {portfolioData.education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                        <div className="text-lg font-bold">{edu.degree}</div>
                        <div className="text-terminal-amber">{edu.institution}</div>
                        <div className="text-sm opacity-75">{edu.period}</div>
                    </div>
                ))}
            </div>
        );
    }; 
    
    const showContact = () => {
        addOutput(
            <div className="space-y-2">
                <div className="text-xl font-bold text-terminal-amber">Contact Information</div>
                <div>Email: <a href={`mailto:${portfolioData.contact.email}`} className="text-terminal-green">{portfolioData.contact.email}</a></div>
                <div>Phone: {portfolioData.contact.phone}</div>
                <div className="mt-2">{portfolioData.contact.availability}</div>
            </div>
        );
    }; 
    
    const rebootSystem = () => {
        addOutput("Rebooting system...");
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }; 
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        processCommand(currentInput);
        setCurrentInput('');
    }; 
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex + 1 < commandHistory.length) {
                setHistoryIndex(historyIndex + 1);
                setCurrentInput(commandHistory[historyIndex + 1]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                setHistoryIndex(historyIndex - 1);
                setCurrentInput(commandHistory[historyIndex - 1]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
        }
    }; 
    
    return (
        <div className="text-terminal-green font-terminal h-full overflow-y-auto" ref={terminalRef}>
            <div className="space-y-2 mb-4">
                {commands.map((cmd, i) => (
                    <div key={i}>
                        {cmd.input && (
                            <div className="flex items-start">
                                <span className="text-terminal-amber mr-2">$</span>
                                <span>{cmd.input}</span>
                            </div>
                        )}
                        {cmd.output && (
                            <div className="pl-4 mt-1 mb-3">{cmd.output}</div>
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-start">
                <span className="text-terminal-amber mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none flex-1 text-terminal-green font-terminal"
                    autoFocus
                />
                <span className="inline-block w-3 h-5 bg-terminal-green animate-blink"></span>
            </form>
        </div>);
};

export default Terminal;