# MasarCV — DESIGN.md

Stripe-inspired Arabic RTL + Light/Dark design system for MasarCV (مسار CV).
See full tokens in `src/app/globals.css`:
- Light canvas `#f6f9fc`, surface `#ffffff`, ink `#0d253d`, electric indigo CTA `#533afd` (6.19:1 WCAG AA), CV Classic Navy `#1b365d` (12.12:1 WCAG AAA).
- Dark canvas `#090e1a`, surface `#111827`, ink `#f1f5f9`, muted `#94a3b8` (6.92:1 WCAG AA), input border `#64748b` (3.73:1 WCAG 1.4.11).
- Typography: `IBM Plex Sans Arabic` (400–700) + `Inter` (Latin/CV) + `JetBrains Mono` (`tabular-nums`).
- Accessibility: WCAG 2.2 AA contrast, `<MotionConfig reducedMotion="user">`, keyboard Move Up/Down alternatives for section ordering, `<bdi>` around inline Latin terms, and isolated `@media print` A4 vector sheet.
