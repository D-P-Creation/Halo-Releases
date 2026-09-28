const API='https://api.github.com/repos/D-P-Creation/Halo-Releases/releases/latest';
const RELEASES_API='https://api.github.com/repos/D-P-Creation/Halo-Releases/releases?per_page=6';
const i18n={fr:{navFeatures:'Fonctionnalités',navPreview:'Aperçu',navDownload:'Télécharger',eyebrow:'BUDGET PERSONNEL INTELLIGENT',heroTitle:'Votre budget.<br><span>Plus clair, plus simple.</span>',heroText:'Halo rassemble vos revenus, vos dépenses et vos objectifs dans une application moderne pensée pour le Canada.',downloadWindows:'Télécharger pour Windows',discover:'Découvrir Halo',featuresEyebrow:'TOUT AU MÊME ENDROIT',featuresTitle:'Une vue complète de vos finances.',featuresText:'Halo transforme vos chiffres en une vue simple à comprendre et facile à utiliser au quotidien.',f1Title:'Budget intelligent',f1Text:"Planifiez vos catégories, suivez vos dépenses et voyez ce qu'il vous reste.",f2Title:'Revenus adaptés au Canada',f2Text:'Estimez votre revenu net selon votre province et votre situation financière.',f3Title:'Paiements récurrents',f3Text:'Ajoutez vos paiements réguliers et laissez Halo les projeter dans les prochaines périodes.',f4Title:'Budget à deux',f4Text:'Combinez les revenus de votre ménage tout en gardant une vue claire pour chaque personne.',previewEyebrow:'APERÇU',previewTitle:'Conçu pour rester lisible.',previewText:"De votre tableau de bord jusqu'aux transactions, Halo garde la même expérience simple et cohérente.",tabDashboard:'Tableau de bord',tabBudget:'Budget',tabIncome:'Revenus',tabTransactions:'Transactions',tabProfile:'Profil',canadaEyebrow:'PENSÉ POUR LE CANADA',canadaTitle:'Votre province fait partie du calcul.',canadaText:'Choisissez votre province ou territoire dans votre profil. Halo adapte ses estimations financières à votre emplacement et conserve vos préférences au même endroit.',downloadEyebrow:'HALO POUR WINDOWS',downloadTitle:'Prêt à essayer Halo?',downloadInstaller:"Télécharger l'installateur",releaseNotes:'Voir les nouveautés',updatesEyebrow:'NOUVEAUTÉS',updatesTitle:'Ce qui change dans Halo.',updatesText:'Découvrez les nouveautés, améliorations et corrections des dernières versions sans quitter le site.',updatesLoading:'Chargement des notes de version…',updatesEmpty:'Aucune note de version publiée pour le moment.',updatesError:'Impossible de charger les nouveautés pour le moment.'},en:{navFeatures:'Features',navPreview:'Preview',navDownload:'Download',eyebrow:'SMART PERSONAL BUDGETING',heroTitle:'Your budget.<br><span>Clearer, simpler.</span>',heroText:'Halo brings your income, spending and goals together in a modern app designed for Canada.',downloadWindows:'Download for Windows',discover:'Discover Halo',featuresEyebrow:'EVERYTHING IN ONE PLACE',featuresTitle:'A complete view of your finances.',featuresText:'Halo turns your numbers into a view that is easy to understand and use every day.',f1Title:'Smart budgeting',f1Text:'Plan your categories, track spending and see what you have left.',f2Title:'Income built for Canada',f2Text:'Estimate your net income based on your province and financial situation.',f3Title:'Recurring payments',f3Text:'Add regular payments and let Halo project them into upcoming periods.',f4Title:'Two-person budget',f4Text:'Combine household income while keeping a clear view for each person.',previewEyebrow:'PREVIEW',previewTitle:'Designed to stay readable.',previewText:'From your dashboard to transactions, Halo keeps the same simple, consistent experience.',tabDashboard:'Dashboard',tabBudget:'Budget',tabIncome:'Income',tabTransactions:'Transactions',tabProfile:'Profile',canadaEyebrow:'DESIGNED FOR CANADA',canadaTitle:'Your province is part of the calculation.',canadaText:'Choose your province or territory in your profile. Halo adapts financial estimates to your location and keeps your preferences together.',downloadEyebrow:'HALO FOR WINDOWS',downloadTitle:'Ready to try Halo?',downloadInstaller:'Download installer',releaseNotes:'See what’s new',updatesEyebrow:'WHAT’S NEW',updatesTitle:'What’s new in Halo.',updatesText:'See the latest features, improvements and fixes without leaving the site.',updatesLoading:'Loading release notes…',updatesEmpty:'No release notes have been published yet.',updatesError:'Unable to load updates right now.'}};
let lang=localStorage.getItem('halo-lang')||((navigator.language||'fr').toLowerCase().startsWith('fr')?'fr':'en');let release=null;
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(el=>{const v=i18n[lang][el.dataset.i18n];if(v)el.innerHTML=v});document.getElementById('language').textContent=lang==='fr'?'EN':'FR';renderRelease()}
document.getElementById('language').onclick=()=>{lang=lang==='fr'?'en':'fr';localStorage.setItem('halo-lang',lang);applyLang()};
const shots={dashboard:'assets/dashboard.png',budget:'assets/budget.png',income:'assets/income.png',transactions:'assets/transactions.png',profile:'assets/profile.png'};document.querySelectorAll('.showcase-tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.showcase-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const img=document.getElementById('showcaseImage');img.style.opacity='.15';setTimeout(()=>{img.src=shots[b.dataset.shot];img.style.opacity='1'},120)});document.getElementById('showcaseImage').style.transition='opacity .2s';
function renderRelease(){if(!release)return;const version=(release.tag_name||'').replace(/^v/i,'');const asset=(release.assets||[]).find(a=>/^Halo-Setup-v.*\.exe$/i.test(a.name))||(release.assets||[]).find(a=>/\.exe$/i.test(a.name));document.getElementById('heroVersion').textContent=lang==='fr'?`Dernière version : ${version} • Windows`:`Latest version: ${version} • Windows`;document.getElementById('downloadMeta').textContent=lang==='fr'?`Version ${version} • Windows 10/11`:`Version ${version} • Windows 10/11`;if(asset){const el=document.getElementById('heroDownload');el.href=asset.browser_download_url;el.classList.remove('disabled')}}
fetch(API,{headers:{Accept:'application/vnd.github+json'}}).then(r=>{if(!r.ok)throw new Error();return r.json()}).then(x=>{release=x;renderRelease()}).catch(()=>{document.getElementById('heroVersion').textContent=lang==='fr'?'Téléchargement disponible sur GitHub Releases':'Download available on GitHub Releases';document.getElementById('downloadMeta').textContent=lang==='fr'?'Consultez GitHub Releases pour la dernière version.':'Visit GitHub Releases for the latest version.';const fallback='https://github.com/D-P-Creation/Halo-Releases/releases/latest';const el=document.getElementById('heroDownload');el.href=fallback;el.classList.remove('disabled')});applyLang();

// Start normal visits at the top instead of restoring an old mobile scroll position.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
  if (!location.hash) {
    requestAnimationFrame(() => window.scrollTo({top: 0, left: 0, behavior: 'instant'}));
  }
});


function escapeHtml(value='') {
  return value.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function formatReleaseBody(body='') {
  const clean = body
    .replace(/<!--[^]*?-->/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();
  if (!clean) return '';
  return clean.split(/\r?\n/).filter(x => x.trim()).slice(0, 10).map(line => {
    const text = line.replace(/^[-*+]\s+/, '').trim();
    return `<li>${escapeHtml(text)}</li>`;
  }).join('');
}
function renderReleaseNotes(releases) {
  const list = document.getElementById('releaseList');
  if (!list) return;
  const published = releases.filter(r => !r.draft && !r.prerelease).slice(0, 4);
  if (!published.length) {
    list.innerHTML = `<article class="release-card"><p>${i18n[lang].updatesEmpty}</p></article>`;
    return;
  }
  list.innerHTML = published.map((r, i) => {
    const version = escapeHtml((r.tag_name || r.name || '').replace(/^v/i,''));
    const date = r.published_at ? new Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', {year:'numeric',month:'long',day:'numeric'}).format(new Date(r.published_at)) : '';
    const notes = formatReleaseBody(r.body || '');
    return `<article class="release-card ${i === 0 ? 'latest' : ''}">
      <div class="release-card-head"><div><span class="release-version">Halo ${version}</span>${i === 0 ? `<span class="latest-badge">${lang === 'fr' ? 'Dernière version' : 'Latest'}</span>` : ''}</div><time>${escapeHtml(date)}</time></div>
      ${notes ? `<ul class="release-notes">${notes}</ul>` : `<p class="release-empty">${i18n[lang].updatesEmpty}</p>`}
    </article>`;
  }).join('');
}
let allReleases=[];
fetch(RELEASES_API,{headers:{Accept:'application/vnd.github+json'}})
  .then(r=>{if(!r.ok)throw new Error();return r.json()})
  .then(items=>{allReleases=items;renderReleaseNotes(items)})
  .catch(()=>{const list=document.getElementById('releaseList');if(list)list.innerHTML=`<article class="release-card"><p>${i18n[lang].updatesError}</p></article>`});
const originalApplyLang=applyLang;
applyLang=function(){originalApplyLang();if(allReleases.length)renderReleaseNotes(allReleases)};
