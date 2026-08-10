import { Sparkles, ArrowUp, Plus } from "lucide-react";

function App() {
  const suggestions = [
    "Explain Newton's laws",
    "Solve a maths problem",
    "Quiz me on biology",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">

        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 sm:h-10 sm:w-10">
              <Sparkles className="h-4 w-4 text-amber-400 sm:h-5 sm:w-5" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold sm:text-lg">
                Manthan Nova AI
              </h1>

              <p className="hidden text-xs text-zinc-500 sm:block">
                Your AI learning assistant
              </p>
            </div>
          </div>

          <button
            className="
              flex shrink-0 items-center gap-2
              rounded-xl border border-white/10
              bg-white/5 px-3 py-2
              text-xs font-medium text-zinc-300
              transition hover:bg-white/10
              sm:px-4 sm:py-2.5 sm:text-sm
            "
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline sm:inline">
              New Chat
            </span>
          </button>
        </header>

        {/* Main */}
        <section className="flex flex-1 items-center justify-center py-10 sm:py-16 lg:py-20">
          <div className="w-full max-w-3xl text-center">

            {/* AI Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-xs text-amber-300 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              AI Tutor
            </div>

            {/* Heading */}
            <h2 className="
              text-3xl font-bold leading-tight tracking-tight
              sm:text-5xl
              lg:text-6xl
            ">
              Learn smarter with{" "}
              <span className="text-amber-400">
                Manthan Nova AI
              </span>
            </h2>

            {/* Description */}
            <p className="
              mx-auto mt-4 max-w-xl
              px-2 text-sm leading-6 text-zinc-400
              sm:mt-5 sm:px-0 sm:text-base sm:leading-7
            ">
              Ask questions, understand difficult concepts,
              practice topics, and learn at your own level.
            </p>

            {/* Input */}
            <div className="
              mx-auto mt-7 w-full max-w-2xl
              rounded-2xl border border-white/10
              bg-white/[0.04] p-2
              shadow-2xl
              sm:mt-10 sm:p-3
            ">
              <div className="flex items-center gap-2">

                <input
                  type="text"
                  placeholder="Ask Manthan Nova AI..."
                  className="
                    min-w-0 flex-1
                    bg-transparent
                    px-2.5 py-3
                    text-sm text-white
                    outline-none
                    placeholder:text-zinc-600
                    sm:px-3 sm:py-3
                  "
                />

                {/* Desktop button */}
                <button
                  className="
                    hidden shrink-0
                    items-center gap-2
                    rounded-xl
                    bg-amber-400
                    px-5 py-3
                    text-sm font-semibold text-black
                    transition hover:bg-amber-300
                    sm:flex
                  "
                >
                  Ask AI
                </button>

                {/* Mobile button */}
                <button
                  className="
                    flex h-10 w-10
                    shrink-0 items-center justify-center
                    rounded-xl
                    bg-amber-400
                    text-black
                    transition hover:bg-amber-300
                    sm:hidden
                  "
                  aria-label="Ask AI"
                >
                  <ArrowUp className="h-5 w-5" />
                </button>

              </div>
            </div>

            {/* Suggestions */}
            <div className="
              mt-4 flex
              gap-2 overflow-x-auto
              px-1 pb-2
              sm:mt-5
              sm:flex-wrap sm:justify-center
              sm:overflow-visible sm:px-0 sm:pb-0
            ">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
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

            {/* Mobile helper */}
            <p className="mt-7 text-[11px] text-zinc-600 sm:mt-8">
              Manthan Nova AI can make mistakes. Check important answers.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}

export default App;