import React from 'react'

interface AuthHeaderProps {
  title: string
  subtitle: string
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="">
            <h1 className="text-[1.3rem] font-semibold tracking-tight text-foreground md:text-2xl">
                {title}
            </h1>
            <p className="text-xl text-muted-foreground">
                {subtitle}
            </p>
        </header>
    )
}

export default AuthHeader