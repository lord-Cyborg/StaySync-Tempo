import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Send, User } from "lucide-react";
import { chatService } from "@/services/chat";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface ChatProps {
  currentUserId: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar?: string;
  onClose?: () => void;
}

export function Chat({
  currentUserId,
  receiverId,
  receiverName,
  receiverAvatar,
  onClose,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        // Create or get conversation
        const conversation = await chatService.createConversation([
          currentUserId,
          receiverId,
        ]);

        // Get messages
        const msgs = await chatService.getMessages(conversation.id);
        setMessages(msgs);

        // Mark messages as read
        const unreadMessageIds = msgs
          .filter((m) => m.receiverId === currentUserId && !m.read)
          .map((m) => m.id);

        if (unreadMessageIds.length > 0) {
          await chatService.markAsRead(unreadMessageIds);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [currentUserId, receiverId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      ) as HTMLElement;

      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const sentMessage = await chatService.sendMessage(
        currentUserId,
        receiverId,
        newMessage.trim(),
      );

      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      {/* Chat header */}
      <div className="p-3 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={receiverAvatar} alt={receiverName} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {receiverName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{receiverName}</h3>
            <p className="text-xs text-muted-foreground">
              {loading ? "Loading..." : "Online"}
            </p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      {/* Chat messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-3">
        {messages.length === 0 && !loading ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentUserId;

              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 text-right mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Message input */}
      <div className="p-3 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export function ChatList({
  currentUserId,
  onSelectChat,
}: {
  currentUserId: string;
  onSelectChat: (userId: string, name: string) => void;
}) {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      try {
        const convos = await chatService.getConversations(currentUserId);
        setConversations(convos);
      } catch (error) {
        console.error("Error loading conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="p-4 text-center text-muted-foreground">Loading...</div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No conversations yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(
          (id: string) => id !== currentUserId,
        );

        // Get user name based on ID pattern
        let name = "";
        if (otherParticipant.startsWith("maint")) {
          name = "Gerente de Manutenção";
        } else if (otherParticipant.startsWith("owner")) {
          name = "Proprietário";
        } else {
          name = "User " + otherParticipant.substring(0, 4);
        }

        return (
          <div
            key={conversation.id}
            className="p-3 rounded-lg hover:bg-secondary/50 cursor-pointer"
            onClick={() => onSelectChat(otherParticipant, name)}
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-medium">{name}</h4>
                {conversation.lastMessage && (
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.lastMessage.content}
                  </p>
                )}
              </div>
              {conversation.lastMessage &&
                !conversation.lastMessage.read &&
                conversation.lastMessage.receiverId === currentUserId && (
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
