import { render, screen, fireEvent, act } from "@testing-library/react";
import SubmitView from "./SubmitView";

let mockPostMessage;
let mockClose;

class MockBroadcastChannel {
  constructor() {
    mockPostMessage = vi.fn();
    mockClose = vi.fn();
    return {
      postMessage: mockPostMessage,
      close: mockClose,
    };
  }
}

vi.stubGlobal("BroadcastChannel", MockBroadcastChannel);

describe("SubmitView", () => {
  beforeEach(() => {
    mockPostMessage = vi.fn();
    mockClose = vi.fn();
  });

  test("renders input and submit button", () => {
    render(<SubmitView />);
    expect(screen.getByPlaceholderText(/enter a name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("does not submit empty or whitespace input", () => {
    render(<SubmitView />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button"));
    expect(mockPostMessage).not.toHaveBeenCalled();
  });

  test("submits valid input and clears it", () => {
    render(<SubmitView />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Alice" } });
    fireEvent.click(screen.getByRole("button"));
    expect(mockPostMessage).toHaveBeenCalledWith("Alice");
    expect(mockClose).toHaveBeenCalled();
    expect(input.value).toBe("");
  });

  test("disables button after submit and reenables it after cooldown", async () => {
    vi.useFakeTimers();

    render(<SubmitView />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Cooldown Test" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();

    await act(() => {
      vi.advanceTimersByTimeAsync(1700);
    });

    expect(button).not.toBeDisabled();

    vi.useRealTimers();
  });
});
