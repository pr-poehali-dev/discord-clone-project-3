import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Server {
  id: string;
  name: string;
  icon: string;
  hasNotification: boolean;
  mentions: number;
}

const servers: Server[] = [
  { id: "home", name: "Главная", icon: "🏠", hasNotification: false, mentions: 0 },
  { id: "1", name: "NEON CITY", icon: "🌃", hasNotification: true, mentions: 3 },
  { id: "2", name: "Cyber Hub", icon: "⚡", hasNotification: true, mentions: 0 },
  { id: "3", name: "Night Corp", icon: "🔮", hasNotification: false, mentions: 0 },
  { id: "4", name: "Netrunners", icon: "🕹️", hasNotification: true, mentions: 12 },
  { id: "5", name: "Synth Wave", icon: "🎵", hasNotification: false, mentions: 0 },
  { id: "6", name: "Arasaka", icon: "🏢", hasNotification: true, mentions: 1 },
  { id: "7", name: "Megacity", icon: "🌆", hasNotification: false, mentions: 0 },
];

interface Props {
  activeServer: string;
  onServerChange: (id: string) => void;
}

const ServerList = ({ activeServer, onServerChange }: Props) => {
  const [hoveredServer, setHoveredServer] = useState<string | null>(null);

  return (
    <div className="w-[72px] bg-cyber-darker flex flex-col items-center py-3 gap-2 cyber-scrollbar overflow-y-auto h-full">
      {servers.map((server, index) => (
        <div key={server.id}>
          {index === 1 && (
            <div className="w-8 h-[2px] bg-cyber-border mx-auto mb-2" />
          )}
          <div className="relative group">
            {server.hasNotification && activeServer !== server.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2 bg-neon-cyan rounded-r-full transition-all group-hover:h-5" />
            )}
            {activeServer === server.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-neon-cyan rounded-r-full neon-glow-cyan" />
            )}

            <button
              onClick={() => onServerChange(server.id)}
              onMouseEnter={() => setHoveredServer(server.id)}
              onMouseLeave={() => setHoveredServer(null)}
              className={`w-12 h-12 flex items-center justify-center text-xl transition-all duration-200 relative
                ${activeServer === server.id
                  ? "rounded-2xl bg-neon-cyan/20 neon-border-cyan border"
                  : "rounded-3xl hover:rounded-2xl bg-cyber-panel hover:bg-cyber-hover border border-transparent hover:border-neon-cyan/30"
                }
                ${server.id === "home" ? "bg-neon-cyan/10" : ""}
              `}
            >
              {server.id === "home" ? (
                <Icon name="Zap" size={24} className="text-neon-cyan" />
              ) : (
                <span>{server.icon}</span>
              )}
            </button>

            {server.mentions > 0 && (
              <div className="absolute -bottom-1 -right-1 min-w-[18px] h-[18px] bg-neon-red text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 neon-glow-pink border border-cyber-darker">
                {server.mentions}
              </div>
            )}

            {hoveredServer === server.id && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-cyber-panel border border-neon-cyan/30 text-neon-cyan px-3 py-1.5 rounded-md text-sm font-cyber whitespace-nowrap z-50 neon-glow-cyan animate-fade-in">
                {server.name}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neon-cyan/30" />
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="w-8 h-[2px] bg-cyber-border mx-auto my-1" />

      <button className="w-12 h-12 rounded-3xl hover:rounded-2xl bg-cyber-panel hover:bg-neon-green/10 border border-transparent hover:border-neon-green/30 flex items-center justify-center transition-all duration-200 group">
        <Icon name="Plus" size={24} className="text-neon-green group-hover:neon-text-green transition-all" />
      </button>

      <button className="w-12 h-12 rounded-3xl hover:rounded-2xl bg-cyber-panel hover:bg-neon-purple/10 border border-transparent hover:border-neon-purple/30 flex items-center justify-center transition-all duration-200 group">
        <Icon name="Compass" size={24} className="text-neon-purple group-hover:neon-text-purple transition-all" />
      </button>
    </div>
  );
};

export default ServerList;
