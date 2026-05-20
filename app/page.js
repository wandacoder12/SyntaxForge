'use client';
import { pythonModules } from '../data/pythonModules';

export default function Home() {
    return (
        <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
                <h1 className="text-6xl font-bold mb-6 leading-tight">
                    Level Up Your Skills <br />
                    <span className="gradient-text">Master Python Today</span>
                </h1>
                <p className="text-zinc-400 text-xl leading-relaxed">
                    From variables to complex data science applications, SyntaxForge provides a structured 15-module path to Python mastery.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pythonModules.map((module, index) => (
                    <a
                        key={module.id}
                        href={`/course/${module.id}`}
                        className="card group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-mono text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
                                Module {index + 1}
                            </span>
                            {index >= 2 && (
                                <span className="text-xs text-zinc-500 flex items-center gap-1">
                                    🔒 Locked
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
                            {module.title}
                        </h3>
                        <p className="text-zinc-400 text-sm">
                            {module.description}
                        </p>
                        <div className="mt-6 flex items-center text-sm font-semibold text-blue-500 group-hover:gap-2 transition-all">
                            Start Learning <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
