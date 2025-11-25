import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export default function ProjectCard({ title, description, link, github }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      )}
      
      <div className="flex gap-4 mt-auto">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-gray-600">
            <Github size={20} />
          </a>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:text-gray-600">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  );
}