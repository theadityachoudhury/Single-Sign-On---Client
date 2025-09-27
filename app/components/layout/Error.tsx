import React from 'react'
import { Link } from 'react-router';

interface ErrorPageProps {
    message: string;
    details: string;
    stack?: string;
    statusCode?: number|string;
}

// Robot SVG illustration similar to Google's
const RobotIllustration = () => (
    <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-30"
    >
        {/* Robot head */}
        <rect x="60" y="40" width="80" height="60" rx="8" stroke="#4285f4" strokeWidth="2" fill="none" />

        {/* Eyes */}
        <circle cx="80" cy="65" r="6" fill="#4285f4" />
        <circle cx="120" cy="65" r="6" fill="#4285f4" />

        {/* Mouth */}
        <path d="M90 80 Q100 90 110 80" stroke="#4285f4" strokeWidth="2" fill="none" />

        {/* Antenna */}
        <line x1="100" y1="40" x2="100" y2="25" stroke="#4285f4" strokeWidth="2" />
        <circle cx="100" cy="20" r="4" fill="#4285f4" />

        {/* Body */}
        <rect x="70" y="100" width="60" height="80" rx="8" stroke="#4285f4" strokeWidth="2" fill="none" />

        {/* Arms */}
        <rect x="30" y="120" width="40" height="15" rx="7" stroke="#4285f4" strokeWidth="2" fill="none" />
        <rect x="130" y="120" width="40" height="15" rx="7" stroke="#4285f4" strokeWidth="2" fill="none" />

        {/* Legs */}
        <rect x="80" y="180" width="15" height="30" rx="7" stroke="#4285f4" strokeWidth="2" fill="none" />
        <rect x="105" y="180" width="15" height="30" rx="7" stroke="#4285f4" strokeWidth="2" fill="none" />

        {/* Control panel */}
        <rect x="85" y="130" width="30" height="20" rx="4" stroke="#4285f4" strokeWidth="1" fill="none" />
        <circle cx="95" cy="140" r="2" fill="#4285f4" />
        <circle cx="105" cy="140" r="2" fill="#4285f4" />

        {/* Tools/gears around robot */}
        <circle cx="40" cy="60" r="8" stroke="#4285f4" strokeWidth="1.5" fill="none" />
        <circle cx="160" cy="170" r="6" stroke="#4285f4" strokeWidth="1.5" fill="none" />
        <rect x="150" y="50" width="12" height="12" rx="2" stroke="#4285f4" strokeWidth="1.5" fill="none" />

        {/* Small decorative elements */}
        <path d="M30 170 L40 160 L50 170" stroke="#4285f4" strokeWidth="1.5" fill="none" />
        <path d="M160 40 L170 30 L180 40" stroke="#4285f4" strokeWidth="1.5" fill="none" />
    </svg>
);

const Error = ({ message, details, stack, statusCode = 500 }: ErrorPageProps) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center h-200">
                {/* Left side - Content */}
                <div className="flex-1 max-w-md">
                    {/* Error message */}
                    <div className="mb-8">
                        <h1 className="text-xl text-gray-700 mb-4">
                            <span className="font-bold">{statusCode}.</span>{" "}
                            <span className="font-normal">That's an error.</span>
                        </h1>

                        <p className="text-base text-gray-600 leading-relaxed">
                            {details}
                            <br />
                            That's all we know.
                        </p>
                    </div>

                    {/* Technical details for development */}
                    {import.meta.env.DEV && stack && (
                        <details className="mt-8">
                            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                                Technical Details
                            </summary>
                            <pre className="text-xs text-gray-600 bg-gray-50 p-4 rounded overflow-x-auto border max-h-40 overflow-y-auto">
                                {stack}
                            </pre>
                        </details>
                    )}
                </div>

                {/* Right side - Robot illustration */}
                <div className="">
                    <RobotIllustration />
                </div>
            </div>
        </div>
    )
}

export default Error