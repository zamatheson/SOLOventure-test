export const fetchUserProfile = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching user profile', error);
        throw error;
    }
};

export const fetchJournalEntries = async () => {
    try {
        const response = await fetch('api/journal');
        if (!response.ok) {
            throw new Error('No journal entries found! Try again later.');
        }
        return response.json();
    } catch (error) {
        console.error('No journal entries found! Try again later:', error);
        throw error;
    }
};

export const saveJournalEntry = async (entry) => {
    try {
        const response = await fetch('api/journal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
        if (!response.ok) {
            throw new Error('Failed to save journal entry');
        }
        return response.json();
    } catch (error) {
        console.error('Error saving journal entry', error);
        throw error;
    }
};

export const deleteJournalEntry = async (entryId) => {
    try {
        const response = await fetch(`api/journal/${entryId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete journal entry');
        }
        return response.json();
    } catch (error) {
        console.error('Error deleting journal entry', error);
        throw error;
    }
};

export const fetchCommunitiesPosts = async () => {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('No community posts found! Try again later.');
        }
        return response.json();
    } catch (error) {
        console.error('No community posts found! Try again later:', error);
        throw error;
    }
};

export const savePost = async (post) => {
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if (!response.ok) {
            throw new Error('Failed to save post');
        }
        return response.json();
    } catch (error) {
        console.error('Error saving post', error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const response = await fetch(`api/posts/${postId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
        return response.json();
    } catch (error) {
        console.error('Error deleting post', error);
        throw error;
    }
};

export const saveComment = async (postId, comment) => {
    try {
        const response = await fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        if (!response.ok) {
            throw new Error('Failed to save comment');
        }
        return response.json();
    } catch (error) {
        console.error('Error saving comment', error);
        throw error;
    }
};

export const deleteComment = async (postId, commentId) => {
    try {
        const response = await fetch(`api/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
        return response.json();
    } catch (error) {
        console.error('Error deleting comment', error);
        throw error;
    }
};

