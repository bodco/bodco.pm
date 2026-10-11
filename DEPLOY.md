# Deploy: GitHub Pages on the apex domain bodco.pm

GitHub Pages gives one custom domain per repository. tower.bodco.pm already has its own
repository, so this site needs a second one.

## Once

1. Public repository `bodco/bodco.pm`, push `main`.
2. **Settings > Pages > Build and deployment > Source: GitHub Actions.**
   The workflow is `.github/workflows/deploy.yml`.
3. At the registrar for `bodco.pm`, add the apex records (keep the existing `tower` CNAME):

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA (optional) | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | CNAME | `www` | `bodco.github.io` |

4. The domain `bodco.pm` is verified once for the account (done for tower). If not:
   **github.com/settings/pages > Add a domain > bodco.pm**, add the TXT record, **Verify**.
5. **Settings > Pages > Custom domain: `bodco.pm` > Save.** `public/CNAME` holds the same value.
6. When the DNS check is green, tick **Enforce HTTPS**.

Check: `dig bodco.pm +short` returns the four GitHub addresses; `https://bodco.pm/cv/bohdan-n-senior-project-manager-cv.docx` downloads.

## Every change

1. Edit `src/data/cv.mjs` (facts) or `src/views/Home.astro` (page copy).
2. If facts changed: `npm run cv` and commit the new files in `public/cv/`.
3. Push to `main`. The workflow runs `check:text`, builds and publishes.
