import React, {useEffect, useState} from "react";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";


const NUMBER_OF_PAGES = 5;
const ProjectsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const data = await projectAPI.get(currentPage);
                if(currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects(prevData => [...prevData, ...data]);
                }
            } catch(e) {
                if(e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);
    const handleMoreClick = () => {
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    }
    const saveProject = (updatedProject: Project) => {
        projectAPI.put(updatedProject)
                    .then((project) => {
                        setProjects((projects: Project[]) => {
                            return projects.map(p => {
                                return project.id === p.id ? project : p;
                            })
                        })
                    })
                    .catch((e) => {
                        if(e instanceof Error){
                            setError(e.message);
                        }
                    })
    }
    return (
        <>
            <h1>Projects</h1>
            {error.length > 0 ? (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            ) :
            <ProjectList 
                projects={projects}
                onSave={saveProject}
            />}
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
            {!loading && error.length === 0 && currentPage !== NUMBER_OF_PAGES && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                        </div>
                    </div>
            )}
        </>
    )
}
export default ProjectsPage;
