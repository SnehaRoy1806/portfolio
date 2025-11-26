import React, { useState, useEffect } from 'react';
import { Moon, Sun, Mail, Linkedin, Github } from 'lucide-react';
import Experience from './experience';
import ProjectCard from './project-card';

// ✅ YOUR DEPLOYED GOOGLE APPS SCRIPT URL
const API_URL = "https://script.google.com/macros/s/AKfycbwB69Xkl_s0IDW516561HFx88oQ7CKcQu8R3P6Nf6fphmmWpB75i0JiaJxMKc3Gwq-P/exec"; 

function App() {
  const [profile, setProfile] = useState([]);
  const [experience, setExperience] = useState([]);
  const [work, setWork] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Set default state to TRUE (Dark Mode)
  const [darkMode, setDarkMode] = useState(true);

  // 2. Automatically apply the class whenever darkMode changes
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
        setLoading(false);
      });
  }, []);

  // Loading State (with Coffee background for light mode)
  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#faf7f5] dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="animate-pulse">Loading Portfolio...</p>
    </div>
  );

  // Error State
  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-50 text-red-600 px-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
      <p>{error}</p>
    </div>
  );

  return (
    // Main Container: Coffee background (#faf7f5) for Light Mode, Dark Gray for Dark Mode
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#e7e5e4] text-gray-900'}`}>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-center mb-20">
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

        {/* --- HERO --- */}
        <section className="flex flex-col md:flex-row items-center gap-20 mb-20">
          <div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl flex-shrink-0 overflow-hidden">
             <img 
               src={profile?.image || "https://via.placeholder.com/300"} 
               alt="Profile" 
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
             />
          </div>
          
          <div className="text-left">
            <h2 className="text-4xl font-bold mb-4">Hello...👋</h2>
            <p className="leading-relaxed text-lg opacity-80 md:w-3/4 w-auto">
              {profile?.about || "Loading bio..."}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
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
        <footer className="flex flex-col items-center gap-6 pt-10 border-t border-gray-200 dark:border-gray-800">
          
          {/* 1. Centered Image */}
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-lg">
             <img 
               src={profile?.image} 
               alt="Footer Profile" 
               className="w-full h-full object-cover opacity-90" 
               referrerPolicy="no-referrer"
             />
          </div>

          {/* 2. Centered Row Links with Pipes */}
          <div className="flex flex-wrap justify-center items-center gap-4 w-full">
            
            {/* Link 1: Email */}
            <a href="mailto:sneha@example.com" className="flex items-center gap-2 hover:text-blue-600 transition group">
              <Mail size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">sneharoy1806@gmail.com</span>
            </a>
            
            {/* Separator */}
            <span className="text-gray-300 dark:text-gray-700">|</span>

            {/* Link 2: LinkedIn */}
            <a href="https://www.linkedin.com/in/sneha-roy-1806sp19/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition group">
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>

            {/* Separator */}
            <span className="text-gray-300 dark:text-gray-700">|</span>

            {/* Link 3: GitHub */}
            <a href="https://github.com/SnehaRoy1806" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition group">
              <Github size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
          <div class="footer-note opacity-60">Designed &amp; Developed by me ❤️️</div>
        </footer>

      </div>
    </div>
  );
}

export default App;