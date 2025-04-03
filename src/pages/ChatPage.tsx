import { useState } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, History } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col bg-background">
      <Tabs defaultValue="chat" className="h-full flex flex-col">
        <div className="px-4 pt-2 border-b">
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat Atual
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex-1">
              <History className="h-4 w-4 mr-2" />
              Simulação de Manutenção
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="chat" className="h-full mt-0">
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="h-full mt-0">
            <div className="h-full bg-background p-4">
              <iframe
                src="/tempobook/storyboards/aa6a4a75-3c51-4289-ad35-5021a8c2d21e"
                className="w-full h-full border rounded-lg"
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
