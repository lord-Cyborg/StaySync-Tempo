// Chat service for the Property Management System
// This is a mock implementation that would be replaced with actual chat service

import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface ChatConversation {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: string;
  updatedAt: string;
}

// Mock storage
let conversations: ChatConversation[] = [];
let messages: ChatMessage[] = [];

// Initialize with some sample data
const initializeChat = () => {
  // Create sample users
  const maintenanceManagerId = "maint-123";
  const propertyOwnerId = "owner-456";

  // Create a conversation between maintenance manager and property owner
  const maintenanceConversation = {
    id: "conv-maintenance-1",
    participants: [maintenanceManagerId, propertyOwnerId],
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
  };

  // Create messages for the conversation
  const maintenanceMessages = [
    {
      id: "msg-1",
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Bom dia! Precisamos fazer uma manutenção no sistema de ar condicionado da residência na Rua das Flores. Os hóspedes relataram que não está funcionando bem.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
    {
      id: "msg-2",
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "Bom dia! Entendi o problema. Posso enviar um técnico hoje à tarde, entre 14h e 16h. Isso seria conveniente?",
      timestamp: new Date(Date.now() - 85000000).toISOString(),
      read: true,
    },
    {
      id: "msg-3",
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Sim, perfeito. Os hóspedes estarão fora nesse horário, então é ideal. Você precisa do código de acesso?",
      timestamp: new Date(Date.now() - 84000000).toISOString(),
      read: true,
    },
    {
      id: "msg-4",
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "Sim, por favor. E também seria útil saber qual é o modelo do ar condicionado para levarmos as peças corretas.",
      timestamp: new Date(Date.now() - 83000000).toISOString(),
      read: true,
    },
    {
      id: "msg-5",
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "O código é 4592. O ar condicionado é um Samsung WindFree, modelo AR24TSHCBWKNAZ, instalado há cerca de 2 anos.",
      timestamp: new Date(Date.now() - 82000000).toISOString(),
      read: true,
    },
    {
      id: "msg-6",
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "Anotado. Enviarei o técnico João, ele é especialista nesse modelo. Ele vai te enviar uma mensagem quando estiver a caminho.",
      timestamp: new Date(Date.now() - 81000000).toISOString(),
      read: true,
    },
    {
      id: "msg-7",
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content: "Atualização: O João está a caminho, deve chegar em 20 minutos.",
      timestamp: new Date(Date.now() - 50000000).toISOString(),
      read: true,
    },
    {
      id: "msg-8",
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content: "Obrigado pela atualização!",
      timestamp: new Date(Date.now() - 49000000).toISOString(),
      read: true,
    },
    {
      id: "msg-9",
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "O João terminou o serviço. Ele identificou um problema na placa eletrônica e fez a substituição. O sistema está funcionando normalmente agora. Ele também fez uma limpeza nos filtros.",
      timestamp: new Date(Date.now() - 40000000).toISOString(),
      read: true,
    },
    {
      id: "msg-10",
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Excelente! Quanto ficou o serviço? E ele deixou alguma recomendação para manutenção futura?",
      timestamp: new Date(Date.now() - 39000000).toISOString(),
      read: true,
    },
    {
      id: "msg-11",
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "O valor total foi de R$ 850,00, incluindo a peça e mão de obra. Ele recomendou uma limpeza completa a cada 6 meses e trocar os filtros anualmente. Enviarei a fatura por email ainda hoje.",
      timestamp: new Date(Date.now() - 38000000).toISOString(),
      read: true,
    },
    {
      id: "msg-12",
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Perfeito, muito obrigado pela rapidez e eficiência! Vou programar a próxima manutenção preventiva conforme recomendado.",
      timestamp: new Date(Date.now() - 37000000).toISOString(),
      read: false,
    },
  ];

  // Add the conversation and messages to our mock storage
  conversations = [maintenanceConversation];
  messages = maintenanceMessages;

  // Update the conversation with the last message
  maintenanceConversation.lastMessage =
    maintenanceMessages[maintenanceMessages.length - 1];
};

// Initialize the chat service
initializeChat();

export const chatService = {
  // Get all conversations for a user
  getConversations: (userId: string) => {
    return Promise.resolve(
      conversations.filter((c) => c.participants.includes(userId)),
    );
  },

  // Get a specific conversation
  getConversation: (conversationId: string) => {
    return Promise.resolve(
      conversations.find((c) => c.id === conversationId) || null,
    );
  },

  // Create a new conversation
  createConversation: (participants: string[]) => {
    // Check if conversation already exists
    const existingConversation = conversations.find(
      (c) =>
        c.participants.length === participants.length &&
        participants.every((p) => c.participants.includes(p)),
    );

    if (existingConversation) {
      return Promise.resolve(existingConversation);
    }

    const newConversation: ChatConversation = {
      id: uuidv4(),
      participants,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    conversations.push(newConversation);
    return Promise.resolve(newConversation);
  },

  // Get messages for a conversation
  getMessages: (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      messages
        .filter(
          (m) =>
            conversation.participants.includes(m.senderId) &&
            conversation.participants.includes(m.receiverId),
        )
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        ),
    );
  },

  // Send a message
  sendMessage: (senderId: string, receiverId: string, content: string) => {
    // Find or create conversation
    let conversation = conversations.find(
      (c) =>
        c.participants.length === 2 &&
        c.participants.includes(senderId) &&
        c.participants.includes(receiverId),
    );

    if (!conversation) {
      conversation = {
        id: uuidv4(),
        participants: [senderId, receiverId],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      conversations.push(conversation);
    }

    const newMessage: ChatMessage = {
      id: uuidv4(),
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    messages.push(newMessage);

    // Update conversation
    conversation.lastMessage = newMessage;
    conversation.updatedAt = new Date().toISOString();

    return Promise.resolve(newMessage);
  },

  // Mark messages as read
  markAsRead: (messageIds: string[]) => {
    messageIds.forEach((id) => {
      const message = messages.find((m) => m.id === id);
      if (message) {
        message.read = true;
      }
    });

    return Promise.resolve(true);
  },

  // Get unread message count for a user
  getUnreadCount: (userId: string) => {
    return Promise.resolve(
      messages.filter((m) => m.receiverId === userId && !m.read).length,
    );
  },

  // Delete a message
  deleteMessage: (messageId: string) => {
    const index = messages.findIndex((m) => m.id === messageId);
    if (index === -1) {
      return Promise.resolve(false);
    }

    messages.splice(index, 1);
    return Promise.resolve(true);
  },

  // Delete a conversation and all its messages
  deleteConversation: (conversationId: string) => {
    const conversationIndex = conversations.findIndex(
      (c) => c.id === conversationId,
    );
    if (conversationIndex === -1) {
      return Promise.resolve(false);
    }

    const conversation = conversations[conversationIndex];
    conversations.splice(conversationIndex, 1);

    // Delete all messages in this conversation
    messages = messages.filter(
      (m) =>
        !(
          conversation.participants.includes(m.senderId) &&
          conversation.participants.includes(m.receiverId)
        ),
    );

    return Promise.resolve(true);
  },

  // Reset chat data (for testing)
  resetChat: () => {
    conversations = [];
    messages = [];
    initializeChat();
    return Promise.resolve(true);
  },
};
