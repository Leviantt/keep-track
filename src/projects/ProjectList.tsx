import React, {useState} from 'react';
import { Project } from "./Project";
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
    projects: Project[];
}

const ProjectList = ({projects}: ProjectListProps) => {
    const [projectBeingEdited, setProjectBeingEdited] = useState<Project | null>(null);
    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    }
    const cancelEditing = () => {
        setProjectBeingEdited(null);
    }
    return (
        <ul className="row">
            {projects.map(project => (
                <div className="cols-sm" key={project.id}>
                    {project === projectBeingEdited ? 
                            <ProjectForm 
                                onCancel={cancelEditing}
                                project={project}
                            />
                             :
                            <ProjectCard 
                                onEdit={handleEdit}
                                project={project}
                            />
                    }
                </div>
            ))}
        </ul>
    )
}

export default ProjectList;