import React from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById("portal-root")
      : null;

  if (!portalRoot) return null;
  return createPortal(children, portalRoot);
}
