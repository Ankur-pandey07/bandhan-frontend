export function extractThemes(messages: string[]) {
  const themes = new Set<string>();

  messages.forEach((m) => {
    const t = m.toLowerCase();
    if (t.includes("trust")) themes.add("trust");
    if (t.includes("distance")) themes.add("distance");
    if (t.includes("fight")) themes.add("conflict");
    if (t.includes("communication")) themes.add("communication");
  });

  return Array.from(themes);
}
