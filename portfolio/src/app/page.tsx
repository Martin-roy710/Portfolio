"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [visible]);

  if (typeof window === "undefined" || window.innerWidth < 768 || !visible) return null;

  return (
    <div className="fixed w-10 h-10 border border-cyan-500/50 rounded-full pointer-events-none z-[999] transition-transform duration-75 ease-out shadow-[0_0_20px_rgba(34,211,238,0.3)] hidden lg:flex items-center justify-center flex-col mix-blend-screen" style={{ top: pos.y - 20, left: pos.x - 20 }}>
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
    </div>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTyping = () => {
      setStarted(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
        }
      }, 25);
    };

    const timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {started ? displayedText : ""}
      <span className={`inline-block w-[3px] h-[1em] ml-1 bg-cyan-400 align-text-bottom ${started ? 'animate-pulse' : 'opacity-0'} shadow-[0_0_10px_rgba(34,211,238,0.8)]`} />
    </span>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  const projects = [
    { title: "Gunal Travels", id: "gunal-travels", type: "Freelance Client" },
    { title: "Multihub", id: "multihub", type: "AI Platform" },
    { title: "Civic Marshall", id: "helping-hands", type: "Utility App" },
    { title: "Food Marshal", id: "food-marshal", type: "Web Frontend" }
  ];

  const searchResults = projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.type.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="relative w-full bg-[#000000] min-h-screen flex flex-col font-sans text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-50">
      {mounted && <CustomCursor />}
      
      {/* Framer-style Minimalist Navbar */}
      <nav className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
             <Image src="/logo.png" alt="NJ" width={40} height={40} className="w-[120%] h-[120%] object-cover mix-blend-screen opacity-90" />
          </div>
          <span className="font-semibold tracking-tight text-[15px]">Nithish Jaganath</span>
        </div>
        
        <div className="hidden md:flex gap-2 lg:gap-4 text-[14px] font-medium text-neutral-400 cursor-pointer">
          <a href="#about" className="nav-water-effect px-4 py-2 hover:text-white transition-colors">About</a>
          <a href="#product" className="nav-water-effect px-4 py-2 hover:text-white transition-colors">Software</a>
          <a href="#resources" className="nav-water-effect px-4 py-2 hover:text-white transition-colors">Projects</a>
          <a href="#timeline" className="nav-water-effect px-4 py-2 hover:text-white transition-colors">Experience</a>
          <a href="#pricing" className="nav-water-effect px-4 py-2 hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex gap-4 lg:gap-6 items-center">
          <a href="https://github.com/Martin-roy710" target="_blank" rel="noreferrer" className="text-[14px] font-medium text-neutral-400 hover:text-white cursor-pointer transition-colors hidden sm:block">GitHub</a>
          <a href="/resume.pdf" download className="bg-white/10 text-white border border-white/20 px-5 py-2 rounded-full text-[14px] font-semibold hover:bg-white/20 transition-all duration-300 hidden sm:block shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            Resume
          </a>
          <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'nithishjaganath88@gmail.com'}?subject=Let&apos;s%20Collaborate`} className="bg-white text-black px-5 py-2 rounded-full text-[14px] font-semibold hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 inline-block">
            Collaborate
          </a>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ml-2">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-cyan-400 p-2 transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors">About</a>
        <a href="#product" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors">Software</a>
        <a href="#resources" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors">Projects</a>
        <a href="#timeline" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors">Experience</a>
        <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors">Contact</a>
      </div>

      {/* --- HERO SECTION (Framer Style Split Layout) --- */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-20 max-w-[1600px] mx-auto">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start px-8 lg:pl-24 lg:pr-12 z-20">
          
          <h1 className="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-white animate-slide-up-fade">
            <span className="animate-text-shine">Engineer the</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-white hover-glitch transition-all duration-300 block mt-2 animate-slide-up-fade delay-200 cursor-crosshair">impossible.</span>
          </h1>
          
          <p className="mt-6 text-lg text-neutral-400 max-w-md font-medium leading-relaxed animate-slide-up-fade delay-400 h-[100px]">
            <TypewriterText text="I&apos;m Nithish Jaganath. I design and build highly scalable, interactive digital experiences that redefine the modern web." delay={1000} />
          </p>
          
          {/* Live Search Box */}
          <div className="relative w-full max-w-md mt-8">
            <div className="flex items-center bg-[#111111] border border-white/10 rounded-xl p-1.5 focus-within:border-white/30 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 relative group">
              <div className="pl-3 pr-2 text-neutral-500 group-focus-within:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search projects (e.g. Multihub)..." 
                className="flex-grow bg-transparent text-[15px] font-medium text-white focus:outline-none placeholder-neutral-500 py-2.5"
              />
            </div>

            {/* Search Dropdown Results */}
            {isSearchFocused && searchQuery.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 animate-fade-in-up">
                {searchResults.length > 0 ? (
                  searchResults.map(result => (
                    <div 
                      key={result.id} 
                      className="px-5 py-4 hover:bg-white/5 cursor-pointer flex justify-between items-center border-b border-white/5 last:border-0 transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="text-white font-medium">{result.title}</span>
                      <span className="text-[10px] text-cyan-500 uppercase font-bold tracking-wider">{result.type}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-4 text-neutral-500 text-sm font-medium">No strict matches found.</div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Side Dragon Image & Nanotech Overlay */}
        <div className="absolute lg:relative right-0 top-0 w-full lg:w-1/2 h-full flex items-center justify-end lg:justify-center overflow-hidden z-0 pointer-events-none lg:pointer-events-auto">
           {/* Darker blend for mobile, full visibility for desktop */}
           <div className="absolute inset-0 lg:hidden bg-black/60 z-10" />
           <div className="relative w-[150%] lg:w-[130%] h-[120%] flex items-center justify-center scale-[0.8] lg:scale-100 translate-x-[20%] lg:translate-x-[0%]">
              
              {/* The underlying visual dragon */}
              <img 
                src="/dragon.png" 
                alt="Epic Dragon" 
                className="w-full h-full object-contain mix-blend-screen opacity-50 lg:opacity-100 filter contrast-[1.1] pointer-events-none animate-float"
                style={{ 
                  WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)', 
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)' 
                }}
              />

              {/* Interactive Nanotech Honeycomb Frame strictly mapping over the dragon */}
              <div 
                className="absolute inset-0 pointer-events-auto z-20"
                style={{ 
                  WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)', 
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)' 
                }}
              >
                 <HexagonGrid />
              </div>

           </div>
        </div>

      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="w-full bg-[#030303] flex flex-col items-center border-t border-white/5 py-32 px-6 lg:px-24">
        <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-16 items-center justify-between">
           
           <div className="w-full md:w-[55%]">
             <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
               The Architect
             </div>
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
               Bridging logic with<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">intelligent systems.</span>
             </h2>
             <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-medium">
               <p>
                 I am Nithish Jaganath, a <strong className="text-white">B.Tech Computer Science (CSE)</strong> student and software engineer obsessed with pushing the boundaries of what&apos;s possible on the web. Currently pursuing my degree, I have already been officially recognized as a <strong className="text-white">&quot;Super Java Developer&quot;</strong> during my industry internship, proving my foundation in core engineering logic is rock solid.
               </p>
               <p>
                 Whether I&apos;m rapid-prototyping at competitive hackathons or architecting complex backend infrastructure, I believe in bridging the gap between raw data logic and emotional, highly-interactive user experiences. My passion lies in utilizing AI integration to create smart, scalable platforms that solve real-world problems with nanotech-level precision.
               </p>
             </div>
           </div>
           
           <div className="w-full md:w-[45%] relative group perspective-[1000px]">
             {/* Glowing Code Window */}
             <div className="w-full bg-[#050505] rounded-xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d group-hover:rotate-y-[-5deg] transition-transform duration-700 relative z-10">
               {/* Terminal Header */}
               <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#0a0a0a]">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                 </div>
                 <div className="mx-auto text-[10px] text-neutral-500 font-mono tracking-widest pl-4">Nithish_Jaganath.java</div>
               </div>
               
               {/* Terminal Body */}
               <div className="p-6 font-mono text-[13px] sm:text-[14px] leading-relaxed overflow-x-auto text-left">
                 <div className="text-purple-400">package <span className="text-white">core.engineering</span>;</div>
                 <br />
                 <div className="text-purple-400">public class <span className="text-cyan-400">Nithish</span> <span className="text-purple-400">extends</span> <span className="text-emerald-400">ComputerScienceStudent</span> {'{'}</div>
                 <div className="pl-4 sm:pl-6 mt-2 text-neutral-500">// B.Tech CSE & Super Java Developer</div>
                 <div className="pl-4 sm:pl-6 text-purple-400">private <span className="text-white">String</span> focus = <span className="text-yellow-300">"Scalability & AI"</span>;</div>
                 <br />
                 <div className="pl-4 sm:pl-6 text-purple-400">public <span className="text-white">void</span> <span className="text-blue-400">deploy</span>() {'{'}</div>
                 <div className="pl-8 sm:pl-12 text-cyan-400">AI_Models<span className="text-white">.integrate()</span>;</div>
                 <div className="pl-8 sm:pl-12 text-cyan-400">Backend<span className="text-white">.optimize(</span><span className="text-white">focus</span><span className="text-white">)</span>;</div>
                 <div className="pl-8 sm:pl-12 text-cyan-400">UserExperience<span className="text-white">.elevate()</span>;</div>
                 <div className="pl-4 sm:pl-6 text-white">{'}'}</div>
                 <div className="text-white mt-2">{'}'}</div>
                 {/* Blinking Cursor */}
                 <div className="mt-4 w-2 h-4 bg-cyan-400 animate-pulse" />
               </div>
             </div>
             
             {/* Neon Glow Behind Window */}
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-[80px] -z-0 group-hover:blur-[100px] transition-all duration-700" />
           </div>

        </div>
      </section>

      {/* --- SOFTWARE / SKILLS SECTION --- */}
      <section id="product" className="w-full min-h-screen bg-[#050505] flex flex-col items-center border-t border-white/5 py-32 px-6 lg:px-24">
        <div className="w-full max-w-[1400px]">
           <div className="mb-20">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Software & Engineering.</h2>
             <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">Commanding a modern tech stack to engineer lightning-fast, responsive, and robust applications.</p>
           </div>
           
           {/* Bento Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1 (Frontend) */}
              <div className="bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 transition-colors duration-500 rounded-3xl p-10 flex flex-col justify-between min-h-[300px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-bold text-white z-10 tracking-tight">Frontend Systems</h3>
                <p className="text-neutral-400 mt-4 z-10 font-medium">Crafting clean, responsive, and user-friendly web interfaces. Focused on delivering seamless visual experiences and high-performance DOM rendering for complex web platforms.</p>
              </div>

              {/* Feature 2 (Backend) */}
              <div className="md:col-span-2 bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 transition-colors duration-500 rounded-3xl p-10 flex flex-col justify-between min-h-[300px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-bold text-white z-10 tracking-tight">Backend Architecture</h3>
                <p className="text-neutral-400 mt-4 z-10 max-w-lg font-medium">Core expertise in Java and Python. Experienced in building solid, scalable logic and structuring efficient software architectures. Officially recognized as a "Super Java Developer" during my industry internship.</p>
              </div>

              {/* Feature 3 (Systems Design & AI Integration) */}
              <div className="md:col-span-2 bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-colors duration-500 rounded-3xl p-10 flex flex-col justify-between min-h-[300px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-bold text-white z-10 tracking-tight">Systems Design & AI Integration</h3>
                <p className="text-neutral-400 mt-4 z-10 max-w-lg font-medium">Bridging the gap between raw data logic and intelligent systems. Experienced in rapid prototyping for hackathons and integrating AI models to create smart, user-centric platforms.</p>
              </div>

              {/* Feature 4 (Technical Arsenal) */}
              <div className="bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 transition-colors duration-500 rounded-3xl p-10 flex flex-col justify-between min-h-[300px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.1)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h3 className="text-2xl font-bold text-white z-10 tracking-tight mb-8">Technical Arsenal</h3>
                <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                   {["Java", "JavaScript", "C++", "Node.js", "MySQL", "AWS", "HTML5", "CSS", "React", "Spring Boot", "Flutter", "Python", "Kotlin", "Blender"].map(skill => (
                     <span key={skill} className="text-[11px] font-semibold text-neutral-400 bg-white/5 border border-white/10 rounded-full px-3 py-1 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/50 transition-all cursor-default duration-300">
                       {skill}
                     </span>
                   ))}
                </div>
              </div>

           </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="resources" className="w-full bg-[#000000] flex flex-col items-center border-t border-white/5 py-32 px-6 lg:px-24">
        <div className="w-full max-w-[1400px]">
           <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Featured Deployments.</h2>
               <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">A curated selection of my innovative projects, hackathon builds, and digital experiences.</p>
             </div>
             <a href="https://github.com/Martin-roy710" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-semibold text-sm w-max tracking-tight">
               View GitHub
             </a>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Project Card 0: Freelance Travels */}
              <div className="group cursor-pointer flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-amber-500/30 rounded-[2rem] p-4 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="w-full aspect-[4/3] bg-[#050505] rounded-xl overflow-hidden relative mb-6 flex items-center justify-center p-8 group-hover:border-amber-500/20 border border-transparent transition-all duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1)_0%,transparent_60%)] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  <Image src="/gunal_logo_premium.png" alt="Gunal Travels Logo" width={400} height={300} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(245,158,11,0.2)] group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(245,158,11,0.8)] transition-all duration-700 z-0 relative" />
                </div>
                <div className="flex flex-col flex-grow px-2 pb-4 pt-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors mb-4">Gunal Travels</h3>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-6 flex-grow">Successfully delivered my very first major freelance project for Gunal Travels, a premier travels company located in Thiruporur! Developed a complete digital solution that significantly impressed the client and modernized their workflow.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Freelance", "Client Project", "Fullstack"].map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold text-neutral-500 border border-white/10 rounded-full px-3 py-1 bg-white/5 z-10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Card 1: Multihub */}
              <div className="group cursor-pointer flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 rounded-[2rem] p-4 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="w-full aspect-[4/3] bg-[#050505] rounded-xl overflow-hidden relative mb-6 flex items-center justify-center p-8 group-hover:border-cyan-500/20 border border-transparent transition-all duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.1)_0%,transparent_60%)] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  <Image src="/multihub.png" alt="MultiHub Template" width={400} height={300} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(34,211,238,0.2)] group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(34,211,238,0.8)] transition-all duration-700 z-0 relative" />
                </div>
                <div className="flex flex-col flex-grow px-2 pb-4 pt-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors mb-4">Multihub</h3>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-6 flex-grow">An AI-powered career acceleration platform engineered as a core comprehensive College Project. Designed to intelligently guide users and streamline their professional growth using advanced generative models.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["AI/ML Integration", "Platform", "College Project"].map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold text-neutral-500 border border-white/10 rounded-full px-3 py-1 bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Card 2: Civic Marshall */}
              <div className="group cursor-pointer flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 rounded-[2rem] p-4 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="w-full aspect-[4/3] bg-[#050505] rounded-xl overflow-hidden relative mb-6 flex items-center justify-center p-2 group-hover:border-indigo-500/20 border border-transparent transition-all duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_60%)] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  <Image src="/civic_marshall.png" alt="Civic Marshall Logo" width={400} height={300} className="w-[110%] h-[110%] object-contain filter drop-shadow-[0_0_10px_rgba(99,102,241,0.2)] scale-110 group-hover:scale-125 group-hover:drop-shadow-[0_0_40px_rgba(99,102,241,0.8)] transition-all duration-700 z-0 relative" />
                </div>
                <div className="flex flex-col flex-grow px-2 pb-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors mb-4">Civic Marshall</h3>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-6 flex-grow">An award-winning utility application that secured the prestigious Runner-Up position at the Chennai Kotlin Users Group (KUG) Ko-Hacks. Built with a focus on immediate real-world impact and highly efficient user flows.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Mobile/Web", "Award-Winning", "Prototyping"].map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold text-neutral-500 border border-white/10 rounded-full px-3 py-1 bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Card 3: Food Marshal */}
              <div className="group cursor-pointer flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-orange-500/30 rounded-[2rem] p-4 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="w-full aspect-[4/3] bg-[#050505] rounded-xl overflow-hidden relative mb-6 flex items-center justify-center p-2 group-hover:border-orange-500/20 border border-transparent transition-all duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_60%)] mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  <Image src="/food_marshall.jpeg" alt="Food Marshal Logo" width={400} height={300} className="w-[75%] h-[75%] object-contain filter drop-shadow-[0_0_10px_rgba(249,115,22,0.2)] scale-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(249,115,22,0.8)] transition-all duration-700 z-0 relative" />
                </div>
                <div className="flex flex-col flex-grow px-2 pb-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors mb-4">Food Marshal</h3>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-6 flex-grow">A streamlined, highly interactive front-end experience for a food delivery platform. Focused strictly on intuitive UI, clean core features, and a seamless browsing experience.</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Frontend", "UI/UX", "Web Design"].map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold text-neutral-500 border border-white/10 rounded-full px-3 py-1 bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

           </div>
        </div>
      </section>

      {/* --- HACKATHON & EXPERIENCE TIMELINE --- */}
      <section id="timeline" className="w-full min-h-[80vh] bg-[#0a0a0a] flex flex-col items-center border-t border-white/5 py-32 px-6 lg:px-24 overflow-hidden relative">
        
        {/* Left Side Lambo (Facing UP) */}
        <div className="absolute top-[50%] -translate-y-1/2 -left-[500px] w-[1000px] h-[1500px] opacity-30 pointer-events-none z-0 mix-blend-screen hidden lg:block">
           <img 
             src="/lambo-top.png" 
             alt="Realistic Top Down Lamborghini" 
             className="w-full h-full object-contain filter contrast-[1.1] transition-opacity duration-1000 rotate-180 animate-float-slow"
             style={{ 
               WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 50%)', 
               maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 50%)' 
             }}
           />
        </div>

        {/* Right Side Camaro (Facing DOWN) */}
        <div className="absolute top-[50%] -translate-y-1/2 -right-[500px] w-[1000px] h-[1500px] opacity-30 pointer-events-none z-0 mix-blend-screen hidden lg:block">
           <img 
             src="/camaro-top.png" 
             alt="Realistic Top Down Camaro" 
             className="w-full h-full object-contain filter contrast-[1.1] transition-opacity duration-1000 rotate-180 animate-float-slow delay-200"
             style={{ 
               WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 50%)', 
               maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 50%)' 
             }}
           />
        </div>

        <div className="w-full max-w-[1000px] flex flex-col items-center relative z-10">
           <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-24 text-center">Event Horizon.</h2>
           
           <div className="relative w-full">
             {/* Central glowing track line */}
             <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent md:-translate-x-1/2" />
             
             {/* Timeline Event 1 (Freelance 2026) -> LEFT */}
             <div className="relative w-full flex flex-col md:flex-row justify-between md:items-center mb-16 md:mb-24 group">
               <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 md:pb-0 pb-6 pl-16 md:pl-0">
                 <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">Gunal Travels</h3>
                 <span className="text-amber-500 text-sm font-bold tracking-wider uppercase mt-1 block">Independent Freelancer</span>
                 <p className="text-neutral-400 mt-4 leading-relaxed font-medium">Successfully acquired, engineered, and delivered my very first professional freelance enterprise project. Built a highly impressive, modern digital solution for Gunal Travels in Thiruporur, establishing a flawless track record in professional client contracting!</p>
               </div>
               {/* Timeline Node */}
               <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)] -translate-x-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-10" />
               <div className="w-full md:w-[45%] text-left pl-16 md:pl-12 opacity-30 md:opacity-100 hidden md:block">
                 <span className="text-neutral-600 text-5xl md:text-6xl font-black italic tracking-tighter">2026</span>
               </div>
             </div>

             {/* Timeline Event 2 (Amazon Nova) -> RIGHT */}
             <div className="relative w-full flex flex-col md:flex-row-reverse justify-between md:items-center mb-16 md:mb-24 group">
               <div className="w-full md:w-[45%] text-left pl-16 md:pl-12 md:pb-0 pb-6">
                 <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Amazon Nova AI Hackathon</h3>
                 <span className="text-cyan-500 text-sm font-bold tracking-wider uppercase mt-1 block">AI Integrator</span>
                 <p className="text-neutral-400 mt-4 leading-relaxed font-medium">Leveraged cutting-edge <strong className="text-white">Amazon Nova AI</strong> models in a high-pressure competitive environment. Handled the core integration of advanced generative frameworks to engineer dynamic, intelligent logic systems.</p>
               </div>
               {/* Timeline Node */}
               <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-x-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-10" />
               <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 pl-16 md:pl-0 opacity-30 md:opacity-100 hidden md:block">
                 <span className="text-neutral-600 text-5xl md:text-6xl font-black italic tracking-tighter">2025</span>
               </div>
             </div>

             {/* Timeline Event 3 (Internship 2025) -> LEFT */}
             <div className="relative w-full flex flex-col md:flex-row justify-between md:items-center mb-16 md:mb-24 group">
               <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 md:pb-0 pb-6 pl-16 md:pl-0">
                 <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Industry Internship</h3>
                 <span className="text-purple-500 text-sm font-bold tracking-wider uppercase mt-1 block">Super Java Developer</span>
                 <p className="text-neutral-400 mt-4 leading-relaxed font-medium">Secured a highly rigorous industry internship placement. Architected and engineered <strong className="text-white">Food Marshal</strong> during this tenure, intrinsically focusing on mastering complex backend scalability, database routing, and core Java architectures.</p>
               </div>
               {/* Timeline Node */}
               <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] -translate-x-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-10" />
               <div className="w-full md:w-[45%] text-left pl-16 md:pl-12 opacity-30 md:opacity-100 hidden md:block">
                 <span className="text-neutral-600 text-5xl md:text-6xl font-black italic tracking-tighter">2025</span>
               </div>
             </div>

             {/* Timeline Event 4 (Ko-Hacks) -> RIGHT */}
             <div className="relative w-full flex flex-col md:flex-row-reverse justify-between md:items-center mb-16 md:mb-24 group">
               <div className="w-full md:w-[45%] text-left pl-16 md:pl-12 md:pb-0 pb-6">
                 <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">Chennai Ko-Hacks</h3>
                 <span className="text-indigo-500 text-sm font-bold tracking-wider uppercase mt-1 block">Runner-Up Position</span>
                 <p className="text-neutral-400 mt-4 leading-relaxed font-medium">Secured the prestigious Runner-Up victory at the Chennai Kotlin Users Group (KUG) Ko-Hacks by building <strong className="text-white">Civic Marshall</strong>, an award-winning utility application praised for immediate real-world impact and highly efficient user flows.</p>
               </div>
               {/* Timeline Node */}
               <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] -translate-x-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-10" />
               <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 pl-16 md:pl-0 opacity-30 md:opacity-100 hidden md:block">
                 <span className="text-neutral-600 text-5xl md:text-6xl font-black italic tracking-tighter">2024</span>
               </div>
             </div>

             {/* Timeline Event 5 (Hindustan University) -> LEFT */}
             <div className="relative w-full flex flex-col md:flex-row justify-between md:items-center group">
               <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 md:pb-0 pb-6 pl-16 md:pl-0">
                 <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">Hindustan University</h3>
                 <span className="text-emerald-500 text-sm font-bold tracking-wider uppercase mt-1 block">B.Tech CSE General</span>
                 <p className="text-neutral-400 mt-4 leading-relaxed font-medium">Initiated my core engineering journey by joining the B.Tech Computer Science and Engineering program. Established a concrete, rigorous foundation in data structures, algorithms, and deep software logic.</p>
               </div>
               {/* Timeline Node */}
               <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] -translate-x-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-10" />
               <div className="w-full md:w-[45%] text-left pl-16 md:pl-12 opacity-30 md:opacity-100 hidden md:block">
                 <span className="text-neutral-600 text-5xl md:text-6xl font-black italic tracking-tighter">2023</span>
               </div>
             </div>
             
           </div>
        </div>
      </section>

      {/* --- CONTACT / PRICING SECTION --- */}
      <section id="pricing" className="w-full min-h-[70vh] bg-[#050505] flex flex-col items-center justify-center border-t border-white/5 py-32 px-6 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center z-10 max-w-4xl">
           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">Ready to collaborate?</h2>
           <p className="text-neutral-400 text-xl font-medium mb-12">
             Currently open for new opportunities to engineer elite digital architecture. Let&apos;s discuss your next massive project.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'nithishjaganath88@gmail.com'}?subject=Project%20Inquiry`} className="bg-white text-black px-8 py-4 rounded-full text-[15px] font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] tracking-tight">
               Initialize Comm-link
             </a>
             <a href="https://github.com/Martin-roy710" target="_blank" rel="noreferrer" className="bg-[#111111] text-white border border-white/10 px-8 py-4 rounded-full text-[15px] font-semibold hover:border-white/30 hover:bg-white/5 transition-all duration-300 tracking-tight">
               View GitHub Profile
             </a>
           </div>
        </div>
      </section>

      <footer className="w-full py-10 border-t border-white/5 flex flex-col items-center justify-center text-neutral-600 text-sm font-medium bg-[#020202]">
         <p>© 2026 Nithish Jaganath.</p>
      </footer>

    </main>
  );
}

// Math-calculated SVG Honeycomb Matrix for Nanotech Effect
const HexagonGrid = () => {
  const hexSize = 25; 
  const hexWidth = Math.sqrt(3) * hexSize; 
  const hexHeight = 2 * hexSize; 
  const xOffset = hexWidth;
  const yOffset = hexHeight * 0.75; 

  const cols = 25; 
  const rows = 35; 

  // Generate the 6 points for each individual hexagon
  const hexPoints = (xCenter: number, yCenter: number, size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle_rad = (Math.PI / 180) * (60 * i - 30);
      points.push(`${xCenter + size * Math.cos(angle_rad)},${yCenter + size * Math.sin(angle_rad)}`);
    }
    return points.join(' ');
  };

  const hexes = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * xOffset + hexWidth / 2 + (row % 2 === 1 ? xOffset / 2 : 0);
      const y = row * yOffset + hexHeight / 2;
      
      hexes.push(
        <polygon
          key={`${row}-${col}`}
          points={hexPoints(x, y, hexSize - 1.5)} // Creates the dark micro-gaps separating the circuit blocks
          className="fill-transparent stroke-cyan-500/10 hover:fill-cyan-400/50 hover:stroke-cyan-200 transition-all duration-700 hover:duration-0 cursor-crosshair z-50"
        />
      );
    }
  }

  return (
    <svg 
      className="w-full h-full mix-blend-screen scale-[1.1] opacity-70" 
      viewBox={`0 0 ${cols * xOffset} ${rows * yOffset + hexHeight / 4}`} 
      preserveAspectRatio="xMidYMid slice"
    >
      {hexes}
    </svg>
  );
};
