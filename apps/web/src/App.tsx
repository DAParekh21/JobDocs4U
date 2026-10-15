import React, { useState } from 'react';
import './styles.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const endpoint = mode === 'login' ? 'auth.login' : 'auth.register';
      const res = await fetch(`${API_URL}/trpc/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { email, password }
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data?.error?.message || 'Request failed');
      }

      setStatus(`${mode === 'login' ? 'Logged in' : 'Registered'} successfully.`);
      setEmail('');
      setPassword('');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-header">
          <span className="badge">JobDocs4U</span>
          <h1>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
        </div>

        <div className="mode-toggle" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        {status && <p className="status">{status}</p>}
      </section>
    </main>
  );
}

export default App;
