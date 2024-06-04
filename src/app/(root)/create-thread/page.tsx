import PostThread from "@/components/forms/PostThread"
import { fetchUser } from "@/lib/actions/users.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


async function Page() {
    const user = await currentUser()
    if (!user) return null

    const userInfo = await fetchUser(user?.id)
    // if (!userInfo?.onboarded) redirect('/onboarding')
    return (<>
        <h1 className="text-light-1">Create Thread</h1>
        <PostThread userId={userInfo?._id} />
    </>)
}

export default Page