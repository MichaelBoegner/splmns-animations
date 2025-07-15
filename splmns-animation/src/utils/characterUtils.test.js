import getUpdatedCharacters from "./characterUtils";

const mockTypes = [{ id: "dog" }, { id: "cat" }, { id: "bird" }];

vi.stubGlobal("crypto", {
  randomUUID: () => "test-id",
});

describe("getUpdatedCharacters", () => {
  test("adds character when under maxCharacters", () => {
    const result = getUpdatedCharacters([], 5, mockTypes, "Buddy");

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: "test-id",
      name: "Buddy",
      type: expect.objectContaining({
        id: expect.stringMatching(/dog|cat|bird/),
      }),
    });
  });

  test("adds without exceeding maxCharacters", () => {
    const prev = [
      { id: "1", name: "A", type: mockTypes[0] },
      { id: "2", name: "B", type: mockTypes[1] },
    ];
    const result = getUpdatedCharacters(prev, 5, mockTypes, "Charlie");

    expect(result.length).toBe(3);
  });

  test("replaces oldest when at maxCharacters and available types exist", () => {
    const prev = [
      { id: "1", name: "A", type: mockTypes[0] },
      { id: "2", name: "B", type: mockTypes[1] },
      { id: "3", name: "C", type: mockTypes[2] },
      { id: "4", name: "D", type: mockTypes[0] },
      { id: "5", name: "E", type: mockTypes[1] },
    ];
    const result = getUpdatedCharacters(prev, 5, mockTypes, "Zed");

    expect(result.length).toBe(5);
    expect(result[0].name).not.toBe("A");
    expect(result.find((c) => c.name === "Zed")).toBeDefined();
  });

  test("replaces random character when all types are already in use", () => {
    const prev = mockTypes.map((type, i) => ({
      id: String(i),
      name: `Char${i}`,
      type,
    }));

    const result = getUpdatedCharacters(prev, 3, mockTypes, "Echo");

    expect(result.length).toBe(3);
    expect(result.find((c) => c.name === "Echo")).toBeDefined();
  });

  test("reuses type.id of replaced character if no types are available", () => {
    const prev = mockTypes.map((type, i) => ({
      id: String(i),
      name: `Char${i}`,
      type,
    }));

    const result = getUpdatedCharacters(prev, 3, mockTypes, "Foxtrot");

    const replaced = result.find((c) => c.name === "Foxtrot");
    expect(replaced.type).toBeDefined();
    expect(mockTypes.map((t) => t.id)).toContain(replaced.type.id);
  });

  test("generates predictable id using stubbed crypto", () => {
    const result = getUpdatedCharacters([], 5, mockTypes, "Test");
    expect(result[0].id).toBe("test-id");
  });
});
