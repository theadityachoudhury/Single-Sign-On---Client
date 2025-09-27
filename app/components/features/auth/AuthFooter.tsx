import React from 'react'
import { Link } from 'react-router'

interface AuthFooterProps {
  text: string
  linkText: string
  linkTo: string
}

const AuthFooter: React.FC<AuthFooterProps> = ({ text, linkText, linkTo }) => {
    return (
        <footer className="mt-8 text-center text-sm text-muted-foreground">
            {text}{" "}
            <Link
                to={linkTo}
                className="font-medium text-primary underline-offset-4 hover:underline"
            >
                {linkText}
            </Link>
        </footer>
    )
}

export default AuthFooter