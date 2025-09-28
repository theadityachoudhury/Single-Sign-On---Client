import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate, type MetaFunction } from "react-router"

import { LoginSchema } from "~/schema/auth"
import LoginForm from "~/components/features/auth/LoginForm"
import AuthContainer from "~/components/features/auth/AuthContainer"
import AuthHeader from "~/components/features/auth/AuthHeader"
import AuthFooter from "~/components/features/auth/AuthFooter"
import { ThemeSwitcher } from "~/components/ui"
import { generateAuthPageKeywords, generateSEOMeta } from "~/lib/seo"

export const meta: MetaFunction = ({ location }) => {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${location.pathname}`;

  return generateSEOMeta({
    title: 'Sign In',
    description: 'Securely access your HeapMind account. Enter your credentials to sign in and manage your profile, settings, and data.',
    keywords: generateAuthPageKeywords(),
    url,
    canonical: url,
    type: 'website',
    siteName: 'HeapMind SSO',
  });
};

type LoginFormValues = z.infer<typeof LoginSchema>

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      // TODO: replace with real authentication request
      await new Promise((resolve) => setTimeout(resolve, 750))
      console.log("Login submitted", values)

      // Simulate successful login - redirect to dashboard
      navigate("/dashboard")
    } catch (error) {
      // Handle login errors
      setError("root", {
        type: "manual",
        message: "Invalid email or password. Please try again."
      })
    }
  }



  return (
    <>
      <AuthHeader
        title="Log in to your HeapMind account"
        subtitle="Think It. Learn It."
      />
      <LoginForm
        errors={errors}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        register={register}
      />
      <AuthFooter
        text="Don't have an account?"
        linkText="Create one"
        linkTo="../auth/register"
      />
    </>
  )
}

export default Login