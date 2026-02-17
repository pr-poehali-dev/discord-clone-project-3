import { useState } from "react";
import ConstellationNav from "@/components/nebula/ConstellationNav";
import OrbitChannels from "@/components/nebula/OrbitChannels";
import StarChat from "@/components/nebula/StarChat";
import CosmosPanel from "@/components/nebula/CosmosPanel";

const serverNames: Record<string, string> = {
  home: "Главная",
  "1": "Космопорт",
  "2": "Звёздный Совет",
  "3": "Туманность",
  "4": "Орион",
  "5": "Плеяды",
  "6": "Андромеда",
};

const Index = () => {
  const [activeServer, setActiveServer] = useState("1");
  const [activeChannel, setActiveChannel] = useState("4");

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-nebula-void relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-star-blue/[0.04] rounded-full blur-[100px] animate-nebula-drift" />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-star-purple/[0.04] rounded-full blur-[120px] animate-nebula-drift" style={{ animationDelay: "-7s" }} />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-star-pink/[0.03] rounded-full blur-[100px] animate-nebula-drift" style={{ animationDelay: "-14s" }} />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <ConstellationNav activeServer={activeServer} onServerChange={setActiveServer} />
        <OrbitChannels
          activeChannel={activeChannel}
          onChannelChange={setActiveChannel}
          serverName={serverNames[activeServer] || "Сервер"}
        />
        <StarChat />
        <CosmosPanel />
      </div>
    </div>
  );
};

export default Index;
