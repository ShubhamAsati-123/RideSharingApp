"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const chatbotVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", duration: 0.5 },
    },
    exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatbotVariants}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="w-80 h-[500px] flex flex-col shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  RideShare Helper
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 py-0"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow">
                <ScrollArea className="h-full w-full pr-4 overflow-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-end ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <div
                          className={`rounded-full p-2 ${
                            message.role === "user"
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <Bot className="h-4 w-4 text-secondary-foreground" />
                          )}
                        </div>
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground mr-2"
                              : "bg-secondary text-secondary-foreground ml-2"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-secondary text-secondary-foreground rounded-lg p-3 ml-6">
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75" />
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full w-8 h-8 p-0 shadow-lg transition-transform duration-300"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-12 w-12" />
        </Button>
      )}
    </>
  );
}
