import React from 'react'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Link, type FetcherWithComponents } from 'react-router'
import { Button, Input, Label } from '~/components/ui'
import type { z } from 'zod'
import type { ResetPasswordSchema, ResetPasswordSchemaType } from '~/schema/auth'

export type ResetFormErrors = {
    [K in keyof ResetPasswordSchemaType]?: ResetPasswordSchemaType[K]
} & {
    root?: string
}

interface ResetFormProps {
    fetcher: FetcherWithComponents<unknown>
    errors: ResetFormErrors
    isSubmitting: boolean
}

const ResetForm: React.FC<ResetFormProps> = ({ fetcher, errors, isSubmitting }) => {
    return (
        <fetcher.Form
            className="mt-10 space-y-6"
            method='post'
            noValidate
        >
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending reset email…" : "Send reset email"}
            </Button>
        </fetcher.Form>
    )
}

export default ResetForm