import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SlideShell({
  children,
  kicker,
  dark = false,
  page,
  total,
  placeholder = false,
  noChrome = false,
}: {
  children: ReactNode;
  kicker?: string;
  dark?: boolean;
  page?: number;
  total?: number;
  placeholder?: boolean;
  noChrome?: boolean;
}) {
  return (
    <div className={cn("slide-content", dark && "section-dark")}>
      {!noChrome && (
        <>
          <div className="absolute left-[80px] right-[80px] top-[56px] flex items-center justify-between">
            <div className="slide-kicker">{kicker ?? ""}</div>
            <div className="flex items-center gap-3">
              {placeholder && (
                <span className="chip" style={{ borderColor: "var(--accent-mid)", color: "var(--accent-mid)" }}>
                  ◷ Placeholder — Parte 3
                </span>
              )}
              <span className="slide-page text-[var(--muted-foreground)]">
                {page != null && total != null ? `${page} / ${total}` : ""}
              </span>
            </div>
          </div>
          <div className="absolute bottom-[40px] left-[80px] right-[80px] flex items-center justify-between slide-footer text-[var(--muted-foreground)]">
            <span>Multiplicação de Inteiros · Extenso × Karatsuba</span>
            <span>PAA · UFC · 2026</span>
          </div>
        </>
      )}
      <div className="absolute inset-0 px-[80px] pt-[130px] pb-[90px]">{children}</div>
    </div>
  );
}
