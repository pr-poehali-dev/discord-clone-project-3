import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Reaction {
  emoji: string;
  count: number;
  active: boolean;
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  role?: string;
  roleColor?: string;
  content: string;
  time: string;
  reactions: Reaction[];
  isSystem?: boolean;
  replyTo?: string;
}

const messages: Message[] = [
  {
    id: "1",
    author: "Капитан Стелла",
    avatar: "КС",
    avatarColor: "from-star-pink to-star-purple",
    role: "Командир",
    roleColor: "star-pink",
    content: "Экипаж, внимание! Завтра в 18:00 общий сбор в голосовом канале. Обсудим план экспедиции к туманности Ориона.",
    time: "14:32",
    reactions: [{ emoji: "🚀", count: 8, active: true }, { emoji: "👍", count: 5, active: false }],
  },
  {
    id: "sys1",
    author: "",
    avatar: "",
    avatarColor: "",
    content: "Астронавт Рей присоединился к серверу",
    time: "14:35",
    reactions: [],
    isSystem: true,
  },
  {
    id: "2",
    author: "Астронавт Рей",
    avatar: "АР",
    avatarColor: "from-star-blue to-star-emerald",
    role: "Пилот",
    roleColor: "star-blue",
    content: "Принято, капитан! Уже подготовил навигационные карты. Маршрут оптимизирован, расчётное время в пути — 4.2 парсека.",
    time: "14:38",
    reactions: [{ emoji: "⭐", count: 3, active: false }],
    replyTo: "Капитан Стелла",
  },
  {
    id: "3",
    author: "Инженер Нова",
    avatar: "ИН",
    avatarColor: "from-star-amber to-star-red",
    role: "Инженер",
    roleColor: "star-amber",
    content: "Двигатели на варп-скорости проверены. Щиты на 100%. Готов к вылету хоть сейчас! ⚡",
    time: "14:40",
    reactions: [{ emoji: "🔧", count: 4, active: true }, { emoji: "💪", count: 6, active: false }],
  },
  {
    id: "4",
    author: "Связист Луна",
    avatar: "СЛ",
    avatarColor: "from-star-purple to-star-pink",
    content: "Я настроила связь с базой через новый квантовый ретранслятор. Задержка сигнала менее 0.001 мс даже на краю галактики!",
    time: "14:45",
    reactions: [{ emoji: "📡", count: 7, active: false }, { emoji: "🤯", count: 3, active: true }],
  },
  {
    id: "5",
    author: "Капитан Стелла",
    avatar: "КС",
    avatarColor: "from-star-pink to-star-purple",
    role: "Командир",
    roleColor: "star-pink",
    content: "Отличная работа, команда! Ещё один момент — нам нужен доброволец для разведки поверхности астероида KX-7. Кто возьмётся?",
    time: "14:50",
    reactions: [{ emoji: "🙋", count: 3, active: false }, { emoji: "🌑", count: 2, active: false }],
  },
  {
    id: "6",
    author: "Исследователь Зед",
    avatar: "ИЗ",
    avatarColor: "from-star-emerald to-star-blue",
    role: "Учёный",
    roleColor: "star-emerald",
    content: "Я пойду! Сканеры показывают необычные минеральные образования. Возможно, это древний инопланетный артефакт. Беру оборудование для анализа.",
    time: "14:52",
    reactions: [{ emoji: "🔬", count: 5, active: false }, { emoji: "👽", count: 9, active: true }],
  },
  {
    id: "7",
    author: "Астронавт Рей",
    avatar: "АР",
    avatarColor: "from-star-blue to-star-emerald",
    role: "Пилот",
    roleColor: "star-blue",
    content: "Зед, возьми усиленный скафандр. Гравитация на KX-7 нестабильна.",
    time: "14:55",
    reactions: [{ emoji: "🙏", count: 2, active: false }],
  },
];

const StarChat = () => {
  const [inputValue, setInputValue] = useState("");
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-nebula-deep/30">
      <div className="h-[52px] flex items-center px-4 gap-3 border-b border-nebula-border/20 shrink-0 backdrop-blur-sm">
        <Icon name="Hash" size={18} className="text-muted-foreground" />
        <h3 className="font-display font-medium text-[15px] text-star-white">основной</h3>
        <div className="w-px h-5 bg-nebula-border/30 mx-1" />
        <span className="text-xs text-muted-foreground truncate">Основной канал для общения экипажа</span>
        <div className="ml-auto flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-nebula-hover/40 text-muted-foreground hover:text-star-white transition-colors">
            <Icon name="Phone" size={16} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-nebula-hover/40 text-muted-foreground hover:text-star-white transition-colors">
            <Icon name="Video" size={16} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-nebula-hover/40 text-muted-foreground hover:text-star-white transition-colors">
            <Icon name="Pin" size={16} />
          </button>
          <div className="relative ml-1">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-40 h-7 pl-7 pr-2 rounded-md bg-nebula-surface/60 border border-nebula-border/20 text-xs text-star-white placeholder:text-muted-foreground focus:outline-none focus:border-star-blue/30 focus:w-56 transition-all"
            />
            <Icon name="Search" size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-nebula-hover/40 text-muted-foreground hover:text-star-white transition-colors">
            <Icon name="Users" size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto nebula-scrollbar px-4 py-4">
        <div className="space-y-0.5">
          {messages.map((msg, index) => {
            const prevMsg = index > 0 ? messages[index - 1] : null;
            const isGrouped = prevMsg && prevMsg.author === msg.author && !msg.isSystem && !prevMsg.isSystem;
            const isHovered = hoveredMsg === msg.id;

            if (msg.isSystem) {
              return (
                <div key={msg.id} className="flex items-center gap-2 px-2 py-2 my-2">
                  <div className="flex-1 h-px bg-nebula-border/20" />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="ArrowRight" size={12} className="text-star-emerald" />
                    {msg.content}
                  </div>
                  <div className="flex-1 h-px bg-nebula-border/20" />
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                onMouseEnter={() => setHoveredMsg(msg.id)}
                onMouseLeave={() => setHoveredMsg(null)}
                className={`relative group px-2 py-1 rounded-lg transition-colors ${
                  isHovered ? "bg-nebula-surface/30" : ""
                } ${!isGrouped ? "mt-3" : ""}`}
              >
                {isHovered && (
                  <div className="absolute -top-3 right-2 flex items-center gap-0.5 glass rounded-lg px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
                    <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white transition-colors">
                      <Icon name="SmilePlus" size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white transition-colors">
                      <Icon name="Reply" size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-white transition-colors">
                      <Icon name="Forward" size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-nebula-hover/50 text-muted-foreground hover:text-star-red transition-colors">
                      <Icon name="MoreHorizontal" size={14} />
                    </button>
                  </div>
                )}

                {msg.replyTo && (
                  <div className="flex items-center gap-1.5 ml-12 mb-1 text-xs text-muted-foreground">
                    <div className="w-5 h-3 border-l-2 border-t-2 border-nebula-subtle/50 rounded-tl" />
                    <Icon name="Reply" size={10} />
                    <span className="text-star-blue/70 font-medium">{msg.replyTo}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  {!isGrouped ? (
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${msg.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0 cursor-pointer hover:opacity-80 transition-opacity`}>
                      {msg.avatar}
                    </div>
                  ) : (
                    <div className="w-10 shrink-0 flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {msg.time}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    {!isGrouped && (
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="font-medium text-sm text-star-white hover:underline cursor-pointer">
                          {msg.author}
                        </span>
                        {msg.role && (
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded bg-${msg.roleColor}/10 text-${msg.roleColor}`}>
                            {msg.role}
                          </span>
                        )}
                        <span className="text-[11px] text-muted-foreground">{msg.time}</span>
                      </div>
                    )}
                    <p className="text-sm text-foreground leading-relaxed break-words">{msg.content}</p>

                    {msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {msg.reactions.map((reaction, i) => (
                          <button
                            key={i}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all ${
                              reaction.active
                                ? "bg-star-blue/15 border border-star-blue/30 text-star-blue"
                                : "bg-nebula-surface/50 border border-nebula-border/20 text-muted-foreground hover:border-star-blue/30"
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span className="font-medium">{reaction.count}</span>
                          </button>
                        ))}
                        <button className="w-6 h-6 rounded-full flex items-center justify-center bg-nebula-surface/30 border border-nebula-border/10 text-muted-foreground hover:text-star-white hover:border-star-blue/20 opacity-0 group-hover:opacity-100 transition-all">
                          <Icon name="Plus" size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 shrink-0">
        <div className="relative">
          <div className="glass rounded-2xl border border-nebula-border/20 overflow-hidden transition-all focus-within:border-star-blue/30 focus-within:nebula-glow">
            <div className="flex items-center px-3 py-1 gap-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-nebula-hover/40 text-muted-foreground hover:text-star-blue transition-colors">
                <Icon name="Plus" size={18} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Написать в #основной..."
                className="flex-1 h-10 bg-transparent text-sm text-star-white placeholder:text-muted-foreground focus:outline-none"
              />
              <div className="flex items-center gap-0.5">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-nebula-hover/40 text-muted-foreground hover:text-star-amber transition-colors">
                  <Icon name="Sticker" size={18} />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-nebula-hover/40 text-muted-foreground hover:text-star-pink transition-colors">
                  <Icon name="Smile" size={18} />
                </button>
                {inputValue && (
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-star-blue/20 text-star-blue hover:bg-star-blue/30 transition-colors animate-fade-in">
                    <Icon name="Send" size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1.5 px-3">
            <span className="text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-star-emerald animate-pulse" />
                Инженер Нова печатает...
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarChat;
