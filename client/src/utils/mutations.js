export const login = (userData) => {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
};

export const logout = () => {
    return fetch('/logout');
};

export const addJournalEntry = (journal, entry) => {
    return [...journal, entry];
};

export const deleteJournalEntry = (journal, entryId) => {
    return journal.filter((entry) => entry._id !== entryId);
};

export const addPost = (posts, newPost) => {
    return [...posts, newPost];
};

export const deletePost = (posts, postId) => {
    return posts.filter((post) => post._id !== postId);
};

export const addComment = (posts, postId, newComment) => {
    return posts.map((post) => {
        if (post._id === postId) {
            return {
                ...post,
                comments: [...post.comments, newComment]
            };
        }
        return post;
    });
};

export const deleteComment = (posts, postId, commentId) => {
    return posts.map((post) => {
        if (post._id === postId) {
            return {
                ...post,
                comments: post.comments.filter((comment) => comment._id !== commentId)
            };
        }
        return post;
    });
};

