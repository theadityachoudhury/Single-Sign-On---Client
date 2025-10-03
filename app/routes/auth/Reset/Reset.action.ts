import { redirect, type ActionFunctionArgs } from "react-router";
import type { ResetFormErrors } from "~/components/features/auth/ResetForm";
import { ResetPasswordSchema, type ResetPasswordSchemaType } from "~/schema/auth";
import type { ActionDataType } from "~/types/Auth/AuthTypes";

export type ResetActionData = ActionDataType<ResetFormErrors>

export async function ResetAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const email = formData.get("email")
  const password = formData.get("password")
  const rememberRaw = formData.get("remember")

  const submission: ResetPasswordSchemaType = {
    email: typeof email === "string" ? email : "",
  }

  const result = ResetPasswordSchema.safeParse(submission)

  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten()

    return Response.json(
      {
        errors: {
          email: fieldErrors.email?.[0],
          root: formErrors[0]
        }
      } satisfies ResetActionData,
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
      } satisfies ResetActionData,
      { status: 400 }
    )
  }
}