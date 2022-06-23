import { Project } from "./Project";

const baseURL = 'http://localhost:4000';
const URL = `${baseURL}/projects`;


const checkResponse = (response: any) => {
    if(response.ok) return response;

    const httpErroInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url
    };
    console.log(`log server http error: ${JSON.stringify(httpErroInfo)}`);
    throw new Error('There was an error retrieving the project(s). Please try again.');
}

const projectAPI = {
    find(id: number) {
        return fetch(`${URL}/${id}`)
            .then(checkResponse)
            .then(res => res.json())
    },
    get(page: number = 1, limit: number = 20) {
        return fetch(`${URL}?_page=${page}&_limit=${limit}&_sort=name`)
                .then(checkResponse)
                .then((res) => res.json())
                .catch((error: TypeError) => {
                    console.log(`log client error ${error}`);
                    throw new Error('There was an error retrieving the project(s). Please try again.');
                })
    },
    put(project: Project) {
        return fetch(`${URL}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkResponse)
        .then(res => res.json())
        .catch((e: TypeError) => {
            console.log('log client error: ' + e.message);
            throw new Error('There was an error updating the project. Please try again.');
        })
    }
};

export {projectAPI};