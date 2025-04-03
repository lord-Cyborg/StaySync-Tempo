// Chat service for the Property Management System
// This is a mock implementation that would be replaced with actual chat service

import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/database";
import {
  ChatMessage,
  ChatConversation,
  ServiceEstimate,
  ServiceEstimateItem,
  Invoice,
  InvoiceLineItem,
  ServiceReport,
} from "@/lib/database/schema";

// Mock storage
let conversations: ChatConversation[] = [];
let messages: ChatMessage[] = [];
let estimates: ServiceEstimate[] = [];
let estimateItems: ServiceEstimateItem[] = [];
let invoices: Invoice[] = [];
let invoiceItems: InvoiceLineItem[] = [];
let reports: ServiceReport[] = [];

// Initialize with some sample data
const initializeChat = () => {
  // Create sample users
  const maintenanceManagerId = "maint-123";
  const propertyOwnerId = "owner-456";
  const propertyId = "property-789";

  // Create a conversation between maintenance manager and property owner
  const maintenanceConversation: ChatConversation = {
    id: "conv-maintenance-1",
    participants: [maintenanceManagerId, propertyOwnerId],
    type: "service",
    serviceType: "maintenance",
    propertyId,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
  };

  // Create messages for the conversation
  const maintenanceMessages: ChatMessage[] = [
    {
      id: "msg-1",
      conversationId: maintenanceConversation.id,
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Bom dia! Precisamos fazer uma manutenção no sistema de ar condicionado da residência na Rua das Flores. Os hóspedes relataram que não está funcionando bem.",
      contentType: "text",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "msg-2",
      conversationId: maintenanceConversation.id,
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "Bom dia! Entendi o problema. Posso enviar um técnico hoje à tarde, entre 14h e 16h. Isso seria conveniente?",
      contentType: "text",
      timestamp: new Date(Date.now() - 85000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 85000000).toISOString(),
      updatedAt: new Date(Date.now() - 85000000).toISOString(),
    },
    {
      id: "msg-3",
      conversationId: maintenanceConversation.id,
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Sim, perfeito. Os hóspedes estarão fora nesse horário, então é ideal. Você precisa do código de acesso?",
      contentType: "text",
      timestamp: new Date(Date.now() - 84000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 84000000).toISOString(),
      updatedAt: new Date(Date.now() - 84000000).toISOString(),
    },
    {
      id: "msg-4",
      conversationId: maintenanceConversation.id,
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "Sim, por favor. E também seria útil saber qual é o modelo do ar condicionado para levarmos as peças corretas.",
      contentType: "text",
      timestamp: new Date(Date.now() - 83000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 83000000).toISOString(),
      updatedAt: new Date(Date.now() - 83000000).toISOString(),
    },
    {
      id: "msg-5",
      conversationId: maintenanceConversation.id,
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "O código é 4592. O ar condicionado é um Samsung WindFree, modelo AR24TSHCBWKNAZ, instalado há cerca de 2 anos.",
      contentType: "text",
      timestamp: new Date(Date.now() - 82000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 82000000).toISOString(),
      updatedAt: new Date(Date.now() - 82000000).toISOString(),
    },
    {
      id: "msg-6",
      conversationId: maintenanceConversation.id,
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "Anotado. Enviarei o técnico João, ele é especialista nesse modelo. Ele vai te enviar uma mensagem quando estiver a caminho.",
      contentType: "text",
      timestamp: new Date(Date.now() - 81000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 81000000).toISOString(),
      updatedAt: new Date(Date.now() - 81000000).toISOString(),
    },
    {
      id: "msg-7",
      conversationId: maintenanceConversation.id,
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content: "Atualização: O João está a caminho, deve chegar em 20 minutos.",
      contentType: "text",
      timestamp: new Date(Date.now() - 50000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 50000000).toISOString(),
      updatedAt: new Date(Date.now() - 50000000).toISOString(),
    },
    {
      id: "msg-8",
      conversationId: maintenanceConversation.id,
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content: "Obrigado pela atualização!",
      contentType: "text",
      timestamp: new Date(Date.now() - 49000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 49000000).toISOString(),
      updatedAt: new Date(Date.now() - 49000000).toISOString(),
    },
    {
      id: "msg-9",
      conversationId: maintenanceConversation.id,
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "O João terminou o serviço. Ele identificou um problema na placa eletrônica e fez a substituição. O sistema está funcionando normalmente agora. Ele também fez uma limpeza nos filtros.",
      contentType: "text",
      timestamp: new Date(Date.now() - 40000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 40000000).toISOString(),
      updatedAt: new Date(Date.now() - 40000000).toISOString(),
    },
    {
      id: "msg-10",
      conversationId: maintenanceConversation.id,
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Excelente! Quanto ficou o serviço? E ele deixou alguma recomendação para manutenção futura?",
      contentType: "text",
      timestamp: new Date(Date.now() - 39000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 39000000).toISOString(),
      updatedAt: new Date(Date.now() - 39000000).toISOString(),
    },
    {
      id: "msg-11",
      conversationId: maintenanceConversation.id,
      senderId: maintenanceManagerId,
      receiverId: propertyOwnerId,
      content:
        "O valor total foi de R$ 850,00, incluindo a peça e mão de obra. Ele recomendou uma limpeza completa a cada 6 meses e trocar os filtros anualmente. Enviarei a fatura por email ainda hoje.",
      contentType: "text",
      timestamp: new Date(Date.now() - 38000000).toISOString(),
      read: true,
      createdAt: new Date(Date.now() - 38000000).toISOString(),
      updatedAt: new Date(Date.now() - 38000000).toISOString(),
    },
    {
      id: "msg-12",
      conversationId: maintenanceConversation.id,
      senderId: propertyOwnerId,
      receiverId: maintenanceManagerId,
      content:
        "Perfeito, muito obrigado pela rapidez e eficiência! Vou programar a próxima manutenção preventiva conforme recomendado.",
      contentType: "text",
      timestamp: new Date(Date.now() - 37000000).toISOString(),
      read: false,
      createdAt: new Date(Date.now() - 37000000).toISOString(),
      updatedAt: new Date(Date.now() - 37000000).toISOString(),
    },
  ];

  // Create a sample estimate
  const sampleEstimate: ServiceEstimate = {
    id: "estimate-1",
    conversationId: maintenanceConversation.id,
    propertyId,
    serviceProviderId: maintenanceManagerId,
    requesterId: propertyOwnerId,
    title: "Manutenção do Ar Condicionado",
    description: "Reparo do sistema de ar condicionado Samsung WindFree",
    serviceType: "maintenance",
    estimatedCost: 850,
    estimatedHours: 2,
    materialsCost: 650,
    laborCost: 200,
    status: "completed",
    approvedById: propertyOwnerId,
    approvedAt: new Date(Date.now() - 80000000).toISOString(),
    notes: "Inclui substituição da placa eletrônica e limpeza dos filtros",
    createdAt: new Date(Date.now() - 82000000).toISOString(),
    updatedAt: new Date(Date.now() - 80000000).toISOString(),
  };

  // Create estimate items
  const sampleEstimateItems: ServiceEstimateItem[] = [
    {
      id: "estimate-item-1",
      estimateId: sampleEstimate.id,
      description: "Placa eletrônica Samsung AR24TSHCBWKNAZ",
      quantity: 1,
      unitPrice: 650,
      amount: 650,
      itemType: "material",
      createdAt: new Date(Date.now() - 82000000).toISOString(),
      updatedAt: new Date(Date.now() - 82000000).toISOString(),
    },
    {
      id: "estimate-item-2",
      estimateId: sampleEstimate.id,
      description: "Mão de obra técnica",
      quantity: 2,
      unitPrice: 100,
      amount: 200,
      itemType: "labor",
      createdAt: new Date(Date.now() - 82000000).toISOString(),
      updatedAt: new Date(Date.now() - 82000000).toISOString(),
    },
  ];

  // Create a sample invoice
  const sampleInvoice: Invoice = {
    id: "invoice-1",
    propertyId,
    estimateId: sampleEstimate.id,
    conversationId: maintenanceConversation.id,
    serviceProviderId: maintenanceManagerId,
    clientId: propertyOwnerId,
    issueDate: new Date(Date.now() - 38000000).toISOString(),
    dueDate: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
    totalAmount: 850,
    status: "sent",
    notes: "Serviço de manutenção do ar condicionado",
    createdAt: new Date(Date.now() - 38000000).toISOString(),
    updatedAt: new Date(Date.now() - 38000000).toISOString(),
  };

  // Create invoice items
  const sampleInvoiceItems: InvoiceLineItem[] = [
    {
      id: "invoice-item-1",
      invoiceId: sampleInvoice.id,
      description: "Placa eletrônica Samsung AR24TSHCBWKNAZ",
      quantity: 1,
      unitPrice: 650,
      amount: 650,
      itemType: "material",
      createdAt: new Date(Date.now() - 38000000).toISOString(),
      updatedAt: new Date(Date.now() - 38000000).toISOString(),
    },
    {
      id: "invoice-item-2",
      invoiceId: sampleInvoice.id,
      description: "Mão de obra técnica",
      quantity: 2,
      unitPrice: 100,
      amount: 200,
      itemType: "labor",
      createdAt: new Date(Date.now() - 38000000).toISOString(),
      updatedAt: new Date(Date.now() - 38000000).toISOString(),
    },
  ];

  // Create a sample report
  const sampleReport: ServiceReport = {
    id: "report-1",
    conversationId: maintenanceConversation.id,
    propertyId,
    serviceProviderId: maintenanceManagerId,
    clientId: propertyOwnerId,
    estimateId: sampleEstimate.id,
    invoiceId: sampleInvoice.id,
    title: "Relatório de Manutenção - Ar Condicionado",
    description: "Relatório detalhado do serviço de manutenção realizado",
    serviceType: "maintenance",
    serviceDate: new Date(Date.now() - 40000000).toISOString(),
    completionDate: new Date(Date.now() - 40000000).toISOString(),
    status: "sent",
    findings:
      "Foi identificado um problema na placa eletrônica do aparelho, causando o mau funcionamento.",
    recommendations:
      "Recomenda-se uma limpeza completa a cada 6 meses e troca dos filtros anualmente.",
    followUpRequired: false,
    createdAt: new Date(Date.now() - 39000000).toISOString(),
    updatedAt: new Date(Date.now() - 39000000).toISOString(),
  };

  // Add the conversation and messages to our mock storage
  conversations = [maintenanceConversation];
  messages = maintenanceMessages;
  estimates = [sampleEstimate];
  estimateItems = sampleEstimateItems;
  invoices = [sampleInvoice];
  invoiceItems = sampleInvoiceItems;
  reports = [sampleReport];

  // Update the conversation with the last message
  maintenanceConversation.lastMessageId =
    maintenanceMessages[maintenanceMessages.length - 1].id;
  maintenanceConversation.lastMessageTimestamp =
    maintenanceMessages[maintenanceMessages.length - 1].timestamp;
  maintenanceConversation.estimateId = sampleEstimate.id;
  maintenanceConversation.invoiceId = sampleInvoice.id;
  maintenanceConversation.reportId = sampleReport.id;
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
  createConversation: (data: {
    participants: string[];
    type: "direct" | "group" | "service";
    serviceType?: "maintenance" | "cleaning" | "inspection" | "other";
    propertyId?: string;
    taskId?: string;
    title?: string;
  }) => {
    // Check if conversation already exists for direct messages
    if (data.type === "direct" && data.participants.length === 2) {
      const existingConversation = conversations.find(
        (c) =>
          c.type === "direct" &&
          c.participants.length === data.participants.length &&
          data.participants.every((p) => c.participants.includes(p)),
      );

      if (existingConversation) {
        return Promise.resolve(existingConversation);
      }
    }

    const newConversation: ChatConversation = {
      id: uuidv4(),
      participants: data.participants,
      type: data.type,
      serviceType: data.serviceType,
      propertyId: data.propertyId,
      taskId: data.taskId,
      title: data.title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    conversations.push(newConversation);
    return Promise.resolve(newConversation);
  },

  // Get messages for a conversation
  getMessages: (conversationId: string) => {
    return Promise.resolve(
      messages
        .filter((m) => m.conversationId === conversationId)
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        ),
    );
  },

  // Send a message
  sendMessage: (data: {
    conversationId: string;
    senderId: string;
    receiverId?: string;
    content: string;
    contentType: "text" | "image" | "file" | "estimate" | "invoice" | "report";
    attachmentUrl?: string;
    attachmentType?: string;
    metadata?: any;
  }) => {
    const conversation = conversations.find(
      (c) => c.id === data.conversationId,
    );
    if (!conversation) {
      return Promise.reject(new Error("Conversation not found"));
    }

    const newMessage: ChatMessage = {
      id: uuidv4(),
      conversationId: data.conversationId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content,
      contentType: data.contentType,
      attachmentUrl: data.attachmentUrl,
      attachmentType: data.attachmentType,
      metadata: data.metadata,
      read: false,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    messages.push(newMessage);

    // Update conversation
    conversation.lastMessageId = newMessage.id;
    conversation.lastMessageTimestamp = newMessage.timestamp;
    conversation.updatedAt = new Date().toISOString();

    return Promise.resolve(newMessage);
  },

  // Mark messages as read
  markAsRead: (messageIds: string[]) => {
    messageIds.forEach((id) => {
      const message = messages.find((m) => m.id === id);
      if (message) {
        message.read = true;
        message.readAt = new Date().toISOString();
        message.updatedAt = new Date().toISOString();
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

    conversations.splice(conversationIndex, 1);

    // Delete all messages in this conversation
    messages = messages.filter((m) => m.conversationId !== conversationId);

    return Promise.resolve(true);
  },

  // Service Estimate functions
  createEstimate: (
    data: Omit<ServiceEstimate, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newEstimate: ServiceEstimate = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    estimates.push(newEstimate);

    // Update the conversation with the estimate ID
    const conversation = conversations.find(
      (c) => c.id === data.conversationId,
    );
    if (conversation) {
      conversation.estimateId = newEstimate.id;
      conversation.updatedAt = new Date().toISOString();
    }

    return Promise.resolve(newEstimate);
  },

  getEstimate: (estimateId: string) => {
    return Promise.resolve(estimates.find((e) => e.id === estimateId) || null);
  },

  getEstimatesByConversation: (conversationId: string) => {
    return Promise.resolve(
      estimates.filter((e) => e.conversationId === conversationId),
    );
  },

  updateEstimate: (estimateId: string, data: Partial<ServiceEstimate>) => {
    const index = estimates.findIndex((e) => e.id === estimateId);
    if (index === -1) {
      return Promise.resolve(null);
    }

    estimates[index] = {
      ...estimates[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return Promise.resolve(estimates[index]);
  },

  // Estimate Items functions
  addEstimateItem: (
    data: Omit<ServiceEstimateItem, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newItem: ServiceEstimateItem = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    estimateItems.push(newItem);

    // Update the estimate total
    const estimate = estimates.find((e) => e.id === data.estimateId);
    if (estimate) {
      const items = estimateItems.filter(
        (i) => i.estimateId === data.estimateId,
      );
      const total = items.reduce((sum, item) => sum + item.amount, 0);
      estimate.estimatedCost = total;
      estimate.updatedAt = new Date().toISOString();
    }

    return Promise.resolve(newItem);
  },

  getEstimateItems: (estimateId: string) => {
    return Promise.resolve(
      estimateItems.filter((i) => i.estimateId === estimateId),
    );
  },

  updateEstimateItem: (itemId: string, data: Partial<ServiceEstimateItem>) => {
    const index = estimateItems.findIndex((i) => i.id === itemId);
    if (index === -1) {
      return Promise.resolve(null);
    }

    estimateItems[index] = {
      ...estimateItems[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // Update the estimate total
    const estimateId = estimateItems[index].estimateId;
    const estimate = estimates.find((e) => e.id === estimateId);
    if (estimate) {
      const items = estimateItems.filter((i) => i.estimateId === estimateId);
      const total = items.reduce((sum, item) => sum + item.amount, 0);
      estimate.estimatedCost = total;
      estimate.updatedAt = new Date().toISOString();
    }

    return Promise.resolve(estimateItems[index]);
  },

  deleteEstimateItem: (itemId: string) => {
    const index = estimateItems.findIndex((i) => i.id === itemId);
    if (index === -1) {
      return Promise.resolve(false);
    }

    const estimateId = estimateItems[index].estimateId;
    estimateItems.splice(index, 1);

    // Update the estimate total
    const estimate = estimates.find((e) => e.id === estimateId);
    if (estimate) {
      const items = estimateItems.filter((i) => i.estimateId === estimateId);
      const total = items.reduce((sum, item) => sum + item.amount, 0);
      estimate.estimatedCost = total;
      estimate.updatedAt = new Date().toISOString();
    }

    return Promise.resolve(true);
  },

  // Invoice functions
  createInvoice: (data: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => {
    const newInvoice: Invoice = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    invoices.push(newInvoice);

    // Update the conversation with the invoice ID
    const conversation = conversations.find(
      (c) => c.id === data.conversationId,
    );
    if (conversation) {
      conversation.invoiceId = newInvoice.id;
      conversation.updatedAt = new Date().toISOString();
    }

    return Promise.resolve(newInvoice);
  },

  getInvoice: (invoiceId: string) => {
    return Promise.resolve(invoices.find((i) => i.id === invoiceId) || null);
  },

  getInvoicesByConversation: (conversationId: string) => {
    return Promise.resolve(
      invoices.filter((i) => i.conversationId === conversationId),
    );
  },

  updateInvoice: (invoiceId: string, data: Partial<Invoice>) => {
    const index = invoices.findIndex((i) => i.id === invoiceId);
    if (index === -1) {
      return Promise.resolve(null);
    }

    invoices[index] = {
      ...invoices[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return Promise.resolve(invoices[index]);
  },

  // Invoice Items functions
  addInvoiceItem: (
    data: Omit<InvoiceLineItem, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newItem: InvoiceLineItem = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    invoiceItems.push(newItem);

    // Update the invoice total
    const invoice = invoices.find((i) => i.id === data.invoiceId);
    if (invoice) {
      const items = invoiceItems.filter((i) => i.invoiceId === data.invoiceId);
      const total = items.reduce((sum, item) => sum + item.amount, 0);
      invoice.totalAmount = total;
      invoice.updatedAt = new Date().toISOString();
    }

    return Promise.resolve(newItem);
  },

  getInvoiceItems: (invoiceId: string) => {
    return Promise.resolve(
      invoiceItems.filter((i) => i.invoiceId === invoiceId),
    );
  },

  // Service Report functions
  createReport: (
    data: Omit<ServiceReport, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newReport: ServiceReport = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    reports.push(newReport);

    // Update the conversation with the report ID
    const conversation = conversations.find(
      (c) => c.id === data.conversationId,
    );
    if (conversation) {
      conversation.reportId = newReport.id;
      conversation.updatedAt = new Date().toISOString();
    }

    return Promise.resolve(newReport);
  },

  getReport: (reportId: string) => {
    return Promise.resolve(reports.find((r) => r.id === reportId) || null);
  },

  getReportsByConversation: (conversationId: string) => {
    return Promise.resolve(
      reports.filter((r) => r.conversationId === conversationId),
    );
  },

  updateReport: (reportId: string, data: Partial<ServiceReport>) => {
    const index = reports.findIndex((r) => r.id === reportId);
    if (index === -1) {
      return Promise.resolve(null);
    }

    reports[index] = {
      ...reports[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return Promise.resolve(reports[index]);
  },

  // Reset chat data (for testing)
  resetChat: () => {
    conversations = [];
    messages = [];
    estimates = [];
    estimateItems = [];
    invoices = [];
    invoiceItems = [];
    reports = [];
    initializeChat();
    return Promise.resolve(true);
  },
};
