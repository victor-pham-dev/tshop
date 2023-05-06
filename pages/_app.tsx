import { AppLoadingProvider } from "@/contexts/LoadingContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { AppLayout } from "@/layout/AppLayout";
import { Auth } from "@/middleware/Auth";
import "@/styles/globals.css";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Sakura } from "@/components/sakuraEffect/sakura";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoading } from "@/hooks";
import { message } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLoadingProvider>
        <ThemeContextProvider>
          <UserProvider>
            <Auth>
              <AppLayout>
                <Sakura />
                <Component {...pageProps}></Component>
              </AppLayout>
            </Auth>
          </UserProvider>
        </ThemeContextProvider>
      </AppLoadingProvider>
    </QueryClientProvider>
  );
}
