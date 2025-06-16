// src/utils/sanitize.ts
import DOMPurify from 'dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Tidak mengizinkan tag HTML apapun
    ALLOWED_ATTR: [], // Tidak mengizinkan atribut apapun
  });
}
