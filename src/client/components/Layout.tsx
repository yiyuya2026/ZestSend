import { useEffect, type ReactNode } from "react";

export default function Layout({ children, title = "ZestSend - P2P文件传输" }: { children: ReactNode; title?: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <main className="zest-viewport box-border overflow-hidden text-slate-100">{children}</main>
  );
}
