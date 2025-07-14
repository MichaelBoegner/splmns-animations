import getUpdatedCharacters from "./characterUtils";

const mockTypes = [{ id: "dog" }, { id: "cat" }, { id: "bird" }];

vi.stubGlobal("crypto", {
  randomUUID: () => "test-id",
});

test("adds character when under maxCharacters", () => {
  const result = getUpdatedCharacters([], 5, mockTypes, "Buddy");
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe("Buddy");
  expect(result[0].type).toBeDefined();
  expect(result[0].id).toBe("test-id");
});
