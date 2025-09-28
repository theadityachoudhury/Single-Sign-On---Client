import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate, type MetaFunction } from "react-router"

import { ResetPasswordSchema } from "~/schema/auth"
import AuthContainer from "~/components/features/auth/AuthContainer"
import AuthHeader from "~/components/features/auth/AuthHeader"
import AuthFooter from "~/components/features/auth/AuthFooter"
import ResetForm from "~/components/features/auth/ResetForm"
import { generateAuthPageKeywords, generateSEOMeta } from "~/lib/seo"
import config from "~/config/config"

type ResetFormValues = z.infer<typeof ResetPasswordSchema>

export const meta: MetaFunction = ({ location }) => {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${location.pathname}`;

  return generateSEOMeta({
    title: 'Reset Password',
    description: `Reset your ${config.COMPANY_NAME} account password. Enter your email to receive a secure link for password recovery and account access.`,
    keywords: generateAuthPageKeywords(),
    url,
    canonical: url,
    type: 'website',
    siteName: config.APP_NAME,
  });
};

const Reset = () => {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ResetFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async (values: ResetFormValues) => {
    try {
      // TODO: replace with real password reset request
      await new Promise((resolve) => setTimeout(resolve, 750))
      console.log("Password reset submitted", values)
      
      // Simulate successful reset request - show success message or redirect
      alert("Password reset email sent! Check your inbox.")
      navigate("/auth/login")
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Failed to send reset email. Please try again."
      })
    }
  }

  return (
    <>
      <AuthHeader 
        title="Reset your password"
        subtitle="Enter your email address and we'll send you a reset link."
      />
      <ResetForm
        errors={errors}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        register={register}
      />
      <AuthFooter 
        text="Remember your password?"
        linkText="Sign in"
        linkTo="../auth/login"
      />
    </>
  )
}

export default Reset