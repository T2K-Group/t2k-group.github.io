# T2K election technology — style guide

A reusable theme for T2K, ATLAS and Digital Poll Clerk websites. Based on the green election homepage in `assets/elections.css`. Use this as the reference for new sites; the older blue engineering pages are a separate, legacy theme.

## Design direction

Calm, clear and practical. Combine warm off-white backgrounds, deep green typography, restrained green actions and generous space. Large editorial headings provide character; product details, real deployment evidence and short process explanations provide substance.

## Colour palette

### Primary colours

| Name | Hex | Use |
| --- | --- | --- |
| Brand green | `#146B52` | Primary buttons, links, section labels, small icons and selective heading emphasis |
| Deep green | `#0B4C3B` | Primary button hover, prominent statistics |
| Heading ink | `#102F2D` | Headings and strong text |
| Panel green | `#143D35` | Feature panels and occasional dark sections |

### Text and surfaces

| Name | Hex | Use |
| --- | --- | --- |
| Body ink | `#243B3A` | Default body and interface text |
| Muted text | `#576C68` | Supporting paragraphs and captions on light backgrounds |
| White | `#FFFFFF` | Main page background and text on dark buttons |
| Hero sage | `#F0F3ED` | Hero background |
| Case-study sage | `#E9EFE7` | Customer evidence sections |
| Warm off-white | `#F6F7F3` | Deployment and process sections |
| Soft green | `#E8F2ED` | Subtle highlights and selected states |
| Divider | `#CEDAD1` | Quiet section and component separators |
| Dark-panel body | `#C2D5C9` | Supporting text on panel green |
| Dark-panel muted | `#B1C9BD` | Secondary labels on panel green |

### Accent colours

| Name | Hex | Use |
| --- | --- | --- |
| Signal lime | `#BCE1A6` | Small availability dots and highlights on dark panels |
| Availability text | `#D2EFBC` | “Available now” badges on dark panels |
| Warm sand | `#E8DCC1` | “Coming soon” badges on dark panels |

Keep accents small. Lime and sand belong on dark surfaces and should not be used as paragraph text on white. Always accompany status colours with words.

Let light surfaces dominate, with green providing hierarchy and dark panels providing occasional emphasis. Avoid adding unrelated bright colours or gradients. Error and warning colours are functional additions, not existing brand colours; define and verify them when a product needs them.

## Typography

Use the system sans-serif stack for fast loading and a familiar interface:

```css
font-family: ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use `Georgia, serif` in italic for one short hero emphasis or numbered process markers. Keep navigation, paragraphs and controls in the sans-serif font.

| Element | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| Marketing hero H1 | `clamp(56px, 6.5vw, 86px)` | 550 | 1.02 | `-0.065em` |
| Article H1 | `clamp(40px, 6vw, 64px)` | 550 | 1.1 | `-0.05em` |
| Section H2 | `clamp(32px, 4vw, 48px)` | 700 | 1.13 | `-0.045em` |
| Feature H3 | 20px | 700 | 1.3 | `-0.02em` |
| Intro paragraph | 19px | 400 | 1.65 | normal |
| Body | 16px | 400 | 1.65 | normal |
| Feature paragraph | 15px | 400 | 1.65 | normal |
| Button | 14px | 650 | 1.4–1.65 | normal |
| Navigation | 13px | 750 | 1.5 | normal |
| Section label | 11px | 900 | 1.5 | `0.12em` |

Section labels are uppercase. Normal headings and buttons use sentence case. Use short headings and natural wrapping; restrict forced line breaks to spacious marketing layouts. Mobile headings may shrink further for longer titles. Small decorative labels on the current homepage reach 9–10px; prefer at least 12px for meaningful labels on new sites.

## Layout and spacing

- Maximum content width: **1160px**, centred.
- Desktop page gutters: **32px** each side; mobile: **20px**.
- Reading column: **560–660px**; article container: up to **780px**.
- Header height: **86px**.
- Desktop sections: typically **80–92px** vertical padding. Hero: **88px top / 96px bottom**.
- Mobile sections: typically **56px** vertical padding; hero: **50px**.
- Desktop split layouts: roughly equal columns; hero uses **1.15 : 1**.
- Large column gaps: **72–100px**, reducing to **32–40px** on narrower screens.
- Feature rows: three columns; deployment: four columns.
- Use **4, 8, 12, 16, 24, 32, 48, 56, 80, 96px** as a practical spacing scale. Existing layouts have some optical adjustments.

At 940px, switch navigation to the menu button. At 900px, reduce large gaps and move deployment to two columns. At 700px, stack major sections and feature rows. At 420px, use a single deployment column. Adapt breakpoints if content needs space sooner.

## Components

### Buttons and links

Primary button: brand-green fill, white text, 5px radius, 13px vertical / 22px horizontal padding, minimum 44px height. Hover uses deep green. Secondary button: white fill, body-ink text and a subtle divider border; hover strengthens the border to brand green.

Use one main action per section. Use text links for supporting navigation. An arrow can reinforce direction, but the words must explain the destination. Underline links within prose so they are identifiable without colour alone.

### Panels and feature rows

Prefer open layouts and thin top dividers for features. Use the dark green panel for a compact product story or operational summary. Panel radius: 8px; padding: 30px desktop / 24px mobile. Use a very soft shadow only on elevated panels: `0 24px 50px #173D3514`.

Avoid enclosing every paragraph in a card. Keep borders quiet and radii modest; the theme relies on spacing and type for hierarchy.

### Badges

Use 3px radius, 3px vertical / 10px horizontal padding and a thin translucent border. On dark green, use availability text for “Available now” and sand for “Coming soon”. Use a readable label size, preferably 12px or more on new sites. Badge copy must reflect actual product availability.

### Case studies

Use a sage background, a clear customer name, a short account of the challenge and outcome, and two or three supported statistics. Display numbers prominently, with descriptive labels. Include a full case-study link. Do not imply that one customer's reporting interval is a platform-wide guarantee.

### Deployment steps

Use an ordered list with visible `01–04` markers in italic Georgia, thin top dividers, short action headings and concise descriptions. Preserve the reading order as columns collapse.

### Forms

Use visible labels, generous input padding, a minimum 44px control height and clear required states. Keep inputs white with body-ink text and a visible border. Give errors a written explanation beside the relevant field; announce submission results through an accessible status region.

The current contact page retains some legacy styling. For new sites, apply this guide’s green tokens consistently to forms as well as marketing content.

## Accessibility and interaction

Use WCAG AA as the implementation target: verify 4.5:1 contrast for normal text and 3:1 for large text and meaningful interface boundaries. These are design requirements, not a claim that every existing combination has been audited.

Keep keyboard focus clearly visible. A solid brand-green outline works on light surfaces; a solid lime outline works on dark green. Use a 3px outline with a 3px offset, adapting the colour to the adjacent surface. Include a skip link, semantic headings, meaningful link text and menu expanded states.

Use 44px control targets where practical. Respect reduced-motion preferences. Avoid automatic movement and decorative animation. Test navigation, long headings and form feedback on small screens and at zoom.

The existing site changes its header and footer with the operating system’s dark preference; the main content remains light. A complete dark theme is not defined. New sites should use the light theme by default and introduce dark mode only with a complete, tested surface and text palette.

## Logo, icons and imagery

Use the supplied T2K SVG without distortion. The current header uses a 76 × 58px logo container with `object-fit: contain`. Maintain breathing space around the mark. Use a suitable light logo variant on dark backgrounds.

Use simple, consistent line icons. Prefer real product screenshots, deployment photographs and meaningful diagrams. Clearly label demonstration data and illustrative interfaces. Customer logos, quotes and statistics need an attributable source.

## Content and page structure

Write plain British English. Lead with the operational benefit, then explain the product and show evidence. Use specific actions such as “Explore ATLAS”, “Discuss your election” and “Register your interest”.

A typical product homepage follows this sequence:

1. Short proposition and primary action.
2. Product capabilities with concrete descriptions.
3. Customer evidence or a case study.
4. A distinct upcoming-product section, if relevant.
5. Steps to deployment.
6. Contact action and concise footer.

Keep planned capabilities clearly distinguished from available features. Do not transfer another supplier’s performance, security or accreditation claims to T2K products.

## Starter tokens for new sites

Import `assets/theme-tokens.css` into a new project and build components around its semantic variables. It is a portable starter, not a replacement for the current site's two existing stylesheets. It deliberately consolidates the palette into green tokens rather than inheriting legacy blue borders, focus rings and surfaces.

```css
@import url("./theme-tokens.css");

body {
  margin: 0;
  background: var(--surface);
  color: var(--ink);
  font: 400 1rem/1.65 var(--font-body);
}

.container {
  width: min(var(--content-width), calc(100% - 2 * var(--page-gutter)));
  margin-inline: auto;
}

.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 13px 22px;
  border: 1px solid var(--brand);
  border-radius: var(--radius-button);
  background: var(--brand);
  color: var(--text-on-brand);
  font: 650 14px/1.5 var(--font-body);
  text-decoration: none;
}

.button-primary:hover { background: var(--brand-dark); }
.button-primary:focus-visible {
  outline: 3px solid var(--focus-on-light);
  outline-offset: 3px;
}
```

## Brief to reuse

> Create a T2K election technology site using the accompanying style guide and theme tokens. Use white and sage surfaces, deep green headings, green calls to action, restrained lime and sand status accents, system sans-serif typography and occasional italic Georgia emphasis. Use a centred 1160px layout, generous space, modest corners, thin dividers and responsive editorial sections. Ground product claims in supplied evidence, label upcoming features clearly and implement accessible navigation and forms.
