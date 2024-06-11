// AdminLogin.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send login data to parent component
        onLogin({ username, password, role: 'admin' });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Admin Login</h2>
                <div className="mb-3">
                    <label htmlFor="admin-username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="admin-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="admin-password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="admin-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
