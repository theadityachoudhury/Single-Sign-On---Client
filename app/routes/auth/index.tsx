import { redirect } from "react-router"

export async function loader() {
  return redirect("/auth/login")
}

const index = () => {
    return (
        <></>
    )
}

export default index