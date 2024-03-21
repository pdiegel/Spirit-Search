export const toSentenceCase = function (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const breakTextIntoTwoSentenceChunks = function (
  text: string
): string[] {
  // The ingredient descriptions are returned as a single large block of text.
  // This function will break the text into chunks of two sentences each, so that
  // the description can be displayed in a more readable format.
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];

  // Group the sentences into chunks of two. If there are less than 3 sentences,
  // the text will not be broken up.
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(""));
  }

  return chunks.map((s) => s.trim());
};
