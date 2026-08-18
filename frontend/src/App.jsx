import { useState } from "react";
import { X } from "lucide-react";

import ChatHeader from "./components/chat/layout/ChatHeader";
import ChatSidebar from "./components/chat/sidebar/ChatSidebar";

import ClassSelector from "./components/chat/ClassSelector";
import WelcomeScreen from "./components/chat/WelcomeScreen";
import ChatMessages from "./components/chat/ChatMessages";
import ChatInput from "./components/chat/ChatInput";
import DeleteConfirmModal from "./components/chat/DeleteConfirmModal";

import { askTutor } from "./services/api";
import useConversations from "./hooks/useConversations";


function App() {
  // Persistent anonymous user ID
  const [userId] = useState(() => {
    const savedUserId = localStorage.getItem(
      "manthan_nova_user_id"
    );

    if (savedUserId) {
      return savedUserId;
    }

    const newUserId = crypto.randomUUID();

    localStorage.setItem(
      "manthan_nova_user_id",
      newUserId
    );

    return newUserId;
  });


  // Selected class
  const [classLevel, setClassLevel] = useState(() => {
    const savedClass = localStorage.getItem(
      "manthan_nova_class"
    );

    return savedClass ? Number(savedClass) : null;
  });


  // Current conversation
  const [conversationId, setConversationId] = useState(() => {
    return crypto.randomUUID();
  });


  // Chat messages
  const [messages, setMessages] = useState([]);


  // AI loading state
  const [isLoading, setIsLoading] = useState(false);


  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);


  // Delete modal state
  const [
    conversationToDelete,
    setConversationToDelete,
  ] = useState(null);


  const [isDeleting, setIsDeleting] =
    useState(false);


  // Conversation history
  const {
    conversations,
    isLoadingHistory,
    loadConversations,
    loadConversationMessages,
    removeConversation,
  } = useConversations(userId);


  const handleSelectClass = (selectedClass) => {
    setClassLevel(selectedClass);

    localStorage.setItem(
      "manthan_nova_class",
      selectedClass.toString()
    );
  };


  const handleNewChat = () => {
    setConversationId(crypto.randomUUID());

    setMessages([]);

    setIsMobileSidebarOpen(false);
  };


  const handleSelectConversation = async (
    conversation
  ) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const conversationMessages =
        await loadConversationMessages(
          conversation.id
        );

      setConversationId(conversation.id);

      setMessages(conversationMessages);

      setIsMobileSidebarOpen(false);

    } catch (error) {
      console.error(
        "Could not load conversation:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };


  // Open delete confirmation modal
  const handleDeleteConversation = (
    conversationIdToDelete
  ) => {
    if (isLoading || isDeleting) return;

    setConversationToDelete(
      conversationIdToDelete
    );
  };


  // Close delete confirmation modal
  const handleCloseDeleteModal = () => {
    if (isDeleting) return;

    setConversationToDelete(null);
  };


  // Confirm and delete conversation
  const handleConfirmDelete = async () => {
    if (!conversationToDelete) return;

    try {
      setIsDeleting(true);

      await removeConversation(
        conversationToDelete
      );

      // If the active conversation was deleted,
      // create a new empty chat.
      if (
        conversationId ===
        conversationToDelete
      ) {
        setConversationId(
          crypto.randomUUID()
        );

        setMessages([]);
      }

      // Close mobile sidebar after deletion.
      setIsMobileSidebarOpen(false);

      // Close modal.
      setConversationToDelete(null);

    } catch (error) {
      console.error(
        "Could not delete conversation:",
        error
      );

      alert(
        "Could not delete the conversation. Please try again."
      );

    } finally {
      setIsDeleting(false);
    }
  };


  const handleSendMessage = async (question) => {
    if (!question.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setIsLoading(true);

    try {
      const result = await askTutor({
        user_id: userId,
        conversation_id: conversationId,
        question,
        class_level: classLevel,
        subject: "General",
        mode: "explain",
      });

      const assistantMessage = {
        role: "assistant",
        content: result.answer,
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);

      await loadConversations();

    } catch (error) {
      console.error(error);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
        },
      ]);

    } finally {
      setIsLoading(false);
    }
  };


  // Show class selection only for first-time users
  if (!classLevel) {
    return (
      <ClassSelector
        selectedClass={classLevel}
        onSelectClass={handleSelectClass}
      />
    );
  }


  return (
    <main className="flex h-screen overflow-hidden bg-black text-white">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={conversationId}
          onSelectConversation={
            handleSelectConversation
          }
          onNewChat={handleNewChat}
          onDeleteConversation={
            handleDeleteConversation
          }
          isLoading={isLoadingHistory}
        />
      </div>


      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileSidebarOpen
            ? "visible"
            : "invisible"
        }`}
      >

        {/* Animated Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMobileSidebarOpen
              ? "opacity-70"
              : "opacity-0"
          }`}
          onClick={() =>
            setIsMobileSidebarOpen(false)
          }
        />


        {/* Animated Sidebar Drawer */}
        <div
          className={`absolute inset-y-0 left-0 w-72 transform shadow-2xl transition-transform duration-300 ease-out ${
            isMobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >

          {/* Close Button */}
          <button
            onClick={() =>
              setIsMobileSidebarOpen(false)
            }
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/50 text-zinc-400 backdrop-blur transition hover:bg-white/10 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>


          <ChatSidebar
            conversations={conversations}
            activeConversationId={conversationId}
            onSelectConversation={
              handleSelectConversation
            }
            onNewChat={handleNewChat}
            onDeleteConversation={
              handleDeleteConversation
            }
            isLoading={isLoadingHistory}
          />

        </div>

      </div>


      {/* Main Chat Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        <ChatHeader
          onNewChat={handleNewChat}
          onOpenSidebar={() =>
            setIsMobileSidebarOpen(true)
          }
        />


        {/* Chat Content */}
        <div className="flex min-h-0 flex-1 flex-col">

          <div className="flex min-h-0 flex-1 overflow-y-auto">

            {messages.length === 0 ? (

              <div className="flex flex-1 items-center justify-center px-4">
                <WelcomeScreen
                  onSuggestionClick={
                    handleSendMessage
                  }
                />
              </div>

            ) : (

              <ChatMessages
                messages={messages}
                isLoading={isLoading}
              />

            )}

          </div>


          {/* Input */}
          <div className="border-t border-white/10 bg-black p-4 sm:p-6">

            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />

          </div>

        </div>

      </div>


      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(conversationToDelete)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

    </main>
  );
}


export default App;