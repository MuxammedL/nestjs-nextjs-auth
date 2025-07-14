import { auth } from "@/lib/auth"

const Dashboard = async () => {
    const session = await auth()
    return (
        <div>Dashboard {session?.user.fullName} {session?.user.role}</div>
    )
}

export default Dashboard