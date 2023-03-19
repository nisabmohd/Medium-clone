import { useCallback } from "react";

type WebShareData = {
  title: string;
  text: string;
  url: string;
};

export default function useShare() {
  const webShare = useCallback(async function (data: WebShareData) {
    await navigator.share(data);
  }, []);
  const socialShare = useCallback(function (url: string) {
    window.open(url, "_blank", "width=600,height=700");
  }, []);
  return { webShare, socialShare } as const;
}
