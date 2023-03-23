import { UserAuth } from "@/context/UserContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: any) {
    const { user } = UserAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            return router.push("/login");
        }
    }, []);

    return children;
}
