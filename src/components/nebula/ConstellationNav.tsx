import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Server {
  id: string;
  name: string;
  emoji: string;
  color: string;
  unread: number;
  mentions: number;
}

const servers: Server[] = [
  { id: "home", name: "Главная", emoji: "🌌", color: "from-star-blue to-star-purple", unread: 0, mentions: 0 },
  { id: "1", name: "Космопорт", emoji: "🚀", color: "from-star-blue to-star-pink", unread: 12, mentions: 3 },
  { id: "2", name: "Звёздный Совет", emoji: "⭐", color: "from-star-amber to-star-pink", unread: 5, mentions: 0 },
  { id: "3", name: "Туманность", emoji: "🌀", color: "from-star-purple to-star-blue", unread: 0, mentions: 0 },
  { id: "4", name: "Орион", emoji: "🔭", color: "from-star-emerald to-star-blue", unread: 28, mentions: 7 },
  { id: "5", name: "Плеяды", emoji: "✨", color: "from-star-pink to-star-purple", unread: 3, mentions: 1 },
  { id: "6", name: "Андромеда", emoji: "🌠", color: "from-star-blue to-star-emerald", unread: 0, mentions: 0 },
];

interface Props {
  activeServer: string;
  onServerChange: (id: string) => void;
}

const ConstellationNav = ({ activeServer, onServerChange }: Props) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-[78px] h-full flex flex-col items-center py-3 gap-1.5 bg-nebula-void/80 backdrop-blur-xl border-r border-nebula-border/30">
      {servers.map((server, index) => {
        const isActive = activeServer === server.id;
        const isHovered = hoveredId === server.id;
        const isHome = server.id === "home";

        return (
          <div key={server.id} className="relative group">
            {index === 1 && (
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-nebula-border to-transparent mx-auto mb-1.5" />
            )}

            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[1px] z-10">
              <div
                className={`w-[3px] rounded-r-full transition-all duration-300 bg-gradient-to-b ${server.color} ${
                  isActive ? "h-9 opacity-100" : isHovered ? "h-5 opacity-70" : "h-0 opacity-0"
                }`}
              />
            </div>

            <button
              onClick={() => onServerChange(server.id)}
              onMouseEnter={() => setHoveredId(server.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? `rounded-2xl bg-gradient-to-br ${server.color} shadow-lg`
                  : isHovered
                  ? "rounded-2xl bg-nebula-elevated"
                  : "rounded-[24px] bg-nebula-surface"
              } ${isHome && !isActive ? "bg-nebula-surface" : ""}`}
              title={server.name}
            >
              <span className={`text-xl transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {server.emoji}
              </span>

              {isActive && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${server.color} opacity-20 animate-glow-pulse`} />
              )}
            </button>

            {server.mentions > 0 && (
              <div className="absolute -bottom-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-star-red text-[10px] font-bold text-white px-1 border-2 border-nebula-void z-20">
                {server.mentions}
              </div>
            )}

            {server.unread > 0 && server.mentions === 0 && (
              <div className="absolute top-1 -right-0.5 w-2 h-2 rounded-full bg-star-blue z-20" />
            )}

            {(isHovered || isActive) && (
              <div className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-200 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
              }`}>
                <div className="glass-strong rounded-lg px-3 py-1.5 text-sm font-medium text-star-white whitespace-nowrap shadow-xl">
                  {server.name}
                  {server.unread > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground">{server.unread} новых</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex-1" />

      <div className="flex flex-col gap-1.5 items-center pb-2">
        <button className="w-12 h-12 rounded-[24px] bg-nebula-surface hover:bg-nebula-elevated hover:rounded-2xl transition-all duration-300 flex items-center justify-center text-muted-foreground hover:text-star-emerald">
          <Icon name="Plus" size={22} />
        </button>
        <button className="w-12 h-12 rounded-[24px] bg-nebula-surface hover:bg-nebula-elevated hover:rounded-2xl transition-all duration-300 flex items-center justify-center text-muted-foreground hover:text-star-blue">
          <Icon name="Compass" size={22} />
        </button>
      </div>
    </div>
  );
};

export default ConstellationNav;
