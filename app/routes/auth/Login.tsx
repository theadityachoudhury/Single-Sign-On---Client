import {
  type ActionFunctionArgs,
  redirect,
  useFetcher,
  type MetaFunction,
} from "react-router"

import { z } from "zod"

import { LoginSchema } from "~/schema/auth"
import LoginForm, { type LoginFormErrors } from "~/components/features/auth/LoginForm"
import AuthHeader from "~/components/features/auth/AuthHeader"
import AuthFooter from "~/components/features/auth/AuthFooter"
import { generateAuthPageKeywords, generateSEOMeta } from "~/lib/seo"
import config from "~/config/config"
import { useLoading } from "~/hooks"
import { useEffect } from "react"

export const meta: MetaFunction = ({ location }) => {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${location.pathname}`;

  return generateSEOMeta({
    title: 'Sign In',
    description: `Securely access your ${config.COMPANY_NAME} account. Enter your credentials to sign in and manage your profile, settings, and data.`,
    keywords: generateAuthPageKeywords(),
    url,
    canonical: url,
    type: 'website',
    siteName: config.APP_NAME,
  });
};

type LoginFormValues = z.infer<typeof LoginSchema>

export type ActionData = {
  errors?: LoginFormErrors
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const email = formData.get("email")
  const password = formData.get("password")
  const rememberRaw = formData.get("remember")

  const submission: LoginFormValues = {
    email: typeof email === "string" ? email : "",
    password: typeof password === "string" ? password : "",
    remember: rememberRaw === "on"
  }

  const result = LoginSchema.safeParse(submission)

  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten()

    return Response.json(
      {
        errors: {
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
          root: formErrors[0]
        }
      } satisfies ActionData,
      { status: 400 }
    )
  }

  try {
    // TODO: replace with real authentication request
    await new Promise((resolve) => setTimeout(resolve, 750))

    return redirect("/dashboard")
  } catch (error) {
    console.error("Login failed", error)

    return Response.json(
      {
        errors: {
          root: "Invalid email or password. Please try again."
        }
      } satisfies ActionData,
      { status: 400 }
    )
  }
}

const Login = () => {
  const fetcher = useFetcher<ActionData>()
  const { startLoading, stopLoading } = useLoading();

  const errors: LoginFormErrors = fetcher.data?.errors ?? {}
  const isSubmitting = fetcher.state !== "idle"

  useEffect(() => {
    if (fetcher.state === "submitting" || fetcher.state === "loading") {
      startLoading("Signing you in...")
    } else {
      stopLoading()
    }

    return () => {
      stopLoading()
    }
  }, [fetcher.state, startLoading, stopLoading])

  return (
    <>
      <AuthHeader
        title={`Log in to your ${config.COMPANY_NAME} account`}
        subtitle="Think It. Learn It."
      />
      <LoginForm
        errors={errors}
        fetcher={fetcher}
        isSubmitting={isSubmitting}
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