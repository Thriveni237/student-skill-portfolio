"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 0,
      name: 'TechFlow Solutions',
      role: 'Recruiter',
      lastMessage: 'We loved your portfolio! Are you free for a call?',
      time: '10:24 AM',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'
    },
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Student',
      lastMessage: 'I have updated the project links as requested.',
      time: 'Yesterday',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    }
  ];

  const messages = [
    { id: 1, text: "Hello! I saw your application for the Frontend role.", sender: 'them', time: '10:00 AM' },
    { id: 2, text: "Hi! Yes, I'm very interested in the position.", sender: 'me', time: '10:05 AM' },
    { id: 3, text: "We loved your portfolio! Are you free for a call?", sender: 'them', time: '10:24 AM' },
  ];

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] flex bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search messages..." className="pl-10 bg-slate-50 border-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={cn(
                  "p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors",
                  activeChat === chat.id && "bg-blue-50/50 border-r-2 border-blue-600"
                )}
              >
                <Avatar>
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{chat.name}</h4>
                    <span className="text-[10px] text-slate-500">{chat.time}</span>
                  </div>
                  <p className={cn(
                    "text-xs truncate",
                    chat.unread ? "text-slate-900 font-semibold" : "text-slate-500"
                  )}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={chats[activeChat].avatar} />
                <AvatarFallback>{chats[activeChat].name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-slate-900">{chats[activeChat].name}</h3>
                <p className="text-xs text-emerald-600 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon"><Video className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[70%]",
                  msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-2 rounded-2xl text-sm",
                  msg.sender === 'me' 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white border text-slate-900 rounded-tl-none shadow-sm"
                )}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setMessage("");
              }}
            >
              <Input 
                placeholder="Type a message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;