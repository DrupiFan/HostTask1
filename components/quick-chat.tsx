"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send, User, Minimize2, PhoneOff } from "lucide-react"

interface QuickChatProps {
  language: "en" | "ka"
}

interface Message {
  id: string
  text: string
  sender: "user" | "manager"
  timestamp: Date
}

export default function QuickChat({ language }: QuickChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: language === "en" ? "Hello! How can I help you today?" : "მოგესალმებით, რითი შემიძლია თქვენი დახმარება?",
      sender: "manager",
      timestamp: new Date(),
    },
  ])

  const translations = {
    en: {
      chatWithManager: "Chat with Manager",
      typeMessage: "Type your message...",
      send: "Send",
      manager: "Manager",
      you: "You",
      online: "Online",
      endChat: "End Chat",
      chatEnded: "Chat ended. Thank you for contacting us!",
    },
    ka: {
      chatWithManager: "მენეჯერთან ჩატი",
      typeMessage: "დაწერეთ შეტყობინება...",
      send: "გაგზავნა",
      manager: "მენეჯერი",
      you: "თქვენ",
      online: "ონლაინ",
      endChat: "ჩატის დასრულება",
      chatEnded: "ჩატი დასრულდა. მადლობა დაკავშირებისთვის!",
    },
  }

  const t = translations[language]

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: "user",
        timestamp: new Date(),
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate manager response after 2 seconds
      setTimeout(() => {
        const managerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text:
            language === "en"
              ? "Thank you for your message. I'll get back to you shortly."
              : "მადლობა დაკავშირებისთვის, მენეჯერი მალე გიპასუხებთ.",
          sender: "manager",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, managerResponse])
      }, 2000)
    }
  }

  const handleEndChat = () => {
    // Add end chat message
    const endMessage: Message = {
      id: Date.now().toString(),
      text: t.chatEnded,
      sender: "manager",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, endMessage])

    // Close chat after 2 seconds
    setTimeout(() => {
      setIsOpen(false)
      // Reset messages to initial state
      setMessages([
        {
          id: "1",
          text:
            language === "en" ? "Hello! How can I help you today?" : "მოგესალმებით, რითი შემიძლია თქვენი დახმარება?",
          sender: "manager",
          timestamp: new Date(),
        },
      ])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
            isMinimized ? "h-12 sm:h-14" : "h-80 sm:h-96"
          } w-72 sm:w-80 animate-slideInUp`}
        >
          <Card className="h-full shadow-2xl border-2 border-teal-200 bg-white">
            {/* Chat Header */}
            <CardHeader className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-2 sm:p-3 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-xs sm:text-sm font-semibold">{t.chatWithManager}</CardTitle>
                    <p className="text-xs text-teal-100">{t.online}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEndChat}
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-white hover:bg-red-500/20"
                    title={t.endChat}
                  >
                    <PhoneOff className="h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-white hover:bg-white/20"
                  >
                    <Minimize2 className="h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-white hover:bg-white/20"
                  >
                    <X className="h-2 w-2 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Chat Content */}
            {!isMinimized && (
              <CardContent className="p-0 flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 sm:space-y-3 max-h-56 sm:max-h-64">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] p-2 rounded-lg text-xs sm:text-sm ${
                          msg.sender === "user"
                            ? "bg-teal-500 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-2 sm:p-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t.typeMessage}
                      className="flex-1 h-8 sm:h-9 text-xs sm:text-sm border-gray-300 focus:border-teal-400 focus:ring-teal-400"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="h-8 w-8 sm:h-9 sm:w-9 px-2 sm:px-3 bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
