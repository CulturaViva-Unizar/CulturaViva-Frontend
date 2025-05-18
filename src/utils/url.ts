export function extractLastUrl(str: string) {
  // Esta regex busca fragmentos que empiecen por http:// o https://
  // y toma la parte mínima hasta el siguiente http o el final de la cadena.
  const regex = /https?:\/\/.*?(?=https?:\/\/|$)/g;
  const matches = str.match(regex);
  // Si hay al menos una coincidencia, devolvemos la última.
  return matches ? matches[matches.length - 1] : str;
}