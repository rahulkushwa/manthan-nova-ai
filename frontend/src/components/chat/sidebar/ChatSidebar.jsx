import {
  MessageSquare,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";


function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  isLoading,
}) {
  const handleDelete = (
    event,
    conversationId
  ) => {
    // Prevent opening the conversation when
    // the trash button is clicked.
    event.stopPropagation();

    onDeleteConversation(conversationId);
  };


  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-white/10 bg-zinc-950">

      {/* Header */}
      <div className="border-b border-white/10 p-4">

        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10">
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>

          <span className="font-semibold text-white">
            Manthan Nova AI
          </span>
        </div>


        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
        >
          <Plus className="h-4 w-4" />

          New Chat
        </button>

      </div>


      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-3">

        <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
          Recent Chats
        </p>


        {isLoading ? (

          <p className="px-2 text-sm text-zinc-500">
            Loading chats...
          </p>

        ) : conversations.length === 0 ? (

          <p className="px-2 text-sm text-zinc-500">
            No conversations yet.
          </p>

        ) : (

          <div className="space-y-1">

            {conversations.map((conversation) => {
              const isActive =
                conversation.id === activeConversationId;


              return (
                <div
                  key={conversation.id}
                  className={`group flex w-full items-center gap-2 rounded-xl transition ${
                    isActive
                      ? "bg-white/10"
                      : "hover:bg-white/[0.06]"
                  }`}
                >

                  {/* Conversation Button */}
                  <button
                    onClick={() =>
                      onSelectConversation(conversation)
                    }
                    className={`flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left text-sm ${
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >

                    <MessageSquare className="h-4 w-4 shrink-0 text-amber-400" />

                    <span className="truncate">
                      {conversation.title ||
                        "New conversation"}
                    </span>

                  </button>


                  {/* Delete Button */}
                  <button
                    onClick={(event) =>
                      handleDelete(
                        event,
                        conversation.id
                      )
                    }
                    className="mr-2 rounded-lg p-2 text-zinc-600 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                    title="Delete conversation"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>
              );
            })}

          </div>

        )}

      </div>


      {/* Footer */}
      <div className="border-t border-white/10 p-4">

        <p className="text-center text-xs text-zinc-600">
          Manthan Nova AI
        </p>

      </div>

    </aside>
  );
}


export default ChatSidebar;