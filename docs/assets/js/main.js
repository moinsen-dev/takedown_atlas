// Takedown Atlas - Interactive Elements

// Internationalization
const translations = {
  de: {
    // Meta tags
    "page-title":
      "Takedown Atlas — Ihre Bewertung wurde entfernt? Sie sind nicht allein.",
    "page-description":
      "Wurde Ihre ehrliche Bewertung unfair entfernt? Sie sind nicht allein. Melden Sie anonym, decken Sie Muster auf und schaffen Sie Transparenz. Schließen Sie sich 2.800+ Menschen an.",
    "og-title":
      "Takedown Atlas — Ihre Bewertung wurde entfernt? Sie sind nicht allein.",
    "og-description":
      "Wurde Ihre ehrliche Bewertung unfair entfernt? Schließen Sie sich 2.800+ Menschen an, die anonym melden und Transparenz schaffen.",
    "twitter-title":
      "Takedown Atlas — Ihre Bewertung wurde entfernt? Sie sind nicht allein.",
    "twitter-description":
      "Wurde Ihre ehrliche Bewertung unfair entfernt? Schließen Sie sich 2.800+ Menschen an, die anonym melden und Transparenz schaffen.",

    // Navigation
    "nav-how": "So funktioniert's",
    "nav-for-you": "Für Sie",
    "nav-transparency": "Transparenz",
    "nav-contribute": "Mitmachen",

    // Demo banner
    "demo-title": "Dies ist eine DEMO-SEITE",
    "demo-description":
      "Alle gezeigten Statistiken und Daten sind Platzhalter-Beispiele zur Visualisierung der Projektvision. Diese Plattform befindet sich derzeit in der Entwicklung.",
    "demo-link": "Echtes Projekt ansehen →",

    // Hero section
    "hero-title": "Ihre Bewertung wurde entfernt?<br>Sie sind nicht allein.",
    "hero-subtitle":
      "Täglich werden tausende Bewertungen von Google entfernt. Einige Entfernungen sind berechtigt, andere nicht. Helfen Sie uns, diese Muster zu erfassen und Transparenz in Takedown-Praktiken zu bringen.",
    "stat-reviews": "Bewertungen dokumentiert",
    "stat-verified": "Verifiziert authentisch",
    "stat-countries": "Länder abgedeckt",
    "stat-businesses": "Unternehmen analysiert",
    "btn-report": "Entfernung melden",
    "btn-explore": "Karte erkunden",
    "hero-privacy":
      "Ihr Datenschutz ist geschützt. Alle Meldungen werden vor Veröffentlichung anonymisiert.",
    "hero-disclaimer":
      "<strong>Hinweis:</strong> Dies ist eine Visions-Demo. Alle gezeigten Statistiken sind Beispiele zur Veranschaulichung des Plattform-Potentials. Die eigentliche Plattform befindet sich derzeit in der Entwicklung.",

    // Map section
    "map-title": "Live Vorfälle Karte",
    "map-subtitle":
      "Erkunden Sie gemeldete Bewertungsentfernungen in Echtzeit. Klicken Sie auf die Markierungen für Details.",
    "filter-all": "Alle",
    "filter-restaurants": "Restaurants",
    "filter-hotels": "Hotels",
    "filter-retail": "Einzelhandel",
    "map-search-placeholder": "Stadt suchen...",
    "map-loading": "Karte wird geladen...",
    "map-legend-title": "Legende",
    "legend-restaurant": "Restaurant",
    "legend-hotel": "Hotel",
    "legend-retail": "Einzelhandel",
    "legend-verified": "Verifiziert",
    "map-stat-incidents": "Vorfälle sichtbar",
    "map-stat-cities": "Städte",
    "map-stat-verified": "Verifiziert",

    // How It Works
    "how-title": "So funktioniert Takedown Atlas",
    "how-subtitle":
      "Ein einfacher, datenschutzfreundlicher Prozess zur Dokumentation und Verifizierung von Bewertungsentfernungen",
    "step1-title": "Sie melden",
    "step1-desc":
      "Leiten Sie die Entfernungs-E-Mail von Google weiter oder laden Sie Dokumente manuell hoch. Ihre Identität bleibt privat.",
    "step2-title": "Wir verifizieren",
    "step2-desc":
      "Unser Verifizierungssystem prüft die E-Mail-Authentizität mit DKIM/DMARC und geschulte Moderatoren überprüfen jede Einreichung.",
    "step3-title": "Daten werden öffentlich",
    "step3-desc":
      "Verifizierte Vorfälle erscheinen auf unserer öffentlichen Karte und im Datensatz, wobei alle persönlichen Informationen zum Schutz der Privatsphäre entfernt werden.",
    "step4-title": "Muster entstehen",
    "step4-desc":
      "Forscher, Journalisten und die Öffentlichkeit können Trends analysieren und Unternehmen für ihre Takedown-Praktiken zur Verantwortung ziehen.",

    // Personas
    "personas-title": "Was Takedown Atlas für Sie bedeutet",
    "tab-reviewer": "Ihre Bewertung wurde entfernt",
    "tab-business": "Sie besitzen ein Unternehmen",
    "tab-researcher": "Sie forschen oder berichten",
    "tab-supporter": "Sie möchten helfen",
    "reviewer-title": "Ihre Erfahrung zählt",
    "reviewer-intro":
      "In dem Moment, wenn Sie die E-Mail erhalten, dass Ihre ehrliche Bewertung entfernt wurde — wir wissen, wie sich das anfühlt. Frustrierend. Unfair. Als würde Ihre Stimme nicht zählen. Aber hier ist die Sache: <strong>Ihre Erfahrung zählt</strong>, und Sie sind definitiv nicht allein.",
    "reviewer-subtitle": "Verwandeln Sie Ihren Frust in Veränderung:",
    "reviewer-point1":
      "<strong>Teilen Sie Ihre Geschichte:</strong> Leiten Sie uns diese Entfernungs-E-Mail weiter — es dauert 2 Minuten",
    "reviewer-point2":
      "<strong>Bleiben Sie völlig anonym:</strong> Ihr Datenschutz ist bei uns bombensicher",
    "reviewer-point3":
      "<strong>Werden Sie Teil einer größeren Bewegung:</strong> Helfen Sie dabei, unfaire Entfernungsmuster aufzudecken",
    "reviewer-point4":
      "<strong>Stärken Sie andere:</strong> Ihre Meldung stärkt den Schutz für alle Bewertenden",
    "reviewer-btn1": "Entfernung melden",
    "reviewer-btn2": "Über Datenschutz erfahren",
    "reviewer-stat1": "Menschen wie Sie haben ihre Geschichten geteilt",
    "reviewer-stat2": "Spüren, dass ihre Stimme jetzt zählt",

    // Trust & Transparency
    "trust-title": "Auf Vertrauen & Transparenz aufgebaut",
    "trust-subtitle": "Wir halten uns an die höchsten Standards für Datenschutz, Sicherheit und Transparenz",
    "trust-privacy-title": "Datenschutz zuerst",
    "trust-privacy-text": "Alle persönlichen Informationen werden vor der Veröffentlichung entfernt. Wir verwenden kryptografische Techniken zum Schutz der Identität von Meldern bei gleichzeitiger Wahrung der Datenintegrität.",
    "trust-privacy-link": "Datenschutzrichtlinie →",
    "trust-verified-title": "Verifizierte Daten",
    "trust-verified-text": "Jeder Vorfall wird mittels DKIM/DMARC-Authentifizierung und menschlicher Moderation verifiziert. Wir veröffentlichen Vertrauenswerte, damit Sie wissen, wie zuverlässig jeder Datenpunkt ist.",
    "trust-verified-link": "Unsere Methodik →",
    "trust-legal-title": "Rechtliche Compliance",
    "trust-legal-text": "Wir erfüllen DSGVO, DSA und andere relevante Vorschriften. Unser neutraler Ansatz konzentriert sich auf Fakten, nicht auf Urteile.",
    "trust-legal-link": "Rechtlicher Rahmen →",
    "trust-opensource-title": "Open Source",
    "trust-opensource-text": "Unser Code ist Open Source unter Apache 2.0. Unsere Daten sind unter Open Database License verfügbar. Transparenz in allem, was wir tun.",
    "trust-opensource-link": "Quellcode ansehen →",
    "badge-gdpr": "DSGVO-konform",
    "badge-dsa": "DSA-bereit",
    "badge-opensource": "Open Source",
    "badge-privacy": "Privacy by Design",

    // Press
    "press-title": "In den Nachrichten",
    "press-subtitle": "Medien berichten über Transparenz bei Bewertungspraktiken",
    "press-spiegel": '"Bahnbrechende Transparenz-Plattform"',
    "press-wdr": '"Unverzichtbares Tool für Recherchen"',
    "press-sueddeutsche": '"Datengetriebene Verantwortlichkeit"',
    "press-netzpolitik": '"Datenschutz-erste Transparenz"',

    // Impact
    "impact-title": "Echte Wirkung, echte Geschichten",
    "impact-quote-1": '"Ich habe meine Entfernungs-E-Mail eingereicht, nachdem meine berechtigte Bewertung über eine Lebensmittelvergiftung entfernt wurde. Zu sehen, wie sie Teil eines Musters wurde, das fragwürdige Praktiken aufdeckte — das fühlte sich wie Gerechtigkeit an."',
    "impact-author-1": "Anonymer Bewertender",
    "impact-location-1": "Hamburg, Deutschland",
    "impact-quote-2": '"Als wir sahen, dass unser Unternehmen mehrere Entfernungsvorfälle hatte, wurde uns klar, dass wir uns ändern mussten. Jetzt gehen wir direkt auf Bedenken ein, anstatt zu versuchen, sie zum Schweigen zu bringen."',
    "impact-author-2": "Hotelmanager",
    "impact-location-2": "Wien, Österreich",
    "impact-quote-3": '"Takedown Atlas lieferte das fehlende Puzzlestück für unsere Recherche zu Bewertungsmanipulation. Der verifizierte Datensatz enthüllte systematischen Missbrauch über mehrere Branchen hinweg."',
    "impact-author-3": "Rechercheteam",
    "impact-location-3": "WDR Investigativ",

    // CTA
    "cta-title": "Bereit, etwas zu bewegen?",
    "cta-subtitle": "Schließen Sie sich Tausenden an, die Transparenz in Bewertungspraktiken bringen",
    "cta-report-title": "Entfernung melden",
    "cta-report-text": "Ihr Vorfall zählt. Melden Sie ihn anonym und sicher.",
    "cta-explore-title": "Karte erkunden",
    "cta-explore-text": "Sehen Sie Muster und Trends bei Bewertungsentfernungen weltweit.",
    "cta-contribute-title": "Beitragen",
    "cta-contribute-text": "Helfen Sie beim Aufbau der Plattform und verbessern Sie die Transparenz.",

    // Footer
    "footer-users-title": "Für Nutzer",
    "footer-report": "Entfernung melden",
    "footer-privacy": "Datenschutz",
    "footer-how": "So funktioniert's",
    "footer-faq": "Häufige Fragen",
    "footer-business-title": "Für Unternehmen",
    "footer-claim": "Unternehmen beanspruchen",
    "footer-guide": "Unternehmensratgeber",
    "footer-support": "Unternehmenssupport",
    "footer-practices": "Best Practices",
    "footer-researchers-title": "Für Forscher",
    "footer-explore": "Daten erkunden",
    "footer-api": "API-Dokumentation",
    "footer-datasets": "Datensätze herunterladen",
    "footer-papers": "Forschungsarbeiten",
    "footer-about-title": "Über uns",
    "footer-methodology": "Methodik",
    "footer-transparency": "Transparenzbericht",
    "footer-opensource": "Open Source",
    "footer-contact": "Kontakt",
    "footer-copyright": "© 2025 Takedown Atlas Community. Open Source unter Apache 2.0.",
    "footer-disclaimer": "Neutrale, evidenzbasierte Transparenzplattform. Nicht mit Google oder anderen Geschäftsplattformen verbunden.",
  },
  en: {
    // Meta tags
    "page-title": "Takedown Atlas — Your Review Was Removed? You're Not Alone.",
    "page-description":
      "Had your honest review removed unfairly? You're not alone. Report anonymously, uncover patterns, and help create transparency in review takedown practices. Join 2,800+ people making a difference.",
    "og-title": "Takedown Atlas — Your Review Was Removed? You're Not Alone.",
    "og-description":
      "Had your honest review removed unfairly? Join 2,800+ people reporting anonymously and creating transparency in review practices.",
    "twitter-title":
      "Takedown Atlas — Your Review Was Removed? You're Not Alone.",
    "twitter-description":
      "Had your honest review removed unfairly? Join 2,800+ people reporting anonymously and creating transparency in review practices.",

    // Navigation
    "nav-how": "How It Works",
    "nav-for-you": "For You",
    "nav-transparency": "Transparency",
    "nav-contribute": "Contribute",

    // Demo banner
    "demo-title": "This is a DEMO PAGE",
    "demo-description":
      "All statistics and data shown are placeholder examples to visualize the project vision. This platform is currently in development.",
    "demo-link": "View Real Project →",

    // Hero section
    "hero-title": "Your Review Was Removed?<br>You're Not Alone.",
    "hero-subtitle":
      "Thousands of reviews are removed from Google every day. Some removals are justified, others are not. Help us map these patterns and bring transparency to takedown practices.",
    "stat-reviews": "Reviews Documented",
    "stat-verified": "Verified Authentic",
    "stat-countries": "Countries Covered",
    "stat-businesses": "Businesses Analyzed",
    "btn-report": "Report a Removal",
    "btn-explore": "Explore the Map",
    "hero-privacy":
      "Your privacy is protected. All reports are anonymized before publication.",
    "hero-disclaimer":
      "<strong>Note:</strong> This is a vision demo. All statistics shown are examples to illustrate the platform's potential. The actual platform is currently in development.",

    // Map section
    "map-title": "Live Incidents Map",
    "map-subtitle":
      "Explore reported review removals in real-time. Click on markers for details.",
    "filter-all": "All",
    "filter-restaurants": "Restaurants",
    "filter-hotels": "Hotels",
    "filter-retail": "Retail",
    "map-search-placeholder": "Search location...",
    "map-loading": "Loading map...",
    "map-legend-title": "Legend",
    "legend-restaurant": "Restaurant",
    "legend-hotel": "Hotel",
    "legend-retail": "Retail",
    "legend-verified": "Verified",
    "map-stat-incidents": "Incidents visible",
    "map-stat-cities": "Cities",
    "map-stat-verified": "Verified",

    // How It Works
    "how-title": "How Takedown Atlas Works",
    "how-subtitle":
      "A simple, privacy-first process to document and verify review removal incidents",
    "step1-title": "You Report",
    "step1-desc":
      "Forward the removal email you received from Google, or upload documents manually. Your identity stays private.",
    "step2-title": "We Verify",
    "step2-desc":
      "Our verification system checks email authenticity using DKIM/DMARC and trained moderators review each submission.",
    "step3-title": "Data Goes Public",
    "step3-desc":
      "Verified incidents appear on our public map and dataset, with all personal information removed to protect privacy.",
    "step4-title": "Patterns Emerge",
    "step4-desc":
      "Researchers, journalists, and the public can analyze trends and hold businesses accountable for their takedown practices.",

    // Personas
    "personas-title": "What Takedown Atlas Means for You",
    "tab-reviewer": "Your Review Was Removed",
    "tab-business": "You Own a Business",
    "tab-researcher": "You Research or Report",
    "tab-supporter": "You Want to Help",
    "reviewer-title": "Your Experience Matters",
    "reviewer-intro":
      "That moment when you get the email saying your honest review was removed — we know how that feels. Frustrating. Unfair. Like your voice doesn't count. But here's the thing: <strong>your experience matters</strong>, and you're definitely not alone.",
    "reviewer-subtitle": "Turn Your Frustration Into Change:",
    "reviewer-point1":
      "<strong>Share your story:</strong> Forward us that removal email — it takes 2 minutes",
    "reviewer-point2":
      "<strong>Stay completely anonymous:</strong> Your privacy is bulletproof with us",
    "reviewer-point3":
      "<strong>Join a bigger movement:</strong> Help expose unfair removal patterns",
    "reviewer-point4":
      "<strong>Empower others:</strong> Your report strengthens protection for all reviewers",
    "reviewer-btn1": "Report Your Removal",
    "reviewer-btn2": "Learn About Privacy",
    "reviewer-stat1": "People like you have shared their stories",
    "reviewer-stat2": "Feel their voice matters now",

    // Trust & Transparency
    "trust-title": "Built on Trust & Transparency",
    "trust-subtitle": "We hold ourselves to the highest standards of privacy, security, and transparency",
    "trust-privacy-title": "Privacy First",
    "trust-privacy-text": "All personal information is removed before publication. We use cryptographic techniques to protect reporter identities while maintaining data integrity.",
    "trust-privacy-link": "Privacy Policy →",
    "trust-verified-title": "Verified Data",
    "trust-verified-text": "Every incident is verified using DKIM/DMARC authentication and human moderation. We publish confidence scores so you know how reliable each data point is.",
    "trust-verified-link": "Our Methodology →",
    "trust-legal-title": "Legal Compliance",
    "trust-legal-text": "We comply with GDPR, DSA, and other relevant regulations. Our neutral approach focuses on facts, not judgments.",
    "trust-legal-link": "Legal Framework →",
    "trust-opensource-title": "Open Source",
    "trust-opensource-text": "Our code is open source under Apache 2.0. Our data is available under Open Database License. Transparency in everything we do.",
    "trust-opensource-link": "View Source Code →",
    "badge-gdpr": "GDPR Compliant",
    "badge-dsa": "DSA Ready",
    "badge-opensource": "Open Source",
    "badge-privacy": "Privacy by Design",

    // Press
    "press-title": "In the News",
    "press-subtitle": "Media outlets covering transparency in review practices",
    "press-spiegel": '"Breakthrough transparency platform"',
    "press-wdr": '"Essential tool for investigations"',
    "press-sueddeutsche": '"Data-driven accountability"',
    "press-netzpolitik": '"Privacy-first transparency"',

    // Impact
    "impact-title": "Real Impact, Real Stories",
    "impact-quote-1": '"I submitted my removal email after my legitimate review about food poisoning was taken down. Seeing it become part of a pattern that helped expose questionable practices — that felt like justice."',
    "impact-author-1": "Anonymous Reviewer",
    "impact-location-1": "Hamburg, Germany",
    "impact-quote-2": '"When we saw our business had multiple removal incidents flagged, we realized we needed to change. Now we address concerns directly instead of trying to silence them."',
    "impact-author-2": "Hotel Manager",
    "impact-location-2": "Vienna, Austria",
    "impact-quote-3": '"Takedown Atlas provided the missing piece for our investigation into review manipulation. The verified dataset revealed systematic abuses across multiple industries."',
    "impact-author-3": "Investigative Team",
    "impact-location-3": "WDR Investigativ",

    // CTA
    "cta-title": "Ready to Make a Difference?",
    "cta-subtitle": "Join thousands of people bringing transparency to review practices",
    "cta-report-title": "Report a Removal",
    "cta-report-text": "Your incident matters. Report it anonymously and safely.",
    "cta-explore-title": "Explore the Map",
    "cta-explore-text": "See patterns and trends in review removals globally.",
    "cta-contribute-title": "Contribute",
    "cta-contribute-text": "Help build the platform and improve transparency.",

    // Footer
    "footer-users-title": "For Users",
    "footer-report": "Report a Removal",
    "footer-privacy": "Privacy Protection",
    "footer-how": "How It Works",
    "footer-faq": "FAQ",
    "footer-business-title": "For Businesses",
    "footer-claim": "Claim Your Business",
    "footer-guide": "Business Guide",
    "footer-support": "Business Support",
    "footer-practices": "Best Practices",
    "footer-researchers-title": "For Researchers",
    "footer-explore": "Explore Data",
    "footer-api": "API Documentation",
    "footer-datasets": "Download Datasets",
    "footer-papers": "Research Papers",
    "footer-about-title": "About",
    "footer-methodology": "Methodology",
    "footer-transparency": "Transparency Report",
    "footer-opensource": "Open Source",
    "footer-contact": "Contact",
    "footer-copyright": "© 2025 Takedown Atlas Community. Open source under Apache 2.0.",
    "footer-disclaimer": "Neutral, evidence-based transparency platform. Not affiliated with Google or any business platform.",
  },
};

let currentLang = "de"; // Default to German

function updateLanguage(lang) {
  currentLang = lang;
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "META") {
        element.setAttribute("content", translations[lang][key]);
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });

  // Update document title
  document.title = translations[lang]["page-title"] || document.title;

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update active language button
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  // Save language preference
  localStorage.setItem("preferred-lang", lang);
}

function initializeLanguage() {
  // Check for saved language preference or use German as default
  const savedLang = localStorage.getItem("preferred-lang") || "de";
  updateLanguage(savedLang);

  // Add event listeners to language buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      updateLanguage(lang);
    });
  });
}

// Demo data for the interactive map
const demoIncidents = [
  {
    id: 1,
    lat: 52.520008,
    lng: 13.404954,
    city: "Berlin",
    business: "Restaurant Schnitzelhaus",
    category: "restaurant",
    date: "2025-01-15",
    reason: "Alleged defamation",
    verified: true,
    count: 3,
  },
  {
    id: 2,
    lat: 48.137154,
    lng: 11.576124,
    city: "München",
    business: "Hotel Bayerischer Hof",
    category: "hotel",
    date: "2025-01-18",
    reason: "Privacy violation",
    verified: true,
    count: 2,
  },
  {
    id: 3,
    lat: 53.551086,
    lng: 9.993682,
    city: "Hamburg",
    business: "Fischmarkt Restaurant",
    category: "restaurant",
    date: "2025-01-22",
    reason: "False information",
    verified: false,
    count: 1,
  },
  {
    id: 4,
    lat: 50.935173,
    lng: 6.953101,
    city: "Köln",
    business: "MediaMarkt",
    category: "retail",
    date: "2025-02-01",
    reason: "Trademark infringement",
    verified: true,
    count: 4,
  },
  {
    id: 5,
    lat: 51.050407,
    lng: 13.737262,
    city: "Dresden",
    business: "Hotel Suitess",
    category: "hotel",
    date: "2025-02-05",
    reason: "Defamatory content",
    verified: true,
    count: 2,
  },
  {
    id: 6,
    lat: 49.45203,
    lng: 11.076751,
    city: "Nürnberg",
    business: "Bratwurst Röslein",
    category: "restaurant",
    date: "2025-02-08",
    reason: "False claims",
    verified: true,
    count: 1,
  },
  {
    id: 7,
    lat: 48.775846,
    lng: 9.182932,
    city: "Stuttgart",
    business: "Porsche Museum Shop",
    category: "retail",
    date: "2025-02-12",
    reason: "Privacy concerns",
    verified: true,
    count: 3,
  },
  {
    id: 8,
    lat: 51.227741,
    lng: 6.773456,
    city: "Düsseldorf",
    business: "Breidenbacher Hof",
    category: "hotel",
    date: "2025-02-15",
    reason: "Alleged defamation",
    verified: true,
    count: 2,
  },
];

let map = null;
let markersGroup = null;
let currentFilter = "all";

function initializeMap() {
  // Initialize the map centered on Germany
  map = L.map("demo-map").setView([51.1657, 10.4515], 6);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Initialize marker cluster group
  markersGroup = L.markerClusterGroup({
    maxClusterRadius: 50,
    iconCreateFunction: function (cluster) {
      const count = cluster.getChildCount();
      let className = "marker-cluster-small";
      if (count > 10) className = "marker-cluster-large";
      else if (count > 5) className = "marker-cluster-medium";

      return new L.DivIcon({
        html: `<div><span>${count}</span></div>`,
        className: `marker-cluster ${className}`,
        iconSize: new L.Point(40, 40),
      });
    },
  });

  // Add markers to the map
  updateMapMarkers();
  map.addLayer(markersGroup);

  // Add filter event listeners
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.getAttribute("data-filter");
      updateMapMarkers();
    });
  });

  // Hide loading indicator
  document.querySelector(".map-loading").style.display = "none";
}

function updateMapMarkers() {
  if (!markersGroup) return;

  markersGroup.clearLayers();

  const filteredIncidents = demoIncidents.filter(
    (incident) =>
      currentFilter === "all" || incident.category === currentFilter,
  );

  filteredIncidents.forEach((incident) => {
    const markerColor = getMarkerColor(incident.category);
    const marker = L.circleMarker([incident.lat, incident.lng], {
      radius: Math.max(8, Math.min(20, incident.count * 3)),
      fillColor: markerColor,
      color: incident.verified ? "#1da7a1" : "#fbbf24",
      weight: incident.verified ? 3 : 2,
      opacity: 1,
      fillOpacity: 0.8,
    });

    const popupContent = `
      <div class="incident-popup">
        <h4>${incident.business}</h4>
        <div class="incident-meta">
          📍 ${incident.city} • 📅 ${formatDate(incident.date)} • ${
            incident.verified ? "✅ Verifiziert" : "⏳ Prüfung"
          }
        </div>
        <div class="incident-reason">
          <strong>Grund:</strong> ${incident.reason}
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #6b7280;">
          ${incident.count} ${incident.count === 1 ? "Vorfall" : "Vorfälle"}
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: "custom-popup",
    });

    markersGroup.addLayer(marker);
  });
}

function getMarkerColor(category) {
  const colors = {
    restaurant: "#ff6b35",
    hotel: "#4a90e2",
    retail: "#2ecc71",
  };
  return colors[category] || "#6b7280";
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("de-DE");
}

// Demo banner dismiss function
function dismissDemoBanner() {
  const banner = document.querySelector(".demo-banner");
  if (banner) {
    banner.classList.add("hidden");
    // Save preference to sessionStorage
    sessionStorage.setItem("demoBannerDismissed", "true");
  }
}

// Check if banner was previously dismissed
document.addEventListener("DOMContentLoaded", function () {
  // Initialize internationalization
  initializeLanguage();

  // Initialize map if Leaflet is available and map container exists
  if (typeof L !== "undefined" && document.getElementById("demo-map")) {
    // Small delay to ensure DOM is fully rendered
    setTimeout(initializeMap, 100);
  }

  const wasDismissed = sessionStorage.getItem("demoBannerDismissed");
  if (wasDismissed === "true") {
    const banner = document.querySelector(".demo-banner");
    if (banner) {
      banner.classList.add("hidden");
    }
  }
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Persona tabs functionality
  const personaTabs = document.querySelectorAll(".persona-tab");
  const personaContents = document.querySelectorAll(".persona-content");

  personaTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const persona = this.getAttribute("data-persona");

      // Remove active class from all tabs and contents
      personaTabs.forEach((t) => t.classList.remove("active"));
      personaContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      const targetContent = document.querySelector(
        `.persona-content[data-persona="${persona}"]`,
      );
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // Stats counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        animateCounter(entry.target);
        entry.target.classList.add("counted");
      }
    });
  }, observerOptions);

  // Observe stat numbers for animation
  const statNumbers = document.querySelectorAll(".stat-number, .mini-number");
  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  function animateCounter(element) {
    const targetText = element.textContent;
    const isPercentage = targetText.includes("%");
    const targetNumber = parseInt(targetText.replace(/[,%]/g, ""));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        current = targetNumber;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (targetText.includes(",") && displayValue >= 1000) {
        displayValue = displayValue.toLocaleString();
      }
      if (isPercentage) {
        displayValue += "%";
      }

      element.textContent = displayValue;
    }, duration / steps);
  }

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear the timeout
    clearTimeout(scrollTimeout);

    // Set a timeout to run after scrolling stops
    scrollTimeout = setTimeout(() => {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up or at top
        header.style.transform = "translateY(0)";
      }
      lastScrollTop = scrollTop;
    }, 100); // Delay in milliseconds
  });

  // Add transition to header
  header.style.transition = "transform 0.3s ease-in-out";

  // Animated elements on scroll
  const animatedObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Observe animated elements
  const animatedElements = document.querySelectorAll(
    ".step, .trust-card, .impact-card, .cta-card",
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    animatedObserver.observe(el);
  });

  // Interactive button hover effects with enhanced feedback
  const buttons = document.querySelectorAll(".btn, .cta-card, .persona-tab");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(0)";
      }
    });
  });

  // Enhanced CTA tracking with visual feedback
  const ctaButtons = document.querySelectorAll(
    'a[href="#report-removal"], a[href="#explore-map"], a[href="#claim-business"]',
  );
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Log interaction (in production, this would send to analytics)
      console.log(
        "CTA clicked:",
        this.textContent.trim(),
        "Target:",
        this.getAttribute("href"),
      );

      // Show placeholder message for non-implemented features
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        showPlaceholderMessage(this.textContent.trim());
      }
    });
  });

  function showPlaceholderMessage(actionName) {
    // Create a simple toast notification
    const toast = document.createElement("div");
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--brand-primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      z-index: 10000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;
    toast.textContent = `${actionName} - Coming soon! This is a demo site.`;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(400px)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Accessibility enhancements
  document.addEventListener("keydown", function (e) {
    // Allow Enter key to activate persona tabs
    if (e.key === "Enter" && e.target.classList.contains("persona-tab")) {
      e.target.click();
    }
  });

  // Make persona tabs keyboard accessible
  personaTabs.forEach((tab, index) => {
    tab.setAttribute("tabindex", "0");
    tab.setAttribute("role", "tab");
    tab.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const direction = e.key === "ArrowLeft" ? -1 : 1;
        const newIndex =
          (index + direction + personaTabs.length) % personaTabs.length;
        personaTabs[newIndex].focus();
        personaTabs[newIndex].click();
      }
    });
  });

  // Dynamic loading states for external links
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const originalText = this.textContent;
      this.style.opacity = "0.7";
      this.textContent = "Opening...";

      setTimeout(() => {
        this.style.opacity = "1";
        this.textContent = originalText;
      }, 1000);
    });
  });

  // Privacy notice interaction
  const privacyElements = document.querySelectorAll(
    ".hero-privacy, .trust-card",
  );
  privacyElements.forEach((element) => {
    element.addEventListener("click", function () {
      // Highlight privacy commitment
      this.style.background = "rgba(29, 167, 161, 0.1)";
      this.style.borderRadius = "0.5rem";
      this.style.padding = "1rem";
      this.style.transition = "all 0.3s ease";

      setTimeout(() => {
        this.style.background = "";
        this.style.padding = "";
      }, 2000);
    });
  });

  // Scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--brand-accent), var(--brand-teal));
    z-index: 10000;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = Math.min(scrolled, 100) + "%";
  });

  // Initialize any counters that are already visible
  statNumbers.forEach((stat) => {
    const rect = stat.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!stat.classList.contains("counted")) {
        animateCounter(stat);
        stat.classList.add("counted");
      }
    }
  });

  // Log successful initialization
  console.log("🎯 Takedown Atlas: Interactive elements initialized");
  console.log("📊 Persona tabs:", personaTabs.length);
  console.log("📈 Animated stats:", statNumbers.length);
  console.log("🔗 External links:", externalLinks.length);
});
