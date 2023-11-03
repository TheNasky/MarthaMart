import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Navbar.js";

export default function Layout({children}) {
   const { data: session } = useSession();
   if (!session) {
      return (
         <>
            <div className="bg-blue-900 w-screen h-screen flex items-center">
               <div className="text-center w-full">
                  <button
                     onClick={() => signIn("google")}
                     className="bg-white p-2 px-4 rounded-lg"
                  >
                     Login with Google
                  </button>
               </div>
            </div>
         </>
      );
   }
   return (
      <div className="bg-blue-900 min-h-screen flex">
         <Nav></Nav>
         <div className="bg-white mt-2 mr-2 mb-2 p-3 rounded-lg flex-grow">{children}</div> 
      </div>
   );
}
