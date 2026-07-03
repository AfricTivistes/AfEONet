import type { Metadata } from "next"

export const baseMetadata: Metadata = {
  title: "AfEONet - African Election Observers Network",
  description: "Monitoring civic space, strengthening democracy in Africa",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
}
