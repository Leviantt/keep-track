import React, { SyntheticEvent, useEffect, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    onCancel: () => void;
    onSave: (project: Project) => void;
    project: Project;
}

const ProjectForm = ({onCancel, onSave, project: initialProject}: ProjectFormProps) => {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    });
    const validate = () => {
        const errors = {name: '', description: '', budget: ''};
        if(project.name.length === 0) errors.name = 'Name is required';
        else if(project.name.length < 3) errors.name = 'Name needs to be at least 3 characters';
        if(project.description.length === 0) errors.description = 'Description is required';
        if(project.budget <= 0) errors.budget = 'Budget must be more than $0';
        return errors;
    }
    const isValid = () => {
        return errors.name.length === 0 && errors.description.length === 0 && errors.budget.length === 0;
    }
    const handleSubmit = (e:SyntheticEvent) => {
        e.preventDefault();
        if(!isValid()) return;
        onSave(project);
    }
    const handleChange = (e: any) => {
        const {name, type, value, checked} = e.target;
        let newValue = type === 'checkbox' ? checked : value;
        if(type === 'number') {
            newValue = Number(newValue);
        }
        const change = {
            [name]: newValue
        }
        setProject((prevProject: Project) => {
            return  new Project({...prevProject, ...change});
        })
    } 
    useEffect(() => {
        setErrors(() => validate());
    }, [project]);
    return (
        <form 
            className="input-group vertical"
            onSubmit={handleSubmit}    
        >
            <label htmlFor="name">Project Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="enter name" 
                value={project.name} 
                onChange={handleChange} 
            />
            {errors.name.length > 0 && (
                <div className="card error">{errors.name}</div>
            )}
            <label htmlFor="description">Project Description</label>
            <textarea 
                name="description" 
                placeholder="enter description" 
                value={project.description}
                onChange={handleChange}    
            />
            {errors.description.length > 0 && (
                <div className="card error">{errors.description}</div>
            )}
            <label htmlFor="budget">Project Budget</label>
            <input 
                type="number" 
                name="budget" 
                placeholder="enter budget" 
                value={project.budget === 0 ? '' : project.budget}
                onChange={handleChange}
            />
            {errors.budget.length > 0 && (
                <div className="card error">{errors.budget}</div>
            )}
            <div className="inline">
                <label htmlFor="isActive">Active?</label>
                <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={project.isActive}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button 
                    type="button" 
                    className="bordered medium"
                    onClick={onCancel}
                >cancel</button>
            </div>
        </form>
    )
}

export default ProjectForm;