import { useState } from "react";
import ServerList from "@/components/discord/ServerList";
import ChannelList from "@/components/discord/ChannelList";
import ChatArea from "@/components/discord/ChatArea";
import MemberList from "@/components/discord/MemberList";

const serverNames: Record<string, string> = {
  home: "Главная",
  "1": "NEON CITY",
  "2": "Cyber Hub",
  "3": "Night Corp",
  "4": "Netrunners",
  "5": "Synth Wave",
  "6": "Arasaka",
  "7": "Megacity",
};

const Index = () => {
  const [activeServer, setActiveServer] = useState("1");
  const [activeChannel, setActiveChannel] = useState("4");
  const [showMembers, setShowMembers] = useState(true);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-cyber-darker relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/2 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <ServerList activeServer={activeServer} onServerChange={setActiveServer} />
        <ChannelList
          activeChannel={activeChannel}
          onChannelChange={setActiveChannel}
          serverName={serverNames[activeServer] || "Сервер"}
        />
        <ChatArea />
        {showMembers && <MemberList />}
      </div>
    </div>
  );
};

export default Index;
