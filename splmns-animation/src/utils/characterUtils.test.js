import getUpdatedCharacters from "./characterUtils";
import { characterTypes } from "../data/characterTypes";

const mockTypes = structuredClone(characterTypes);

vi.stubGlobal("crypto", {
  randomUUID: () => "test-id",
});

describe("getUpdatedCharacters", () => {
  test("adds character when under maxCharacters", () => {
    const result = getUpdatedCharacters([], 6, mockTypes, "A");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("A");
    expect(mockTypes.map((t) => t.id)).toContain(result[0].type.id);
    expect(result[0].id).toBe("test-id");
  });

  test("adds without exceeding maxCharacters", () => {
    const prev = [
      { id: "1", name: "A", type: mockTypes[0] },
      { id: "2", name: "B", type: mockTypes[1] },
    ];
    const result = getUpdatedCharacters(prev, 6, mockTypes, "C");

    expect(result.length).toBe(3);
    expect(result.find((c) => c.name === "C")).toBeDefined();
  });

  test("replaces oldest when at maxCharacters and new types are still available", () => {
    const prev = [
      { id: "1", name: "A", type: mockTypes[0] },
      { id: "2", name: "B", type: mockTypes[1] },
      { id: "3", name: "C", type: mockTypes[2] },
      { id: "4", name: "D", type: mockTypes[3] },
      { id: "5", name: "E", type: mockTypes[4] },
    ];

    const result = getUpdatedCharacters(prev, 5, mockTypes, "F");

    expect(result.filter((c) => !c.isExiting).length).toBe(5);
    expect(result.find((c) => c.name === "F")).toBeDefined();
  });

  test("replaces random character when all types are already in use", () => {
    const prev = mockTypes.map((type, i) => ({
      id: `id${i}`,
      name: `Char${i}`,
      type,
    }));
    const maxCharacters = mockTypes.length;

    const result = getUpdatedCharacters(prev, maxCharacters, mockTypes, "G");

    expect(result.filter((c) => !c.isExiting).length).toBe(maxCharacters);
    expect(result.find((c) => c.name === "G")).toBeDefined();
  });

  test("reuses type.id of replaced character when no types are available", () => {
    const prev = mockTypes.map((type, i) => ({
      id: String(i),
      name: `Char${i}`,
      type,
    }));
    const maxCharacters = mockTypes.length;

    const result = getUpdatedCharacters(prev, maxCharacters, mockTypes, "F");

    const replaced = result.find((c) => c.name === "F");
    expect(replaced).toBeDefined();
    expect(typeof replaced.type?.id).toBe("string");
    expect(mockTypes.map((t) => t.id)).toContain(replaced.type.id);
  });

  test("generates predictable id using stubbed crypto", () => {
    const result = getUpdatedCharacters([], 6, mockTypes, "Test");
    expect(result[0].id).toBe("test-id");
  });
});
