import { Project } from "./Project";

const baseURL = 'http://localhost:4000';
const URL = `${baseURL}/projects`;
//https://api.jsonbin.io/b/6293bcb8402a5b3802137522


const translateStatusToErrorMessage = (code: Number) => {
    switch(code) {
        case 401: return 'Please try login again.';
        case 403: return 'You do not have permission to view project(s).';
        default: return 'There was an error retrieving the project(s). Please try again.';
    }
}

const checkResponse = (response: any) => {
    if(response.ok) return response;

    const httpErroInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url
    };
    console.log(`log server http errro: ${JSON.stringify(httpErroInfo)}`);
    const errorMessage = translateStatusToErrorMessage(httpErroInfo.status);
    throw new Error(errorMessage);
}

const projectAPI = {
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
    },
    find(id: number) {
        return fetch(`${URL}/${id}`)
                .then(checkResponse)
                .then(res => res.json());
    }
};



export {projectAPI};