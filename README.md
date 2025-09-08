JSON Resume conversion
======================

This repository now includes a JSON Resume version of the LaTeX resume, plus a custom theme that mirrors the original `res.cls` layout (centered name/contact; left-margin section titles; two-line work entries).

Files
-----
- `resume.json`: JSON Resume data
- `theme/`: Custom JSON Resume theme (Handlebars + CSS)
- `dist/`: Build outputs (`index.html`, `resume.pdf`)
- `package.json`: Scripts and dev dependencies

Setup
-----
```bash
npm install
```

Preview locally
---------------
```bash
npm run start
# open http://localhost:4000
```

Build outputs
-------------
```bash
npm run build:html  # writes dist/index.html
npm run build:pdf   # writes dist/resume.pdf
```

Editing content
---------------
- Update `resume.json` to change text/sections.
- Sections mapped from LaTeX:
  - Skills → `skills` (Languages, Packages, Applications)
  - Experience → `work`
  - Projects → `projects`
  - Education → `education`

Styling
-------
- The theme replicates the LaTeX look with a left margin title column.
- Tweak column width via CSS variable `--section-width` in `theme/style.css`.
- Font stack uses Helvetica/Arial equivalents by default. Adjust in `theme/style.css` if desired.

Notes
-----
- The PDF is exported using `resume-cli` with the custom theme.
- If you change theme files, re-run the build commands.

