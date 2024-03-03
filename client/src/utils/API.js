const API_URL = 'http://localhost:3001/graphql'; // Replace with your API

class API {
    static async fetchData(endpoint) {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data', error);
            throw error;
        }
    }
    static async postData(endpoint, data) {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error posting data', error);
            throw error;
        }
    }
}

export default API;
