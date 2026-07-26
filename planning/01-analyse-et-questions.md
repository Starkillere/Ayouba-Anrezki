# Analyse du projet et questions ouvertes (2026-07-25)

Ce document contient mon avis sur le projet avant toute écriture de code, comme demandé. Il s'appuie sur (1) le brief dans `00-brief-original.md`, (2) l'état actuel du repo, (3) une lecture de la référence https://jingmatrix.github.io/en/.

## 1. État des lieux du repo actuel — critique honnête

Le site actuel (`index.html`, `cv.html`, `Contact.html`, `css/style.css`, `css/adaptation_ecrant.css`) a plusieurs problèmes structurels, pas seulement esthétiques :

- **Pas de blog du tout.** `index.html` contient un unique article codé en dur dans le HTML. Il n'y a aucun mécanisme de liste d'articles, de catégories, de tags, ni de pages individuelles par article. Ajouter un deuxième article aujourd'hui obligerait à dupliquer manuellement du HTML.
- **Incohérence visuelle entre les pages.** `cv.html` et `Contact.html` ont chacune leur propre `<style>` inline, complètement différent de `css/style.css` (polices, couleurs, layout). `index.html` est la seule page à utiliser la charte "sombre/bannière/rouge". Ce n'est pas un seul site, ce sont trois pages indépendantes.
- **CSS cassé / dette technique.** Le `footer` dans `css/style.css` référence des images (`images/ico_top.png`, `images/separateur.png`, `images/ombre.png`, `images/ico_liensexterne.png`) dans un dossier `images/` qui n'existe pas (le vrai dossier est `assets/img/`). Ces images ne se chargent donc jamais.
- **Liens factices.** LinkedIn (`#`), Discord (`#`) pointent vers rien. Deux adresses e-mail différentes apparaissent selon les pages (`anrezki.ayouba@proton.me` dans index.html/footer, `anrezkia531@gmail.com` dans cv.html/Contact.html) — à trancher.
- **`js/script.js` est vide.** Aucune interactivité pour l'instant.
- **Contenu du CV à resynchroniser avec ton brief** : le CV mentionne un bac à Mayotte et un parcours qui ne colle pas exactement avec ce que tu me décris (CPGE à Nantes, IMT Toulouse, stage IRIT non mentionné dans le CV, etc.). Pas grave en soi puisque tout est à refaire, mais je le note pour qu'on ait une seule source de vérité biographique.
- **Pas d'accessibilité ni de responsive réel** : `adaptation_ecrant.css` est minimal, il n'y a pas de vraie stratégie mobile-first.

Verdict : je suis d'accord avec toi, repartir de zéro sur la structure a plus de sens que de patcher l'existant. On peut en revanche **récupérer** : la structure bio/projets déjà rédigée dans `cv.html` (bonne matière première), le nom de domaine GitHub Pages, et les assets (photo de profil, bannière) si tu veux les garder.

## 2. Contrainte "pas de backend, tout en JS/HTML/CSS" — ce que ça implique concrètement

GitHub Pages (plan gratuit) sert uniquement des fichiers statiques. Ça exclut PHP, une base de données, un serveur Node en prod, etc. — pas de souci, un blog perso n'en a pas besoin. Mais il y a un vrai choix d'architecture à faire, et c'est le point le plus important à trancher avant de coder :

**Option A — Site 100% statique écrit à la main.**
Un fichier `.html` par article. Simple à comprendre, zéro outillage. Mais ça ne scale pas : avec "une catégorie par passion" (maths, physique, IA, poésie, musique, projets...) et des dizaines d'articles/notes/poèmes dans le temps, tu vas dupliquer le header/footer/nav partout et c'est l'enfer à maintenir (changer le menu = éditer 50 fichiers).

**Option B — Rendu côté client (pur JS, zéro étape de build).**
Les articles sont écrits en Markdown (ou JSON), servis comme fichiers statiques, et une petite app JS (vanilla ou avec une lib légère comme `marked.js` + `KaTeX` pour les maths) les charge et les affiche au chargement de la page, avec un `index.json` qui liste titre/catégorie/tags/date de chaque article. Avantage : respecte à la lettre "tout en JS/HTML/CSS", aucun outil de build, tu ajoutes un article = tu ajoutes un fichier `.md` + une ligne dans l'index, tu push. Inconvénient : SEO plus faible (le contenu n'existe pas dans le HTML brut tant que le JS n'a pas tourné) et un flash de contenu vide au chargement.

**Option C — Générateur de site statique (Eleventy, Hugo, Jekyll).**
C'est ce que fait très probablement le site d'inspiration (jingmatrix.github.io a toutes les caractéristiques d'un Hugo/Jekyll : tags, catégories, flux RSS, multi-langue). Le générateur tourne au moment du build (soit en local avant de push, soit automatiquement via GitHub Actions, gratuit sur repo public) et produit du HTML/CSS/JS pur, qui est ce qui est réellement déployé — donc ça respecte aussi la contrainte "pas de backend en prod". Avantage : gestion de catégories/tags, flux RSS, pagination, templates, tout ça "gratuit" et éprouvé ; bon SEO puisque le HTML est déjà généré. Inconvénient : une couche d'outillage à apprendre (mais Jekyll est nativement supporté par GitHub Pages sans même configurer d'Action).

**Ma recommandation : Option C avec Jekyll**, précisément parce que GitHub Pages le fait tourner nativement et gratuitement sans configuration de CI — tu écris un fichier Markdown avec un en-tête (front-matter : titre, date, catégorie, tags), tu push, GitHub Pages génère le HTML tout seul. Ça colle à "pas de backend" (c'est un générateur statique, pas un serveur), ça reste "HTML/CSS/JS" au sens où c'est ce qui sort et ce que tu personnalises (les templates sont du HTML avec une couche de templating légère, le style est du CSS, l'interactivité est du JS), et ça résout directement le problème de scalabilité de l'option A sans qu'on ait à réinventer un mini-générateur en JS (option B) qu'il faudrait maintenir nous-mêmes.

Je pose quand même la question ouverte plus bas, parce que "il faut tout faire en js/html/css" peut aussi vouloir dire que tu refuses explicitement tout générateur/templating et veux un contrôle total fichier par fichier — dans ce cas Option B est le bon compromis entre confort et respect de la contrainte.

## 3. Proposition d'arborescence de catégories

Objectif : une catégorie par passion, mais avec un regroupement à deux niveaux pour ne pas noyer le menu sous 10 entrées. Proposition (à valider/ajuster avec toi) :

- **Journal** — actualités, vie perso/pro, mises à jour de projets (ton "je veux partager mes actualités")
- **Recherche & Maths**
  - Théorie des nombres (nombres premiers, jumeaux)
  - Réécriture de termes / logique / IA symbolique (IRIT, TRS, confluence)
  - Notes de cours (tes notes Typst)
- **Physique & Astro**
  - Observation, thermodynamique, optique, quantique
- **Informatique & IA**
  - Stéganalyse / transformers (ton sujet actuel)
  - Théorie des langages, automates
  - Projets logiciels (liens GitHub)
- **Entrepreneuriat** — "explore", freelance, MCD0
- **Créations** — poèmes, textes, musique (peut-être séparer Poésie / Musique si le volume le justifie)
- **Projets** — page transverse type portfolio qui référence électronique, jeux vidéo, dev web/mobile

Chaque article n'a **qu'une catégorie principale** mais peut porter plusieurs **tags** transverses (ex. un poème sur les maths → catégorie *Créations*, tag *maths*). C'est ce mécanisme tags+catégories qui évite le "fourre-tout" que tu crains, et c'est un standard Jekyll/Hugo (donc gratuit avec l'option C).

## 4. Maths, schémas, notes Typst

- **Rendu LaTeX** : si tu veux écrire des formules dans les articles (quasi certain vu le contenu), il faut une lib JS de rendu comme **KaTeX** (rapide, léger) plutôt que MathJax (plus lourd). Ça s'intègre facilement en pur JS/HTML/CSS, compatible avec toutes les options ci-dessus.
- **Notes Typst** : Typst peut exporter en PDF facilement (lien de téléchargement direct) mais pas nativement en HTML propre. Il existe des pistes (typst → SVG page par page, ou conversion pandoc) mais c'est un chantier à part. Question ouverte plus bas sur ce que tu veux vraiment (PDF téléchargeable vs. intégration HTML).
- **Dessins/schémas** : tu mentionnes "comme dans ce que je t'ai montré" — je n'ai pas reçu d'image dans cette conversation, donc je ne sais pas s'il s'agit de dessins scannés à la main, de diagrammes type Mermaid/TikZ, ou de schémas interactifs SVG/Canvas. Question ouverte.

## 5. Contact par e-mail sans backend

Sans serveur, un vrai formulaire de contact (avec validation, anti-spam) nécessite un service tiers gratuit compatible sites statiques (ex. Formspree, EmailJS — ils exposent une API qu'on appelle en JS pur depuis le front). Alternative plus simple et 100% sans dépendance externe : un lien `mailto:` stylé. Je te laisse trancher (question ouverte).

## 6. Risques / points de vigilance

- **Volume de contenu à migrer** : si tu as beaucoup de notes/poèmes/articles à publier d'un coup, le choix d'architecture (B vs C) change beaucoup l'effort de saisie. À clarifier.
- **Cohérence biographique** : CV actuel vs brief — à harmoniser en une seule fois pour éviter des infos contradictoires publiées.
- **Dérive de scope** : tu listes beaucoup de passions (maths, physique, IA, électronique, poésie, musique, SF, entrepreneuriat...). Je recommande de lancer avec 3-4 catégories concrètes et du contenu réel dedans, plutôt que 10 catégories vides — plus crédible et plus simple à maintenir. On pourra en ajouter facilement plus tard si l'architecture (tags+catégories) est bien posée dès le départ.

## 7. Questions pour toi

1. **Architecture technique** : es-tu d'accord pour partir sur un générateur statique (**Jekyll**, nativement supporté et gratuit sur GitHub Pages, zéro config CI) plutôt qu'un site 100% écrit à la main ou un rendu JS côté client ? Ou tu veux vraiment zéro templating/générateur, tout en fichiers HTML/JS bruts ?
2. **Formulaire de contact** : simple lien `mailto:` (zéro dépendance) ou vrai formulaire via un service tiers gratuit type Formspree/EmailJS (plus pro mais dépendance externe) ?
3. **Notes Typst** : tu veux les publier telles quelles en PDF téléchargeable, ou converties/réécrites en pages HTML avec rendu LaTeX (KaTeX) ?
4. **Dessins et schémas** : de quel type parle-t-on précisément (dessins scannés, diagrammes Mermaid/TikZ, schémas SVG interactifs) ? Peux-tu me montrer un exemple ou décrire ce que tu avais en tête ?
5. **Volume et priorité de contenu** : pour le lancement, tu pars avec peu de contenu (structure + 1-2 articles par catégorie) qu'on enrichit ensuite, ou tu as déjà une pile d'articles/poèmes/notes prêts à migrer immédiatement ?
6. **Identité visuelle** : on garde une base de la charte actuelle (bannière, photo de profil, couleurs sombres/rouge) ou on repart sur un moodboard neuf, plus proche du style épuré/académique de jingmatrix.github.io ?
7. **CV et Contact.html** : on les intègre dans la nouvelle structure unifiée (même templates, même nav) ou ce sont des pages volontairement à part ?
8. **Coordonnées définitives** : quelle adresse e-mail de contact affiche-t-on (`anrezkia531@gmail.com` vs `anrezki.ayouba@proton.me`), et as-tu de vrais liens LinkedIn/Discord à mettre à la place des `#` actuels ?
9. **Multilingue** : comme la référence (en/fr/zh), tu veux au moins FR/EN dès le départ, ou uniquement français pour l'instant ?
10. **Nom de domaine** : `<username>.github.io` suffit, ou tu comptes brancher un domaine personnalisé ?

Je n'écrirai aucun code tant qu'on n'a pas au moins tranché les questions 1, 2 et 5 (ce sont celles qui déterminent l'architecture et donc tout le reste).
