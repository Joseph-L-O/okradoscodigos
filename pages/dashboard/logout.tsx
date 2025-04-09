import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_at");
        router.push("/auth/signin");
    }, [router]);

    return (
        <></>
    );
}

export default Logout;