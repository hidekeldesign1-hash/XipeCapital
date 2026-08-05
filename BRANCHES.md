# Branches — no mezclar A y B

| Branch       | Variante | Rol en Vercel                          |
|--------------|----------|----------------------------------------|
| `main`       | A (dark) | **Production** — no reemplazar         |
| `version-b`  | B (daylight) | Preview + dominio asignado al branch |

## Reglas

1. **Nunca** mergear `version-b` → `main` (ni al revés) como forma de publicar.
2. Cambios de copy/legal compartidos: portar a mano en cada branch, o cherry-pick archivos puntuales con cuidado.
3. En Vercel: Production Branch = `main`. Dominio de B → Git Branch `version-b`.

Si alguien abre un PR entre estos branches, cerrarlo y usar dominios por branch.
