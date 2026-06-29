import type { ComponentType } from "react";
import { SlideShell } from "@/components/deck/SlideShell";
import { D, SplitNumber, Pseudo, Card, Legend } from "@/components/deck/atoms";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend as RLegend,
} from "recharts";

type SlideProps = { page: number; total: number };
type Slide = { id: string; title: string; render: ComponentType<SlideProps> };

/* ============================================================
 *  BLOCO 1 — Abertura
 * ============================================================ */

const S01_Capa: ComponentType<SlideProps> = () => (
  <SlideShell noChrome dark>
    <div className="flex h-full flex-col justify-between">
      <div className="slide-kicker" style={{ color: "oklch(0.75 0.02 85)" }}>
        UFC · Projeto e Análise de Algoritmos · 2026.1
      </div>
      <div>
        <h1 className="slide-title-lg">
          Multiplicação por <span className="digit-low">Extenso</span> × <span className="term-z1">Karatsuba</span>:
        </h1>
      </div>
      <div className="flex items-end justify-between slide-body">
        <div className="space-y-1">
          <div className="font-semibold">Pedro E. Santana</div>
          <div className="font-semibold">Maria Beatriz C. Ribeiro</div>
          <div className="font-semibold">Breno G. Carvalho</div>
        </div>
        <div className="text-right slide-caption" style={{ color: "oklch(0.75 0.02 85)" }}>
        </div>
      </div>
    </div>
  </SlideShell>
);


/* ============================================================
 *  BLOCO 2 — O Problema
 * ============================================================ */

const S03_Problema: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="1 · O problema" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Dado dois naturais, calcular o produto.</h2>
    <p className="slide-body-lg max-w-[1300px] opacity-80 mb-16">
      Operação fundamental em computação: criptografia moderna multiplica
      números com <em>milhares</em> de dígitos.
    </p>

    <div className="flex items-center justify-center gap-12 mt-8">
      <div className="mono text-[140px] font-semibold leading-none">
        <span className="digit-high">56</span><span className="digit-low">78</span>
      </div>
      <div className="text-[140px] font-light opacity-50">×</div>
      <div className="mono text-[140px] font-semibold leading-none">
        <span className="digit-high">12</span><span className="digit-low">34</span>
      </div>
      <div className="text-[140px] font-light opacity-50">=</div>
      <div className="mono text-[140px] font-semibold leading-none term-z1">?</div>
    </div>
  </SlideShell>
);

const S03_Posicional10: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · Representação" page={p.page} total={p.total}>
    <h2 className="slide-title mb-4">Representação posicional</h2>
    <p className="slide-body max-w-[1300px] opacity-80 mb-10">
      Cada número é uma sequência de dígitos em uma base <D>b</D>. Usaremos base 10.
    </p>

    <div className="grid grid-cols-[1fr_auto] gap-16 items-center">
      <div>
        <div className="slide-kicker mb-3">Base 10 — número 1234</div>
        <table className="mono text-[28px] w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-foreground/30 text-left">
              <th className="py-3">posição i</th>
              <th>dígito dᵢ</th>
              <th>peso 10ⁱ</th>
              <th>contribuição</th>
            </tr>
          </thead>
          <tbody>
            {[
              [0, 4, 1, 4],
              [1, 3, 10, 30],
              [2, 2, 100, 200],
              [3, 1, 1000, 1000],
            ].map(([i, d, w, c]) => (
              <tr key={i} className="border-b border-border">
                <td className="py-3">{i}</td>
                <td className="font-bold">{d}</td>
                <td>{w}</td>
                <td className="term-z1 font-semibold">{c}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="pt-4 text-right">soma=</td>
              <td className="pt-4 term-z1 font-bold">1234</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-[44px] leading-tight max-w-[600px]" style={{ fontFamily: "var(--font-display)" }}>
        <D part="plain">1234</D>
        <div className="slide-body opacity-70 mt-4">
          = <D part="high">1</D>·10³ + <D part="high">2</D>·10² + <D part="low">3</D>·10¹ + <D part="low">4</D>·10⁰
        </div>
      </div>
    </div>
  </SlideShell>
);


const S04_PreCondicoes: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="1 · O problema" page={p.page} total={p.total}>
    <h2 className="slide-title mb-12">Pré- e pós-condições</h2>
    <div className="grid grid-cols-2 gap-10">
      <Card accent="var(--digit-high)">
        <div className="slide-kicker mb-4" style={{ color: "var(--digit-high)" }}>Entrada · pré-condições</div>
        <ul className="slide-body-lg space-y-4 list-disc pl-8">
          <li><D>x</D> e <D>y</D> são naturais válidos na base <D>b</D></li>
          <li>cada dígito dᵢ ∈ {"{"}0, 1, …, b−1{"}"}</li>
          <li><D>b ≥ 2</D></li>
          <li><D>n ≥ 1</D> (o próprio 0 tem n=1)</li>
        </ul>
      </Card>
      <Card accent="var(--accent-z)">
        <div className="slide-kicker mb-4" style={{ color: "var(--accent-z)" }}>Saída · pós-condições</div>
        <ul className="slide-body-lg space-y-4 list-disc pl-8">
          <li><D part="z1">p = x · y</D> exatamente</li>
          <li><D>p</D> representado na mesma base <D>b</D></li>
          <li>tem no máximo <D>2n</D> dígitos</li>
        </ul>
      </Card>
    </div>
    <p className="slide-caption mt-12 max-w-[1500px]">
      Simplificação: supomos <D>x</D> e <D>y</D> com o mesmo número de dígitos
      (o menor pode ser completado com zeros à esquerda).
    </p>
  </SlideShell>
);

/* ============================================================
 *  BLOCO 3 — Multiplicação por Extenso
 * ============================================================ */

const S05_ExtensoSecao: ComponentType<SlideProps> = (p) => (
  <SlideShell noChrome dark page={p.page} total={p.total}>
    <div className="flex h-full flex-col justify-center">
      <div className="slide-kicker mb-6" style={{ color: "var(--digit-low)" }}>2 · Multiplicação por extenso</div>
      <h2 className="slide-title-lg">Multiplicação por extenso</h2>
      <p className="slide-subtitle mt-8 opacity-80 max-w-[1400px]">
        O método que aprendemos na escola.
      </p>
    </div>
  </SlideShell>
);

const S06_ExtensoIdeia: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="2 · Extenso · ideia" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Como aprendemos na escola</h2>
    <div className="grid grid-cols-[auto_1fr] gap-20 items-start">
      <div className="mono text-[56px] leading-[1.25] tabular-nums">
        <div className="text-right">5 6 7 <span className="digit-high">8</span></div>
        <div className="text-right">× 1 2 3 <span className="digit-low">4</span></div>
        <div className="border-t-2 border-foreground my-3 w-full" />
        <div className="text-right opacity-90">
          <span className="opacity-60">  </span>2 2 7 1 2  <span className="slide-caption opacity-60">← 5678 × 4</span>
        </div>
        <div className="text-right opacity-90">
          1 7 0 3 4 ·   <span className="slide-caption opacity-60">← 5678 × 3</span>
        </div>
        <div className="text-right opacity-90">
          1 1 3 5 6 · · <span className="slide-caption opacity-60">← 5678 × 2</span>
        </div>
        <div className="text-right opacity-90">
          5 6 7 8 · · · <span className="slide-caption opacity-60">← 5678 × 1</span>
        </div>
        <div className="border-t-2 border-foreground my-3" />
        <div className="text-left term-z1 font-bold">7 0 0 6 6 5 2</div>
      </div>
      <ul className="slide-body-lg space-y-6 list-disc pl-6">
        <li>Para cada dígito do multiplicador, um <strong>produto parcial</strong>.</li>
        <li>Cada parcial é deslocado pela posição do dígito.</li>
        <li>No final, soma tudo.</li>
      </ul>
    </div>
  </SlideShell>
);

const S07_ExtensoPseudo: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="2 · Extenso · pseudocódigo" page={p.page} total={p.total}>
    <h2 className="slide-title mb-8">Dois laços aninhados</h2>
    <Pseudo>
{`MultiplicacaoExtenso(x, y)
  Entrada : x, y com n dígitos na base b
  Saída   : p = x · y

  resultado[0 .. 2n−1] ← 0

  para i ← 0 até n−1 faça
    transporte ← 0
    para j ← 0 até n−1 faça
      temp ← resultado[i+j] + x[i] · y[j] + transporte
      resultado[i+j] ← temp mod b
      transporte    ← temp div b
    fim-para
    resultado[i+n] ← resultado[i+n] + transporte
  fim-para

  retorne resultado`}
    </Pseudo>
    <p className="slide-caption mt-6">Dois laços de tamanho n → ~n² multiplicações de dígitos.</p>
  </SlideShell>
);

const S08_ExtensoExemplo: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="2 · Extenso · exemplo" page={p.page} total={p.total}>
    <h2 className="slide-title mb-4">
      <span className="mono"><span className="digit-high">56</span><span className="digit-low">78</span></span>
      <span className="opacity-50"> × </span>
      <span className="mono"><span className="digit-high">12</span><span className="digit-low">34</span></span>
    </h2>
    <p className="slide-caption mb-8 mt-20">
      x = [4, 3, 2, 1] (dígito menos significativo primeiro), y = [8, 7, 6, 5], b = 10. Quatro iterações.
    </p>

    <div className="grid grid-cols-4 gap-5 mono text-[22px]">
      {[
        {
          xi: "4", color: "digit-low",
          rows: [
            ["0", "0 + 4·8 + 0 = 32", "2", "3"],
            ["1", "0 + 4·7 + 3 = 31", "1", "3"],
            ["2", "0 + 4·6 + 3 = 27", "7", "2"],
            ["3", "0 + 4·5 + 2 = 22", "2", "2"],
          ],
          final: "[2,1,7,2,2,0,0,0]",
        },
        {
          xi: "3", color: "digit-low",
          rows: [
            ["0", "1 + 3·8 + 0 = 25", "5", "2"],
            ["1", "7 + 3·7 + 2 = 30", "0", "3"],
            ["2", "2 + 3·6 + 3 = 23", "3", "2"],
            ["3", "2 + 3·5 + 2 = 19", "9", "1"],
          ],
          final: "[2,5,0,3,9,1,0,0]",
        },
        {
          xi: "2", color: "digit-high",
          rows: [
            ["0", "0 + 2·8 + 0 = 16", "6", "1"],
            ["1", "3 + 2·7 + 1 = 18", "8", "1"],
            ["2", "9 + 2·6 + 1 = 22", "2", "2"],
            ["3", "1 + 2·5 + 2 = 13", "3", "1"],
          ],
          final: "[2,5,6,8,2,3,1,0]",
        },
        {
          xi: "1", color: "digit-high",
          rows: [
            ["0", "8 + 1·8 + 0 = 16", "6", "1"],
            ["1", "2 + 1·7 + 1 = 10", "0", "1"],
            ["2", "3 + 1·6 + 1 = 10", "0", "1"],
            ["3", "1 + 1·5 + 1 = 7",  "7", "0"],
          ],
          final: "[2,5,6,6,0,0,7,0]",
        },
      ].map((it, idx) => (
        <div key={idx} className="card-flat" style={{ padding: 18 }}>
          <div className="text-[18px] mb-2 opacity-70">iteração i = {idx}</div>
          <div className="text-[26px] mb-3">
            x[{idx}] = <span className={`font-bold ${it.color}`}>{it.xi}</span>
          </div>
          <table className="w-full text-[16px]">
            <thead className="opacity-60">
              <tr><th className="text-left">j</th><th className="text-left">temp</th><th>res</th><th>tr.</th></tr>
            </thead>
            <tbody>
              {it.rows.map((r, k) => (
                <tr key={k} className="border-t border-border/60">
                  <td className="py-1">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td className="text-center font-bold">{r[2]}</td>
                  <td className="text-center opacity-70">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-[16px] mt-3 opacity-75">vetor → <span className="font-semibold">{it.final}</span></div>
        </div>
      ))}
    </div>
    <p className="slide-body mt-8 text-right">
      Lendo do dígito mais significativo para o menos: <D part="z1">7 006 652</D>
    </p>
  </SlideShell>
);

const S09_ExtensoComplexidade: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="2 · Extenso · complexidade" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Corretude e complexidade</h2>

    <div className="grid grid-cols-[1fr_auto] gap-16 items-start">
      <div className="space-y-8">
        <Card accent="var(--digit-high)">
          <div className="slide-kicker mb-2">Corretude</div>
          <p className="slide-body">
            Cada dígito de <D>y</D> é multiplicado por cada dígito de <D>x</D>.
          </p>
          <p className="slide-body">
            O transporte mantém cada casa do resultado em {`{0,…,b−1}`}.
          </p>
        </Card>

        <Card accent="var(--accent-mid)">
          <div className="slide-kicker mb-2">Complexidade</div>
          <div className="slide-subtitle mt-3">
            <span className="term-mid mono">Θ(n²)</span>
            <span className="opacity-50 mx-6">+</span>
            <span className="opacity-60">O(n) =</span>{" "}
            <span className="mono">Θ(n²)</span>
          </div>
          <p className="slide-body mt-4 opacity-80">
            Dois laços aninhados de tamanho <D>n</D> cada. Criação de vetor com tamanho 2n-1.
          </p>
        </Card>
      </div>

      <div className="flex flex-col items-center">
        <div className="slide-kicker mb-3">grade n × n</div>
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: "repeat(8, 28px)" }}
        >
          {Array.from({ length: 64 }).map((_, k) => (
            <div
              key={k}
              className="h-[28px] w-[28px] rounded-sm"
              style={{ background: "color-mix(in oklab, var(--digit-high) 65%, transparent)" }}
            />
          ))}
        </div>
        <div className="slide-caption mt-3">n² produtos de dígitos</div>
      </div>
    </div>
  </SlideShell>
);

/* ============================================================
 *  BLOCO 4 — Karatsuba
 * ============================================================ */

const S10_KaratsubaSecao: ComponentType<SlideProps> = (p) => (
  <SlideShell noChrome dark page={p.page} total={p.total}>
    <div className="flex h-full flex-col justify-center">
      <div className="slide-kicker mb-6" style={{ color: "var(--accent-z)" }}>3 · Algoritmo de Karatsuba</div>
      <h2 className="slide-title-lg">
        Anatoly Karatsuba, 1960
      </h2>
      <p className="slide-subtitle mt-10 opacity-80 max-w-[1400px]">
        O primeiro algoritmo sub-quadrático para multiplicação.
      </p>
    </div>
  </SlideShell>
);

const S11_KaratsubaIdeia: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · ideia" page={p.page} total={p.total}>
    <h2 className="slide-title mb-4">Divida cada número ao meio</h2>
    <p className="slide-body opacity-80 max-w-[1500px] mb-10">
      Com <D>m = ⌈n/2⌉</D>, cada número vira <span className="digit-high font-bold">parte alta</span> · b<sup>m</sup> + <span className="digit-low font-bold">parte baixa</span>.
    </p>

    <div className="flex justify-center gap-20 my-40">
      <div className="text-center">
        <div className="slide-kicker mb-3">x = 1234</div>
        <div className="mono text-[120px] leading-none font-semibold">
          <span className="digit-high">12</span><span className="opacity-30">·10²+</span><span className="digit-low">34</span>
        </div>
        <div className="slide-caption mt-4">
          x₁ = <span className="digit-high font-bold">12</span>  ·  x₀ = <span className="digit-low font-bold">34</span>
        </div>
      </div>
      <div className="text-center">
        <div className="slide-kicker mb-3">y = 5678</div>
        <div className="mono text-[120px] leading-none font-semibold">
          <span className="digit-high">56</span><span className="opacity-30">·10²+</span><span className="digit-low">78</span>
        </div>
        <div className="slide-caption mt-4">
          y₁ = <span className="digit-high font-bold">56</span>  ·  y₀ = <span className="digit-low font-bold">78</span>
        </div>
      </div>
    </div>

  </SlideShell>
);

const S12_Ingenuo: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · ingênuo" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">A expansão leva a 4 multiplicações</h2>

    <div className="text-[44px] leading-[1.6] text-center mt-50" style={{ fontFamily: "var(--font-display)" }}>
      x · y = (<D part="high">x₁</D>·b<sup>m</sup> + <D part="low">x₀</D>) · (<D part="high">y₁</D>·b<sup>m</sup> + <D part="low">y₀</D>)
    </div>

    <div className="text-[44px] leading-[1.8] text-center mt-12" style={{ fontFamily: "var(--font-display)" }}>
      = <D part="high">x₁y₁</D>·b<sup>2m</sup>
      &nbsp;+&nbsp; (<D part="mid">x₁y₀ + x₀y₁</D>)·b<sup>m</sup>
      &nbsp;+&nbsp; <D part="low">x₀y₀</D>
    </div>

    <p className="slide-body-lg text-center mt-50 opacity-80">
      Quatro multiplicações de tamanho n/2
      <div><D>T(n) = 4 T(n/2) + Θ(n)</D></div>
    </p>
  </SlideShell>
);

const S13_Truque: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · o truque de Gauss" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Defina três produtos:</h2>

    <div className="grid grid-cols-3 gap-8 text-[36px] mt-44 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
      <Card accent="var(--digit-high)">
        <div className="slide-kicker mb-3" style={{ color: "var(--digit-high)" }}>z₂</div>
        <div><D part="z2">z₂</D> = <D part="high">x₁</D> · <D part="high">y₁</D></div>
        <div className="slide-caption mt-4">parte alta × parte alta</div>
      </Card>
      <Card accent="var(--digit-low)">
        <div className="slide-kicker mb-3" style={{ color: "var(--digit-low)" }}>z₀</div>
        <div><D part="z0">z₀</D> = <D part="low">x₀</D> · <D part="low">y₀</D></div>
        <div className="slide-caption mt-4">parte baixa × parte baixa</div>
      </Card>
      <Card accent="var(--accent-z)">
        <div className="slide-kicker mb-3" style={{ color: "var(--accent-z)" }}>z₁</div>
        <div><D part="z1">z₁</D> = (<D part="high">x₁</D>+<D part="low">x₀</D>) · (<D part="high">y₁</D>+<D part="low">y₀</D>)</div>
        <div className="slide-caption mt-4">soma das partes × soma das partes</div>
      </Card>
    </div>

    <div className="text-[40px] text-center mt-24" style={{ fontFamily: "var(--font-display)" }}>
      p = <D part="z2">z₂</D>·b<sup>2m</sup>
      &nbsp;+&nbsp; (<D part="z1">z₁</D> − <D part="z2">z₂</D> − <D part="z0">z₀</D>)·b<sup>m</sup>
      &nbsp;+&nbsp; <D part="z0">z₀</D>
    </div>
  </SlideShell>
);

const S14_PorQueFunciona: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · corretude" page={p.page} total={p.total}>
    <h2 className="slide-title mb-8">Por que <D part="z1">z₁</D> − <D part="z2">z₂</D> − <D part="z0">z₀</D> dá o termo do meio?</h2>

    <div className="text-[34px] leading-[1.7] mono space-y-3 mt-44 ml-134">
      <div><D part="z1">z₁</D> = (<D part="high">x₁</D> + <D part="low">x₀</D>) · (<D part="high">y₁</D> + <D part="low">y₀</D>)</div>
      <div className="pl-12">
        = <D part="high">x₁·y₁</D> + <D part="mid">x₁·y₀</D> + <D part="mid">x₀·y₁</D> + <D part="low">x₀·y₀</D>
      </div>
      <div className="pl-12">
        = <D part="z2">z₂</D> &nbsp;+&nbsp; (<D part="mid">x₁y₀ + x₀y₁</D>) &nbsp;+&nbsp; <D part="z0">z₀</D>
      </div>
      <div className="h-2" />
      <div className="text-[40px] mt-24">
        <D part="z1">z₁</D> − <D part="z2">z₂</D> − <D part="z0">z₀</D>
        &nbsp;=&nbsp;
        <D part="mid">x₁·y₀ + x₀·y₁</D>
      </div>
    </div>
  </SlideShell>
);

const S15_KaratsubaPseudo: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · pseudocódigo" page={p.page} total={p.total}>
    <h2 className="slide-title mb-6">Recursivo, com caso base</h2>
    <Pseudo>
{`Karatsuba(x, y, n, b)
  Entrada : x, y com n dígitos na base b
  Saída   : p = x · y

  se n ≤ 3 então
    retorne MultiplicacaoExtenso(x, y)         ← caso base

  m  ← ⌈n / 2⌉
  x₁ ← x[m .. n−1]    ;  x₀ ← x[0 .. m−1]
  y₁ ← y[m .. n−1]    ;  y₀ ← y[0 .. m−1]

  z₂ ← Karatsuba(x₁,       y₁,       m,     b)   ← 1ª chamada
  z₀ ← Karatsuba(x₀,       y₀,       m,     b)   ← 2ª chamada
  z₁ ← Karatsuba(x₁ + x₀,  y₁ + y₀,  m+1,  b)    ← 3ª chamada

  meio ← z₁ − z₂ − z₀
  retorne z₂ · b^(2m)  +  meio · b^m  +  z₀`}
    </Pseudo>
  </SlideShell>
);

const S16_KaratsubaExemplo: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · exemplo" page={p.page} total={p.total}>
    <h2 className="slide-title mb-2">
      Mesma entrada: <SplitNumber high="12" low="34" /> × <SplitNumber high="56" low="78" />
    </h2>
    <p className="slide-caption mb-8">n = 4, m = 2, b = 10. Três multiplicações recursivas:</p>

    <div className="grid grid-cols-3 gap-6 mb-10">
      <Card accent="var(--digit-high)">
        <div className="slide-kicker" style={{ color: "var(--digit-high)" }}>z₂</div>
        <div className="text-[34px] mono mt-2">
          <D part="high">12</D> · <D part="high">56</D>
        </div>
        <div className="text-[44px] mono mt-3 term-z2 font-bold">= 672</div>
      </Card>
      <Card accent="var(--digit-low)">
        <div className="slide-kicker" style={{ color: "var(--digit-low)" }}>z₀</div>
        <div className="text-[34px] mono mt-2">
          <D part="low">34</D> · <D part="low">78</D>
        </div>
        <div className="text-[44px] mono mt-3 term-z0 font-bold">= 2 652</div>
      </Card>
      <Card accent="var(--accent-z)">
        <div className="slide-kicker" style={{ color: "var(--accent-z)" }}>z₁</div>
        <div className="text-[30px] mono mt-2">
          (<D part="high">12</D>+<D part="low">34</D>) · (<D part="high">56</D>+<D part="low">78</D>)
        </div>
        <div className="text-[24px] mono mt-1 opacity-70">= 46 · 134</div>
        <div className="text-[44px] mono mt-2 term-z1 font-bold">= 6 164</div>
      </Card>
    </div>

    <div className="card-flat" style={{ padding: 28 }}>
      <div className="slide-kicker mb-3" style={{ color: "var(--accent-mid)" }}>termo do meio</div>
      <div className="text-[36px] mono">
        <D part="mid">meio</D> = <D part="z1">6164</D> − <D part="z2">672</D> − <D part="z0">2652</D> = <span className="term-mid font-bold">2 840</span>
        <span className="opacity-50 slide-caption ml-4">(= 12·78 + 34·56)</span>
      </div>
    </div>

    <div className="mt-8 text-[34px] mono leading-[1.5]">
      p = <D part="z2">672</D>·10⁴ + <D part="mid">2840</D>·10² + <D part="z0">2652</D>
      <div className="pl-8 mt-2">= 6 720 000 + 284 000 + 2 652</div>
      <div className="pl-8 mt-2 text-[44px] term-z1 font-bold">= 7 006 652</div>
    </div>
  </SlideShell>
);

const S17_KaratsubaComplexidade: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · complexidade" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Recorrência e Teorema Mestre</h2>

    <div className="grid grid-cols-[1fr_auto] gap-16 items-center mt-40">
      <div className="space-y-10">
        <div className="text-[56px] mono" style={{ fontFamily: "var(--font-display)" }}>
          T(n) = <span className="term-z1 font-bold">3</span> · T(n/2) + Θ(n)
        </div>

        <div className="slide-body-lg max-w-[1000px] opacity-85">
          <div>Teorema Mestre: a = 3, b = 2</div>
          <div>Caso 1 (a &gt; b): Θ(n<sup>log<sub>b</sub> a</sup>)</div>
        </div>

        <div className="text-[64px] mono">
          T(n) = <span className="term-z1 font-bold">Θ(n<sup>log₂3</sup>)</span>
          <span className="opacity-60 text-[36px] ml-6">≈ Θ(n<sup>1,585</sup>)</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="slide-kicker mb-3">árvore de recursão</div>
        <RecursionTree />
      </div>
    </div>
  </SlideShell>
);

function RecursionTree() {
  const node = (x: number, y: number, r = 12, color = "var(--digit-high)") => (
    <circle cx={x} cy={y} r={r} fill={color} />
  );
  const line = (x1: number, y1: number, x2: number, y2: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border)" strokeWidth={1.5} />
  );
  const cs = ["var(--digit-high)", "var(--accent-z)", "var(--digit-low)"];
  return (
    <svg width={420} height={320} viewBox="0 0 420 320">
      {/* root */}
      {node(210, 30, 14, "var(--ink)")}
      {/* level 1 */}
      {[80, 210, 340].map((x, i) => (
        <g key={i}>
          {line(210, 40, x, 110)}
          {node(x, 120, 11, cs[i])}
        </g>
      ))}
      {/* level 2 */}
      {[80, 210, 340].flatMap((cx, i) =>
        [-40, 0, 40].map((dx, j) => {
          const x = cx + dx;
          return (
            <g key={`${i}-${j}`}>
              {line(cx, 130, x, 200)}
              {node(x, 210, 8, cs[j])}
            </g>
          );
        }),
      )}
      {/* level 3 hint */}
      {[80, 210, 340].flatMap((cx) =>
        [-40, 0, 40].map((dx, j) => {
          const x = cx + dx;
          return (
            <g key={`d-${cx}-${j}`}>
              <text x={x} y={250} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">⋯</text>
            </g>
          );
        }),
      )}
    </svg>
  );
}

/* ============================================================
 *  BLOCO 5 — Comparação
 * ============================================================ */

const S18_Comparacao: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="4 · Comparação teórica" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Lado a lado</h2>

    <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-stretch mt-40">
      <Card accent="var(--digit-low)">
        <div className="slide-kicker mb-2" style={{ color: "var(--digit-low)" }}>Extenso</div>
        <ul className="slide-body space-y-3 mt-4">
          <li>Tempo: <span className="mono font-bold">Θ(n²)</span></li>
          <li>Iterativo, sem recursão</li>
          <li>Não usa pilha</li>
        </ul>
      </Card>

      <div className="flex items-center justify-center text-[80px] opacity-30" style={{ fontFamily: "var(--font-display)" }}>vs</div>

      <Card accent="var(--accent-z)">
        <div className="slide-kicker mb-2" style={{ color: "var(--accent-z)" }}>Karatsuba</div>
        <ul className="slide-body space-y-3 mt-4">
          <li>Tempo: <span className="mono font-bold">Θ(n<sup>1,585</sup>)</span></li>
          <li>Recursivo, dividir e conquistar</li>
          <li>Base para Schönhage–Strasse, Toom-Cook</li>
        </ul>
      </Card>
    </div>
  </SlideShell>
);

const S19_GraficoTeorico: ComponentType<SlideProps> = (p) => {
  const data = Array.from({ length: 60 }, (_, i) => {
    const n = (i + 1) * 8;
    return { n, "n²": n * n, "n^log₂3": Math.pow(n, Math.log2(3)) };
  });
  return (
    <SlideShell kicker="4 · Comparação teórica" page={p.page} total={p.total}>
      <h2 className="slide-title mb-2">Crescimento assintótico</h2>
      <p className="slide-caption mb-6">Eixo x: tamanho da entrada n · eixo y: operações T(n).</p>
      <div className="h-[680px]">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 40, left: 40, bottom: 30 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="n" stroke="var(--muted-foreground)" tick={{ fontSize: 16 }} label={{ value: "n", position: "insideBottom", offset: -10, fontSize: 18 }} />
            <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 16 }} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} />
            <RLegend wrapperStyle={{ fontSize: 18 }} />
            <Line type="monotone" dataKey="n²" stroke="var(--digit-low)" strokeWidth={4} dot={false} />
            <Line type="monotone" dataKey="n^log₂3" stroke="var(--accent-z)" strokeWidth={4} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SlideShell>
  );
};

/* ============================================================
 *  BLOCO 6 — Empírico (placeholders)
 * ============================================================ */

const S20_Metodologia: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total}>
    <h2 className="slide-title mb-8">Metodologia</h2>
    <div className="grid grid-cols-2 gap-10 mt-40">
      <Card>
        <div className="slide-kicker mb-3">Ambiente</div>
        <ul className="slide-body space-y-2 list-disc pl-6">
          <li>SO: Ubuntu (WSL2)</li>
          <li>CPU: Intel i7 13ª Gen.</li>
          <li>RAM: 24 GB</li>
          <li>Linguagem: Python</li>
        </ul>
      </Card>
      <Card accent="var(--accent-mid)">
        <div className="slide-kicker mb-3">Procedimento</div>
        <ul className="slide-body space-y-2 list-disc pl-6">
          <li>Entradas aleatórias com n dígitos</li>
          <li>Dobrar n a cada iteração até o tempo &gt; 5 min</li>
          <li>Razão dobrando → estimar grau <D>d</D></li>
          <li>Ajustar c em <D>T(n) = c · n<sup>d</sup></D> no maior n</li>
          <li>Prever o próximo n e medir a diferença relativa</li>
        </ul>
      </Card>
    </div>
  </SlideShell>
);

const S21_Tabela: ComponentType<SlideProps> = (p) => {
  const isRatio4x = (r: string) => r.startsWith("4.");
  const isRatio3x = (r: string) => r.startsWith("3.");

  return (
    <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total}>
      <h2 className="slide-title mb-4">Medições de tempo (segundos)</h2>
      <p className="slide-caption mb-4">n = número de dígitos (dobrados). Razão = T(n)/T(n/2).</p>
      <table className="w-11/12 mx-auto mono text-[18px] border-collapse">
        <thead>
          <tr className="border-b-2 border-foreground/30 text-left">
            <th className="py-2 pl-4">n</th>
            <th className="text-right">extenso (s)</th>
            <th className="text-right">razão</th>
            <th className="text-right">Karatsuba (s)</th>
            <th className="text-right pr-4">razão</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["1", "0.00000119", "—", "0.00000048", "—"],
            ["2", "0.00000644", "5.40×", "0.00000382", "8.00×"],
            ["4", "0.00000763", "1.19×", "0.00000286", "0.75×"],
            ["8", "0.00001287", "1.69×", "0.00001049", "3.67×"],
            ["16", "0.00003076", "2.39×", "0.00002050", "1.95×"],
            ["32", "0.00010085", "3.28×", "0.00006342", "3.09×"],
            ["64", "0.00040722", "4.04×", "0.00017095", "2.70×"],
            ["128", "0.00159383", "3.91×", "0.00055432", "3.24×"],
            ["256", "0.00621319", "3.90×", "0.00161052", "2.91×"],
            ["512", "0.02564263", "4.13×", "0.00507641", "3.15×"],
            ["1024", "0.10102010", "3.94×", "0.01575994", "3.10×"],
            ["2048", "0.42370343", "4.19×", "0.04494524", "2.85×"],
            ["4096", "1.67777109", "3.96×", "0.14097333", "3.14×"],
            ["8192", "8.86405301", "5.28×", "0.45124936", "3.20×"],
            ["16384", "27.74505401", "3.13×", "1.36140704", "3.02×"],
            ["32768", "122.06295824", "4.40×", "3.93089414", "2.89×"],
            ["65536", "485.12 ou 8 minutos", "3.97×", "13.70233512", "3.49×"],
          ].map((row, idx) => (
            <tr key={idx} className="border-b border-border/50">
              <td className="py-1 pl-4 font-semibold">{row[0]}</td>
              <td className="text-right text-[17px]">{row[1]}</td>
              <td className={`text-right py-1 px-2 rounded ${isRatio4x(row[2]) ? 'bg-digit-low/20 font-bold text-digit-low' : 'opacity-60'}`}>{row[2]}</td>
              <td className="text-right text-[17px]">{row[3]}</td>
              <td className={`text-right py-1 px-2 rounded pr-4 ${isRatio3x(row[4]) ? 'bg-accent-z/20 font-bold text-accent-z' : 'opacity-60'}`}>{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SlideShell>
  );
};

const S23_Previsao: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total}>
    <h2 className="slide-title mb-8">Previsão × medido (n = 131.072 dígitos)</h2>

    <div className="grid grid-cols-2 gap-8">
      <Card accent="var(--digit-low)">
        <div className="slide-kicker" style={{ color: "var(--digit-low)" }}>Extenso</div>
        <div className="slide-body mt-4 space-y-2">
          <div>d estimado: <span className="mono font-bold">2.00</span></div>
          <div>c (no maior n): <span className="mono font-bold">1.12 × 10⁻⁷</span></div>
          <div>T(n) previsto: <span className="mono font-bold">1.924 s</span></div>
          <div>T(n) medido: <span className="mono font-bold">1.955 s ou 32 minutos</span></div>
          <div className="text-[34px] mt-3 term-z1">dif. relativa: <span className="mono font-bold">1.60%</span></div>
        </div>
      </Card>
      <Card accent="var(--accent-z)">
        <div className="slide-kicker" style={{ color: "var(--accent-z)" }}>Karatsuba</div>
        <div className="slide-body mt-4 space-y-2">
          <div>d estimado: <span className="mono font-bold">1.585</span></div>
          <div>c (no maior n): <span className="mono font-bold">3.18 × 10⁻⁷</span></div>
          <div>T(n) previsto: <span className="mono font-bold">41.08 s</span></div>
          <div>T(n) medido: <span className="mono font-bold">37.57 s</span></div>
          <div className="text-[34px] mt-3 term-z1">dif. relativa: <span className="mono font-bold">8.54%</span></div>
        </div>
      </Card>
    </div>

    <div className="card-flat mt-10 text-center mono text-[28px]" style={{ padding: 24 }}>
      <div>T(n) = c · n<sup>d</sup></div>
      <div>diferença relativa = 100 · |medido − previsto| / previsto %</div>
    </div>
  </SlideShell>
);

/* ============================================================
 *  BLOCO 7 — Encerramento
 * ============================================================ */

const S25_Conclusoes: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="5 · Conclusões" page={p.page} total={p.total}>
    <h2 className="slide-title mb-12">Conclusões</h2>
    <ol className="space-y-8 slide-body-lg max-w-[1600px]">
      <li className="flex gap-6">
        <span className="mono text-[48px] term-z1 font-bold leading-none">01</span>
        <div>
          Karatsuba troca <strong>uma multiplicação</strong> por <strong>várias somas/subtrações</strong>,
          baixando a complexidade de Θ(n²) para Θ(n<sup>1,585</sup>).
        </div>
      </li>
      <li className="flex gap-6">
        <span className="mono text-[48px] term-z1 font-bold leading-none">02</span>
        <div>
          A vantagem só aparece para <strong>n grande</strong> — para n pequeno, o extenso ainda vence
          (e é por isso que Karatsuba o usa como caso base).
        </div>
      </li>
      <li className="flex gap-6">
        <span className="mono text-[48px] term-z1 font-bold leading-none">03</span>
        <div>
          A análise empírica confirmou a teoria: o expoente medido se aproxima do previsto, e o
          modelo <span className="mono">c·n<sup>d</sup></span> permite prever bem o próximo tamanho.
        </div>
      </li>
    </ol>
    <p className="slide-caption mt-12 max-w-[1500px]">
      Trabalhos futuros: generalizações — Toom-Cook (divide em 3+ partes), Schönhage–Strassen
      (FFT, Θ(n log n log log n)), Harvey–van der Hoeven (Θ(n log n)).
    </p>
  </SlideShell>
);

const S26_Obrigado: ComponentType<SlideProps> = () => (
  <SlideShell noChrome dark>
    <div className="flex h-full flex-col justify-between">
      <div className="slide-kicker" style={{ color: "oklch(0.75 0.02 85)" }}>Perguntas?</div>
      <div>
        <h2 className="slide-title-lg">
          <span className="digit-low">Obrigado.</span>
        </h2>
        <p className="slide-subtitle mt-8 opacity-80 max-w-[1400px]">
          Pedro · Beatriz · Breno  —  UFC · PAA 2026.1
        </p>
      </div>
      <div className="slide-body opacity-70 max-w-[1600px]">
        <div className="slide-kicker mb-3" style={{ color: "oklch(0.75 0.02 85)" }}>Referências</div>
        <div className="space-y-2 text-[26px]">
          <div>Karatsuba, A. &amp; Ofman, Yu. (1962). <em>Multiplication of Many-Digital Numbers by Automatic Computers</em>. Doklady Akademii Nauk SSSR, 145, 293–294.</div>
          <div>Brilliant Math &amp; Science Wiki. <em>Karatsuba Algorithm</em>. https://brilliant.org/wiki/karatsuba-algorithm/</div>
          <div>Cormen, Leiserson, Rivest, Stein. <em>Introduction to Algorithms</em>, 3ª ed., MIT Press.</div>
        </div>
      </div>
    </div>
  </SlideShell>
);

/* ============================================================ */

export const slides: Slide[] = [
  { id: "01", title: "Capa", render: S01_Capa },
  { id: "02", title: "O problema", render: S03_Problema },
  { id: "03", title: "Pré e pós-condições", render: S04_PreCondicoes },
  { id: "04", title: "Extenso · abertura", render: S05_ExtensoSecao },
  { id: "05", title: "Extenso · ideia", render: S06_ExtensoIdeia },
  { id: "06", title: "Extenso · pseudocódigo", render: S07_ExtensoPseudo },
  { id: "07", title: "Extenso · exemplo", render: S08_ExtensoExemplo },
  { id: "08", title: "Extenso · complexidade", render: S09_ExtensoComplexidade },
  { id: "09", title: "Karatsuba · abertura", render: S10_KaratsubaSecao },
  { id: "10", title: "Posicional · base 10", render: S03_Posicional10 },
  { id: "11", title: "Karatsuba · divisão", render: S11_KaratsubaIdeia },
  { id: "12", title: "Expansão ingênua", render: S12_Ingenuo },
  { id: "13", title: "O truque · z₀ z₁ z₂", render: S13_Truque },
  { id: "14", title: "Por que funciona", render: S14_PorQueFunciona },
  { id: "15", title: "Karatsuba · pseudocódigo", render: S15_KaratsubaPseudo },
  { id: "16", title: "Karatsuba · exemplo", render: S16_KaratsubaExemplo },
  { id: "17", title: "Karatsuba · complexidade", render: S17_KaratsubaComplexidade },
  { id: "18", title: "Comparação lado a lado", render: S18_Comparacao },
  { id: "19", title: "Gráfico teórico", render: S19_GraficoTeorico },
  { id: "20", title: "Empírico · metodologia", render: S20_Metodologia },
  { id: "21", title: "Empírico · tabela", render: S21_Tabela },
  { id: "22", title: "Empírico · previsão", render: S23_Previsao },
  { id: "23", title: "Obrigado", render: S26_Obrigado },
];
