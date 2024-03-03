const API_URL = 'http://localhost:3001/graphql'; // Replace with your API 

const Auth = {
    register: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return await response.json();
        } catch (error) {
            console.error('Error registering user', error);
            throw error;
        }
    },
    login: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
            return await response.json();
        } catch (error) {
            console.error('Error logging in user', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            // You don't need to make a request to log out,
            // just remove the token from localStorage
            localStorage.removeItem('accessToken');
            return { success: true, message: 'You are now logged out.' };
        } catch (error) {
            console.error('Error logging out user', error);
            throw error;
        }
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('accessToken');
    }
};

export const { login, register } = Auth;

