import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "members" | "profile" | "notifications" | "search";

interface Member {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  status: "online" | "idle" | "dnd" | "offline";
  activity?: string;
  role?: string;
  roleColor?: string;
}

const memberGroups = [
  {
    name: "В сети",
    members: [
      { id: "1", name: "Марина", avatar: "М", avatarColor: "from-aurora-pink to-rose-500", status: "online" as const, activity: "Figma", role: "Дизайнер", roleColor: "text-aurora-pink" },
      { id: "2", name: "Дмитрий", avatar: "Д", avatarColor: "from-aurora-sky to-aurora-blue", status: "online" as const, activity: "VS Code", role: "Разработчик", roleColor: "text-aurora-sky" },
      { id: "3", name: "Алиса", avatar: "А", avatarColor: "from-aurora-purple to-aurora-pink", status: "online" as const, role: "Модератор", roleColor: "text-aurora-purple" },
      { id: "5", name: "Кирилл", avatar: "К", avatarColor: "from-aurora-mint to-emerald-500", status: "online" as const, role: "Админ", roleColor: "text-aurora-mint" },
      { id: "6", name: "Софья", avatar: "С", avatarColor: "from-amber-400 to-orange-500", status: "online" as const },
    ],
  },
  {
    name: "Не в сети",
    members: [
      { id: "7", name: "Артём", avatar: "А", avatarColor: "from-slate-400 to-slate-500", status: "offline" as const },
      { id: "8", name: "Елена", avatar: "Е", avatarColor: "from-slate-400 to-slate-500", status: "offline" as const },
    ],
  },
];

const notifications = [
  { id: "1", type: "mention", from: "Марина", channel: "#проекты", text: "упомянула вас: @Алексей посмотри макет", time: "2 мин", unread: true },
  { id: "2", type: "reply", from: "Дмитрий", channel: "#общий-чат", text: "ответил вам: Согласен, отличная идея!", time: "15 мин", unread: true },
  { id: "3", type: "system", from: "Aurora", channel: "Дизайнеры", text: "Вас добавили в роль «Модератор»", time: "1 ч", unread: false },
  { id: "4", type: "mention", from: "Кирилл", channel: "#вопросы", text: "упомянул вас: @Алексей как думаешь?", time: "3 ч", unread: false },
];

const statusDot = (status: string) => {
  switch (status) {
    case "online": return "bg-aurora-mint";
    case "idle": return "bg-amber-400";
    case "dnd": return "bg-red-400";
    default: return "bg-white/15";
  }
};

interface RightPanelProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const RightPanel = ({ activeTab, onTabChange }: RightPanelProps) => {
  return (
    <div className="w-64 h-full flex flex-col bg-surface-raised/30 border-l border-white/[0.04]">
      <div className="h-14 px-3 flex items-center gap-1 border-b border-white/[0.04] flex-shrink-0">
        {(["members", "notifications", "search", "profile"] as Tab[]).map((tab) => {
          const icons: Record<Tab, string> = {
            members: "Users",
            notifications: "Bell",
            search: "Search",
            profile: "User",
          };
          const labels: Record<Tab, string> = {
            members: "Участники",
            notifications: "Уведомления",
            search: "Поиск",
            profile: "Профиль",
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 h-8 rounded-lg flex items-center justify-center gap-1.5 text-[11px] font-medium transition-all ${
                isActive
                  ? "bg-white/[0.08] text-white/80"
                  : "text-white/25 hover:text-white/50 hover:bg-white/[0.03]"
              }`}
            >
              <Icon name={icons[tab]} size={13} />
              <span className="hidden xl:inline">{labels[tab]}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto smooth-scrollbar">
        {activeTab === "members" && (
          <div className="py-3 px-2">
            {memberGroups.map((group) => (
              <div key={group.name} className="mb-4">
                <h4 className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/20">
                  {group.name} — {group.members.length}
                </h4>
                {group.members.map((m) => (
                  <button
                    key={m.id}
                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.avatarColor} flex items-center justify-center text-[11px] font-semibold text-white ${m.status === "offline" ? "opacity-30" : ""}`}>
                        {m.avatar}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface-raised ${statusDot(m.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className={`text-xs font-medium truncate ${m.status === "offline" ? "text-white/20" : m.roleColor || "text-white/70"}`}>
                        {m.name}
                      </p>
                      {m.activity && m.status !== "offline" && (
                        <p className="text-[10px] text-white/20 truncate">{m.activity}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="py-3 px-2 space-y-1">
            <div className="px-2 pb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/20">Уведомления</span>
              <button className="text-[10px] text-aurora-blue/60 hover:text-aurora-blue transition-colors">Прочитать все</button>
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex gap-2.5 px-2.5 py-2.5 rounded-xl transition-colors ${
                  n.unread ? "bg-aurora-blue/[0.04]" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  n.type === "mention" ? "bg-aurora-blue/10 text-aurora-blue" :
                  n.type === "reply" ? "bg-aurora-purple/10 text-aurora-purple" :
                  "bg-white/5 text-white/30"
                }`}>
                  <Icon
                    name={n.type === "mention" ? "AtSign" : n.type === "reply" ? "Reply" : "Info"}
                    size={14}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-white/70">{n.from}</span>
                    <span className="text-[10px] text-white/15">{n.channel}</span>
                  </div>
                  <p className="text-[11px] text-white/35 mt-0.5 truncate">{n.text}</p>
                  <span className="text-[10px] text-white/15 mt-1 block">{n.time} назад</span>
                </div>
                {n.unread && <div className="w-2 h-2 rounded-full bg-aurora-blue mt-2 flex-shrink-0" />}
              </div>
            ))}
          </div>
        )}

        {activeTab === "search" && (
          <div className="py-3 px-3">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск по сообщениям, участникам..."
                className="w-full h-9 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 pl-9 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-aurora-blue/30 transition-colors"
              />
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/20 px-1">Быстрый поиск</p>
              {[
                { icon: "Hash", label: "Каналы", desc: "Поиск по каналам" },
                { icon: "User", label: "Участники", desc: "Найти пользователя" },
                { icon: "MessageSquare", label: "Сообщения", desc: "Поиск по тексту" },
                { icon: "FileText", label: "Файлы", desc: "Документы и медиа" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/25">
                    <Icon name={item.icon} size={15} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-white/60">{item.label}</p>
                    <p className="text-[10px] text-white/20">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="py-4 px-3">
            <div className="glass rounded-2xl p-4 mb-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aurora-blue to-aurora-purple flex items-center justify-center text-xl font-bold text-white mb-3 ring-2 ring-aurora-blue/20 ring-offset-2 ring-offset-surface">
                  А
                </div>
                <h3 className="font-display font-semibold text-sm text-white/90">Алексей</h3>
                <p className="text-[11px] text-white/30 mt-0.5">@alexey_dev</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-2 h-2 rounded-full bg-aurora-mint" />
                  <span className="text-[11px] text-aurora-mint/70">В сети</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/20 px-2 mb-2">Статистика</p>
              {[
                { label: "Серверов", value: "12", icon: "Globe" },
                { label: "Сообщений", value: "1,847", icon: "MessageSquare" },
                { label: "Друзей", value: "56", icon: "Users" },
                { label: "На платформе", value: "2 года", icon: "Calendar" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/20">
                    <Icon name={stat.icon} size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-white/25">{stat.label}</p>
                    <p className="text-xs font-medium text-white/70">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/20 px-2 mb-2">Настройки</p>
              {[
                { label: "Аккаунт", icon: "User" },
                { label: "Конфиденциальность", icon: "Shield" },
                { label: "Уведомления", icon: "Bell" },
                { label: "Внешний вид", icon: "Palette" },
              ].map((item) => (
                <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                  <Icon name={item.icon} size={14} className="text-white/20" />
                  <span className="text-xs text-white/50">{item.label}</span>
                  <Icon name="ChevronRight" size={12} className="text-white/15 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
