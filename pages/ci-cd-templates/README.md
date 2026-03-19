# CI/CD templates (per project)

These workflow templates are meant to be copied into each project repository.

## Files

- `cafeterie-render-deploy.yml`
- `gamemaster-render-deploy.yml`

## Usage

1. Copy one template into the target repo:
   - destination: `.github/workflows/deploy.yml`
2. In GitHub repo settings, add secret:
   - `RENDER_DEPLOY_HOOK_URL`
3. In Render, configure the service for Docker deploy.
4. Push to `main` and the workflow will:
   - run quality checks
   - build/push Docker image to GHCR
   - trigger Render deploy hook

## Notes

- `IMAGE_NAME` is set for `gaetan1303/*`; adjust if needed.
- If your project is monorepo-based, adapt build context and quality checks.
- For private repos, keep GHCR package visibility as needed.
