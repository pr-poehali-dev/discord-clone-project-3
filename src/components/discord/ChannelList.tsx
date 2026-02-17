import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice" | "announcement";
  unread: boolean;
  mentions?: number;
}

interface Category {
  id: string;
  name: string;
  channels: Channel[];
}

const categories: Category[] = [
  {
    id: "info",
    name: "ИНФО-БЛОК",
    channels: [
      { id: "1", name: "правила", type: "announcement", unread: false },
      { id: "2", name: "новости", type: "announcement", unread: true, mentions: 2 },
      { id: "3", name: "роли", type: "text", unread: false },
    ],
  },
  {
    id: "general",
    name: "ОСНОВНЫЕ",
    channels: [
      { id: "4", name: "общий-чат", type: "text", unread: true },
      { id: "5", name: "мемы", type: "text", unread: true, mentions: 5 },
      { id: "6", name: "арт", type: "text", unread: false },
      { id: "7", name: "музыка", type: "text", unread: false },
    ],
  },
  {
    id: "voice",
    name: "ГОЛОСОВЫЕ",
    channels: [
      { id: "8", name: "Общая комната", type: "voice", unread: false },
      { id: "9", name: "Приватная", type: "voice", unread: false },
      { id: "10", name: "Стрим", type: "voice", unread: false },
    ],
  },
];

interface Props {
  activeChannel: string;
  onChannelChange: (id: string) => void;
  serverName: string;
}

const ChannelList = ({ activeChannel, onChannelChange, serverName }: Props) => {
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "voice": return "Volume2";
      case "announcement": return "Megaphone";
      default: return "Hash";
    }
  };

  return (
    <div className="w-60 bg-cyber-dark flex flex-col h-full border-r border-cyber-border">
      <div className="h-12 px-4 flex items-center justify-between border-b border-cyber-border hover:bg-cyber-hover transition-colors cursor-pointer group">
        <h2 className="font-cyber text-sm text-neon-cyan truncate tracking-wider">{serverName}</h2>
        <Icon name="ChevronDown" size={16} className="text-neon-cyan/60 group-hover:text-neon-cyan transition-colors" />
      </div>

      <div className="flex-1 overflow-y-auto cyber-scrollbar px-2 py-2">
        {categories.map((category) => (
          <div key={category.id} className="mb-1">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex items-center gap-1 px-1 py-1.5 w-full text-[11px] font-cyber tracking-widest text-muted-foreground/60 hover:text-neon-cyan/80 transition-colors uppercase"
            >
              <Icon
                name="ChevronDown"
                size={10}
                className={`transition-transform ${collapsedCategories.includes(category.id) ? "-rotate-90" : ""}`}
              />
              {category.name}
            </button>

            {!collapsedCategories.includes(category.id) &&
              category.channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => onChannelChange(channel.id)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md w-full text-sm transition-all duration-150 group mb-0.5
                    ${activeChannel === channel.id
                      ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                      : channel.unread
                        ? "text-foreground hover:bg-cyber-hover/60 hover:text-neon-cyan border border-transparent"
                        : "text-muted-foreground/50 hover:bg-cyber-hover/40 hover:text-muted-foreground border border-transparent"
                    }
                  `}
                >
                  <Icon
                    name={getChannelIcon(channel.type)}
                    size={16}
                    className={activeChannel === channel.id ? "text-neon-cyan" : "text-muted-foreground/40"}
                  />
                  <span className={`truncate font-body ${channel.unread && activeChannel !== channel.id ? "font-medium" : ""}`}>
                    {channel.name}
                  </span>

                  {channel.mentions && channel.mentions > 0 && (
                    <span className="ml-auto min-w-[18px] h-[18px] bg-neon-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                      {channel.mentions}
                    </span>
                  )}

                  <div className="ml-auto hidden group-hover:flex items-center gap-1">
                    <Icon name="UserPlus" size={14} className="text-muted-foreground/50 hover:text-neon-cyan" />
                    <Icon name="Settings" size={14} className="text-muted-foreground/50 hover:text-neon-cyan" />
                  </div>
                </button>
              ))}
          </div>
        ))}
      </div>

      <div className="h-[52px] bg-cyber-darker px-2 flex items-center gap-2 border-t border-cyber-border">
        <div className="w-8 h-8 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center relative">
          <span className="text-sm">👤</span>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-neon-green rounded-full border-2 border-cyber-darker" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-cyber text-neon-cyan truncate tracking-wide">NeonUser</p>
          <p className="text-[10px] text-neon-green">В сети</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
            <Icon name="Mic" size={16} className="text-muted-foreground/60 hover:text-neon-cyan" />
          </button>
          <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
            <Icon name="Headphones" size={16} className="text-muted-foreground/60 hover:text-neon-cyan" />
          </button>
          <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
            <Icon name="Settings" size={16} className="text-muted-foreground/60 hover:text-neon-cyan" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
