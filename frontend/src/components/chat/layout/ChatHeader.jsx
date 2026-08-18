import { Menu, Plus, Sparkles } from "lucide-react";

function ChatHeader({
  onNewChat,
  onOpenSidebar,
}) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6">

      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">

        {/* Mobile Menu Button */}
        <button
          onClick={onOpenSidebar}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 md:hidden"
          aria-label="Open chat history"
        >
          <Menu className="h-5 w-5" />
        </button>


        {/* Logo */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 sm:h-10 sm:w-10">
          <Sparkles className="h-4 w-4 text-amber-400 sm:h-5 sm:w-5" />
        </div>


        {/* Title */}
        <div className="min-w-0">
          <h1 className="truncate text-sm font-bold sm:text-lg">
            Manthan Nova AI
          </h1>

          <p className="hidden text-xs text-zinc-500 sm:block">
            Your AI learning assistant
          </p>
        </div>

      </div>


      {/* New Chat */}
      <button
        onClick={onNewChat}
        className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/10 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        <Plus className="h-4 w-4" />

        <span className="hidden sm:inline">
          New Chat
        </span>
      </button>

    </header>
  );
}

export default ChatHeader;