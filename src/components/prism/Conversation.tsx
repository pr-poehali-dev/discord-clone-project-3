import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  author: string;
  isOwn: boolean;
  content: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  replyTo?: { author: string; text: string };
  reactions?: { emoji: string; count: number; byMe: boolean }[];
  type?: "text" | "voice" | "system";
  voiceDuration?: string;
}

const messages: Message[] = [
  {
    id: "sys1", author: "", isOwn: false,
    content: "Сегодня",
    time: "", type: "system",
  },
  {
    id: "1", author: "Алиса Волкова", isOwn: false,
    content: "Привет! Как продвигается работа над новым интерфейсом?",
    time: "10:02",
  },
  {
    id: "2", author: "Вы", isOwn: true,
    content: "Привет, Алиса! Уже почти закончил, осталось доделать анимации переходов между экранами.",
    time: "10:05", status: "read",
  },
  {
    id: "3", author: "Алиса Волкова", isOwn: false,
    content: "Отлично! Шеф спрашивал сегодня утром на планёрке. Покажи, пожалуйста, промежуточный результат когда будет готово.",
    time: "10:08",
    reactions: [{ emoji: "👍", count: 2, byMe: true }],
  },
  {
    id: "4", author: "Вы", isOwn: true,
    content: "Конечно, скину скриншоты через пару часов. Думаю, ему понравится — получается сильно лучше, чем было.",
    time: "10:12", status: "read",
    reactions: [{ emoji: "🔥", count: 1, byMe: false }],
  },
  {
    id: "5", author: "Алиса Волкова", isOwn: false,
    content: "Голосовое сообщение",
    time: "10:20", type: "voice", voiceDuration: "0:42",
  },
  {
    id: "6", author: "Вы", isOwn: true,
    content: "Слушай, отличная идея! Добавлю градиент на фон карточек. Спасибо за подсказку 💡",
    time: "10:25", status: "delivered",
    replyTo: { author: "Алиса", text: "Голосовое сообщение 🎵" },
  },
  {
    id: "7", author: "Алиса Волкова", isOwn: false,
    content: "Кстати, я отправила тебе обновлённые иконки в облако. Там новый набор — минималистичные, с закруглениями.",
    time: "12:35",
  },
  {
    id: "8", author: "Алиса Волкова", isOwn: false,
    content: "И ещё макет главного экрана. Проверь, всё ли сходится с твоей версией. Файлы в общей папке проекта.",
    time: "12:36",
    reactions: [{ emoji: "✅", count: 1, byMe: true }, { emoji: "❤️", count: 3, byMe: false }],
  },
];

const Conversation = () => {
  const [input, setInput] = useState("");
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-prism-base/50">
      <div className="h-[60px] flex items-center px-5 gap-3 border-b border-prism-border/25 shrink-0">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-glow-mint to-glow-sky flex items-center justify-center text-xs font-bold text-white">
            АВ
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-glow-mint border-2 border-prism-base" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-medium text-sm text-foreground">Алиса Волкова</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-glow-mint" />
            <span className="text-[11px] text-glow-mint">В сети</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-prism-muted hover:text-glow-sky hover:bg-prism-hover transition-all">
            <Icon name="Phone" size={17} />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-prism-muted hover:text-glow-violet hover:bg-prism-hover transition-all">
            <Icon name="Video" size={17} />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-prism-muted hover:text-foreground hover:bg-prism-hover transition-all">
            <Icon name="Search" size={17} />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-prism-muted hover:text-foreground hover:bg-prism-hover transition-all">
            <Icon name="MoreVertical" size={17} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto prism-scroll px-5 py-5">
        <div className="max-w-3xl mx-auto space-y-1">
          {messages.map((msg, i) => {
            const prevMsg = i > 0 ? messages[i - 1] : null;
            const isChain = prevMsg && prevMsg.author === msg.author && msg.type !== "system" && prevMsg.type !== "system";
            const isHovered = hoveredMsg === msg.id;

            if (msg.type === "system") {
              return (
                <div key={msg.id} className="flex items-center justify-center py-3">
                  <span className="text-[11px] text-prism-muted font-medium px-3 py-1 rounded-full bg-prism-surface/60">
                    {msg.content}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                onMouseEnter={() => setHoveredMsg(msg.id)}
                onMouseLeave={() => setHoveredMsg(null)}
                className={`flex ${msg.isOwn ? "justify-end" : "justify-start"} ${!isChain ? "mt-3" : "mt-0.5"} group relative`}
              >
                {isHovered && (
                  <div className={`absolute top-0 ${msg.isOwn ? "right-0 -translate-x-full mr-2" : "left-0 translate-x-full ml-2"} z-10 flex items-center gap-0.5 prism-glass-strong rounded-lg px-1 py-0.5 border border-prism-border/30 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg`}
                    style={{ [msg.isOwn ? "right" : "left"]: "auto", [msg.isOwn ? "left" : "right"]: "0" }}
                  >
                    <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-prism-hover text-prism-muted hover:text-foreground transition-colors">
                      <Icon name="SmilePlus" size={13} />
                    </button>
                    <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-prism-hover text-prism-muted hover:text-foreground transition-colors">
                      <Icon name="Reply" size={13} />
                    </button>
                    <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-prism-hover text-prism-muted hover:text-foreground transition-colors">
                      <Icon name="MoreHorizontal" size={13} />
                    </button>
                  </div>
                )}

                <div className={`max-w-[70%] ${msg.isOwn ? "" : ""}`}>
                  {msg.replyTo && (
                    <div className={`flex items-center gap-1.5 mb-1 px-3 ${msg.isOwn ? "justify-end" : ""}`}>
                      <div className="w-0.5 h-4 rounded-full bg-glow-violet/40" />
                      <span className="text-[11px] text-glow-violet">{msg.replyTo.author}</span>
                      <span className="text-[11px] text-prism-muted truncate max-w-[150px]">{msg.replyTo.text}</span>
                    </div>
                  )}

                  {msg.type === "voice" ? (
                    <div className={`px-4 py-3 ${
                      msg.isOwn
                        ? `${isChain ? "bubble-out-chain" : "bubble-out"} bg-glow-mint/12 border border-glow-mint/15`
                        : `${isChain ? "bubble-in-chain" : "bubble-in"} bg-prism-surface border border-prism-border/25`
                    }`}>
                      <div className="flex items-center gap-3">
                        <button className="w-8 h-8 rounded-full bg-glow-mint/20 flex items-center justify-center text-glow-mint hover:bg-glow-mint/30 transition-colors">
                          <Icon name="Play" size={14} />
                        </button>
                        <div className="flex-1">
                          <div className="flex gap-0.5 items-center h-6">
                            {Array.from({ length: 28 }).map((_, j) => (
                              <div key={j} className="w-1 rounded-full bg-glow-mint/40" style={{ height: `${Math.random() * 16 + 4}px` }} />
                            ))}
                          </div>
                        </div>
                        <span className="text-[11px] text-prism-muted">{msg.voiceDuration}</span>
                      </div>
                      <div className={`flex items-center gap-1 mt-1.5 ${msg.isOwn ? "justify-end" : ""}`}>
                        <span className="text-[10px] text-prism-muted">{msg.time}</span>
                        {msg.isOwn && msg.status && <StatusIcon status={msg.status} />}
                      </div>
                    </div>
                  ) : (
                    <div className={`px-4 py-2.5 ${
                      msg.isOwn
                        ? `${isChain ? "bubble-out-chain" : "bubble-out"} bg-gradient-to-br from-glow-mint/12 to-glow-sky/8 border border-glow-mint/12`
                        : `${isChain ? "bubble-in-chain" : "bubble-in"} bg-prism-surface border border-prism-border/25`
                    }`}>
                      <p className="text-[13.5px] text-foreground leading-relaxed">{msg.content}</p>
                      <div className={`flex items-center gap-1 mt-1 ${msg.isOwn ? "justify-end" : ""}`}>
                        <span className="text-[10px] text-prism-muted">{msg.time}</span>
                        {msg.isOwn && msg.status && <StatusIcon status={msg.status} />}
                      </div>
                    </div>
                  )}

                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`flex gap-1 mt-1 ${msg.isOwn ? "justify-end" : ""}`}>
                      {msg.reactions.map((r, ri) => (
                        <button
                          key={ri}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all ${
                            r.byMe
                              ? "bg-glow-mint/12 border border-glow-mint/20 text-glow-mint"
                              : "bg-prism-surface/60 border border-prism-border/20 text-prism-muted hover:border-glow-mint/20"
                          }`}
                        >
                          {r.emoji} <span className="font-medium">{r.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <div className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-glow-mint animate-typing-dot" />
              <span className="w-1 h-1 rounded-full bg-glow-mint animate-typing-dot" style={{ animationDelay: "0.2s" }} />
              <span className="w-1 h-1 rounded-full bg-glow-mint animate-typing-dot" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="text-[11px] text-glow-mint">Алиса печатает...</span>
          </div>

          <div className="rounded-2xl bg-prism-surface border border-prism-border/30 overflow-hidden transition-all focus-within:border-glow-mint/20 focus-within:glow-mint">
            <div className="flex items-center gap-1 px-3 py-1.5">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-prism-muted hover:text-glow-mint hover:bg-prism-hover transition-all">
                <Icon name="Plus" size={18} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Написать сообщение..."
                className="flex-1 h-9 bg-transparent text-sm text-foreground placeholder:text-prism-muted focus:outline-none"
              />
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-prism-muted hover:text-glow-amber hover:bg-prism-hover transition-all">
                <Icon name="Smile" size={18} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-prism-muted hover:text-glow-coral hover:bg-prism-hover transition-all">
                <Icon name="Mic" size={18} />
              </button>
              {input && (
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-glow-mint/15 text-glow-mint hover:bg-glow-mint/25 transition-all animate-soft-bounce">
                  <Icon name="Send" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "read") return <Icon name="CheckCheck" size={12} className="text-glow-mint" />;
  if (status === "delivered") return <Icon name="CheckCheck" size={12} className="text-prism-muted" />;
  return <Icon name="Check" size={12} className="text-prism-muted" />;
};

export default Conversation;
