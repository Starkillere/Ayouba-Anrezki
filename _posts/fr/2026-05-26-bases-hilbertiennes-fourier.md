---
title: "Bases hilbertiennes : série de Fourier"
date: 2026-05-26
ref: cours-bases-hilbertiennes-fourier
category: cours
tags: [espaces de Hilbert, série de Fourier, analyse]
excerpt: "Bases hilbertiennes, leurs quatre caractérisations équivalentes (Parseval, polarisation), et leur application aux séries de Fourier dans L²(T)."
permalink: /fr/cours/bases-hilbertiennes-fourier/
cover: covers/cours-bases-hilbertiennes-fourier.svg
---

<div class="doc-card">
  <a href="{{ '/assets/pdf/notes/espaces-vectoriels-normes/Bases-Hilbertiennes-series-de-Fourier.pdf' | relative_url }}" class="pdf-download">Télécharge le papier au format PDF</a>
</div>

Une base hilbertienne $(e_n)$ d'un espace de Hilbert $H$ est une famille orthonormale totale (dont le sous-espace engendré est dense). Un Hilbert admet une base hilbertienne si et seulement si il est séparable : la preuve construit la base par un procédé à la Gram-Schmidt à partir d'une suite dense.

Quatre caractérisations équivalentes d'une base hilbertienne : la définition elle-même, le développement $x = \sum_n (x \mid e_n) e_n$ pour tout $x$, l'égalité de Parseval $\|x\|^2 = \sum_n |(x \mid e_n)|^2$, et sa version polarisée pour le produit scalaire. L'application directe : tout Hilbert séparable est isométriquement isomorphe à $\ell^2$ via $x \mapsto \hat{x} := ((x \mid e_n))_n$, et pour $H = L^2(\mathbb{T})$ avec la base $e_n(t) = e^{2i\pi nt}$, cette isométrie est exactement la série de Fourier.

Notes prises telles quelles, pas retravaillées pour la lecture. Le PDF ci-dessus est la version complète.
