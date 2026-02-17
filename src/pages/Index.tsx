import { useState } from "react";
import SideNav from "@/components/prism/SideNav";
import ChatList from "@/components/prism/ChatList";
import Conversation from "@/components/prism/Conversation";
import InfoPanel from "@/components/prism/InfoPanel";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"chats" | "contacts" | "invites">("chats");
  const [activeChat, setActiveChat] = useState("1");

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-prism-void relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-[10%] w-[500px] h-[500px] bg-glow-mint/[0.02] rounded-full blur-[120px] animate-breathe" />
        <div className="absolute -bottom-32 right-[15%] w-[400px] h-[400px] bg-glow-violet/[0.02] rounded-full blur-[100px] animate-breathe" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-glow-coral/[0.015] rounded-full blur-[100px] animate-breathe" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <SideNav activeSection={activeSection} onSectionChange={setActiveSection} />
        <ChatList activeChat={activeChat} onChatChange={setActiveChat} />
        <Conversation />
        <InfoPanel />
      </div>
    </div>
  );
};

export default Index;
