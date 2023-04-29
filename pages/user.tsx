import { getServerSession } from "next-auth/next"
//import { authOptions } from "./api/auth/[...nextauth]"
import { signIn, signOut, useSession } from 'next-auth/react'

// export default function User() {
//     const { data: session } = useSession()
//     function handleSignOut() {
//         signOut({ callbackUrl: "/" })
//     }
//     console.log(session)
//     if (typeof window === "undefined") return null

//     if (session) {
//       return (
//         <>
//             <h1>User Page</h1>
//             <p>You can view this page because you are signed in.</p>
//             <button
//                 onClick={() =>
//                     signOut({
//                     callbackUrl: `${window.location.origin}`
//                 })}>
//                 Sign out
//             </button>
//         </>
//       )
//     }
//     return <div onClick={handleSignOut}>Deslogar</div>
// }

// export async function getServerSideProps(context: any) {
//     return {
//       props: {
//         session: await getServerSession(
//           context.req,
//           context.res,
//           authOptions
//         ),
//       },
//     }
//   }