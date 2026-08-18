import { ArrowUp } from "lucide-react";
import { useState } from "react";

function ChatInput({
  onSendMessage,
  isLoading,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    onSendMessage(trimmedMessage);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mx-auto w-full max-w-3xl
        rounded-2xl border border-white/10
        bg-white/[0.04] p-2
        shadow-2xl
        sm:p-3
      "
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Ask Manthan Nova AI..."
          disabled={isLoading}
          className="
            min-w-0 flex-1
            bg-transparent
            px-2.5 py-3
            text-sm text-white
            outline-none
            placeholder:text-zinc-600
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:px-3 sm:py-3
          "
        />

        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-amber-400 text-black
            transition
            hover:bg-amber-300
            disabled:cursor-not-allowed
            disabled:opacity-40
            sm:h-11 sm:w-11
          "
          aria-label="Ask AI"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

export default ChatInput;