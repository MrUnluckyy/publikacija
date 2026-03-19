"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalEmbedProps {
  calLink: string;
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: calLink });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#221c14",
            "cal-brand-emphasis": "#221c14",
            "cal-brand-text": "#e5e4d2",
            "cal-bg": "#e5e4d2",
            "cal-bg-emphasis": "#d5d4c2",
            "cal-border": "#221c14",
            "cal-text": "#221c14",
            "cal-text-emphasis": "#221c14",
          },
        },
      });
    })();
  }, [calLink]);

  return (
    <Cal
      namespace={calLink}
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: 600, overflow: "scroll" }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
