import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate, type MetaFunction } from "react-router"

import { RegisterSchema } from "~/schema/auth"
import AuthHeader from "~/components/features/auth/AuthHeader"
import AuthFooter from "~/components/features/auth/AuthFooter"
import RegisterForm from "~/components/features/auth/RegisterForm"
import { generateAuthPageKeywords, generateSEOMeta } from "~/lib/seo"

type RegisterFormValues = z.infer<typeof RegisterSchema>

export const meta: MetaFunction = ({ location }) => {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${location.pathname}`;

  return generateSEOMeta({
    title: 'Sign Up',
    description: 'Securely access your HeapMind account. Enter your credentials to sign up and manage your profile, settings, and data.',
    keywords: generateAuthPageKeywords(),
    url,
    canonical: url,
    type: 'website',
    siteName: 'HeapMind SSO',
  });
};

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // TODO: replace with real registration request
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Registration submitted", values)

      // Simulate successful registration - redirect to login
      navigate("/auth/login")
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Registration failed. Please try again."
      })
    }
  }

  return (
    <>
      <AuthHeader
        title="Create your HeapMind account"
        subtitle="Think It. Learn It."
      />
      <RegisterForm
        errors={errors}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        register={register}
      />
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        linkTo="../auth/login"
      />
    </>
  )
}

export default Register