import { redirect, type ActionFunctionArgs } from "react-router";
import type { RegisterFormErrors } from "~/components/features/auth/RegisterForm";
import { RegisterSchema, type RegisterSchemaType } from "~/schema/auth";
import type { ActionDataType } from "~/types/Auth/AuthTypes";

export type RegisterActionData = ActionDataType<RegisterFormErrors>

export async function RegisterAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission: RegisterSchemaType = {
    firstName: formData.get("firstName") as string || "",
    lastName: formData.get("lastName") as string || "",
    email: formData.get("email") as string || "",
    password: formData.get("password") as string || "",
    confirmPassword: formData.get("confirmPassword") as string || ""
  }

  console.log(submission)

  const result = RegisterSchema.safeParse(submission)

  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten()
    return Response.json(
      {
        errors: {
          firstName: fieldErrors.firstName?.[0],
          lastName: fieldErrors.lastName?.[0],
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
          confirmPassword: fieldErrors.confirmPassword?.[0],
          root: formErrors[0],
        },
      } satisfies RegisterActionData,
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
      } satisfies RegisterActionData,
      { status: 400 }
    )
  }
}