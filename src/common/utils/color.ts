export const color = (code: number, text: string): string =>
  `\x1b[${code}m${text}\x1b[0m`;
