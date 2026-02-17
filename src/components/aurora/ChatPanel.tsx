import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Reaction {
  emoji: string;
  count: number;
  active?: boolean;
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  time: string;
  text: string;
  reactions?: Reaction[];
  attachment?: { type: "image"; url: string };
  reply?: { author: string; text: string };
}

const messages: Message[] = [
  {
    id: "1",
    author: "Марина",
    avatar: "М",
    avatarColor: "from-aurora-pink to-rose-500",
    time: "10:30",
    text: "Привет всем! Только что закончила новый макет — что думаете?",
    reactions: [{ emoji: "🔥", count: 4, active: true }, { emoji: "👀", count: 2 }],
  },
  {
    id: "2",
    author: "Дмитрий",
    avatar: "Д",
    avatarColor: "from-aurora-sky to-aurora-blue",
    time: "10:32",
    text: "Выглядит потрясающе! Особенно нравится работа с тенями и стеклянными эффектами.",
    reply: { author: "Марина", text: "Привет всем! Только что закончила новый макет..." },
  },
  {
    id: "3",
    author: "Алиса",
    avatar: "А",
    avatarColor: "from-aurora-purple to-aurora-pink",
    time: "10:35",
    text: "Согласна! Можешь скинуть Figma-ссылку? Хочу посмотреть компоненты поближе 🎨",
    reactions: [{ emoji: "👍", count: 3 }],
  },
  {
    id: "4",
    author: "Марина",
    avatar: "М",
    avatarColor: "from-aurora-pink to-rose-500",
    time: "10:38",
    text: "Конечно! Вот ссылка: figma.com/file/aurora-design — все компоненты в разделе «UI Kit». Там же есть палитра цветов и шрифты.",
  },
  {
    id: "5",
    author: "Кирилл",
    avatar: "К",
    avatarColor: "from-aurora-mint to-emerald-500",
    time: "10:42",
    text: "Кстати, кто-нибудь пробовал новый плагин для автоматической генерации тем? Сэкономил мне кучу времени на прошлой неделе.",
    reactions: [{ emoji: "💡", count: 5 }, { emoji: "🚀", count: 2 }],
  },
  {
    id: "6",
    author: "Софья",
    avatar: "С",
    avatarColor: "from-amber-400 to-orange-500",
    time: "10:45",
    text: "Да, использую его уже месяц. Реально ускоряет работу, особенно при создании адаптивных палитр.",
  },
  {
    id: "7",
    author: "Дмитрий",
    avatar: "Д",
    avatarColor: "from-aurora-sky to-aurora-blue",
    time: "10:48",
    text: "А ещё рекомендую посмотреть новый курс по motion design — отличная подача и актуальные тренды 2026 года.",
    reactions: [{ emoji: "🎬", count: 3 }, { emoji: "❤️", count: 6, active: true }],
  },
];

const ChatPanel = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      <div className="h-14 px-5 flex items-center justify-between border-b border-white/[0.04] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <Icon name="Hash" size={18} className="text-white/20" />
          <h3 className="font-display font-semibold text-sm text-white/90">проекты</h3>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <p className="text-xs text-white/25 hidden sm:block">Делитесь проектами и получайте обратную связь</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/5 transition-all">
            <Icon name="Bell" size={16} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/5 transition-all">
            <Icon name="Pin" size={16} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/5 transition-all">
            <Icon name="Users" size={16} />
          </button>
          <div className="relative ml-1">
            <input
              type="text"
              placeholder="Поиск"
              className="h-7 w-36 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 pl-8 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-aurora-blue/30 transition-colors"
            />
            <Icon name="Search" size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto smooth-scrollbar px-5 py-4 space-y-1">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className="group flex gap-3 py-2 px-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors relative"
          >
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${msg.avatarColor} flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 mt-0.5`}>
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              {msg.reply && (
                <div className="flex items-center gap-1.5 mb-1 text-[11px] text-white/25">
                  <Icon name="CornerUpRight" size={10} />
                  <span className="font-medium text-white/35">{msg.reply.author}</span>
                  <span className="truncate">{msg.reply.text}</span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-sm text-white/85">{msg.author}</span>
                <span className="text-[10px] text-white/20">{msg.time}</span>
              </div>
              <p className="text-sm text-white/55 mt-0.5 leading-relaxed">{msg.text}</p>
              {msg.reactions && (
                <div className="flex gap-1.5 mt-2">
                  {msg.reactions.map((r, j) => (
                    <button
                      key={j}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all ${
                        r.active
                          ? "bg-aurora-blue/15 text-aurora-blue border border-aurora-blue/20"
                          : "bg-white/[0.04] text-white/40 border border-white/[0.04] hover:bg-white/[0.08]"
                      }`}
                    >
                      <span>{r.emoji}</span>
                      <span>{r.count}</span>
                    </button>
                  ))}
                  <button className="w-6 h-6 rounded-full bg-white/[0.03] flex items-center justify-center text-white/15 hover:text-white/40 hover:bg-white/[0.06] transition-all opacity-0 group-hover:opacity-100">
                    <Icon name="SmilePlus" size={12} />
                  </button>
                </div>
              )}
            </div>

            <div className="absolute right-2 -top-3 opacity-0 group-hover:opacity-100 transition-all flex gap-0.5 bg-surface-raised border border-white/[0.06] rounded-lg p-0.5 shadow-xl">
              <button className="w-7 h-7 rounded-md flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
                <Icon name="SmilePlus" size={14} />
              </button>
              <button className="w-7 h-7 rounded-md flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
                <Icon name="Reply" size={14} />
              </button>
              <button className="w-7 h-7 rounded-md flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all">
                <Icon name="MoreHorizontal" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 pb-5 pt-2 flex-shrink-0">
        <div className="glass-medium rounded-2xl px-4 py-3 flex items-end gap-3">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-all flex-shrink-0 mb-0.5">
            <Icon name="Plus" size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Написать в #проекты..."
              rows={1}
              className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/20 resize-none focus:outline-none leading-relaxed"
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 120) + "px";
              }}
            />
          </div>
          <div className="flex gap-1 flex-shrink-0 mb-0.5">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-all">
              <Icon name="Smile" size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/5 transition-all">
              <Icon name="Paperclip" size={18} />
            </button>
            {input.trim() && (
              <button className="w-8 h-8 rounded-xl bg-aurora-blue flex items-center justify-center text-white shadow-lg shadow-aurora-blue/20 animate-scale-in">
                <Icon name="ArrowUp" size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
