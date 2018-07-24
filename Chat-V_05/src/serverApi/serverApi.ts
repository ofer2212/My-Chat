export class Api {
    // static baseUrl = 'http://localhost:4000';
    public static baseUrl = '';


    public static get(url: string) {
        return fetch(this.baseUrl + url, {method: 'GET'})
            .then(res => res.json());
    }

    public static put(url: string, body: any) {
        return fetch(this.baseUrl + url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }

    public static post(url: string, body: any) {
        return fetch(this.baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }

    public static deleteBody(url: string, body: any) {
        return fetch(this.baseUrl + url, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }

    public static delete(url: string) {
        return fetch(this.baseUrl + url, {method: 'DELETE'})
            .then(res => res.json());
    }
}