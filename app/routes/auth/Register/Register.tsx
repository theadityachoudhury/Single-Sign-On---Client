import { useFetcher, type MetaFunction } from "react-router"
import AuthHeader from "~/components/features/auth/AuthHeader"
import AuthFooter from "~/components/features/auth/AuthFooter"
import RegisterForm, { type RegisterFormErrors } from "~/components/features/auth/RegisterForm"
import { generateAuthPageKeywords, generateSEOMeta } from "~/lib/seo"
import config from "~/config/config"
import { useEffect } from "react"
import { useLoading } from "~/hooks"
import { RegisterAction, type RegisterActionData } from "./Register.action"

export const meta: MetaFunction = ({ location }) => {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${location.pathname}`;

  return generateSEOMeta({
    title: 'Sign Up',
    description: `Securely access your ${config.COMPANY_NAME} account. Enter your credentials to sign up and manage your profile, settings, and data.`,
    keywords: generateAuthPageKeywords(),
    url,
    canonical: url,
    type: 'website',
    siteName: config.APP_NAME,
  });
};

const Register = () => {
  const fetcher = useFetcher<RegisterActionData>()
  const { startLoading, stopLoading } = useLoading();

  const errors: RegisterFormErrors = fetcher.data?.errors ?? {}
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
        title={`Create your ${config.COMPANY_NAME} account`}
        subtitle="Think It. Learn It."
      />
      <RegisterForm
        errors={errors}
        fetcher={fetcher}
        isSubmitting={isSubmitting}
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
export {
  RegisterAction as action
}