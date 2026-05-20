'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pythonModules } from '../../../data/pythonModules';

export default function CoursePage() {
    const { id } = useParams();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const moduleId = parseInt(id);
    const moduleData = pythonModules.find(m => m.id === moduleId);

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        // Redirect logic: modules 3-15 require login
        if (moduleId > 2 && !token) {
            router.push('/login?redirect=' + id);
        }
    }, [moduleId, router]);

    if (!moduleData) return <div className="text-center py-20 text-2xl">Module not found</div>;

    // If higher module and not logged in, show skeleton or redirecting state
    if (moduleId > 2 && !isLoggedIn) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-10 w-64 bg-zinc-800 rounded mb-4"></div>
                    <div className="h-4 w-96 bg-zinc-800 rounded mb-2"></div>
                    <div className="h-4 w-80 bg-zinc-800 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-12">
                <a href="/" className="text-blue-500 text-sm hover:underline flex items-center gap-2 mb-8">
                    ← Back to Courses
                </a>
                <h1 className="text-5xl font-bold mb-4">{moduleData.title}</h1>
                <p className="text-zinc-400 text-lg">{moduleData.description}</p>
            </div>

            <div className="prose prose-invert prose-blue max-w-none bg-zinc-900/30 p-10 rounded-3xl border border-zinc-800 backdrop-blur-sm">
                <div className="whitespace-pre-wrap leading-relaxed text-zinc-300">
                    {moduleData.content}
                </div>
            </div>

            <div className="mt-12 flex justify-between items-center bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <div>
                    <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold mb-1">Up Next</p>
                    <p className="font-bold text-xl">
                        {pythonModules[moduleId % 15]?.title || "Course Completed!"}
                    </p>
                </div>
                <a
                    href={`/course/${(moduleId % 15) + 1}`}
                    className="button-primary"
                >
                    Next Lesson
                </a>
            </div>
        </div>
    );
}
