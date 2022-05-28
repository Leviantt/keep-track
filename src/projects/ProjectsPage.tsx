import React, {useState} from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";

const ProjectsPage = () => {
    const [projects, setProjects] = useState(MOCK_PROJECTS);
    const saveProject = (updatedProject: Project) => {
        setProjects((projects: Project[]) => {
            return projects.map(project => {
                return updatedProject.id === project.id ? updatedProject : project;
            })
        })
    }
    return (
        <>
            <h1>Projects</h1>
            <ProjectList 
                projects={projects}
                onSave={saveProject}
            />
        </>
    )
}
export default ProjectsPage;
