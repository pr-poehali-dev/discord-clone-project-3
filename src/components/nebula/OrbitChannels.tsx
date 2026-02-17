import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice" | "announcement";
  unread?: boolean;
  mentions?: number;
  users?: number;
}

interface ChannelGroup {
  name: string;
  channels: Channel[];
}

const channelGroups: ChannelGroup[] = [
  {
    name: "Информация",
    channels: [
      { id: "1", name: "правила", type: "announcement" },
      { id: "2", name: "новости", type: "announcement", unread: true },
      { id: "3", name: "объявления", type: "text" },
    ],
  },
  {
    name: "Общение",
    channels: [
      { id: "4", name: "основной", type: "text", mentions: 3 },
      { id: "5", name: "флуд", type: "text", unread: true },
      { id: "6", name: "мемы", type: "text" },
      { id: "7", name: "творчество", type: "text" },
    ],
  },
  {
    name: "Голосовые",
    channels: [
      { id: "8", name: "Общий голос", type: "voice", users: 4 },
      { id: "9", name: "Музыка", type: "voice", users: 2 },
      { id: "10", name: "Приватный", type: "voice" },
    ],
  },
];

const channelIcons: Record<string, string> = {
  text: "Hash",
  voice: "Headphones",
  announcement: "Megaphone",
};

interface Props {
  activeChannel: string;
  onChannelChange: (id: string) => void;
  serverName: string;
}

const OrbitChannels = ({ activeChannel, onChannelChange, serverName }: Props) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleGroup = (name: string) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="w-[250px] h-full flex flex-col bg-nebula-deep/50 backdrop-blur-md border-r border-nebula-border/20">
      <div className="h-[52px] flex items-center px-4 border-b border-nebula-border/20 shrink-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="font-display font-semibold text-[15px] text-star-white truncate">{serverName}</h2>
          <div className="w-2 h-2 rounded-full bg-star-emerald shrink-0" />
        </div>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white transition-colors">
          <Icon name="ChevronDown" size={16} />
        </button>
      </div>

      {searchOpen && (
        <div className="px-3 pt-3 animate-slide-up">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск каналов..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-nebula-surface/80 border border-nebula-border/30 text-sm text-star-white placeholder:text-muted-foreground focus:outline-none focus:border-star-blue/40 transition-colors"
              autoFocus
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto nebula-scrollbar py-3 px-2">
        {channelGroups.map((group) => (
          <div key={group.name} className="mb-1">
            <button
              onClick={() => toggleGroup(group.name)}
              className="w-full flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-star-white/70 transition-colors"
            >
              <Icon
                name="ChevronRight"
                size={10}
                className={`transition-transform duration-200 ${collapsed[group.name] ? "" : "rotate-90"}`}
              />
              {group.name}
              <span className="ml-auto text-[10px] opacity-50">{group.channels.length}</span>
            </button>

            {!collapsed[group.name] && (
              <div className="space-y-0.5 mt-0.5">
                {group.channels.map((channel) => {
                  const isActive = activeChannel === channel.id;

                  return (
                    <button
                      key={channel.id}
                      onClick={() => onChannelChange(channel.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-sm transition-all duration-200 group ${
                        isActive
                          ? "bg-star-blue/10 text-star-white"
                          : "text-muted-foreground hover:text-star-white/80 hover:bg-nebula-hover/30"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-star-blue to-star-purple" />
                      )}
                      <Icon
                        name={channelIcons[channel.type]}
                        size={16}
                        className={`shrink-0 ${
                          isActive
                            ? "text-star-blue"
                            : channel.type === "voice"
                            ? "text-star-emerald/60"
                            : ""
                        }`}
                      />
                      <span className={`truncate ${isActive ? "font-medium" : ""} ${channel.unread && !isActive ? "text-star-white font-medium" : ""}`}>
                        {channel.name}
                      </span>

                      {channel.mentions && channel.mentions > 0 && (
                        <span className="ml-auto min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-star-red text-[10px] font-bold text-white px-1">
                          {channel.mentions}
                        </span>
                      )}

                      {channel.users && channel.users > 0 && (
                        <div className="ml-auto flex items-center gap-1 text-[11px] text-star-emerald/70">
                          <Icon name="User" size={11} />
                          {channel.users}
                        </div>
                      )}

                      {!isActive && !channel.mentions && (
                        <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white">
                            <Icon name="Settings" size={12} />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-nebula-border/20 px-2.5 py-2.5 shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-nebula-hover/30 transition-colors cursor-pointer group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-star-blue to-star-purple flex items-center justify-center text-sm font-bold text-white">
              Н
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-star-emerald border-2 border-nebula-deep" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-star-white truncate">Навигатор</div>
            <div className="text-[11px] text-star-emerald">В сети</div>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white transition-colors">
              <Icon name="Mic" size={14} />
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white transition-colors">
              <Icon name="Headphones" size={14} />
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white transition-colors"
            >
              <Icon name="Settings" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitChannels;
