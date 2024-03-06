import "@testing-library/jest-dom";
import { toSentenceCase } from "@/helpers/textFuncs";

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
