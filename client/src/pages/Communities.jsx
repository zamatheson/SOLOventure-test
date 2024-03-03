import React, { useEffect, useState } from 'react';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };
        fetchPosts();
    }, []);

    const handlePostSubmit = async () => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: newPost })
            });
            if (!response.ok) {
                throw new Error('Failed to submit post');
            }
            const postData = await response.json();
            setPosts([...posts, postData]);
            setNewPost('');
        } catch (error) {
            console.error('Error submitting post', error);
        }
    };

    const handleCommentSubmit = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment })
            });
            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }
            const newCommentData = await response.json();
            const updatedPosts = posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, newCommentData]
                    };
                }
                return post;
            });
            setPosts(updatedPosts);
            setComment('');
        } catch (error) {
            console.error('Error submitting comment', error);
        }
    };

    return (
        <div>
            <h1>Community</h1>
            <div>
                <textarea
                    value={newPost}
                    onChange={(event) => setNewPost(event.target.value)}
                    placeholder="What's on your mind?"
                />
                <button onClick={handlePostSubmit}>Post</button>
            </div>
            <div>
                {posts.map((post, index) => (
                    <div key={index}>
                        <p>{post.content}</p>
                        <div>
                            <textarea
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                placeholder="Add a comment"
                            />
                            <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                        </div>
                        <div>
                            {post.comments && post.comments.map((comment, index) => (
                                <p key={index}>{comment.content}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
