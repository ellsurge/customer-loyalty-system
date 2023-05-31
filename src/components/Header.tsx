import {signIn, signOut, useSession} from "next-auth/react"

export const Header =() =>{
    const {data: sessionData} = useSession();

    return (
        <div>
            <div>{sessionData?.user?.name ? `notes for ${sessionData.user.name}` : ""}</div>
        </div>
    )
}