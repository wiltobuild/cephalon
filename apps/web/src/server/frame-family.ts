/** Match base/Prime/Umbra variants without matching unrelated guide text. */
export function frameFamily(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+(prime|umbra)$/, " ")
    .replace(/\s+and\s+/g, " & ")
    .replace(/\s+/g, " ")
    .trim();
}
