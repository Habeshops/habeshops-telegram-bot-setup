/**
 * Escapes special characters in a text for MarkdownV2 formatting.
 * @param text - The input text to be parsed.
 * @returns The escaped text.
 */
export const messageParser = (text: string): string => {
  const escapeChars = [
    "[",
    "]",
    "(",
    ")",
    "~",
    ">",
    "#",
    "+",
    "-",
    "=",
    "|",
    "{",
    "}",
    ".",
    "!",
  ];

  let escapedText = text;
  escapeChars.forEach((char) => {
    const regExp = new RegExp(`\\${char}`, "g");
    escapedText = escapedText.replace(regExp, `\\${char}`);
  });

  return escapedText;
};
