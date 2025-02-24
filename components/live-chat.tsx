"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Send, Phone } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "driver";
  content: string;
  timestamp: Date;
}

interface Driver {
  name: string;
  avatar: string;
  rating: number;
}

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [driver, setDriver] = useState<Driver>({
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
  });

  useEffect(() => {
    // Simulating receiving a message from the driver
    const timer = setTimeout(() => {
      const driverMessage: Message = {
        id: messages.length + 1,
        sender: "driver",
        content: "Hello! I'm on my way to pick you up. See you soon!",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, driverMessage]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [messages.length]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={driver.avatar} />
            <AvatarFallback>{driver.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-semibold">{driver.name}</h4>
            <p className="text-sm text-muted-foreground">⭐ {driver.rating}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`rounded-lg p-2 max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
