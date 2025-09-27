import React from 'react'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router'
import { Button, Input, Label } from '~/components/ui'
import type { z } from 'zod'
import type { RegisterSchema } from '~/schema/auth'

type RegisterFormData = z.infer<typeof RegisterSchema>

interface RegisterFormProps {
    handleSubmit: UseFormHandleSubmit<RegisterFormData>
    onSubmit: (data: RegisterFormData) => Promise<void>
    errors: FieldErrors<RegisterFormData>
    register: UseFormRegister<RegisterFormData>
    isSubmitting: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = ({ handleSubmit, onSubmit, errors, register, isSubmitting }) => {
    return (
        <form
            className="mt-10 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="John"
                        aria-invalid={Boolean(errors.firstName)}
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                        <p className="text-sm text-destructive" role="alert">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        aria-invalid={Boolean(errors.lastName)}
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                        <p className="text-sm text-destructive" role="alert">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>
            </div>

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
                    autoComplete="new-password"
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

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-destructive" role="alert">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
        </form>
    )
}

export default RegisterForm