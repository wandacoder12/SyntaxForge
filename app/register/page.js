'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => router.push('/login'), 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Server Error. Please make sure the backend is running.');
        }
    };

    return (
        <div className="container mx-auto px-6 flex justify-center py-20">
            <div className="w-full max-w-md glass p-10 rounded-3xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-gradient">Create Account</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-xl mb-6 text-sm">
                        Registration successful! Redirecting to login...
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition"
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
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full button-primary py-4">
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-zinc-500 text-sm">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
                </p>
            </div>
        </div>
    );
}
