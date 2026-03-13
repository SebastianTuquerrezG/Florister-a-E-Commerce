/**
 * src/utils/searchUtils.ts
 * Búsqueda flexible con:
 *  - normalización de acentos y mayúsculas
 *  - coincidencia por tokens (cada palabra del query debe aparecer)
 *  - tolerancia a un error tipográfico en palabras largas (Levenshtein ≤ 1)
 *  - score para ordenar los mejores resultados primero
 */

/** Quita acentos y pasa a minúsculas */
export const normalize = (str: string): string =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/** Distancia de edición entre dos strings */
const levenshtein = (a: string, b: string): number => {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row: number[] = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = row[j];
      row[j] = a[i - 1] === b[j - 1]
        ? prev
        : 1 + Math.min(prev, row[j], row[j - 1]);
      prev = temp;
    }
  }
  return row[n];
};

/**
 * Verifica si un token encaja en un texto.
 * Acepta coincidencia exacta (substring) o typo de 1 letra en palabras ≥ 4 chars.
 */
const tokenFits = (token: string, text: string): boolean => {
  if (text.includes(token)) return true;
  if (token.length >= 4) {
    return text.split(/\s+/).some(word => levenshtein(token, word) <= 1);
  }
  return false;
};

/**
 * Devuelve true si TODOS los tokens del query encajan en alguno de los campos.
 */
export const matches = (query: string, fields: string[]): boolean => {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const combined = fields.map(normalize).join(' ');
  return tokens.every(token => tokenFits(token, combined));
};

/**
 * Calcula un score de relevancia (mayor = más relevante).
 * Se usa para ordenar resultados.
 */
export const score = (query: string, fields: string[]): number => {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  let total = 0;
  for (const field of fields) {
    const f = normalize(field);
    for (const token of tokens) {
      if (f === token)           total += 10; // coincidencia exacta del campo completo
      else if (f.startsWith(token)) total += 5;  // empieza con el token
      else if (f.includes(token))   total += 3;  // contiene el token
      else if (token.length >= 4 && f.split(/\s+/).some(w => levenshtein(token, w) <= 1))
                                 total += 1;  // typo tolerado
    }
  }
  return total;
};