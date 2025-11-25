
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticated = localStorage.getItem("taskly_authenticated");
    setIsAuthenticated(authenticated === "true");
    setIsLoading(false);

    if (!authenticated && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  const isLoginPage = router.pathname === "/login";

  if (isLoginPage) {
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
