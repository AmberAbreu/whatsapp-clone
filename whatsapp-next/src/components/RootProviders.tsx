import React from "react";
import { UserProvider } from "../context/UserContext";

function RootProviders({ children }: any) {
    return <UserProvider>{children}</UserProvider>;
}

export default RootProviders;
