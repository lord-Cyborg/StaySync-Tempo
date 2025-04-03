import { useState, useEffect } from "react";
import { Chat, ChatList } from "@/components/ui/chat";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Users,
  FileText,
  ClipboardCheck,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Plus,
  FileEdit,
  Download,
} from "lucide-react";
import { auth } from "@/services/auth";
import { db } from "@/lib/database";
import { chatService } from "@/services/chat";
import {
  ChatConversation,
  ServiceEstimate,
  ServiceEstimateItem,
  Invoice,
  ServiceReport,
} from "@/lib/database/schema";

export default function ChatInterface() {
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserRole, setCurrentUserRole] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<{
    conversationId: string;
    name: string;
    type: string;
  } | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeEstimate, setActiveEstimate] = useState<ServiceEstimate | null>(
    null,
  );
  const [estimateItems, setEstimateItems] = useState<ServiceEstimateItem[]>([]);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [activeReport, setActiveReport] = useState<ServiceReport | null>(null);
  const [activeTab, setActiveTab] = useState<string>("chat");

  useEffect(() => {
    const loadUserAndTeam = async () => {
      setLoading(true);
      try {
        // Get current user
        const user = auth.getCurrentUser();
        if (user) {
          setCurrentUserId(user.id);
          setCurrentUserRole(user.role);
        }

        // Load team members
        const members = await db.getTeamMembers();
        setTeamMembers(members);

        // Load conversations
        if (user) {
          const userConversations = await chatService.getConversations(user.id);
          setConversations(userConversations);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndTeam();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadConversationData(selectedChat.conversationId);
    }
  }, [selectedChat]);

  const loadConversationData = async (conversationId: string) => {
    try {
      // Load estimate if exists
      const estimates =
        await chatService.getEstimatesByConversation(conversationId);
      if (estimates.length > 0) {
        const latestEstimate = estimates.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0];
        setActiveEstimate(latestEstimate);

        // Load estimate items
        const items = await chatService.getEstimateItems(latestEstimate.id);
        setEstimateItems(items);
      } else {
        setActiveEstimate(null);
        setEstimateItems([]);
      }

      // Load invoice if exists
      const invoices =
        await chatService.getInvoicesByConversation(conversationId);
      if (invoices.length > 0) {
        const latestInvoice = invoices.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0];
        setActiveInvoice(latestInvoice);
      } else {
        setActiveInvoice(null);
      }

      // Load report if exists
      const reports =
        await chatService.getReportsByConversation(conversationId);
      if (reports.length > 0) {
        const latestReport = reports.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0];
        setActiveReport(latestReport);
      } else {
        setActiveReport(null);
      }
    } catch (error) {
      console.error("Error loading conversation data:", error);
    }
  };

  const handleSelectChat = (
    conversationId: string,
    name: string,
    type: string,
  ) => {
    setSelectedChat({ conversationId, name, type });
    setActiveTab("chat");
  };

  const handleSelectTeamMember = (member: any) => {
    // Create or find a direct conversation with this team member
    chatService
      .createConversation({
        participants: [currentUserId, member.id],
        type: "direct",
      })
      .then((conversation) => {
        setSelectedChat({
          conversationId: conversation.id,
          name: member.name,
          type: "direct",
        });
        setActiveTab("chat");
      })
      .catch((error) => {
        console.error("Error creating conversation:", error);
      });
  };

  const handleApproveEstimate = async () => {
    if (!activeEstimate) return;

    try {
      // Update estimate status
      const updatedEstimate = await chatService.updateEstimate(
        activeEstimate.id,
        {
          status: "approved",
          approvedById: currentUserId,
          approvedAt: new Date().toISOString(),
        },
      );

      setActiveEstimate(updatedEstimate);

      // Send a message in the chat about the approval
      await chatService.sendMessage({
        conversationId: selectedChat!.conversationId,
        senderId: currentUserId,
        content: `Estimate for ${updatedEstimate.title} has been approved.`,
        contentType: "text",
      });
    } catch (error) {
      console.error("Error approving estimate:", error);
    }
  };

  const handleRejectEstimate = async () => {
    if (!activeEstimate) return;

    try {
      // Update estimate status
      const updatedEstimate = await chatService.updateEstimate(
        activeEstimate.id,
        {
          status: "rejected",
          approvedById: currentUserId,
          approvedAt: new Date().toISOString(),
        },
      );

      setActiveEstimate(updatedEstimate);

      // Send a message in the chat about the rejection
      await chatService.sendMessage({
        conversationId: selectedChat!.conversationId,
        senderId: currentUserId,
        content: `Estimate for ${updatedEstimate.title} has been rejected.`,
        contentType: "text",
      });
    } catch (error) {
      console.error("Error rejecting estimate:", error);
    }
  };

  const renderEstimateStatus = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-100">
            <Clock className="h-3 w-3 mr-1" /> Draft
          </Badge>
        );
      case "sent":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <Send className="h-3 w-3 mr-1" /> Sent
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
    }
  };

  const renderInvoiceStatus = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-100">
            <Clock className="h-3 w-3 mr-1" /> Draft
          </Badge>
        );
      case "sent":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <Send className="h-3 w-3 mr-1" /> Sent
          </Badge>
        );
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Paid
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Overdue
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <XCircle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading chat...</p>
      </div>
    );
  }

  if (!currentUserId) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">Please log in to use the chat</p>
        <Button onClick={() => (window.location.href = "/login")}>
          Log In
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Chat</h2>
        <p className="text-sm text-muted-foreground">
          Communicate with your team, service providers, and manage service
          requests
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        {selectedChat ? (
          <div className="h-full flex flex-col">
            <div className="px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedChat(null)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Back to Conversations
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <h3 className="font-medium">{selectedChat.name}</h3>
              </div>
              <div className="flex gap-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="chat">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </TabsTrigger>
                    {selectedChat.type === "service" && (
                      <>
                        <TabsTrigger value="estimate">
                          <FileText className="h-4 w-4 mr-2" />
                          Estimate
                        </TabsTrigger>
                        <TabsTrigger value="invoice">
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          Invoice
                        </TabsTrigger>
                        <TabsTrigger value="report">
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                          Report
                        </TabsTrigger>
                      </>
                    )}
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="chat" className="h-full m-0">
                <Chat
                  currentUserId={currentUserId}
                  conversationId={selectedChat.conversationId}
                  receiverName={selectedChat.name}
                  onClose={() => setSelectedChat(null)}
                />
              </TabsContent>

              {selectedChat.type === "service" && (
                <>
                  <TabsContent
                    value="estimate"
                    className="h-full m-0 p-4 overflow-auto"
                  >
                    {activeEstimate ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">
                              {activeEstimate.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {activeEstimate.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {renderEstimateStatus(activeEstimate.status)}
                            <p className="text-sm">
                              Created: {formatDate(activeEstimate.createdAt)}
                            </p>
                          </div>
                        </div>

                        <Card className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">
                                Service Type
                              </p>
                              <p className="capitalize">
                                {activeEstimate.serviceType}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Total Estimated Cost
                              </p>
                              <p className="text-lg font-bold">
                                {formatCurrency(activeEstimate.estimatedCost)}
                              </p>
                            </div>
                            {activeEstimate.estimatedHours && (
                              <div>
                                <p className="text-sm font-medium">
                                  Estimated Hours
                                </p>
                                <p>{activeEstimate.estimatedHours} hours</p>
                              </div>
                            )}
                            {activeEstimate.approvedAt && (
                              <div>
                                <p className="text-sm font-medium">
                                  Approved Date
                                </p>
                                <p>{formatDate(activeEstimate.approvedAt)}</p>
                              </div>
                            )}
                          </div>
                        </Card>

                        <div>
                          <h4 className="font-medium mb-2">Estimate Items</h4>
                          <div className="bg-secondary/50 rounded-md overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-secondary">
                                <tr>
                                  <th className="text-left p-2">Description</th>
                                  <th className="text-right p-2">Quantity</th>
                                  <th className="text-right p-2">Unit Price</th>
                                  <th className="text-right p-2">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {estimateItems.map((item) => (
                                  <tr
                                    key={item.id}
                                    className="border-t border-secondary"
                                  >
                                    <td className="p-2">
                                      <div>
                                        <p>{item.description}</p>
                                        <p className="text-xs text-muted-foreground capitalize">
                                          {item.itemType}
                                        </p>
                                      </div>
                                    </td>
                                    <td className="p-2 text-right">
                                      {item.quantity}
                                    </td>
                                    <td className="p-2 text-right">
                                      {formatCurrency(item.unitPrice)}
                                    </td>
                                    <td className="p-2 text-right">
                                      {formatCurrency(item.amount)}
                                    </td>
                                  </tr>
                                ))}
                                <tr className="border-t border-secondary bg-secondary/80">
                                  <td
                                    colSpan={3}
                                    className="p-2 text-right font-medium"
                                  >
                                    Total
                                  </td>
                                  <td className="p-2 text-right font-bold">
                                    {formatCurrency(
                                      activeEstimate.estimatedCost,
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {activeEstimate.notes && (
                          <div>
                            <h4 className="font-medium mb-2">Notes</h4>
                            <p className="p-3 bg-secondary/50 rounded-md">
                              {activeEstimate.notes}
                            </p>
                          </div>
                        )}

                        {activeEstimate.status === "sent" && (
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              onClick={handleRejectEstimate}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject Estimate
                            </Button>
                            <Button
                              variant="default"
                              onClick={handleApproveEstimate}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve Estimate
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">
                          No estimate available for this conversation
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent
                    value="invoice"
                    className="h-full m-0 p-4 overflow-auto"
                  >
                    {activeInvoice ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">
                              Invoice #{activeInvoice.id.substring(0, 8)}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {activeInvoice.notes || "Service invoice"}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {renderInvoiceStatus(activeInvoice.status)}
                            <p className="text-sm">
                              Issued: {formatDate(activeInvoice.issueDate)}
                            </p>
                            <p className="text-sm">
                              Due: {formatDate(activeInvoice.dueDate)}
                            </p>
                          </div>
                        </div>

                        <Card className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">
                                Total Amount
                              </p>
                              <p className="text-lg font-bold">
                                {formatCurrency(activeInvoice.totalAmount)}
                              </p>
                            </div>
                          </div>
                        </Card>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">
                          No invoice available for this conversation
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent
                    value="report"
                    className="h-full m-0 p-4 overflow-auto"
                  >
                    {activeReport ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">
                              {activeReport.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {activeReport.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800"
                            >
                              <FileEdit className="h-3 w-3 mr-1" /> Report
                            </Badge>
                            <p className="text-sm">
                              Created: {formatDate(activeReport.createdAt)}
                            </p>
                          </div>
                        </div>

                        <Card className="p-4">
                          <div className="space-y-4">
                            {activeReport.findings && (
                              <div>
                                <h4 className="font-medium">Findings</h4>
                                <p className="mt-1">{activeReport.findings}</p>
                              </div>
                            )}

                            {activeReport.completionDate && (
                              <div>
                                <h4 className="font-medium">Completion Date</h4>
                                <p className="mt-1">
                                  {formatDate(activeReport.completionDate)}
                                </p>
                              </div>
                            )}

                            {activeReport.recommendations && (
                              <div>
                                <h4 className="font-medium">Recommendations</h4>
                                <p className="mt-1">
                                  {activeReport.recommendations}
                                </p>
                              </div>
                            )}
                          </div>
                        </Card>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download Report
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">
                          No service report available for this conversation
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full grid md:grid-cols-[300px_1fr] divide-x">
            <div className="p-4 overflow-auto">
              <Tabs defaultValue="chats">
                <TabsList className="w-full">
                  <TabsTrigger value="chats" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chats
                  </TabsTrigger>
                  <TabsTrigger value="team" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="chats" className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Recent Conversations</h3>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4 mr-2" />
                      New Chat
                    </Button>
                  </div>
                  <ChatList
                    conversations={conversations}
                    onSelectChat={handleSelectChat}
                  />
                </TabsContent>
                <TabsContent value="team" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Team Members</h3>
                    <div className="space-y-2">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary cursor-pointer"
                          onClick={() => handleSelectTeamMember(member)}
                        >
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="max-w-md text-center p-8">
                <MessageSquare className="h-12 w-12 mx-auto text-primary/50 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the sidebar or start a new chat to
                  begin messaging
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
