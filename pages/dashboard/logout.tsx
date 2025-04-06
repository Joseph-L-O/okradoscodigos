import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();

    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    router.push("/auth/signin");


    return (
        <></>
    );
}

export default Logout;