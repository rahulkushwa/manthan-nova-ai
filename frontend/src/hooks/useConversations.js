import { useCallback, useEffect, useState } from "react";

import {
  deleteConversation,
  getConversationMessages,
  getConversations,
} from "../services/api";


export default function useConversations(userId) {
  const [conversations, setConversations] = useState([]);

  const [isLoadingHistory, setIsLoadingHistory] =
    useState(false);


  // Load all conversations for the current user
  const loadConversations = useCallback(async () => {
    if (!userId) return;

    setIsLoadingHistory(true);

    try {
      const data = await getConversations(userId);

      setConversations(data);
    } catch (error) {
      console.error(
        "Could not load conversations:",
        error
      );
    } finally {
      setIsLoadingHistory(false);
    }
  }, [userId]);


  // Load messages from one conversation
  const loadConversationMessages = useCallback(
    async (conversationId) => {
      if (!userId) return [];

      return getConversationMessages(
        conversationId,
        userId
      );
    },
    [userId]
  );


  // Delete one conversation
  const removeConversation = useCallback(
    async (conversationId) => {
      if (!userId) return;

      await deleteConversation(
        conversationId,
        userId
      );

      // Immediately remove it from the sidebar
      setConversations((currentConversations) =>
        currentConversations.filter(
          (conversation) =>
            conversation.id !== conversationId
        )
      );
    },
    [userId]
  );


  // Load conversations when the user is available
  useEffect(() => {
    if (userId) {
      loadConversations();
    }
  }, [userId, loadConversations]);


  return {
    conversations,
    isLoadingHistory,
    loadConversations,
    loadConversationMessages,
    removeConversation,
  };
}