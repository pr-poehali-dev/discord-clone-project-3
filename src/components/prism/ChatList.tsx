import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Chat {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
  pinned?: boolean;
  muted?: boolean;
}

const chats: Chat[] = [
  { id: "1", name: "Алиса Волкова", initials: "АВ", gradient: "from-glow-mint to-glow-sky", lastMessage: "Отправила тебе файлы по проекту!", time: "сейчас", unread: 3, online: true, typing: true },
  { id: "2", name: "Дизайн-команда", initials: "ДК", gradient: "from-glow-coral to-glow-rose", lastMessage: "Макет утвердили, можно начинать верстку", time: "12:40", unread: 8, online: false, pinned: true },
  { id: "3", name: "Максим Петров", initials: "МП", gradient: "from-glow-violet to-glow-sky", lastMessage: "Завтра встречаемся в офисе?", time: "11:15", unread: 0, online: true },
  { id: "4", name: "Проект «Аврора»", initials: "ПА", gradient: "from-glow-amber to-glow-coral", lastMessage: "Дедлайн перенесли на пятницу 🎉", time: "10:30", unread: 1, online: false },
  { id: "5", name: "Катя Смирнова", initials: "КС", gradient: "from-glow-rose to-glow-violet", lastMessage: "Спасибо за помощь!", time: "Вчера", unread: 0, online: false },
  { id: "6", name: "Андрей Козлов", initials: "АК", gradient: "from-glow-sky to-glow-mint", lastMessage: "Код ревью готов, посмотри", time: "Вчера", unread: 0, online: true },
  { id: "7", name: "HR отдел", initials: "HR", gradient: "from-glow-lime to-glow-mint", lastMessage: "Не забудьте заполнить отчёт", time: "Пн", unread: 0, online: false, muted: true },
  { id: "8", name: "Мария Иванова", initials: "МИ", gradient: "from-glow-ice to-glow-violet", lastMessage: "Голосовое сообщение 🎵", time: "Пн", unread: 0, online: false },
];

interface Props {
  activeChat: string;
  onChatChange: (id: string) => void;
}

const ChatList = ({ activeChat, onChatChange }: Props) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "online">("all");

  const filtered = chats.filter((c) => {
    if (filter === "unread" && c.unread === 0) return false;
    if (filter === "online" && !c.online) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const pinned = filtered.filter((c) => c.pinned);
  const regular = filtered.filter((c) => !c.pinned);

  return (
    <div className="w-[300px] h-full flex flex-col bg-prism-base border-r border-prism-border/30">
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-display font-semibold text-lg text-foreground">Чаты</h1>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-prism-muted hover:text-glow-mint hover:bg-prism-hover transition-all">
              <Icon name="SquarePen" size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-prism-muted hover:text-glow-mint hover:bg-prism-hover transition-all">
              <Icon name="Filter" size={16} />
            </button>
          </div>
        </div>

        <div className="relative mb-3">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-prism-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по чатам..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-prism-surface border border-prism-border/30 text-sm text-foreground placeholder:text-prism-muted focus:outline-none focus:border-glow-mint/30 transition-colors"
          />
        </div>

        <div className="flex gap-1">
          {(["all", "unread", "online"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === f
                  ? "bg-glow-mint/12 text-glow-mint"
                  : "text-prism-muted hover:text-foreground hover:bg-prism-hover"
              }`}
            >
              {f === "all" ? "Все" : f === "unread" ? "Новые" : "В сети"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto prism-scroll px-2 pb-2">
        {pinned.length > 0 && (
          <div className="mb-1">
            <div className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-prism-muted">
              <Icon name="Pin" size={10} />
              Закреплённые
            </div>
            {pinned.map((chat) => (
              <ChatItem key={chat.id} chat={chat} isActive={activeChat === chat.id} onClick={() => onChatChange(chat.id)} />
            ))}
          </div>
        )}

        {regular.length > 0 && (
          <div>
            {pinned.length > 0 && (
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-prism-muted">
                Все сообщения
              </div>
            )}
            {regular.map((chat) => (
              <ChatItem key={chat.id} chat={chat} isActive={activeChat === chat.id} onClick={() => onChatChange(chat.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatItem = ({ chat, isActive, onClick }: { chat: Chat; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-glow-mint/8 border border-glow-mint/10"
        : "hover:bg-prism-hover/60 border border-transparent"
    }`}
  >
    <div className="relative shrink-0">
      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${chat.gradient} flex items-center justify-center text-xs font-bold text-white`}>
        {chat.initials}
      </div>
      {chat.online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-glow-mint border-[2.5px] border-prism-base" />
      )}
    </div>

    <div className="flex-1 min-w-0 text-left">
      <div className="flex items-center justify-between gap-2">
        <span className={`text-sm truncate ${isActive ? "text-foreground font-medium" : "text-foreground"}`}>
          {chat.name}
        </span>
        <span className={`text-[10px] shrink-0 ${chat.unread > 0 ? "text-glow-mint font-medium" : "text-prism-muted"}`}>
          {chat.time}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 mt-0.5">
        {chat.typing ? (
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-glow-mint animate-typing-dot" />
              <span className="w-1 h-1 rounded-full bg-glow-mint animate-typing-dot" style={{ animationDelay: "0.2s" }} />
              <span className="w-1 h-1 rounded-full bg-glow-mint animate-typing-dot" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="text-xs text-glow-mint">печатает...</span>
          </div>
        ) : (
          <span className="text-xs text-prism-muted truncate">{chat.lastMessage}</span>
        )}
        <div className="flex items-center gap-1 shrink-0">
          {chat.muted && <Icon name="BellOff" size={11} className="text-prism-subtle" />}
          {chat.unread > 0 && (
            <div className="min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-glow-mint text-[9px] font-bold text-prism-void px-1">
              {chat.unread}
            </div>
          )}
        </div>
      </div>
    </div>
  </button>
);

export default ChatList;
