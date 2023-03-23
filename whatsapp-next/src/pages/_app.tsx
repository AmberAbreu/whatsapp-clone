import RootProviders from "@/components/RootProviders";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RootProviders>
            <Component {...pageProps} />
        </RootProviders>
    );
}
