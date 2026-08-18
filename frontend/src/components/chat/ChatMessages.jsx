import { Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function ChatMessages({
  messages,
  isLoading,
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-1 py-6 sm:px-4">

      {messages.map((message, index) => {
        const isUser = message.role === "user";

        return (
          <div
            key={`${message.role}-${index}`}
            className={`flex gap-3 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >

            {/* AI Avatar */}
            {!isUser && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10">
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>
            )}


            {/* Message */}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%] sm:text-[15px] ${
                isUser
                  ? "bg-amber-400 text-black"
                  : "border border-white/10 bg-white/[0.04] text-zinc-200"
              }`}
            >

              {isUser ? (

                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>

              ) : (

                <div className="markdown-content break-words">

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-3 mt-2 text-xl font-bold text-white">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-2 mt-4 text-lg font-bold text-white">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-3 text-base font-semibold text-white">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mb-3 last:mb-0">
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul className="mb-3 list-disc space-y-1 pl-5">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mb-3 list-decimal space-y-1 pl-5">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li>
                          {children}
                        </li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-bold text-white">
                          {children}
                        </strong>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="my-3 border-l-2 border-amber-400 pl-4 text-zinc-400">
                          {children}
                        </blockquote>
                      ),

                      code: ({
                        inline,
                        children,
                        ...props
                      }) => {
                        return inline ? (
                          <code
                            className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-xs text-amber-300"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <code
                            className="block overflow-x-auto rounded-xl bg-black/50 p-4 font-mono text-xs text-zinc-200"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },

                      pre: ({ children }) => (
                        <pre className="my-3 overflow-x-auto">
                          {children}
                        </pre>
                      ),

                      hr: () => (
                        <hr className="my-4 border-white/10" />
                      ),

                      table: ({ children }) => (
                        <div className="my-3 overflow-x-auto">
                          <table className="w-full border-collapse text-left text-xs">
                            {children}
                          </table>
                        </div>
                      ),

                      th: ({ children }) => (
                        <th className="border border-white/10 bg-white/5 px-3 py-2 font-semibold text-white">
                          {children}
                        </th>
                      ),

                      td: ({ children }) => (
                        <td className="border border-white/10 px-3 py-2">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>

                </div>

              )}

            </div>


            {/* User Avatar */}
            {isUser && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                <User className="h-4 w-4 text-zinc-400" />
              </div>
            )}

          </div>
        );
      })}


      {/* AI Thinking */}
      {isLoading && (
        <div className="flex gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10">
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>

          <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
          </div>

        </div>
      )}

    </div>
  );
}


export default ChatMessages;