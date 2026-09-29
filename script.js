'use strict';

/* =========================================================
   Configuration
   ========================================================= */
const RELEASES_API = 'https://api.github.com/repos/D-P-Creation/Halo-Releases/releases?per_page=6';
const RELEASES_PAGE = 'https://github.com/D-P-Creation/Halo-Releases/releases';
const LATEST_RELEASE_PAGE = `${RELEASES_PAGE}/latest`;
const CACHE_KEY = 'halo-releases-cache-v2';
const CACHE_TTL_MS = 30 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;
const MAX_RELEASE_LINES = 12;

const SCREENSHOTS = {
  dashboard: {
    src: 'assets/dashboard-900.webp',
    srcset: 'assets/dashboard-900.webp 900w, assets/dashboard-1600.webp 1600w',
    altKey: 'showcaseDashboardAlt'
  },
  budget: {
    src: 'assets/budget-900.webp',
    srcset: 'assets/budget-900.webp 900w, assets/budget-1600.webp 1600w',
    altKey: 'showcaseBudgetAlt'
  },
  income: {
    src: 'assets/income-900.webp',
    srcset: 'assets/income-900.webp 900w, assets/income-1600.webp 1600w',
    altKey: 'showcaseIncomeAlt'
  },
  transactions: {
    src: 'assets/transactions-900.webp',
    srcset: 'assets/transactions-900.webp 900w, assets/transactions-1600.webp 1600w',
    altKey: 'showcaseTransactionsAlt'
  },
  profile: {
    src: 'assets/profile-900.webp',
    srcset: 'assets/profile-900.webp 900w, assets/profile-1600.webp 1600w',
    altKey: 'showcaseProfileAlt'
  }
};

const SHOWCASE_SIZES = '(max-width: 600px) calc(100vw - 28px), (max-width: 900px) calc(100vw - 48px), 1390px';

/* =========================================================
   Internationalization
   ========================================================= */
const i18n = {
  fr: {
    pageTitle: 'Halo — Votre budget, simplement.',
    metaDescription: "Halo, l'application de budget moderne conçue pour le Canada.",
    skipLink: 'Aller au contenu',
    navLabel: 'Navigation principale',
    navFeatures: 'Fonctionnalités',
    navPreview: 'Aperçu',
    navUpdates: 'Nouveautés',
    navDownload: 'Télécharger',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    switchLanguage: 'Passer en anglais',
    eyebrow: 'BUDGET PERSONNEL INTELLIGENT',
    heroTitle: 'Votre budget.<br><span>Plus clair, plus simple.</span>',
    heroText: 'Halo rassemble vos revenus, vos dépenses et vos objectifs dans une application moderne pensée pour le Canada.',
    downloadWindows: 'Télécharger pour Windows',
    discover: 'Découvrir Halo',
    versionChecking: 'Recherche de la dernière version…',
    versionFallback: 'Téléchargement disponible sur GitHub Releases',
    heroImageAlt: 'Tableau de bord Halo',
    featuresEyebrow: 'TOUT AU MÊME ENDROIT',
    featuresTitle: 'Une vue complète de vos finances.',
    featuresText: 'Halo transforme vos chiffres en une vue simple à comprendre et facile à utiliser au quotidien.',
    f1Title: 'Budget intelligent',
    f1Text: "Planifiez vos catégories, suivez vos dépenses et voyez ce qu'il vous reste.",
    f2Title: 'Revenus adaptés au Canada',
    f2Text: 'Estimez votre revenu net selon votre province et votre situation financière.',
    f3Title: 'Paiements récurrents',
    f3Text: 'Ajoutez vos paiements réguliers et laissez Halo les projeter dans les prochaines périodes.',
    f4Title: 'Budget à deux',
    f4Text: 'Combinez les revenus de votre ménage tout en gardant une vue claire pour chaque personne.',
    previewEyebrow: 'APERÇU',
    previewTitle: 'Conçu pour rester lisible.',
    previewText: "De votre tableau de bord jusqu'aux transactions, Halo garde la même expérience simple et cohérente.",
    previewTabsLabel: 'Aperçus de Halo',
    tabDashboard: 'Tableau de bord',
    tabBudget: 'Budget',
    tabIncome: 'Revenus',
    tabTransactions: 'Transactions',
    tabProfile: 'Profil',
    showcaseDashboardAlt: 'Aperçu du tableau de bord Halo',
    showcaseBudgetAlt: 'Aperçu du budget Halo',
    showcaseIncomeAlt: 'Aperçu des revenus Halo',
    showcaseTransactionsAlt: 'Aperçu des transactions Halo',
    showcaseProfileAlt: 'Aperçu du profil Halo',
    canadaEyebrow: 'PENSÉ POUR LE CANADA',
    canadaTitle: 'Votre province fait partie du calcul.',
    canadaText: 'Choisissez votre province ou territoire dans votre profil. Halo adapte ses estimations financières à votre emplacement et conserve vos préférences au même endroit.',
    profileImageAlt: 'Profil financier Halo',
    updatesEyebrow: 'NOUVEAUTÉS',
    updatesTitle: 'Ce qui change dans Halo.',
    updatesText: 'Découvrez les nouveautés, améliorations et corrections des dernières versions sans quitter le site.',
    updatesLoading: 'Chargement des notes de version…',
    updatesEmpty: 'Aucune note de version publiée pour le moment.',
    updatesError: 'Impossible de charger les nouveautés pour le moment.',
    updatesFallback: 'Les notes de version sont disponibles sur GitHub Releases.',
    viewReleases: 'Voir les versions sur GitHub',
    viewFullRelease: 'Voir tout sur GitHub',
    latestBadge: 'Dernière version',
    downloadEyebrow: 'HALO POUR WINDOWS',
    downloadTitle: 'Prêt à essayer Halo?',
    downloadInstaller: "Télécharger l'installateur",
    releaseNotes: 'Voir les nouveautés',
    downloadFallback: 'Windows 10/11 • Téléchargement via GitHub Releases',
    latestVersion: version => `Dernière version : ${version} • Windows`,
    downloadMeta: (version, size, date) => `Version ${version} • Windows 10/11${size ? ` • ${size}` : ''}${date ? ` • ${date}` : ''}`
  },
  en: {
    pageTitle: 'Halo — Your budget, made simple.',
    metaDescription: 'Halo is a modern budgeting app designed for Canada.',
    skipLink: 'Skip to content',
    navLabel: 'Primary navigation',
    navFeatures: 'Features',
    navPreview: 'Preview',
    navUpdates: 'What’s new',
    navDownload: 'Download',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch to French',
    eyebrow: 'SMART PERSONAL BUDGETING',
    heroTitle: 'Your budget.<br><span>Clearer, simpler.</span>',
    heroText: 'Halo brings your income, spending and goals together in a modern app designed for Canada.',
    downloadWindows: 'Download for Windows',
    discover: 'Discover Halo',
    versionChecking: 'Checking the latest version…',
    versionFallback: 'Download available on GitHub Releases',
    heroImageAlt: 'Halo dashboard',
    featuresEyebrow: 'EVERYTHING IN ONE PLACE',
    featuresTitle: 'A complete view of your finances.',
    featuresText: 'Halo turns your numbers into a view that is easy to understand and use every day.',
    f1Title: 'Smart budgeting',
    f1Text: 'Plan your categories, track spending and see what you have left.',
    f2Title: 'Income built for Canada',
    f2Text: 'Estimate your net income based on your province and financial situation.',
    f3Title: 'Recurring payments',
    f3Text: 'Add regular payments and let Halo project them into upcoming periods.',
    f4Title: 'Two-person budget',
    f4Text: 'Combine household income while keeping a clear view for each person.',
    previewEyebrow: 'PREVIEW',
    previewTitle: 'Designed to stay readable.',
    previewText: 'From your dashboard to transactions, Halo keeps the same simple, consistent experience.',
    previewTabsLabel: 'Halo previews',
    tabDashboard: 'Dashboard',
    tabBudget: 'Budget',
    tabIncome: 'Income',
    tabTransactions: 'Transactions',
    tabProfile: 'Profile',
    showcaseDashboardAlt: 'Halo dashboard preview',
    showcaseBudgetAlt: 'Halo budget preview',
    showcaseIncomeAlt: 'Halo income preview',
    showcaseTransactionsAlt: 'Halo transactions preview',
    showcaseProfileAlt: 'Halo profile preview',
    canadaEyebrow: 'DESIGNED FOR CANADA',
    canadaTitle: 'Your province is part of the calculation.',
    canadaText: 'Choose your province or territory in your profile. Halo adapts financial estimates to your location and keeps your preferences together.',
    profileImageAlt: 'Halo financial profile',
    updatesEyebrow: 'WHAT’S NEW',
    updatesTitle: 'What’s new in Halo.',
    updatesText: 'See the latest features, improvements and fixes without leaving the site.',
    updatesLoading: 'Loading release notes…',
    updatesEmpty: 'No release notes have been published yet.',
    updatesError: 'Unable to load updates right now.',
    updatesFallback: 'Release notes are available on GitHub Releases.',
    viewReleases: 'View releases on GitHub',
    viewFullRelease: 'View full release on GitHub',
    latestBadge: 'Latest',
    downloadEyebrow: 'HALO FOR WINDOWS',
    downloadTitle: 'Ready to try Halo?',
    downloadInstaller: 'Download installer',
    releaseNotes: 'See what’s new',
    downloadFallback: 'Windows 10/11 • Download via GitHub Releases',
    latestVersion: version => `Latest version: ${version} • Windows`,
    downloadMeta: (version, size, date) => `Version ${version} • Windows 10/11${size ? ` • ${size}` : ''}${date ? ` • ${date}` : ''}`
  }
};

let lang = document.documentElement.dataset.haloLang === 'en' ? 'en' : 'fr';
let releases = [];
let latestRelease = null;
let apiFailed = false;

function text(key) {
  return i18n[lang][key];
}

function setMetaContent(id, value) {
  const element = document.getElementById(id);
  if (element) element.setAttribute('content', value);
}

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dataset.haloLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const value = i18n[lang][key];
    if (typeof value !== 'string') return;

    if (key === 'heroTitle') {
      element.innerHTML = value;
    } else {
      element.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(element => {
    const value = i18n[lang][element.dataset.i18nAlt];
    if (typeof value === 'string') element.alt = value;
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
    const value = i18n[lang][element.dataset.i18nAriaLabel];
    if (typeof value === 'string') element.setAttribute('aria-label', value);
  });

  document.title = text('pageTitle');
  setMetaContent('metaDescription', text('metaDescription'));
  setMetaContent('ogTitle', text('pageTitle'));
  setMetaContent('ogDescription', text('metaDescription'));
  setMetaContent('twitterTitle', text('pageTitle'));
  setMetaContent('twitterDescription', text('metaDescription'));
  setMetaContent('ogLocale', lang === 'fr' ? 'fr_CA' : 'en_CA');

  const siteNav = document.getElementById('siteNav');
  if (siteNav) siteNav.setAttribute('aria-label', text('navLabel'));

  const languageButton = document.getElementById('language');
  languageButton.textContent = lang === 'fr' ? 'EN' : 'FR';
  languageButton.setAttribute('aria-label', text('switchLanguage'));

  updateMenuAccessibility();
  updateActiveShowcaseAlt();
  renderReleaseSummary();
  renderReleaseNotes();

  document.documentElement.classList.remove('i18n-pending');
}

function saveLanguage() {
  try {
    localStorage.setItem('halo-lang', lang);
  } catch (_) {}
}

/* =========================================================
   Navigation
   ========================================================= */
const languageButton = document.getElementById('language');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

languageButton.addEventListener('click', () => {
  lang = lang === 'fr' ? 'en' : 'fr';
  saveLanguage();
  applyLang();
});

function isMenuOpen() {
  return siteNav.classList.contains('is-open');
}

function updateMenuAccessibility() {
  const expanded = isMenuOpen();
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? text('closeMenu') : text('openMenu'));
}

function closeMenu() {
  siteNav.classList.remove('is-open');
  updateMenuAccessibility();
}

menuToggle.addEventListener('click', () => {
  siteNav.classList.toggle('is-open');
  updateMenuAccessibility();
});

siteNav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && isMenuOpen()) {
    closeMenu();
    menuToggle.focus();
  }
});

window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

/* =========================================================
   Preview tabs
   ========================================================= */
const tabs = Array.from(document.querySelectorAll('.showcase-tabs [role="tab"]'));
const showcaseImage = document.getElementById('showcaseImage');
const showcasePanel = document.getElementById('showcase-panel');
let activeShot = 'dashboard';
let showcaseRequest = 0;

function updateActiveShowcaseAlt() {
  const shot = SCREENSHOTS[activeShot];
  if (shot) showcaseImage.alt = text(shot.altKey);
}

function preloadShot(shot) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.sizes = SHOWCASE_SIZES;
    image.srcset = shot.srcset;
    image.src = shot.src;
    image.onload = () => resolve();
    image.onerror = reject;
  });
}

async function activateTab(tab, moveFocus = false) {
  const shotName = tab.dataset.shot;
  const shot = SCREENSHOTS[shotName];
  if (!shot || shotName === activeShot) {
    if (moveFocus) tab.focus();
    return;
  }

  const requestId = ++showcaseRequest;

  try {
    await preloadShot(shot);
  } catch (_) {
    return;
  }

  if (requestId !== showcaseRequest) return;

  tabs.forEach(candidate => {
    const selected = candidate === tab;
    candidate.classList.toggle('active', selected);
    candidate.setAttribute('aria-selected', String(selected));
    candidate.tabIndex = selected ? 0 : -1;
  });

  activeShot = shotName;
  showcasePanel.setAttribute('aria-labelledby', tab.id);
  showcaseImage.classList.add('is-changing');

  requestAnimationFrame(() => {
    showcaseImage.srcset = shot.srcset;
    showcaseImage.sizes = SHOWCASE_SIZES;
    showcaseImage.src = shot.src;
    updateActiveShowcaseAlt();
    requestAnimationFrame(() => showcaseImage.classList.remove('is-changing'));
  });

  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    }
  });
});

function preloadRemainingScreenshots() {
  Object.entries(SCREENSHOTS)
    .filter(([name]) => name !== activeShot)
    .forEach(([, shot]) => {
      const image = new Image();
      image.decoding = 'async';
      image.sizes = SHOWCASE_SIZES;
      image.srcset = shot.srcset;
      image.src = shot.src;
    });
}

window.addEventListener('load', () => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadRemainingScreenshots, { timeout: 2500 });
  } else {
    window.setTimeout(preloadRemainingScreenshots, 800);
  }
});

/* =========================================================
   Internal navigation
   Keep the public URL clean when using the header navigation.
   Direct URLs containing #features, #preview or #updates still
   work normally when someone intentionally opens one.
   ========================================================= */
function scrollToSectionWithoutHash(link) {
  const selector = link.getAttribute('href');
  if (!selector || !selector.startsWith('#')) return;

  const target = document.querySelector(selector);
  if (!target) return;

  link.addEventListener('click', event => {
    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });

    // Remove an existing section hash as well, so copying the URL after
    // navigating from the menu always shares the Halo home page.
    if (window.location.hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
  });
}

document.querySelectorAll('#siteNav a[href^="#"], #mobileDownload[href^="#"]').forEach(scrollToSectionWithoutHash);

/* =========================================================
   Release / download helpers
   ========================================================= */
function stableReleases(items) {
  return Array.isArray(items)
    ? items.filter(item => item && !item.draft && !item.prerelease)
    : [];
}

function installerAsset(release) {
  const assets = Array.isArray(release?.assets) ? release.assets : [];
  return assets.find(asset => /^Halo-Setup-v.*\.exe$/i.test(asset.name))
    || assets.find(asset => /\.exe$/i.test(asset.name))
    || null;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes >= 100 ? Math.round(megabytes) : megabytes.toFixed(1)} MB`;
}

function formatDate(dateValue) {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function setDownloadTarget(url) {
  const target = url || LATEST_RELEASE_PAGE;
  document.querySelectorAll('[data-download-link]').forEach(link => {
    link.href = target;
    link.classList.remove('is-disabled');
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
  });
}

function renderReleaseSummary() {
  const heroVersion = document.getElementById('heroVersion');
  const downloadMeta = document.getElementById('downloadMeta');

  if (!latestRelease) {
    heroVersion.textContent = apiFailed ? text('versionFallback') : text('versionChecking');
    downloadMeta.textContent = text('downloadFallback');
    setDownloadTarget(LATEST_RELEASE_PAGE);
    return;
  }

  const version = (latestRelease.tag_name || latestRelease.name || '').replace(/^v/i, '') || '?';
  const asset = installerAsset(latestRelease);
  const size = asset ? formatBytes(asset.size) : '';
  const date = formatDate(latestRelease.published_at || latestRelease.created_at);

  heroVersion.textContent = i18n[lang].latestVersion(version);
  downloadMeta.textContent = i18n[lang].downloadMeta(version, size, date);
  setDownloadTarget(asset?.browser_download_url || LATEST_RELEASE_PAGE);
}

/* =========================================================
   Safe release-note rendering
   ========================================================= */
function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch (_) {
    return null;
  }
}

function renderInlineMarkdown(line) {
  const source = String(line);
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let output = '';
  let cursor = 0;
  let match;

  while ((match = linkPattern.exec(source)) !== null) {
    output += escapeHtml(source.slice(cursor, match.index));
    const safeUrl = safeExternalUrl(match[2]);
    if (safeUrl) {
      output += `<a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener">${escapeHtml(match[1])}</a>`;
    } else {
      output += escapeHtml(match[0]);
    }
    cursor = match.index + match[0].length;
  }

  output += escapeHtml(source.slice(cursor));
  return output;
}

/* Optional bilingual release-note convention:
   <!-- FR -->
   notes françaises
   <!-- EN -->
   English notes
   If both markers are present, Halo displays the block matching the site language.
   Releases without markers are displayed as written. */
function localizedReleaseBody(body = '') {
  const source = String(body);
  const frMarker = /<!--\s*FR\s*-->/i;
  const enMarker = /<!--\s*EN\s*-->/i;

  if (!frMarker.test(source) || !enMarker.test(source)) return source;

  const frStart = source.search(frMarker);
  const enStart = source.search(enMarker);
  const frMatch = source.match(frMarker)?.[0] || '';
  const enMatch = source.match(enMarker)?.[0] || '';

  if (lang === 'fr') {
    if (frStart < enStart) return source.slice(frStart + frMatch.length, enStart);
    return source.slice(frStart + frMatch.length);
  }

  if (enStart < frStart) return source.slice(enStart + enMatch.length, frStart);
  return source.slice(enStart + enMatch.length);
}

function formatReleaseBody(body = '') {
  const source = localizedReleaseBody(body)
    .replace(/<!--[^]*?-->/g, '')
    .trim();

  if (!source) return '';

  const meaningfulLines = source
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  const lines = meaningfulLines.slice(0, MAX_RELEASE_LINES);
  let html = '';
  let listType = null;

  const closeList = () => {
    if (listType) {
      html += `</${listType}>`;
      listType = null;
    }
  };

  lines.forEach(line => {
    const heading = line.match(/^#{1,6}\s+(.+)$/);
    const bullet = line.match(/^[-*+]\s+(.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);

    if (heading) {
      closeList();
      html += `<h4>${renderInlineMarkdown(heading[1])}</h4>`;
      return;
    }

    if (bullet || numbered) {
      const desiredList = bullet ? 'ul' : 'ol';
      if (listType !== desiredList) {
        closeList();
        listType = desiredList;
        html += `<${listType}>`;
      }
      html += `<li>${renderInlineMarkdown((bullet || numbered)[1])}</li>`;
      return;
    }

    closeList();
    html += `<p>${renderInlineMarkdown(line)}</p>`;
  });

  closeList();
  return html;
}

function renderReleaseNotes() {
  const list = document.getElementById('releaseList');
  if (!list) return;

  if (!releases.length) {
    if (!apiFailed) return;
    list.innerHTML = `
      <article class="release-card release-fallback">
        <p>${escapeHtml(text('updatesError'))}</p>
        <a class="release-external-link" href="${RELEASES_PAGE}" target="_blank" rel="noopener">${escapeHtml(text('viewReleases'))}</a>
      </article>`;
    return;
  }

  list.innerHTML = releases.slice(0, 4).map((release, index) => {
    const version = escapeHtml((release.tag_name || release.name || '').replace(/^v/i, ''));
    const date = escapeHtml(formatDate(release.published_at || release.created_at));
    const body = formatReleaseBody(release.body || '');
    const releaseUrl = safeExternalUrl(release.html_url) || RELEASES_PAGE;
    const latestBadge = index === 0
      ? `<span class="latest-badge">${escapeHtml(text('latestBadge'))}</span>`
      : '';

    return `
      <article class="release-card${index === 0 ? ' latest' : ''}">
        <div class="release-card-head">
          <div>
            <span class="release-version">Halo ${version}</span>${latestBadge}
          </div>
          ${date ? `<time datetime="${escapeHtml(release.published_at || '')}">${date}</time>` : ''}
        </div>
        <div class="release-body">
          ${body || `<p class="release-empty">${escapeHtml(text('updatesEmpty'))}</p>`}
        </div>
        <div class="release-card-footer">
          <a class="release-external-link" href="${escapeHtml(releaseUrl)}" target="_blank" rel="noopener">${escapeHtml(text('viewFullRelease'))}</a>
        </div>
      </article>`;
  }).join('');
}

/* =========================================================
   Cache + GitHub API (single request)
   ========================================================= */
function readReleaseCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items) || !Number.isFinite(parsed.savedAt)) return null;
    return parsed;
  } catch (_) {
    return null;
  }
}

function writeReleaseCache(items) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      savedAt: Date.now(),
      items
    }));
  } catch (_) {}
}

function useReleaseData(items) {
  releases = stableReleases(items);
  latestRelease = releases[0] || null;
  apiFailed = false;
  renderReleaseSummary();
  renderReleaseNotes();
}

async function fetchReleases() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(RELEASES_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

    const items = await response.json();
    if (!Array.isArray(items)) throw new Error('Unexpected GitHub API payload');

    writeReleaseCache(items);
    useReleaseData(items);
  } catch (error) {
    apiFailed = true;
    renderReleaseSummary();
    if (!releases.length) renderReleaseNotes();
  } finally {
    window.clearTimeout(timeout);
  }
}

function initializeReleases() {
  const cached = readReleaseCache();

  if (cached) {
    useReleaseData(cached.items);
    const isFresh = Date.now() - cached.savedAt < CACHE_TTL_MS;
    if (isFresh) return;
  }

  fetchReleases();
}

/* =========================================================
   Startup
   ========================================================= */
document.getElementById('currentYear').textContent = String(new Date().getFullYear());
setDownloadTarget(LATEST_RELEASE_PAGE);
applyLang();
initializeReleases();
