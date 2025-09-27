import { redirect } from "react-router"

export async function loader() {
  return redirect("/auth/login")
}

const Dashboard = () => {
  // Redirect to /auth/login always

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard