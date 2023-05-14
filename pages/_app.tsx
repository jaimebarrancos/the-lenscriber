import "../styles/globals.css";
import type { AppProps } from "next/app";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import Wrapper from "../components/Wrapper/wrapper";

import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Wrapper>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
        </Wrapper>

      </ThemeProvider>
  );
}
export default MyApp;
