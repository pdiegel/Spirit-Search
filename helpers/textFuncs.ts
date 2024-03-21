export const toSentenceCase = function (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const breakTextIntoTwoSentenceChunks = function (
  text: string
): string[] {
  // The ingredient descriptions are returned as a single large block of text.
  // This function will break the text into chunks of two sentences each, so that
  // the description can be displayed in a more readable format.
  const sentences = text.match(/[^.!?]+[.!?]+\s*(?=[A-Z])/g) || [text];

  // Group the sentences into chunks of two
  const chunks = [];
  for (let i = 0; i < sentences.length; i += 2) {
    // Concatenate two sentences at a time, or just one if it's the last sentence without a pair.
    chunks.push(sentences.slice(i, i + 2).join(" "));
  }

  return chunks.map((s) => s.trim());
};
