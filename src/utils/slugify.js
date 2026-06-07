// ============================================
// UTILITAIRE — Génération de slugs
// ============================================

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')                    // décompose les accents
    .replace(/[\u0300-\u036f]/g, '')     // supprime les accents
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')       // supprime les caractères spéciaux
    .replace(/\s+/g, '-')               // espaces → tirets
    .replace(/-+/g, '-')                // tirets multiples → un seul
}
