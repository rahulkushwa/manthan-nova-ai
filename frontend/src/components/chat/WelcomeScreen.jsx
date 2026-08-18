import { Sparkles } from "lucide-react";

function WelcomeScreen({ onSuggestionClick }) {
  const suggestions = [
    "Explain Newton's laws",
    "Solve a maths problem",
    "Quiz me on biology",
  ];

  return (
    <div className="w-full max-w-3xl text-center">
      
      {/* AI Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-xs text-amber-300 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        AI Tutor
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Learn smarter with{" "}
        <span className="text-amber-400">
          Manthan Nova AI
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-xl px-2 text-sm leading-6 text-zinc-400 sm:mt-5 sm:px-0 sm:text-base sm:leading-7">
        Ask questions, understand difficult concepts,
        practice topics, and learn at your own level.
      </p>

      {/* Suggestions */}
      <div className="mt-7 flex gap-2 overflow-x-auto px-1 pb-2 sm:mt-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="
              shrink-0 whitespace-nowrap
              rounded-full
              border border-white/10
              bg-white/[0.03]
              px-3 py-2
              text-[11px] text-zinc-400
              transition
              hover:border-amber-400/30
              hover:text-amber-300
              sm:px-4 sm:text-xs
            "
          >
            {suggestion}
          </button>
        ))}
      </div>

      <p className="mt-7 text-[11px] text-zinc-600 sm:mt-8">
        Manthan Nova AI can make mistakes. Check important answers.
      </p>

    </div>
  );
}

export default WelcomeScreen;