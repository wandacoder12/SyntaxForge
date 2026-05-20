'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // In a real app, you would fetch from your node backend
            const response = await fetch('https://server-sf-981505851604.europe-west1.run.app/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', data.email);
                router.push(redirect ? `/course/${redirect}` : '/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server Error. Please make sure the backend is running.');
        }
    };

    return (
        <div className="w-full max-w-md glass p-10 rounded-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Login to SyntaxForge</h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-white outline-none transition"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-white outline-none transition"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full button-primary py-4">
                    Sign In
                </button>
            </form>

            <p className="mt-8 text-center text-zinc-500 text-sm">
                Don't have an account? <a href="/register" className="text-white hover:underline">Sign up</a>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="container mx-auto px-6 flex justify-center py-20">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
