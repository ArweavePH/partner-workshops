"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: `I understand you said: "${inputMessage}". How can I help you with that?`,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col h-[600px] w-full max-w-md mx-auto border rounded-lg overflow-hidden bg-background">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Arweave PH - AI Chat</h2>
        </div>
        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                } items-start`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.sender === "user" ? "U" : "B"}
                  </AvatarFallback>
                  <AvatarImage
                    src={
                      message.sender === "user"
                        ? "/user-avatar.png"
                        : "/bot-avatar.png"
                    }
                  />
                </Avatar>
                <div
                  className={`mx-2 p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex space-x-2"
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
