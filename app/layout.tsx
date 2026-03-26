import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata = {
  title: {
    default: "The Validation Playbook",
    template: "%s | The Validation Playbook",
  },
  description:
    "Find the Idea Worth Building. A step-by-step guide for early-stage founders who want to stop guessing and start choosing.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
