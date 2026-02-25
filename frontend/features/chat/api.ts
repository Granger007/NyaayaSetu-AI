export interface ChatResponse {
  summary: string;
  legal_basis: string;
  steps: string[];
  documents_required: string[];
  confidence_score: number;
}

export const sendChatMessage = async (message: string, language: string = 'en'): Promise<ChatResponse> => {
  try {
    // Calling the designated endpoint for the isolated feature
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, language }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send chat message:', error);
    // Return structured error as requested
    return {
      summary: "We are unable to process your query right now.",
      legal_basis: "Not available",
      steps: [],
      documents_required: [],
      confidence_score: 0.2
    };
  }
};
