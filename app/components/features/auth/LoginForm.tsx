import React from "react"
import type { FetcherWithComponents } from "react-router"
import { Link } from "react-router"

import { Button, Input, Label } from "~/components/ui"
import type { LoginSchemaType } from "~/schema/auth"

export type LoginFormErrors = {
    [K in keyof LoginSchemaType]?: LoginSchemaType[K]
} & {
  root?: string
}

interface LoginFormProps {
    fetcher: FetcherWithComponents<unknown>
    errors: LoginFormErrors
    isSubmitting: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ fetcher, errors, isSubmitting }) => {
    return (
        <fetcher.Form className="mt-10 space-y-6" method="post" noValidate>
            {errors.root && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4">
                    <p className="text-center text-sm text-destructive" role="alert">
                        {errors.root}
                    </p>
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    required
                />
                {errors.email && (
                    <p className="text-sm text-destructive" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={Boolean(errors.password)}
                    required
                />
                {errors.password && (
                    <p className="text-sm text-destructive" role="alert">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 rounded border-input bg-background accent-primary"
                        aria-label="Remember me"
                    />
                    Remember me
                </label>

                <Link
                    to="../auth/reset"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing you in…" : "Sign in"}
            </Button>
        </fetcher.Form>
    )
}

export default LoginForm