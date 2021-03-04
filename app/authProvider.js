// in src/authProvider.js

export default {
    // called when the user attempts to log in
    login: ( username, password ) =>  {
        console.log(username);
        console.log(password);
        /*const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Host", "http://172.31.0.25");
        headers.append("Origin", "http://localhost:3000/");
        
        
        const request = new Request('http://172.31.0.25/api/v1/access_token', {
            method: "POST",
            body: JSON.stringify({ "client-id": username, "client-token": password }),
            headers: headers,
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('username', username);
                localStorage.setItem('token', auth.data.token);
            })
            .catch((error) => {
                throw new Error(error.message);
            });
        */},
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};