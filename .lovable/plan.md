
# Apresentação: Multiplicação de Inteiros — Extenso vs Karatsuba

App React (TanStack Start já configurado) com um deck de slides em tela cheia 1920×1080, escalado para qualquer viewport, navegável por teclado (← →, Space, F para fullscreen, G para grade), com URL sincronizada (`/?slide=N`).

## Princípios de design

- **Limpo, didático, um conceito por slide.** Sem páginas poluídas.
- **Paleta sóbria com cores semânticas para os dígitos:**
  - Azul = parte alta (x₁, y₁) — "mais significativa"
  - Laranja/âmbar = parte baixa (x₀, y₀) — "menos significativa"
  - Verde = resultados intermediários (z₀, z₁, z₂)
  - Roxo = termo do meio (z₁ − z₂ − z₀)
  Cada dígito de cada número aparece colorido consistentemente em TODOS os passos matemáticos, para o aluno acompanhar visualmente o que é alto vs baixo.
- Tipografia: serif moderna para títulos (Fraunces ou similar), sans (Inter) no corpo, mono (JetBrains Mono) para dígitos/números.
- Fundo claro padrão; slides de seção/título em fundo escuro (estrutura "sanduíche").
- Animações sutis em revelações step-by-step (Motion/React), sem distrair.

## Estrutura do deck (~28 slides para ~30 min)

**Bloco 1 — Abertura (2 slides)**
1. Capa: título, autores (Pedro, Beatriz, Breno), UFC, disciplina PAA, data.
2. Roteiro da apresentação (5 blocos).

**Bloco 2 — O Problema (4 slides)**
3. O problema em uma frase + exemplo visual `1234 × 5678 = ?`.
4. Representação posicional: 305 em base 10 (tabela colorida posição/dígito/peso/contribuição).
5. Mesmo número em base 2 (mostra que `n` ≠ valor; `n = ⌊log_b x⌋ + 1`).
6. Pré-condições e pós-condições (cartões enxutos).

**Bloco 3 — Multiplicação por Extenso (5 slides)**
7. Ideia intuitiva: "como aprendemos na escola" — visual de multiplicação armada.
8. Funcionamento: dígito a dígito + transporte ("vai um"), com produtos parciais coloridos.
9. Pseudocódigo (bloco mono, comentado, sem rolagem).
10. Exemplo passo-a-passo `1234 × 5678` — uma iteração `i` por slide-revelação (tabela com temp/res/transp animada). **Aqui as cores brilham**: cada dígito de x mantém sua cor ao longo de todas as iterações.
11. Corretude (1 parágrafo) + Complexidade `T(n) = Θ(n²)` com mini árvore/grade `n × n`.

**Bloco 4 — Karatsuba (8 slides)**
12. Slide de seção: "E se 4 multiplicações virassem 3?"
13. A ideia central: dividir cada número em duas metades.
    - Visual: `1234` → x₁=`12` (azul) | x₀=`34` (laranja); `5678` → y₁=`56` (azul) | y₀=`78` (laranja).
14. A expansão ingênua: `x·y = x₁y₁·b^2m + (x₁y₀+x₀y₁)·b^m + x₀y₀` — destaca **4 multiplicações**.
15. O truque de Karatsuba: definir z₂, z₀, z₁ — destaca **3 multiplicações** (z₁ engloba o cruzado).
16. Por que funciona: expansão algébrica de `z₁ − z₂ − z₀ = x₁y₀ + x₀y₁` (passo a passo revelado).
17. Pseudocódigo recursivo, com caso base destacado.
18. Exemplo completo `1234 × 5678` em Karatsuba: m=2, calcula z₂=672, z₀=2652, z₁=6164, meio=2840, recombina → 7.006.652. Cada termo numa "card" colorida; recombinação final alinhada por casa decimal.
19. Recorrência `T(n) = 3T(n/2) + Θ(n)` → Teorema Mestre → `Θ(n^log₂3) ≈ Θ(n^1.585)`. Mini árvore de recursão mostrando 3 filhos por nó vs 4.

**Bloco 5 — Comparação Teórica (2 slides)**
20. Tabela lado-a-lado: tempo, espaço, quando cada um vence.
21. Gráfico (Recharts) `n²` vs `n^1.585` — cruzamento e crescimento.

**Bloco 6 — Avaliação Empírica (5 slides PLACEHOLDER da Parte 3)**
22. Metodologia: ambiente (SO, CPU, RAM — preencher), gerador de entradas aleatórias, critério dos 5min, procedimento "razão dobrando".
23. Tabela de medições (placeholder com colunas n / tempo / razão / d estimado).
24. Gráfico tempo × n (placeholder Recharts).
25. Previsão vs medido + diferença relativa (placeholder, fórmula em destaque).
26. Discussão: empírico vs teórico (placeholder com bullets a completar).

**Bloco 7 — Encerramento (2 slides)**
27. Conclusões (3 bullets curtos) + trabalhos futuros (Toom-Cook, Schönhage–Strassen — só menção).
28. Obrigado / Perguntas + referências (Karatsuba & Ofman 1962; Brilliant).

## Detalhes técnicos

- Rota única `src/routes/index.tsx` que renderiza um `<Deck>` controlando o índice atual via `?slide=N`.
- Cada slide é um componente em `src/slides/SlideNN_Nome.tsx`, exportado em um array ordenado em `src/slides/index.ts` — fácil de reordenar/inserir.
- `SlideLayout` aplica fundo (light/dark via prop), header opcional (título da seção + contador), footer com nome do trabalho.
- `ScaledSlide` faz o scale 1920×1080 → viewport (regra do skill de slides).
- Classes semânticas `.slide-title`, `.slide-subtitle`, `.slide-body`, `.slide-caption`, `.slide-kicker`, `.slide-chrome` definidas em `src/styles.css` (tokens Tailwind v4).
- Tokens de cor para dígitos: `--digit-high`, `--digit-low`, `--accent-z`, `--accent-mid` em `:root` e mapeados em `@theme inline`.
- Componente `<Digit part="high|low">5</Digit>` e `<Number parts={[["12","high"],["34","low"]]}/>` para garantir coloração consistente.
- Componente `<MathStep>` revela linhas progressivamente quando o usuário avança (sub-step na URL: `?slide=10&step=2`).
- Pseudocódigo via `<Pseudo>` com syntax highlighting leve (sem dependências pesadas).
- Recharts para os gráficos teórico e empírico.
- Atalhos: ← → Space PageUp PageDown navegam; `F` fullscreen; `G` grid overview; `Esc` sai do fullscreen/grid.
- Modo grade: rota lógica via `?view=grid` mostra thumbnails clicáveis.
- Modo impressão: `?print` renderiza todos os slides empilhados para `Cmd+P → PDF`.
- Slides 22–26 marcados visualmente com um badge discreto "Placeholder — Parte 3" no canto, para vocês substituírem facilmente; cada um já com a estrutura/tabela/gráfico pronta esperando os dados.

## Fora de escopo

- Sem backend / sem Lovable Cloud (deck é estático).
- Sem implementação executável dos algoritmos no slide (só pseudocódigo + exemplos pré-calculados).
- Sem notas do apresentador (panel) nesta versão — posso adicionar depois se quiser.

Confirma que posso seguir, ou quer ajustar algo (ex.: paleta, idioma, mais/menos slides em alguma seção, adicionar painel de notas)?
