import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Multiplicação de Inteiros — Extenso vs Karatsuba" },
      { name: "description", content: "Apresentação final de PAA — Pedro, Beatriz e Breno (UFC)" },
    ],
  }),
  component: Deck,
});
