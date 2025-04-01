import { useState, useEffect } from "react";
import { Chat, ChatList } from "@/components/ui/chat";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users } from "lucide-react";
import { auth } from "@/services/auth";
import { db } from "@/lib/database";

export default function ChatInterface() {
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<{
    userId: string;
    name: string;
  } | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserAndTeam = async () => {
      setLoading(true);
      try {
        // Get current user
        const user = auth.getCurrentUser();
        if (user) {
          setCurrentUserId(user.id);
        }

        // Load team members
        const members = await db.getTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndTeam();
  }, []);

  const handleSelectChat = (userId: string, name: string) => {
    setSelectedChat({ userId, name });
  };

  const handleSelectTeamMember = (member: any) => {
    setSelectedChat({ userId: member.id, name: member.name });
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
          Communicate with your team and guests
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        {selectedChat ? (
          <div className="h-full">
            <Chat
              currentUserId={currentUserId}
              receiverId={selectedChat.userId}
              receiverName={selectedChat.name}
              onClose={() => setSelectedChat(null)}
            />
          </div>
        ) : (
          <Tabs defaultValue="conversations" className="h-full flex flex-col">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="conversations" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversations
                </TabsTrigger>
                <TabsTrigger value="team" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden p-4">
              <TabsContent value="conversations" className="h-full mt-0">
                <ChatList
                  currentUserId={currentUserId}
                  onSelectChat={handleSelectChat}
                />
              </TabsContent>

              <TabsContent value="team" className="h-full mt-0">
                <div className="space-y-2">
                  {teamMembers.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No team members found
                    </div>
                  ) : (
                    teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-3 rounded-lg hover:bg-secondary/50 cursor-pointer flex items-center gap-3"
                        onClick={() => handleSelectTeamMember(member)}
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {member.role.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
}
