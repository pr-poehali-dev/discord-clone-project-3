import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number; reacted: boolean }[];
  isSystem?: boolean;
  role?: string;
  roleColor?: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    author: "CyberAdmin",
    avatar: "🤖",
    content: "Добро пожаловать в NEON CITY! Здесь мы обсуждаем всё, что связано с киберпанком. Не забудьте прочитать правила в соответствующем канале.",
    timestamp: "Сегодня в 14:30",
    role: "АДМИН",
    roleColor: "neon-pink",
    reactions: [{ emoji: "⚡", count: 12, reacted: true }, { emoji: "🔥", count: 8, reacted: false }],
  },
  {
    id: "2",
    author: "NightRunner",
    avatar: "🦾",
    content: "Кто-нибудь играл в новый патч Cyberpunk? Говорят добавили новые импланты",
    timestamp: "Сегодня в 14:35",
    role: "НЕТРАННЕР",
    roleColor: "neon-cyan",
    reactions: [{ emoji: "👀", count: 4, reacted: false }],
  },
  {
    id: "3",
    author: "SynthWave",
    avatar: "🎧",
    content: "Нашёл крутой synthwave микс, кидаю в музыку! 🎵",
    timestamp: "Сегодня в 14:42",
    role: "DJ",
    roleColor: "neon-purple",
  },
  {
    id: "4",
    author: "NeonArtist",
    avatar: "🎨",
    content: "Закончил новый арт для сервера. Как вам неоновый самурай? Потратил на него 3 дня",
    timestamp: "Сегодня в 15:01",
    role: "ХУДОЖНИК",
    roleColor: "neon-green",
    reactions: [
      { emoji: "🔥", count: 15, reacted: true },
      { emoji: "❤️", count: 9, reacted: true },
      { emoji: "💜", count: 6, reacted: false },
    ],
  },
  {
    id: "5",
    author: "GhostInShell",
    avatar: "👻",
    content: "Кто хочет в рейд на корпоратов? Нужна команда из 4-х нетраннеров",
    timestamp: "Сегодня в 15:15",
    reactions: [{ emoji: "✋", count: 3, reacted: false }],
  },
  {
    id: "sys1",
    author: "",
    avatar: "",
    content: "DataMiner присоединился к серверу — поприветствуем! 🎉",
    timestamp: "Сегодня в 15:20",
    isSystem: true,
  },
  {
    id: "6",
    author: "DataMiner",
    avatar: "⛏️",
    content: "Привет всем! Рад быть здесь. Слышал, что у вас самый крутой киберпанк сервер",
    timestamp: "Сегодня в 15:21",
    reactions: [{ emoji: "👋", count: 7, reacted: true }],
  },
  {
    id: "7",
    author: "CyberAdmin",
    avatar: "🤖",
    content: "Напоминаю — завтра стрим в 20:00! Будем показывать новые модификации для города. Не пропустите 🔴",
    timestamp: "Сегодня в 15:30",
    role: "АДМИН",
    roleColor: "neon-pink",
    reactions: [
      { emoji: "🔔", count: 22, reacted: true },
      { emoji: "⏰", count: 11, reacted: false },
    ],
  },
];

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      author: "NeonUser",
      avatar: "👤",
      content: message,
      timestamp: "Только что",
      role: "ТЫ",
      roleColor: "neon-cyan",
    };
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  const getRoleClasses = (color?: string) => {
    switch (color) {
      case "neon-pink": return "text-neon-pink border-neon-pink/30 bg-neon-pink/10";
      case "neon-cyan": return "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10";
      case "neon-purple": return "text-neon-purple border-neon-purple/30 bg-neon-purple/10";
      case "neon-green": return "text-neon-green border-neon-green/30 bg-neon-green/10";
      default: return "text-muted-foreground border-cyber-border bg-cyber-hover";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-cyber-dark relative scan-line">
      <div className="h-12 px-4 flex items-center gap-3 border-b border-cyber-border bg-cyber-dark/80 backdrop-blur-sm z-10">
        <Icon name="Hash" size={20} className="text-neon-cyan/60" />
        <span className="font-cyber text-sm text-neon-cyan tracking-wider">общий-чат</span>
        <div className="w-px h-6 bg-cyber-border mx-1" />
        <span className="text-xs text-muted-foreground/50 font-body truncate">Основной чат для общения участников NEON CITY</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-cyber-hover transition-colors">
            <Icon name="Bell" size={18} className="text-muted-foreground/50 hover:text-neon-cyan" />
          </button>
          <button className="p-1.5 rounded hover:bg-cyber-hover transition-colors">
            <Icon name="Pin" size={18} className="text-muted-foreground/50 hover:text-neon-cyan" />
          </button>
          <button className="p-1.5 rounded hover:bg-cyber-hover transition-colors">
            <Icon name="Users" size={18} className="text-muted-foreground/50 hover:text-neon-cyan" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-36 h-7 bg-cyber-darker border border-cyber-border rounded px-2 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-neon-cyan/50 font-body transition-colors"
            />
            <Icon name="Search" size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto cyber-scrollbar px-4 py-4 space-y-1 cyber-grid">
        {messages.map((msg) => {
          if (msg.isSystem) {
            return (
              <div key={msg.id} className="flex items-center justify-center py-2 animate-fade-in">
                <div className="flex items-center gap-2 text-xs text-neon-green/60">
                  <Icon name="ArrowRight" size={14} />
                  <span>{msg.content}</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className="flex gap-3 py-2 px-2 rounded-lg hover:bg-cyber-hover/30 transition-colors group animate-fade-in"
            >
              <div className="w-10 h-10 rounded-full bg-cyber-panel border border-cyber-border flex items-center justify-center text-lg flex-shrink-0 group-hover:border-neon-cyan/30 transition-colors">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-cyber text-xs tracking-wider text-neon-cyan hover:underline cursor-pointer">
                    {msg.author}
                  </span>
                  {msg.role && (
                    <span className={`text-[9px] font-cyber px-1.5 py-0.5 rounded border tracking-widest ${getRoleClasses(msg.roleColor)}`}>
                      {msg.role}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground/30 font-body">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-foreground/90 font-body leading-relaxed">{msg.content}</p>
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {msg.reactions.map((reaction, i) => (
                      <button
                        key={i}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-all
                          ${reaction.reacted
                            ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan"
                            : "bg-cyber-panel border-cyber-border text-muted-foreground/60 hover:border-neon-cyan/20"
                          }
                        `}
                      >
                        <span>{reaction.emoji}</span>
                        <span className="font-body">{reaction.count}</span>
                      </button>
                    ))}
                    <button className="w-6 h-6 rounded-full bg-cyber-panel border border-cyber-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-neon-cyan/30">
                      <Icon name="SmilePlus" size={12} className="text-muted-foreground/40" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
                <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
                  <Icon name="SmilePlus" size={16} className="text-muted-foreground/40 hover:text-neon-cyan" />
                </button>
                <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
                  <Icon name="Reply" size={16} className="text-muted-foreground/40 hover:text-neon-cyan" />
                </button>
                <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
                  <Icon name="MoreHorizontal" size={16} className="text-muted-foreground/40 hover:text-neon-cyan" />
                </button>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 pb-4 pt-1">
        <div className="flex items-center gap-2 bg-cyber-panel border border-cyber-border rounded-lg px-4 py-2 focus-within:border-neon-cyan/40 transition-colors">
          <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
            <Icon name="PlusCircle" size={20} className="text-muted-foreground/40 hover:text-neon-cyan" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Написать в #общий-чат..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none font-body"
          />
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
              <Icon name="Gift" size={20} className="text-muted-foreground/40 hover:text-neon-pink" />
            </button>
            <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
              <Icon name="ImagePlus" size={20} className="text-muted-foreground/40 hover:text-neon-green" />
            </button>
            <button className="p-1 rounded hover:bg-cyber-hover transition-colors">
              <Icon name="Smile" size={20} className="text-muted-foreground/40 hover:text-neon-yellow" />
            </button>
            <button
              onClick={handleSend}
              className={`p-1.5 rounded-md transition-all ${message.trim() ? "bg-neon-cyan/20 hover:bg-neon-cyan/30 neon-border-cyan border" : ""}`}
            >
              <Icon name="Send" size={18} className={message.trim() ? "text-neon-cyan" : "text-muted-foreground/20"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
