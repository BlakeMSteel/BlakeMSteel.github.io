# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Blake Steel, served via GitHub Pages. Single-page HTML with Bootstrap 3.3.6, jQuery 1.11.3, and inline CSS. No build step — open `index.html` directly in a browser to develop.

## Architecture

**index.html** — The entire site. Bootstrap grid with sections: navbar, hero, skills grid, contact form. All content is inline HTML; no templating engine.

**js/agency.js** — Scroll-to-anchor behavior and navbar scroll spy via jQuery.

**js/contact_me.js** — Form validation (jqBootstrapValidation) and AJAX submission to Formspree.

**css/** — Stylesheets loaded directly by index.html. Edit these files directly.

**vendor/** — Bootstrap, jQuery, Font Awesome. Not hand-edited.

**Ananas/** and **UnityWebBuild/** — Nested game projects, independent of the portfolio.

## Deployment

Push to the `master` branch — GitHub Pages serves static files directly from the repo root.
