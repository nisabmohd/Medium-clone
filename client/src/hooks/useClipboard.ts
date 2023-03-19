import { useState } from "react";
import { useAppContext } from "../App";

type CopiedValue = string | null;
type CopyFn = (text: string, message: string) => Promise<boolean>;

export default function useClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const { handleToast } = useAppContext();
  const copy: CopyFn = async (text: string, message: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      handleToast(message);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
