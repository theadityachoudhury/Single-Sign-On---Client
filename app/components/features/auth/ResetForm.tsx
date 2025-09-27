import React from 'react'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router'
import { Button, Input, Label } from '~/components/ui'
import type { z } from 'zod'
import type { ResetPasswordSchema } from '~/schema/auth'

type ResetFormData = z.infer<typeof ResetPasswordSchema>

interface ResetFormProps {
    handleSubmit: UseFormHandleSubmit<ResetFormData>
    onSubmit: (data: ResetFormData) => Promise<void>
    errors: FieldErrors<ResetFormData>
    register: UseFormRegister<ResetFormData>
    isSubmitting: boolean
}

const ResetForm: React.FC<ResetFormProps> = ({ handleSubmit, onSubmit, errors, register, isSubmitting }) => {
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending reset email…" : "Send reset email"}
            </Button>
        </form>
    )
}

export default ResetForm