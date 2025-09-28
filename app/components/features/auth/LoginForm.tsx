import React from 'react'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router'
import { Button, Input, Label } from '~/components/ui'
import type { z } from 'zod'
import type { LoginSchema } from '~/schema/auth'

type LoginFormData = z.infer<typeof LoginSchema>

interface LoginFormProps {
    handleSubmit: UseFormHandleSubmit<LoginFormData>
    onSubmit: (data: LoginFormData) => Promise<void>
    errors: FieldErrors<LoginFormData>
    register: UseFormRegister<LoginFormData>
    isSubmitting: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, onSubmit, errors, register, isSubmitting }) => {
    return (
        <form
            className="mt-10 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-sm text-destructive" role="alert">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={Boolean(errors.password)}
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-sm text-destructive" role="alert">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-input bg-background accent-primary"
                        aria-label="Remember me"
                        {...register("remember")}
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
        </form>
    )
}

export default LoginForm