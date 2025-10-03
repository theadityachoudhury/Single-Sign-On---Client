import React from 'react'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Link, type FetcherWithComponents } from 'react-router'
import { Button, Input, Label } from '~/components/ui'
import type { z, ZodError } from 'zod'
import type { RegisterSchema, RegisterSchemaType } from '~/schema/auth'

export type RegisterFormErrors = {
    [K in keyof RegisterSchemaType]?: RegisterSchemaType[K];
} & {
    root?: string;
};

interface RegisterFormProps {
    fetcher: FetcherWithComponents<unknown>
    errors: RegisterFormErrors
    isSubmitting: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = ({ fetcher, errors, isSubmitting }) => {
    return (
        <fetcher.Form className="mt-10 space-y-6" method="post" noValidate>
            {errors.root && (
                <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4">
                    <p className="text-center text-sm text-destructive" role="alert">
                        {errors.root}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="John"
                        aria-invalid={Boolean(errors.firstName)}
                        required
                    />
                    {errors.firstName && (
                        <p className="text-sm text-destructive" role="alert">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        aria-invalid={Boolean(errors.lastName)}
                        required
                    />
                    {errors.lastName && (
                        <p className="text-sm text-destructive" role="alert">
                            {errors.lastName}
                        </p>
                    )}
                </div>
            </div>

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

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    required
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-destructive" role="alert">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing you up…" : "Sign up"}
            </Button>

        </fetcher.Form>
    )
}

export default RegisterForm