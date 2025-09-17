# Takedown Atlas — GitHub Pages Site

This directory contains the GitHub Pages website for the Takedown Atlas project, showcasing the platform's features, development progress, and technology stack.

## 🎯 Purpose

The GitHub Pages site serves as:

- **Project showcase** — Overview of features and capabilities
- **Development transparency** — Current progress and roadmap
- **Brand demonstration** — Implementation of design system and brand guidelines
- **Community hub** — Central point for documentation and resources

## 🏗️ Structure

```
docs/
├── index.html              # Main landing page
├── _config.yml            # GitHub Pages configuration
├── README.md              # This file
└── assets/
    ├── css/
    │   └── style.css      # Main stylesheet with brand tokens
    ├── js/
    │   └── main.js        # Interactive functionality
    └── images/
        ├── favicon.png    # Site favicon
        ├── takedown-atlas-logo-primary.svg
        └── takedown-atlas-logo-reversed.svg
```

## 🎨 Design System

The site implements the Takedown Atlas brand guidelines:

### Colors

- **Primary**: Deep Atlantic Blue (`#0B3B5F`) — trust & research
- **Accent**: Amber (`#FFB200`) — highlights & warnings
- **Teal**: `#1DA7A1` — supporting accent
- **Slate**: `#334155` — body text
- **Background**: `#F6F8FA` — light background
- **Dark**: `#0F172A` — dark background

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Logo Usage

- Primary logo on light backgrounds
- Reversed logo on dark backgrounds
- Minimum 18px height for logomark
- Clear space: 0.5× logomark height

## ✨ Features

### Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Flexible grid layouts

### Accessibility

- WCAG AA contrast compliance
- Focus indicators for keyboard navigation
- Reduced motion support
- Semantic HTML structure

### Performance

- Optimized CSS with CSS variables
- Compressed images
- Minimal JavaScript footprint
- Progressive enhancement

### Interactive Elements

- Smooth scrolling navigation
- Scroll-triggered animations
- Header hide/show on scroll
- GitHub API integration (rate-limited)

## 🚀 Deployment

The site automatically deploys via GitHub Actions when changes are pushed to the `docs/` directory:

1. **Trigger**: Push to `develop` or `main` branch with changes in `docs/`
2. **Build**: GitHub Pages processes the static files
3. **Deploy**: Site updates at `https://moinsen-dev.github.io/takedown_atlas/`

### Manual Deployment

To deploy manually:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push changes to trigger workflow

## 🛠️ Local Development

To work on the site locally:

```bash
# Serve with any static server
cd docs
python -m http.server 8080

# Or with Node.js
npx serve .

# Or with Ruby/Jekyll (if using Jekyll features)
bundle exec jekyll serve
```

## 📝 Content Guidelines

### Voice & Tone

- Neutral, evidence-based, non-accusatory
- Professional but approachable
- Focus on transparency and research utility

### Copy Standards

- Use active voice
- Keep sentences concise
- Include clear calls-to-action
- Reference brand guidelines for terminology

### Updates

When updating content:

1. Follow brand voice guidelines
2. Ensure mobile responsiveness
3. Test accessibility features
4. Validate HTML/CSS
5. Check cross-browser compatibility

## 🔗 Related Resources

- [Main Repository](https://github.com/moinsen-dev/takedown_atlas)
- [Brand Guidelines](../takedown-atlas-brand-starter-kit/usage/brand-guidelines.md)
- [Product Specification](../prd.md)
- [Architecture Documentation](../docs/architecture.md)

## 📄 License

- **Code**: Apache 2.0 License
- **Brand Assets**: CC BY 4.0 License
- **Content**: CC BY 4.0 License

---

Built with ❤️ for transparency and research.
