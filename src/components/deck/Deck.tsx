import { useCallback, useEffect, useState } from "react";
import { ScaledSlide } from "./ScaledSlide";
import { slides } from "@/slides/slides";
import { cn } from "@/lib/utils";

function readSlideFromURL(): number {
  if (typeof window === "undefined") return 0;
  const p = new URLSearchParams(window.location.search);
  const n = parseInt(p.get("slide") ?? "1", 10);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(slides.length - 1, n - 1));
}
function readViewFromURL(): "deck" | "grid" {
  if (typeof window === "undefined") return "deck";
  return new URLSearchParams(window.location.search).get("view") === "grid" ? "grid" : "deck";
}

export function Deck() {
  const [i, setI] = useState(0);
  const [view, setView] = useState<"deck" | "grid">("deck");
  const [dark, setDark] = useState(false);

  // hydrate from URL
  useEffect(() => {
    setI(readSlideFromURL());
    setView(readViewFromURL());
    const onPop = () => {
      setI(readSlideFromURL());
      setView(readViewFromURL());
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // sync URL + title
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(i + 1));
    if (view === "grid") url.searchParams.set("view", "grid");
    else url.searchParams.delete("view");
    window.history.replaceState({}, "", url.toString());
    document.title = `${i + 1}/${slides.length} — ${slides[i]?.title ?? ""} · PAA`;
  }, [i, view]);

  const go = useCallback((d: number) => setI((x) => Math.max(0, Math.min(slides.length - 1, x + d))), []);

  const fullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (view === "grid") return;
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        if (view === "grid") return;
        go(-1);
      } else if (e.key.toLowerCase() === "f") {
        fullscreen();
      } else if (e.key.toLowerCase() === "g") {
        setView((v) => (v === "grid" ? "deck" : "grid"));
      } else if (e.key.toLowerCase() === "d") {
        setDark((d) => !d);
      } else if (e.key === "Escape" && view === "grid") {
        setView("deck");
      } else if (e.key === "Home") {
        setI(0);
      } else if (e.key === "End") {
        setI(slides.length - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, fullscreen, view]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (view === "grid") {
    return (
      <div className="min-h-screen bg-[var(--background)] p-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              Visão geral — {slides.length} slides
            </h1>
            <button
              onClick={() => setView("deck")}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent"
            >
              Voltar (Esc)
            </button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {slides.map((s, idx) => {
              const Comp = s.render;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setI(idx);
                    setView("deck");
                  }}
                  className={cn(
                    "group relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-card text-left transition-shadow hover:shadow-lg",
                    idx === i && "ring-2 ring-[var(--ring)]",
                  )}
                >
                  <div className="absolute inset-0">
                    <ScaledSlide>
                      <Comp page={idx + 1} total={slides.length} />
                    </ScaledSlide>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-[var(--background)]/90 px-3 py-2 text-xs">
                    <span className="font-medium">{idx + 1}. {s.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const Current = slides[i].render;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[oklch(0.95_0.005_85)] dark:bg-[oklch(0.1_0.01_250)]">
      <ScaledSlide>
        <Current page={i + 1} total={slides.length} />
      </ScaledSlide>

      {/* nav pills */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 text-sm shadow-lg backdrop-blur">
        <button
          onClick={() => go(-1)}
          className="rounded-full px-3 py-1 hover:bg-accent disabled:opacity-30"
          disabled={i === 0}
          aria-label="Anterior"
        >
          ←
        </button>
        <span className="mono px-2 tabular-nums">
          {i + 1} / {slides.length}
        </span>
        <button
          onClick={() => go(1)}
          className="rounded-full px-3 py-1 hover:bg-accent disabled:opacity-30"
          disabled={i === slides.length - 1}
          aria-label="Próximo"
        >
          →
        </button>
        <span className="mx-2 h-5 w-px bg-border" />
        <button onClick={() => setView("grid")} className="rounded-full px-3 py-1 hover:bg-accent" title="Visão geral (G)">
          ▦
        </button>
        <button onClick={fullscreen} className="rounded-full px-3 py-1 hover:bg-accent" title="Tela cheia (F)">
          ⛶
        </button>
        <button onClick={() => setDark((d) => !d)} className="rounded-full px-3 py-1 hover:bg-accent" title="Tema (D)">
          ☾
        </button>
      </div>
    </div>
  );
}
