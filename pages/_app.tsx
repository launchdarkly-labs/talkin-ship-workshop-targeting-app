import "@/styles/globals.css";
import {
  isAndroid,
  isIOS,
  isBrowser,
  isMobile,
  isMacOs,
  isWindows,
} from "react-device-detect";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/no-ssr";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { TripsProvider } from "@/utils/contexts/TripContext";
import { LoginProvider } from "@/utils/contexts/login";
import Head from "next/head";
import { PersonaProvider } from "@/components/personacontext";

let c;

if (typeof window !== "undefined") {
  //const uniqueKey = uuidv4().slice(0, 4);

  const operatingSystem = isAndroid
    ? "Android"
    : isIOS
    ? "iOS"
    : isWindows
    ? "Windows"
    : isMacOs
    ? "macOS"
    : "";
  const device = isMobile ? "Mobile" : isBrowser ? "Desktop" : "";

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "",
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
    context: {
      kind: "multi",
      user: {
        anonymous: true,
      },
      device: {
        key: device,
        name: device,
        operating_system: operatingSystem,
        platform: device,
      },
      location: {
        key: Intl.DateTimeFormat().resolvedOptions().timeZone,
        name: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        country: "US",
      },
      experience: {
        key: "a380",
        name: "a380",
        airplane: "a380",
      },
    },
  });

  c = ({ Component, pageProps }: AppProps) => {
    return (
      <NoSSRWrapper>
        <LDProvider>
          <PersonaProvider>
            <LoginProvider>
                <TripsProvider>
                  <Head>
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
                    />
                    <link rel="apple-touch-icon" href="/apple-icon.png" />
                  </Head>
                  <Component {...pageProps} />
                </TripsProvider>
            </LoginProvider>
          </PersonaProvider>
        </LDProvider>
      </NoSSRWrapper>
    );
  };
} else {
  c = () => null;
}

export default c;
