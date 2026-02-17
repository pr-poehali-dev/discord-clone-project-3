import { useState } from "react";
import SpaceList from "@/components/aurora/SpaceList";
import ChannelSidebar from "@/components/aurora/ChannelSidebar";
import ChatPanel from "@/components/aurora/ChatPanel";
import RightPanel from "@/components/aurora/RightPanel";

const serverNames: Record<string, string> = {
  home: "Главная",
  "1": "Дизайнеры",
  "2": "Разработка",
  "3": "Музыка",
  "4": "Игры",
  "5": "Кино",
};

type RightTab = "members" | "profile" | "notifications" | "search";

const Index = () => {
  const [activeSpace, setActiveSpace] = useState("1");
  const [activeChannel, setActiveChannel] = useState("4");
  const [rightTab, setRightTab] = useState<RightTab>("members");

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-surface relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-aurora-blue/[0.07] rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-aurora-purple/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-aurora-pink/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <SpaceList activeSpace={activeSpace} onSpaceChange={setActiveSpace} />
        <ChannelSidebar
          activeChannel={activeChannel}
          onChannelChange={setActiveChannel}
          serverName={serverNames[activeSpace] || "Сервер"}
        />
        <ChatPanel />
        <RightPanel activeTab={rightTab} onTabChange={setRightTab} />
      </div>
    </div>
  );
};

export default Index;
