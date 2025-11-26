import React, { useState, useEffect } from 'react';
import { Moon, Sun, Mail, Linkedin, Github } from 'lucide-react';
import Experience from './experience';
import ProjectCard from './project-card';

// ✅ YOUR DEPLOYED GOOGLE APPS SCRIPT URL
const API_URL = "https://script.google.com/macros/s/AKfycbwB69Xkl_s0IDW516561HFx88oQ7CKcQu8R3P6Nf6fphmmWpB75i0JiaJxMKc3Gwq-P/exec"; 

function App() {
  const [profile, setProfile] = useState({});
  const [experience, setExperience] = useState([]);
  const [work, setWork] = useState([]);
  
  // Loading & Progress State
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [error, setError] = useState(null);
  
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Simulate Progress Bar Logic
  useEffect(() => {
    if (!loading) {
      setProgress(100);
      return;
    }

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // Slow down as we get closer to 90% to wait for actual data
        if (oldProgress >= 90) return oldProgress; 
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 90);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setProfile(data.profile || {});
        setExperience(data.experience || []);
        setWork(data.work || []);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Check console for details.");
      })
      .finally(() => {
        // When data arrives, snap to 100% and then finish loading
        setProgress(100);
        setTimeout(() => setLoading(false), 500); // Short delay to see the 100%
      });
  }, []);

  // --- MODERN PROGRESS LOADER (KEPT AS REQUESTED) ---
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white relative overflow-hidden">
      
      <div className="w-64 space-y-4">
        {/* Percentage Text */}
        <div className="flex justify-between text-xs font-mono text-blue-400">
          <span>INITIALIZING SYSTEM</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Bar Container */}
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          {/* Animated Fill */}
          <div 
            className="h-full bg-blue-500 progress-fill relative"
            style={{ width: `${progress}%` }}
          >
            {/* Leading Shine Effect */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white opacity-50"></div>
          </div>
        </div>
        
        {/* Status Text */}
        <p className="text-xs text-gray-500 text-center font-mono pt-2">
          {progress < 40 && "Connecting to server..."}
          {progress >= 40 && progress < 80 && "Fetching portfolio data..."}
          {progress >= 80 && "Rendering interface..."}
        </p>
      </div>
    </div>
  );

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-50 text-red-600 px-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
      <p>{error}</p>
    </div>
  );

  return (
    // REVERTED: Back to standard gray-900 for Dark Mode (No more blue ambient glows)
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#E7E5E4] text-gray-900'}`}>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-center md:mb-20 mb-16">
          <h1 className="text-3xl font-bold">{profile?.name || "Sneha"}</h1>
          <div className="flex items-center gap-4">
            
            {/* UPDATED: Resume Button linking to local public file */}
            {/* import.meta.env.BASE_URL ensures it works on GitHub Pages subfolder */}
            <a 
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank" 
              rel="noopener noreferrer"
              download="Sneha_Resume.pdf" 
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition text-center"
            >
              Download resume
            </a>

            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>



        {/* --- HERO (UPDATED) --- */}
        <section className="mb-20 flex flex-col md:flex-row items-center justify-center md:gap-20 gap-16">
          <div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl flex-shrink-0 overflow-hidden">
             <img 
               src={profile?.image || "https://via.placeholder.com/300"} 
               alt="Profile" 
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
             />
          </div>
          
          {/* Text Block - Added flex-1 to take remaining space naturally */}
          <div className="text-left flex-1">
            <h2 className="text-4xl font-bold mb-4">Hello...👋</h2>
            <p className="leading-relaxed text-lg opacity-80 md:w-3/4 w-auto">
              I'm a curious coding enthusiast who can spend the entire day battling a problem. 
              I'm a self-taught developer with excellent problem solving skills and ability to perform well in a team. 
              Driven by passion & curiosity, I try to learn & discover new things everyday to be one step ahead of the curve at all times. 
              And what I might lack in skills I make up for it with my determination to learn.
            </p>
          </div>

        </section>


        {/* --- EXPERIENCE --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Experience</h2>
          <Experience data={experience} />
        </section>

        {/* --- WORK --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 gap-10">
            {work.map((p, i) => (
              <ProjectCard 
                key={i} 
                title={p.title} 
                description={p.description}
                link={p.link}
                github={p.github}
              />
            ))}
          </div>
        </section>

        {/* --- UPDATED FOOTER --- */}
        {/* --- FOOTER --- */}
        <footer className="flex flex-col items-center gap-6 pt-10 border-t border-gray-200 dark:border-gray-800">
          
          {/* Image */}
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-lg">
             <img 
               src={profile?.image || "https://via.placeholder.com/150"} 
               alt="Footer Profile" 
               className="w-full h-full object-cover opacity-90" 
               referrerPolicy="no-referrer"
             />
          </div>

          {/* Responsive Links Layout */}
          {/* Mobile: flex-col (Stacked), Desktop (md): flex-row (Single Line) */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full justify-center">
            
            {/* Link 1: Email (First row on mobile) */}
            <a href="mailto:sneharoy1806@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition group">
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">sneharoy1806@gmail.com</span>
            </a>
            
            {/* Desktop Separator Pipe (Hidden on Mobile) */}
            <span className="hidden md:block text-gray-300 dark:text-gray-700">|</span>

            {/* Socials Group (Second row on mobile, inline on desktop) */}
            <div className="flex items-center gap-4">
              
              {/* Link 2: LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/sneha-roy-1806sp19/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-blue-600 transition group"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>

              {/* Separator Pipe (Always Visible between these two) */}
              <span className="text-gray-300 dark:text-gray-700">|</span>

              {/* Link 3: GitHub */}
              <a 
                href="https://github.com/SnehaRoy1806" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-blue-600 transition group"
              >
                <Github size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>

          </div>
          <div class="footer-note opacity-60">Designed &amp; Developed by me ❤️️</div>
        </footer>
      </div>
    </div>
  );
}

export default App;