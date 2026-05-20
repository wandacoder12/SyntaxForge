import '../styles/globals.css';

export const metadata = {
    title: 'SyntaxForge | Master Python Coding',
    description: 'The ultimate platform for learning Python from scratch to mastery.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="hero-gradient min-h-screen">
                <header className="fixed top-0 w-full z-50 glass border-b border-zinc-800">
                    <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
                        <a href="/" className="text-2xl font-bold tracking-tighter gradient-text">
                            SyntaxForge
                        </a>
                        <div className="flex gap-6 items-center">
                            <a href="/" className="hover:text-white transition">Courses</a>
                            <a href="/login" className="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition">Login</a>
                            <a href="/register" className="px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition">Get Started</a>
                        </div>
                    </nav>
                </header>
                <main className="pt-24 pb-12">
                    {children}
                </main>
                <footer className="border-t border-zinc-800 py-12 bg-zinc-950">
                    <div className="container mx-auto px-6 text-center text-zinc-500">
                        <p>&copy; 2026 SyntaxForge. All rights reserved.</p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
