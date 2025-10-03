import { useFetcher, type MetaFunction } from "react-router"
import LoginForm, { type LoginFormErrors } from "~/components/features/auth/LoginForm"
import AuthHeader from "~/components/features/auth/AuthHeader"
import AuthFooter from "~/components/features/auth/AuthFooter"
import { generateAuthPageKeywords, generateSEOMeta } from "~/lib/seo"
import config from "~/config/config"
import { useLoading } from "~/hooks"
import { useEffect } from "react"
import { LoginAction, type LoginActionData } from "./Login.action"

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

const Login = () => {
  const fetcher = useFetcher<LoginActionData>()
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
export {
  LoginAction as action
};