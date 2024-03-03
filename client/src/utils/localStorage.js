const API_URL = 'http://localhost:3001/graphql'; // Replace with your API

const saveEntriesToLocalStorage = (entries) => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
};

const getEntriesFromLocalStorage = () => {
    const storedEntries = localStorage.getItem('journalEntries');
    return storedEntries ? JSON.parse(storedEntries) : [];
};

const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('accessToken', token);
};

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('accessToken');
};

const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

const login = async (userData) => {
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
        const { token } = await response.json();
        saveTokenToLocalStorage(token);
        return { success: true, token };
    } catch (error) {
        console.error('Error logging in user', error);
        throw error;
    }
};

const logout = () => {
    removeTokenFromLocalStorage();
    return { success: true, message: 'You are now logged out.' };
};

const makePost = async (postData) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Failed to make post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data', error);
        throw error;
    }
};

export { isAuthenticated, login, logout, makePost, saveEntriesToLocalStorage, getEntriesFromLocalStorage };
