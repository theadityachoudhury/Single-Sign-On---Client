import { useFetcher, type MetaFunction } from "react-router"
import AuthHeader from "~/components/features/auth/AuthHeader"
import AuthFooter from "~/components/features/auth/AuthFooter"
import ResetForm, { type ResetFormErrors } from "~/components/features/auth/ResetForm"
import { generateAuthPageKeywords, generateSEOMeta } from "~/lib/seo"
import config from "~/config/config"
import { useLoading } from "~/hooks"
import { useEffect } from "react"
import { ResetAction, type ResetActionData } from "./Reset.action"

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
  const fetcher = useFetcher<ResetActionData>()

  const { startLoading, stopLoading } = useLoading();

  const errors: ResetFormErrors = fetcher.data?.errors ?? {}
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
        title="Reset your password"
        subtitle="Enter your email address and we'll send you a reset link."
      />
      <ResetForm
        errors={errors}
        fetcher={fetcher}
        isSubmitting={isSubmitting}
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
export {
  ResetAction as action
}