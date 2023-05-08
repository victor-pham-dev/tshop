import { AppLoadingProvider } from "@/contexts/LoadingContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { AppLayout } from "@/layout/AppLayout";
import { Auth } from "@/middleware/client/Auth";
import "@/styles/globals.css";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "@/contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLoadingProvider>
        <ThemeContextProvider>
          <UserProvider>
            <CartProvider>
              <Auth>
                <AppLayout>
                  <Component {...pageProps}></Component>
                </AppLayout>
              </Auth>
            </CartProvider>
          </UserProvider>
        </ThemeContextProvider>
      </AppLoadingProvider>
    </QueryClientProvider>
  );
}
