import React, { useState } from 'react';
const signupRouter = require('./server/routes/signup');
app.use('/api', signupRouter);

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (formData.username === '') {
            newErrors.username = 'Username is required';
        }
        if (formData.password === '') {
            newErrors.password = 'Password is required';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Oh no! Signup Failed!');
            }
            setFormData({ 
                username: '', 
                password: '' 
            });
            setErrors({});
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.username && <span>{errors.username}</span>}
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignUp;
