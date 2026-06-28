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
        <div className="slide-kicker mb-6" style={{ color: "var(--digit-low)" }}>
          Trabalho Final — Parte 4
        </div>
        <h1 className="slide-title-lg">
          Multiplicação de <span className="digit-high">Inteiros</span>:
        </h1>
        <h2 className="slide-title-lg mt-2">
          <span className="digit-low">Extenso</span> × <span className="term-z1">Karatsuba</span>
        </h2>
        <p className="slide-body-lg mt-10 max-w-[1200px] opacity-80">
          Dois algoritmos para o mesmo problema, complexidades distintas, uma comparação
          teórica e empírica.
        </p>
      </div>
      <div className="flex items-end justify-between slide-body">
        <div className="space-y-1">
          <div className="font-semibold">Pedro E. Santana</div>
          <div className="font-semibold">Maria Beatriz C. Ribeiro</div>
          <div className="font-semibold">Breno G. Carvalho</div>
        </div>
        <div className="text-right slide-caption" style={{ color: "oklch(0.75 0.02 85)" }}>
          Fortaleza · junho de 2026
        </div>
      </div>
    </div>
  </SlideShell>
);

const S02_Roteiro: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="Roteiro" page={p.page} total={p.total}>
    <h2 className="slide-title mb-12">O que veremos hoje</h2>
    <ol className="grid grid-cols-2 gap-x-16 gap-y-8 slide-body-lg max-w-[1600px]">
      {[
        ["1", "O problema", "Multiplicar dois naturais em base b"],
        ["2", "Multiplicação por extenso", "O método tradicional · Θ(n²)"],
        ["3", "Algoritmo de Karatsuba", "Dividir e conquistar · Θ(n^log₂3)"],
        ["4", "Comparação teórica", "Recorrências e gráfico"],
        ["5", "Avaliação empírica", "Medições, ajuste e previsão"],
        ["6", "Conclusões", "Quando cada um vence"],
      ].map(([n, t, sub]) => (
        <li key={n} className="flex gap-6">
          <span className="mono text-[64px] leading-none font-bold opacity-30">{n}</span>
          <div>
            <div className="font-semibold">{t}</div>
            <div className="slide-body opacity-70">{sub}</div>
          </div>
        </li>
      ))}
    </ol>
  </SlideShell>
);

/* ============================================================
 *  BLOCO 2 — O Problema
 * ============================================================ */

const S03_Problema: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="1 · O problema" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Dado dois naturais, calcular o produto.</h2>
    <p className="slide-body-lg max-w-[1300px] opacity-80 mb-16">
      Operação elementar — e fundamental em computação: criptografia moderna multiplica
      números com <em>milhares</em> de dígitos.
    </p>

    <div className="flex items-center justify-center gap-12 mt-8">
      <div className="mono text-[140px] font-semibold leading-none">
        <span className="digit-high">12</span><span className="digit-low">34</span>
      </div>
      <div className="text-[140px] font-light opacity-50">×</div>
      <div className="mono text-[140px] font-semibold leading-none">
        <span className="digit-high">56</span><span className="digit-low">78</span>
      </div>
      <div className="text-[140px] font-light opacity-50">=</div>
      <div className="mono text-[140px] font-semibold leading-none term-z1">?</div>
    </div>
    <p className="slide-caption text-center mt-12">Exemplo que vamos perseguir do começo ao fim da apresentação.</p>
  </SlideShell>
);

const S04_Posicional10: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="1 · O problema" page={p.page} total={p.total}>
    <h2 className="slide-title mb-4">Representação posicional</h2>
    <p className="slide-body max-w-[1300px] opacity-80 mb-10">
      Cada número é uma sequência de dígitos em uma base <D>b</D>. Os algoritmos funcionam
      com <D>b</D> qualquer (≥ 2); usaremos base 10 e base 2.
    </p>

    <div className="grid grid-cols-[1fr_auto] gap-16 items-center">
      <div>
        <div className="slide-kicker mb-3">Base 10 — número 305</div>
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
              [0, 5, 1, 5],
              [1, 0, 10, 0],
              [2, 3, 100, 300],
            ].map(([i, d, w, c]) => (
              <tr key={i} className="border-b border-border">
                <td className="py-3">{i}</td>
                <td className="font-bold">{d}</td>
                <td>{w}</td>
                <td className="term-z1 font-semibold">{c}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="pt-4 text-right">soma</td>
              <td className="pt-4 term-z1 font-bold">305</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-[44px] leading-tight max-w-[600px]" style={{ fontFamily: "var(--font-display)" }}>
        <D part="plain">305</D>
        <div className="slide-body opacity-70 mt-4">
          = <D part="high">3</D>·10² + <D>0</D>·10¹ + <D part="low">5</D>·10⁰
        </div>
      </div>
    </div>
  </SlideShell>
);

const S05_Posicional2: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="1 · O problema" page={p.page} total={p.total}>
    <h2 className="slide-title mb-4">O mesmo número, base 2</h2>
    <p className="slide-body max-w-[1500px] opacity-80 mb-10">
      <D>305</D> precisa de <D part="high">3</D> dígitos na base 10, mas <D part="low">9</D> dígitos na base 2.
      O tamanho da entrada <D>n</D> é o número de <em>dígitos</em>, não o valor do número.
    </p>

    <div className="flex gap-16 items-start">
      <Card className="flex-1">
        <div className="slide-kicker mb-4">Base 2</div>
        <div className="mono text-[28px] leading-[1.6]">
          <span className="opacity-50">305</span> = <span className="font-bold">100110001</span>₂
        </div>
        <div className="slide-body mt-6 opacity-80">
          = 1·2⁸ + 0·2⁷ + 0·2⁶ + 1·2⁵ + 1·2⁴ + 0·2³ + 0·2² + 0·2¹ + 1·2⁰
        </div>
        <div className="slide-body mt-4 term-z1 font-semibold">
          = 256 + 32 + 16 + 1 = 305
        </div>
      </Card>
      <Card accent="var(--accent-mid)" className="w-[600px]">
        <div className="slide-kicker mb-3">Tamanho da entrada</div>
        <div className="mono text-[40px] mb-4">n = ⌊log<sub>b</sub> x⌋ + 1</div>
        <div className="slide-caption">
          log<sub>10</sub> 305 ≈ 2,48 → 3 dígitos<br />
          log<sub>2</sub> 305 ≈ 8,25 → 9 dígitos
        </div>
        <div className="slide-caption mt-6 opacity-80">
          Toda a análise de complexidade está em função de <D>n</D> — vale para qualquer base.
        </div>
      </Card>
    </div>
  </SlideShell>
);

const S06_PreCondicoes: ComponentType<SlideProps> = (p) => (
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
      Simplificação: usamos naturais e supomos <D>x</D> e <D>y</D> com o mesmo número de dígitos
      (o menor pode ser completado com zeros à esquerda — não altera a complexidade).
    </p>
  </SlideShell>
);

/* ============================================================
 *  BLOCO 3 — Multiplicação por Extenso
 * ============================================================ */

const S07_ExtensoSecao: ComponentType<SlideProps> = (p) => (
  <SlideShell noChrome dark page={p.page} total={p.total}>
    <div className="flex h-full flex-col justify-center">
      <div className="slide-kicker mb-6" style={{ color: "var(--digit-low)" }}>2 · Algoritmo</div>
      <h2 className="slide-title-lg">Multiplicação por extenso</h2>
      <p className="slide-subtitle mt-8 opacity-80 max-w-[1400px]">
        O método tradicional — aquele que aprendemos na escola.
      </p>
      <div className="mt-16 slide-body opacity-70 max-w-[1300px]">
        Multiplica cada dígito de <D>y</D> por todos os dígitos de <D>x</D>, soma os produtos
        parciais deslocados pela ordem de grandeza.
      </div>
    </div>
  </SlideShell>
);

const S08_ExtensoIdeia: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="2 · Extenso · ideia" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Como aprendemos na escola</h2>
    <div className="grid grid-cols-[auto_1fr] gap-20 items-start">
      <div className="mono text-[56px] leading-[1.25] tabular-nums">
        <div className="text-right">1 2 3 <span className="digit-high">4</span></div>
        <div className="text-right">× 5 6 7 <span className="digit-low">8</span></div>
        <div className="border-t-2 border-foreground my-3 w-full" />
        <div className="text-right opacity-90">
          <span className="opacity-60">  </span>9 8 7 2  <span className="slide-caption opacity-60">← 1234 × 8</span>
        </div>
        <div className="text-right opacity-90">
          7 4 0 4 ·   <span className="slide-caption opacity-60">← 1234 × 7</span>
        </div>
        <div className="text-right opacity-90">
          6 1 7 0 · · <span className="slide-caption opacity-60">← 1234 × 6</span>
        </div>
        <div className="text-right opacity-90">
          5 1 7 0 · · · <span className="slide-caption opacity-60">← 1234 × 5</span>
        </div>
        <div className="border-t-2 border-foreground my-3" />
        <div className="text-right term-z1 font-bold">7 0 0 6 6 5 2</div>
      </div>
      <ul className="slide-body-lg space-y-6 list-disc pl-6">
        <li>Para cada dígito do multiplicador, um <strong>produto parcial</strong>.</li>
        <li>Cada parcial é deslocado pela posição do dígito.</li>
        <li>O <strong>"vai um"</strong> (transporte) garante que cada casa fique &lt; b.</li>
        <li>No final, soma tudo.</li>
      </ul>
    </div>
  </SlideShell>
);

const S09_ExtensoPseudo: ComponentType<SlideProps> = (p) => (
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

const S10_ExtensoExemplo: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="2 · Extenso · exemplo" page={p.page} total={p.total}>
    <h2 className="slide-title mb-4">
      <span className="mono"><span className="digit-high">12</span><span className="digit-low">34</span></span>
      <span className="opacity-50"> × </span>
      <span className="mono"><span className="digit-high">56</span><span className="digit-low">78</span></span>
    </h2>
    <p className="slide-caption mb-8">
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
    <p className="slide-body-lg mt-8 text-center">
      Lendo do dígito mais significativo: <D part="z1">7 006 652</D> ✓
    </p>
  </SlideShell>
);

const S11_ExtensoComplexidade: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="2 · Extenso · complexidade" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Corretude e complexidade</h2>

    <div className="grid grid-cols-[1fr_auto] gap-16 items-start">
      <div className="space-y-8">
        <Card accent="var(--digit-high)">
          <div className="slide-kicker mb-2">Corretude</div>
          <p className="slide-body">
            Cada dígito de <D>y</D> é multiplicado por cada dígito de <D>x</D> — produz
            exatamente todos os termos da expansão algébrica do produto. O transporte
            mantém cada casa do resultado em {`{0,…,b−1}`}.
          </p>
        </Card>

        <Card accent="var(--accent-mid)">
          <div className="slide-kicker mb-2">Complexidade</div>
          <div className="slide-subtitle mt-3">
            <span className="opacity-60">T(n) =</span>{" "}
            <span className="term-mid mono">Θ(n²)</span>
            <span className="opacity-50 mx-6">·</span>
            <span className="opacity-60">S(n) =</span>{" "}
            <span className="mono">Θ(n)</span>
          </div>
          <p className="slide-body mt-4 opacity-80">
            Dois laços aninhados de tamanho <D>n</D> · operação interna O(1).
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

const S12_KaratsubaSecao: ComponentType<SlideProps> = (p) => (
  <SlideShell noChrome dark page={p.page} total={p.total}>
    <div className="flex h-full flex-col justify-center">
      <div className="slide-kicker mb-6" style={{ color: "var(--accent-z)" }}>3 · Algoritmo</div>
      <h2 className="slide-title-lg">
        E se <span className="digit-low">4</span> multiplicações
        <br />virassem <span className="term-z1">3</span>?
      </h2>
      <p className="slide-subtitle mt-10 opacity-80 max-w-[1400px]">
        Anatoly Karatsuba, 1960 — o primeiro algoritmo sub-quadrático para multiplicação.
      </p>
    </div>
  </SlideShell>
);

const S13_KaratsubaIdeia: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · ideia" page={p.page} total={p.total}>
    <h2 className="slide-title mb-4">Divida cada número ao meio</h2>
    <p className="slide-body opacity-80 max-w-[1500px] mb-10">
      Com <D>m = ⌈n/2⌉</D>, cada número vira parte alta · b<sup>m</sup> + parte baixa.
    </p>

    <div className="flex justify-center gap-20 my-10">
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

    <div className="flex justify-center mt-12">
      <Legend />
    </div>
  </SlideShell>
);

const S14_Ingenuo: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · ingênuo" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">A expansão ingênua: 4 multiplicações</h2>

    <div className="text-[44px] leading-[1.6] text-center mt-10" style={{ fontFamily: "var(--font-display)" }}>
      x · y = (<D part="high">x₁</D>·b<sup>m</sup> + <D part="low">x₀</D>) · (<D part="high">y₁</D>·b<sup>m</sup> + <D part="low">y₀</D>)
    </div>

    <div className="text-[44px] leading-[1.8] text-center mt-12" style={{ fontFamily: "var(--font-display)" }}>
      = <D part="high">x₁y₁</D>·b<sup>2m</sup>
      &nbsp;+&nbsp; (<D part="mid">x₁y₀ + x₀y₁</D>)·b<sup>m</sup>
      &nbsp;+&nbsp; <D part="low">x₀y₀</D>
    </div>

    <div className="mt-16 flex justify-center gap-6">
      {["x₁·y₁", "x₁·y₀", "x₀·y₁", "x₀·y₀"].map((t) => (
        <div key={t} className="chip text-[28px]" style={{ borderColor: "var(--accent-mid)" }}>
          <span className="mono">{t}</span>
        </div>
      ))}
    </div>
    <p className="slide-body-lg text-center mt-8 opacity-80">
      Quatro multiplicações de tamanho n/2 → recorrência <D>T(n) = 4 T(n/2) + Θ(n)</D> = Θ(n²). Sem ganho.
    </p>
  </SlideShell>
);

const S15_Truque: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · o truque" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Defina três produtos:</h2>

    <div className="grid grid-cols-3 gap-8 text-[36px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
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

    <div className="text-[40px] text-center mt-14" style={{ fontFamily: "var(--font-display)" }}>
      p = <D part="z2">z₂</D>·b<sup>2m</sup>
      &nbsp;+&nbsp; (<D part="z1">z₁</D> − <D part="z2">z₂</D> − <D part="z0">z₀</D>)·b<sup>m</sup>
      &nbsp;+&nbsp; <D part="z0">z₀</D>
    </div>
    <p className="slide-body-lg text-center mt-8">
      Apenas <span className="term-z1 font-bold">3</span> multiplicações recursivas — o resto é soma e deslocamento.
    </p>
  </SlideShell>
);

const S16_PorQueFunciona: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · corretude" page={p.page} total={p.total}>
    <h2 className="slide-title mb-8">Por que <D part="z1">z₁</D> − <D part="z2">z₂</D> − <D part="z0">z₀</D> dá o termo do meio?</h2>

    <div className="text-[34px] leading-[1.7] mono space-y-3">
      <div><D part="z1">z₁</D> = (<D part="high">x₁</D> + <D part="low">x₀</D>) · (<D part="high">y₁</D> + <D part="low">y₀</D>)</div>
      <div className="pl-12">
        = <D part="high">x₁·y₁</D> + <D part="mid">x₁·y₀</D> + <D part="mid">x₀·y₁</D> + <D part="low">x₀·y₀</D>
      </div>
      <div className="pl-12">
        = <D part="z2">z₂</D> &nbsp;+&nbsp; (<D part="mid">x₁y₀ + x₀y₁</D>) &nbsp;+&nbsp; <D part="z0">z₀</D>
      </div>
      <div className="h-2" />
      <div className="text-[40px]">
        <D part="z1">z₁</D> − <D part="z2">z₂</D> − <D part="z0">z₀</D>
        &nbsp;=&nbsp;
        <D part="mid">x₁·y₀ + x₀·y₁</D>  ✓
      </div>
    </div>

    <p className="slide-body mt-12 max-w-[1500px] opacity-80">
      Identidade algébrica exata. A recursão é finita porque o caso base
      (<D>n ≤ 3</D>) chama a multiplicação por extenso, encerrando a árvore.
    </p>
  </SlideShell>
);

const S17_KaratsubaPseudo: ComponentType<SlideProps> = (p) => (
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

const S18_KaratsubaExemplo: ComponentType<SlideProps> = (p) => (
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
      <div className="pl-8 mt-2 text-[44px] term-z1 font-bold">= 7 006 652  ✓</div>
    </div>
  </SlideShell>
);

const S19_KaratsubaComplexidade: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="3 · Karatsuba · complexidade" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Recorrência e Teorema Mestre</h2>

    <div className="grid grid-cols-[1fr_auto] gap-16 items-center">
      <div className="space-y-10">
        <div className="text-[56px] mono" style={{ fontFamily: "var(--font-display)" }}>
          T(n) = <span className="term-z1 font-bold">3</span> · T(n/2) + Θ(n)
        </div>

        <div className="slide-body-lg max-w-[1000px] opacity-85">
          Teorema Mestre — caso 1: a = 3, b = 2, log<sub>b</sub> a = log<sub>2</sub> 3 ≈ 1,585.
          O custo das folhas domina.
        </div>

        <div className="text-[64px] mono">
          T(n) = <span className="term-z1 font-bold">Θ(n<sup>log₂3</sup>)</span>
          <span className="opacity-60 text-[36px] ml-6">≈ Θ(n<sup>1,585</sup>)</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="slide-kicker mb-3">árvore de recursão</div>
        <RecursionTree />
        <div className="slide-caption mt-3">3 filhos por nó — não 4</div>
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

const S20_Comparacao: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="4 · Comparação teórica" page={p.page} total={p.total}>
    <h2 className="slide-title mb-10">Lado a lado</h2>

    <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
      <Card accent="var(--digit-low)">
        <div className="slide-kicker mb-2" style={{ color: "var(--digit-low)" }}>Extenso</div>
        <ul className="slide-body space-y-3 mt-4">
          <li>Tempo: <span className="mono font-bold">Θ(n²)</span></li>
          <li>Espaço: <span className="mono">Θ(n)</span></li>
          <li>Iterativo, sem recursão</li>
          <li>Constante pequena · ótimo p/ n pequeno</li>
          <li>Não usa pilha</li>
        </ul>
      </Card>

      <div className="flex items-center justify-center text-[80px] opacity-30" style={{ fontFamily: "var(--font-display)" }}>vs</div>

      <Card accent="var(--accent-z)">
        <div className="slide-kicker mb-2" style={{ color: "var(--accent-z)" }}>Karatsuba</div>
        <ul className="slide-body space-y-3 mt-4">
          <li>Tempo: <span className="mono font-bold">Θ(n<sup>1,585</sup>)</span></li>
          <li>Espaço: <span className="mono">Θ(n)</span> + pilha O(log n)</li>
          <li>Recursivo, dividir e conquistar</li>
          <li>Constante maior · vence para n grande</li>
          <li>Base para Toom-Cook, Schönhage–Strassen…</li>
        </ul>
      </Card>
    </div>

    <p className="slide-caption text-center mt-10 max-w-[1500px] mx-auto">
      Para n pequeno, a constante do Karatsuba mais o custo da recursão fazem o extenso ganhar —
      por isso o caso base do Karatsuba <em>delega</em> ao extenso.
    </p>
  </SlideShell>
);

const S21_GraficoTeorico: ComponentType<SlideProps> = (p) => {
  const data = Array.from({ length: 60 }, (_, i) => {
    const n = (i + 1) * 8;
    return { n, "n²": n * n, "n^log₂3": Math.pow(n, Math.log2(3)) };
  });
  return (
    <SlideShell kicker="4 · Comparação teórica" page={p.page} total={p.total}>
      <h2 className="slide-title mb-2">Crescimento assintótico</h2>
      <p className="slide-caption mb-6">Eixo x: tamanho da entrada n · eixo y: operações (escala arbitrária).</p>
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

const S22_Metodologia: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total} placeholder>
    <h2 className="slide-title mb-8">Metodologia</h2>
    <div className="grid grid-cols-2 gap-10">
      <Card>
        <div className="slide-kicker mb-3">Ambiente</div>
        <ul className="slide-body space-y-2 list-disc pl-6">
          <li>SO: <span className="opacity-50 italic">preencher</span></li>
          <li>CPU: <span className="opacity-50 italic">preencher (modelo, clock)</span></li>
          <li>RAM: <span className="opacity-50 italic">preencher</span></li>
          <li>Linguagem / versão: <span className="opacity-50 italic">preencher</span></li>
        </ul>
      </Card>
      <Card accent="var(--accent-mid)">
        <div className="slide-kicker mb-3">Procedimento</div>
        <ul className="slide-body space-y-2 list-disc pl-6">
          <li>Entradas aleatórias com n dígitos uniformes</li>
          <li>Dobrar n a cada iteração até o tempo &gt; 5 min</li>
          <li>Razão dobrando → estimar grau <D>d</D></li>
          <li>Ajustar c em <D>T(n) = c · n<sup>d</sup></D> no maior n</li>
          <li>Prever o próximo n e medir a diferença relativa</li>
        </ul>
      </Card>
    </div>
    <p className="slide-body mt-10 mono">
      diferença_relativa = 100 · |tempo_medido − tempo_previsto| / tempo_previsto  %
    </p>
  </SlideShell>
);

const S23_Tabela: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total} placeholder>
    <h2 className="slide-title mb-6">Medições</h2>
    <p className="slide-caption mb-6">Substituir pelos valores reais da Parte 3.</p>
    <table className="w-full mono text-[24px] border-collapse">
      <thead>
        <tr className="border-b-2 border-foreground/30 text-left">
          <th className="py-3">n (dígitos)</th>
          <th>tempo extenso (s)</th>
          <th>razão</th>
          <th>tempo Karatsuba (s)</th>
          <th>razão</th>
          <th>d estimado</th>
        </tr>
      </thead>
      <tbody className="opacity-70 italic">
        {["10", "20", "40", "80", "160", "320", "640", "…"].map((n) => (
          <tr key={n} className="border-b border-border">
            <td className="py-3 not-italic font-semibold opacity-100">{n}</td>
            <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
          </tr>
        ))}
      </tbody>
    </table>
  </SlideShell>
);

const S24_Grafico: ComponentType<SlideProps> = (p) => {
  // illustrative placeholder data
  const data = [10, 20, 40, 80, 160, 320, 640].map((n) => ({
    n,
    extenso: (n * n) / 1e5,
    karatsuba: Math.pow(n, Math.log2(3)) / 1e5,
  }));
  return (
    <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total} placeholder>
      <h2 className="slide-title mb-2">Tempo medido × n</h2>
      <p className="slide-caption mb-6">Gráfico ilustrativo · substituir pelos pontos reais.</p>
      <div className="h-[680px]">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 20, right: 40, left: 40, bottom: 30 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="n" stroke="var(--muted-foreground)" tick={{ fontSize: 16 }} scale="log" domain={["auto", "auto"]} type="number" />
            <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 16 }} scale="log" domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} />
            <RLegend wrapperStyle={{ fontSize: 18 }} />
            <Line type="monotone" dataKey="extenso" stroke="var(--digit-low)" strokeWidth={4} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="karatsuba" stroke="var(--accent-z)" strokeWidth={4} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SlideShell>
  );
};

const S25_Previsao: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total} placeholder>
    <h2 className="slide-title mb-8">Previsão × medido</h2>

    <div className="grid grid-cols-2 gap-8">
      <Card accent="var(--digit-low)">
        <div className="slide-kicker" style={{ color: "var(--digit-low)" }}>Extenso</div>
        <div className="slide-body mt-4 space-y-2">
          <div>d estimado: <span className="mono italic opacity-60">— ≈ 2</span></div>
          <div>c (no maior n): <span className="mono italic opacity-60">—</span></div>
          <div>n_próx: <span className="mono italic opacity-60">—</span></div>
          <div>previsto: <span className="mono italic opacity-60">— s</span></div>
          <div>medido: <span className="mono italic opacity-60">— s</span></div>
          <div className="text-[34px] mt-3">dif. relativa: <span className="mono italic opacity-60">— %</span></div>
        </div>
      </Card>
      <Card accent="var(--accent-z)">
        <div className="slide-kicker" style={{ color: "var(--accent-z)" }}>Karatsuba</div>
        <div className="slide-body mt-4 space-y-2">
          <div>d estimado: <span className="mono italic opacity-60">— ≈ 1,585</span></div>
          <div>c (no maior n): <span className="mono italic opacity-60">—</span></div>
          <div>n_próx: <span className="mono italic opacity-60">—</span></div>
          <div>previsto: <span className="mono italic opacity-60">— s</span></div>
          <div>medido: <span className="mono italic opacity-60">— s</span></div>
          <div className="text-[34px] mt-3">dif. relativa: <span className="mono italic opacity-60">— %</span></div>
        </div>
      </Card>
    </div>

    <div className="card-flat mt-10 text-center mono text-[30px]" style={{ padding: 24 }}>
      T(n) = c · n<sup>d</sup>  →  prever no próximo tamanho  →  diferença relativa = 100 · |medido − previsto| / previsto %
    </div>
  </SlideShell>
);

const S26_Discussao: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="5 · Avaliação empírica" page={p.page} total={p.total} placeholder>
    <h2 className="slide-title mb-10">Empírico × teórico</h2>
    <ul className="slide-body-lg space-y-6 list-disc pl-10 max-w-[1600px]">
      <li>
        Grau empírico do extenso: <span className="mono italic opacity-60">d ≈ —</span> — esperado <span className="mono">2</span>.
        <span className="slide-caption ml-3 opacity-60">(comentar concordância)</span>
      </li>
      <li>
        Grau empírico do Karatsuba: <span className="mono italic opacity-60">d ≈ —</span> — esperado <span className="mono">log₂3 ≈ 1,585</span>.
      </li>
      <li>
        Ponto de cruzamento observado: <span className="italic opacity-60">n ≈ — dígitos</span>.
      </li>
      <li>
        Diferenças relativas baixas indicam que o modelo <span className="mono">c·n<sup>d</sup></span> prevê bem.
      </li>
      <li>
        Limitações: GC, ruído do SO, alocações — discutir.
      </li>
    </ul>
  </SlideShell>
);

/* ============================================================
 *  BLOCO 7 — Encerramento
 * ============================================================ */

const S27_Conclusoes: ComponentType<SlideProps> = (p) => (
  <SlideShell kicker="6 · Conclusões" page={p.page} total={p.total}>
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

const S28_Obrigado: ComponentType<SlideProps> = () => (
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
  { id: "02", title: "Roteiro", render: S02_Roteiro },
  { id: "03", title: "O problema", render: S03_Problema },
  { id: "04", title: "Posicional · base 10", render: S04_Posicional10 },
  { id: "05", title: "Posicional · base 2", render: S05_Posicional2 },
  { id: "06", title: "Pré e pós-condições", render: S06_PreCondicoes },
  { id: "07", title: "Extenso · abertura", render: S07_ExtensoSecao },
  { id: "08", title: "Extenso · ideia", render: S08_ExtensoIdeia },
  { id: "09", title: "Extenso · pseudocódigo", render: S09_ExtensoPseudo },
  { id: "10", title: "Extenso · exemplo", render: S10_ExtensoExemplo },
  { id: "11", title: "Extenso · complexidade", render: S11_ExtensoComplexidade },
  { id: "12", title: "Karatsuba · abertura", render: S12_KaratsubaSecao },
  { id: "13", title: "Karatsuba · divisão", render: S13_KaratsubaIdeia },
  { id: "14", title: "Expansão ingênua", render: S14_Ingenuo },
  { id: "15", title: "O truque · z₀ z₁ z₂", render: S15_Truque },
  { id: "16", title: "Por que funciona", render: S16_PorQueFunciona },
  { id: "17", title: "Karatsuba · pseudocódigo", render: S17_KaratsubaPseudo },
  { id: "18", title: "Karatsuba · exemplo", render: S18_KaratsubaExemplo },
  { id: "19", title: "Karatsuba · complexidade", render: S19_KaratsubaComplexidade },
  { id: "20", title: "Comparação lado a lado", render: S20_Comparacao },
  { id: "21", title: "Gráfico teórico", render: S21_GraficoTeorico },
  { id: "22", title: "Empírico · metodologia", render: S22_Metodologia },
  { id: "23", title: "Empírico · tabela", render: S23_Tabela },
  { id: "24", title: "Empírico · gráfico", render: S24_Grafico },
  { id: "25", title: "Empírico · previsão", render: S25_Previsao },
  { id: "26", title: "Empírico · discussão", render: S26_Discussao },
  { id: "27", title: "Conclusões", render: S27_Conclusoes },
  { id: "28", title: "Obrigado", render: S28_Obrigado },
];
