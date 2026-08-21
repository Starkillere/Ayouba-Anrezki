---
title: "Point de vue analytique de l'arithmétique"
date: 2025-05-09
ref: cours-point-de-vue-analytique
category: cours
tags: [arithmétique, fonction zêta, séries de Dirichlet]
excerpt: "Combien y a-t-il de nombres premiers inférieurs à x ? La fonction zêta de Riemann, les séries de Dirichlet, et la divergence de ∑ 1/p."
permalink: /fr/cours/point-de-vue-analytique-arithmetique/
cover: covers/cours-point-de-vue-analytique.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/arithmetique/chapitre_point_de_vu_analytique_arithmetiquet.pdf' | relative_url }}" class="pdf-download">Télécharge le papier au format PDF</a>
</div>

Notes de cours sur l'arithmétique analytique, motivées par une question toute simple : combien y a-t-il de nombres premiers inférieurs à $x$ ? La somme partielle de la série harmonique $H_n \sim \log(n)$ donne une première intuition de la densité des premiers, ce qui motive l'introduction de la fonction zêta de Riemann $\xi(x) = \sum_{n=1}^{\infty} \frac{1}{n^x}$ et des séries de Dirichlet associées aux fonctions arithmétiques.

En développant $\log(\xi(x))$ sur les nombres premiers, on isole le terme $\sum_p \frac{1}{p^x}$ du reste (qui converge), ce qui prépare la démonstration (laissée en chantier dans ces notes) de la divergence de $\sum_{p \text{ premier}} \frac{1}{p}$.

Notes prises telles quelles, pas retravaillées pour la lecture. Le PDF ci-dessus est la version complète.
