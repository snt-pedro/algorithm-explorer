import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Part = "high" | "low" | "z2" | "z0" | "z1" | "mid" | "plain";

const cls: Record<Part, string> = {
  high: "digit-high",
  low: "digit-low",
  z2: "term-z2",
  z0: "term-z0",
  z1: "term-z1",
  mid: "term-mid",
  plain: "",
};

export function D({ part = "plain", children, className }: { part?: Part; children: ReactNode; className?: string }) {
  return <span className={cn("mono font-semibold", cls[part], className)}>{children}</span>;
}

/** Render a number split in two halves: high (azul) | low (âmbar) */
export function SplitNumber({
  high,
  low,
  className,
}: {
  high: string;
  low: string;
  className?: string;
}) {
  return (
    <span className={cn("mono font-semibold tracking-tight", className)}>
      <span className="digit-high">{high}</span>
      <span className="digit-low">{low}</span>
    </span>
  );
}

export function Pseudo({ children }: { children: ReactNode }) {
  return (
    <pre className="mono text-[26px] leading-[1.45] bg-[var(--faint)] border border-[var(--border)] rounded-2xl p-8 overflow-hidden whitespace-pre">
      {children}
    </pre>
  );
}

export function Card({ children, className, accent }: { children: ReactNode; className?: string; accent?: string }) {
  return (
    <div
      className={cn("card-flat", className)}
      style={accent ? { borderLeft: `8px solid ${accent}`, paddingLeft: 36 } : undefined}
    >
      {children}
    </div>
  );
}

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 slide-caption">
      <span className="chip">
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--digit-high)" }} />
        Parte alta (mais significativa)
      </span>
      <span className="chip">
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--digit-low)" }} />
        Parte baixa (menos significativa)
      </span>
    </div>
  );
}
