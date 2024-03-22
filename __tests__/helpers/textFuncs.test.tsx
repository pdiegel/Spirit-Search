import "@testing-library/jest-dom";
import {
  toSentenceCase,
  breakTextIntoTwoSentenceChunks,
} from "@/helpers/textFuncs";

describe("toSentenceCase", () => {
  it("should convert the first character of a string to uppercase and the rest to lowercase", () => {
    expect(toSentenceCase("test")).toBe("Test");
    expect(toSentenceCase("TEST")).toBe("Test");
    expect(toSentenceCase("tEST")).toBe("Test");
    expect(toSentenceCase("TeSt TeST")).toBe("Test test");
  });

  it("should handle an empty string", () => {
    expect(toSentenceCase("")).toBe("");
  });

  it("should handle strings with only one character", () => {
    expect(toSentenceCase("a")).toBe("A");
    expect(toSentenceCase("A")).toBe("A");
  });
});

describe("breakTextIntoTwoSentenceChunks", () => {
  it("should handle a string with only one sentence", () => {
    const testString = "This is a test.";
    const expectedResult = ["This is a test."];
    expect(breakTextIntoTwoSentenceChunks(testString)).toEqual(expectedResult);
  });

  it("should not break text that is less than 3 sentences in length", () => {
    const testString = "This is a test. This is another test.";
    const expectedResult = ["This is a test. This is another test."];
    expect(breakTextIntoTwoSentenceChunks(testString)).toEqual(expectedResult);
  });

  it("should handle an empty string", () => {
    const testString = "";
    const expectedResult = [""];
    expect(breakTextIntoTwoSentenceChunks(testString)).toEqual(expectedResult);
  });

  it("should handle a string with more than 3 sentences", () => {
    const testString =
      "This is a test. This is another test. This is yet another test. This is the final test.";
    const expectedResult = [
      "This is a test. This is another test.",
      "This is yet another test. This is the final test.",
    ];
    expect(breakTextIntoTwoSentenceChunks(testString)).toEqual(expectedResult);
  });
});
