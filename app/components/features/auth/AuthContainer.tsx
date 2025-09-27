import React from 'react'
import { ThemeSwitcher } from '~/components/ui'

interface AuthContainerProps {
    children: React.ReactNode
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
    return (
        <section className="flex min-h-dvh bg-background">
            <div className="hidden lg:flex lg:flex-[1.4] relative overflow-hidden">
                <img
                    src="/AuthHero.jpg"
                    alt="Background"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/60" />
            </div>

            <div className="flex flex-1 lg:flex-[0.6] items-center justify-center py-12 px-4 sm:px-6 relative">
                <ThemeSwitcher className="absolute top-4 right-4" variant="secondary" />

                <div className="w-full max-w-md p-4">
                    <div className="flex items-center justify-start mb-4 gap-1">
                        <img
                            src="/logo.png"
                            alt="HeapMind Logo"
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl"
                        />
                        <h1 className="text-3xl font-extrabold tracking-tight text-primary">
                            HeapMind
                        </h1>
                    </div>

                    {children}
                </div>
            </div>
        </section>
    )
}

export default AuthContainer
