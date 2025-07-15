import { render, screen } from "@testing-library/react";
import CharacterSpawner from "./CharacterSpawner";
import getUpdatedCharacters from "../utils/characterUtils";

const mockCharacters = [
  { id: "1", name: "Alice", type: { id: "dog1" } },
  { id: "2", name: "Bob", type: { id: "cat1" } },
];

let mockChannel;

class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
    this.onmessage = null;
    mockChannel = this;
  }

  postMessage(msg) {
    if (this.onmessage) this.onmessage({ data: msg });
  }

  close() {}
}

vi.stubGlobal("BroadcastChannel", MockBroadcastChannel);
vi.mock("../utils/characterUtils", () => ({
  default: vi.fn(() => mockCharacters),
}));

describe("CharacterSpawner", () => {
  beforeEach(() => {
    getUpdatedCharacters.mockClear();
  });

  test("renders no characters initially", () => {
    render(<CharacterSpawner />);
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });

  test("adds a character when name is received via BroadcastChannel", async () => {
    render(<CharacterSpawner />);

    mockChannel.postMessage("Alice");

    const nameElement = await screen.findByText("Alice");
    expect(nameElement).toBeInTheDocument();
    expect(getUpdatedCharacters).toHaveBeenCalled();
  });
});
