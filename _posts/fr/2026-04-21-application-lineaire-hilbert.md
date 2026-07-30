---
title: "Application linéaire sur un Hilbert"
date: 2026-04-21
ref: cours-application-lineaire-hilbert
category: cours
tags: [analyse fonctionnelle, espaces de Hilbert, théorème de Riesz]
excerpt: "Factorisation d'une application linéaire continue via son noyau, prolongement d'une application depuis un sous-espace dense, et le théorème de représentation de Riesz."
permalink: /fr/cours/application-lineaire-hilbert/
cover: covers/cours-application-lineaire-hilbert.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/espaces-vectoriels-normes/application-lineaire-hilbert.pdf' | relative_url }}">📄 Application linéaire sur un Hilbert (PDF)</a>
</div>

Trois résultats sur les applications linéaires continues entre espaces de Hilbert. D'abord la **factorisation** : pour $T$ linéaire continue sur un Hilbert $H$, la restriction de $T$ à $(\ker T)^\perp$ est une bijection continue vers $\mathrm{Im}\,T$ : la décomposition $H = \ker T \oplus (\ker T)^\perp$ fait tout le travail.

Ensuite le **prolongement** : une application linéaire continue définie sur un sous-espace $X$ à valeurs dans un Banach se prolonge de façon unique à $\bar{X}$ puis à $H$ tout entier, en préservant sa norme d'opérateur : construction en deux étapes (prolongement par continuité sur l'adhérence, puis composition avec le projecteur orthogonal). Enfin le **théorème de représentation de Riesz** : toute forme linéaire continue sur un Hilbert s'écrit comme un produit scalaire contre un vecteur fixé, ce qui identifie (anti-linéairement, isométriquement) $H$ à son dual topologique.

Notes prises telles quelles, pas retravaillées pour la lecture. Le PDF ci-dessus est la version complète.
