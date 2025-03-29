import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();

    auth.signOut()
        .then(() => {
            router.push("/auth/signin"); 
              // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
            console.error("Error signing out: ", error);
        });

    return (
        <></>
    );
}

export default Logout;