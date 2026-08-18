const API_BASE_URL = "http://127.0.0.1:8000";

export const askTutor = async (data) => {
  const response = await fetch(
    `${API_BASE_URL}/api/ai/tutor`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail ||
        "Something went wrong while contacting Manthan Nova AI."
    );
  }

  return result;
};

export const getConversations = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/conversations/${userId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail ||
        "Could not load conversation history."
    );
  }

  return result.conversations || [];
};

export const getConversationMessages = async (
  conversationId,
  userId
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/conversations/${conversationId}/messages?user_id=${encodeURIComponent(
      userId
    )}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail ||
        "Could not load this conversation."
    );
  }

  return result.messages || [];
};

export const deleteConversation = async (
  conversationId,
  userId
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/conversations/${conversationId}?user_id=${encodeURIComponent(
      userId
    )}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail ||
        "Could not delete conversation."
    );
  }

  return result;
};