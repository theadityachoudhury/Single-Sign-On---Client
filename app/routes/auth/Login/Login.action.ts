import { redirect, type ActionFunctionArgs } from "react-router"
import type { LoginFormErrors } from "~/components/features/auth/LoginForm"
import { LoginSchema, type LoginSchemaType } from "~/schema/auth"
import type { ActionDataType } from "~/types/Auth/AuthTypes"

export type LoginActionData = ActionDataType<LoginFormErrors>

export async function LoginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const email = formData.get("email")
  const password = formData.get("password")
  const rememberRaw = formData.get("remember")

  const submission: LoginSchemaType = {
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
      } satisfies LoginActionData,
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
      } satisfies LoginActionData,
      { status: 400 }
    )
  }
}