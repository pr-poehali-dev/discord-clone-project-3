import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice" | "announce";
  unread?: boolean;
  users?: number;
}

interface ChannelGroup {
  name: string;
  channels: Channel[];
}

const channelGroups: ChannelGroup[] = [
  {
    name: "Общее",
    channels: [
      { id: "1", name: "приветствие", type: "announce" },
      { id: "2", name: "правила", type: "announce" },
      { id: "3", name: "общий-чат", type: "text", unread: true },
    ],
  },
  {
    name: "Обсуждение",
    channels: [
      { id: "4", name: "проекты", type: "text", unread: true },
      { id: "5", name: "вопросы", type: "text" },
      { id: "6", name: "ресурсы", type: "text" },
    ],
  },
  {
    name: "Голосовые",
    channels: [
      { id: "7", name: "Общая комната", type: "voice", users: 3 },
      { id: "8", name: "Рабочая зона", type: "voice", users: 0 },
    ],
  },
];

const getChannelIcon = (type: string) => {
  switch (type) {
    case "voice": return "Volume2";
    case "announce": return "Megaphone";
    default: return "Hash";
  }
};

interface ChannelSidebarProps {
  activeChannel: string;
  onChannelChange: (id: string) => void;
  serverName: string;
}

const ChannelSidebar = ({ activeChannel, onChannelChange, serverName }: ChannelSidebarProps) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (name: string) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="w-60 h-full flex flex-col bg-surface-raised/50 border-r border-white/[0.04]">
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.04] flex-shrink-0">
        <h2 className="font-display font-semibold text-sm text-white/90 truncate">{serverName}</h2>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
          <Icon name="ChevronDown" size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto smooth-scrollbar py-3 px-2">
        {channelGroups.map((group) => (
          <div key={group.name} className="mb-3">
            <button
              onClick={() => toggleGroup(group.name)}
              className="flex items-center gap-1 px-2 py-1 w-full text-[11px] font-semibold uppercase tracking-wider text-white/25 hover:text-white/50 transition-colors"
            >
              <Icon
                name="ChevronRight"
                size={10}
                className={`transition-transform duration-200 ${collapsed[group.name] ? "" : "rotate-90"}`}
              />
              {group.name}
            </button>

            {!collapsed[group.name] && (
              <div className="mt-0.5 space-y-0.5">
                {group.channels.map((channel) => {
                  const isActive = activeChannel === channel.id;
                  return (
                    <button
                      key={channel.id}
                      onClick={() => onChannelChange(channel.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-all duration-200 group ${
                        isActive
                          ? "bg-white/[0.08] text-white"
                          : "text-white/35 hover:text-white/70 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        name={getChannelIcon(channel.type)}
                        size={16}
                        className={isActive ? "text-aurora-blue" : "text-white/20 group-hover:text-white/40"}
                      />
                      <span className="truncate flex-1 text-left">{channel.name}</span>
                      {channel.unread && !isActive && (
                        <div className="w-2 h-2 rounded-full bg-aurora-blue" />
                      )}
                      {channel.type === "voice" && channel.users! > 0 && (
                        <span className="text-[10px] text-aurora-mint/70 bg-aurora-mint/10 px-1.5 py-0.5 rounded-full">
                          {channel.users}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="h-14 px-3 flex items-center gap-2 border-t border-white/[0.04] flex-shrink-0 bg-surface/80">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-blue to-aurora-purple flex items-center justify-center text-xs font-semibold text-white">
            А
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-aurora-mint border-2 border-surface" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white/80 truncate">Алексей</p>
          <p className="text-[10px] text-white/25">В сети</p>
        </div>
        <div className="flex gap-0.5">
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-all">
            <Icon name="Mic" size={14} />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-all">
            <Icon name="Settings" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelSidebar;
