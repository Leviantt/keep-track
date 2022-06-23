import React from 'react';
import { Project } from './Project';

interface ProjectDetailProps {
  project: Project;
}

function ProjectDetail({ project }: ProjectDetailProps) {
  function formatDate(date: Date): string {
    const _date = new Date(date);//пока не понял почему, но typeof date возвращает string
    const day = _date.getDate().toString().padStart(2, '0');
    const month = (_date.getMonth() + 1).toString().padStart(2, '0');
    const year = _date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <div className='project-detail'>
        <img  src={project.imageUrl} alt={project.name} />
        <div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>Budget: ${project.budget}</p>
          <p>Signed: {formatDate(project.contractSignedOn)}</p>
          <p>
            <mark className="active">
              {project.isActive ? 'active' : 'inactive'}
            </mark>
          </p>
          </div>
    </div>
  );
}

export default ProjectDetail;