import { useState } from "react";
import Icon from "@/components/ui/icon";

type PanelTab = "members" | "notifications" | "search" | "profile";

interface Member {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  role?: string;
  roleColor?: string;
  status: "online" | "idle" | "dnd" | "offline";
  activity?: string;
}

const members: Member[] = [
  { id: "1", name: "Капитан Стелла", avatar: "КС", avatarColor: "from-star-pink to-star-purple", role: "Командир", roleColor: "star-pink", status: "online", activity: "Управляет мостиком" },
  { id: "2", name: "Астронавт Рей", avatar: "АР", avatarColor: "from-star-blue to-star-emerald", role: "Пилот", roleColor: "star-blue", status: "online", activity: "Навигация" },
  { id: "3", name: "Инженер Нова", avatar: "ИН", avatarColor: "from-star-amber to-star-red", role: "Инженер", roleColor: "star-amber", status: "online" },
  { id: "4", name: "Связист Луна", avatar: "СЛ", avatarColor: "from-star-purple to-star-pink", status: "idle", activity: "Отошла на 10 мин" },
  { id: "5", name: "Исследователь Зед", avatar: "ИЗ", avatarColor: "from-star-emerald to-star-blue", role: "Учёный", roleColor: "star-emerald", status: "online", activity: "Анализ образцов" },
  { id: "6", name: "Медик Альфа", avatar: "МА", avatarColor: "from-star-red to-star-pink", status: "dnd", activity: "Не беспокоить" },
  { id: "7", name: "Робот ARIA-7", avatar: "A7", avatarColor: "from-star-blue to-star-purple", status: "online" },
  { id: "8", name: "Стажёр Космо", avatar: "СК", avatarColor: "from-star-amber to-star-emerald", status: "offline" },
];

interface Notification {
  id: string;
  type: "mention" | "reply" | "invite" | "system";
  from: string;
  content: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "mention", from: "Капитан Стелла", content: "упомянул вас в #основной", time: "2 мин", read: false },
  { id: "2", type: "reply", from: "Астронавт Рей", content: "ответил на ваше сообщение", time: "15 мин", read: false },
  { id: "3", type: "invite", from: "Исследователь Зед", content: "приглашает в «Лаборатория»", time: "1 час", read: true },
  { id: "4", type: "system", from: "Nebula", content: "Сервер обновлён до уровня 3", time: "3 часа", read: true },
  { id: "5", type: "mention", from: "Инженер Нова", content: "упомянул вас в #инженерный", time: "5 часов", read: true },
];

const statusColors: Record<string, string> = {
  online: "bg-star-emerald",
  idle: "bg-star-amber",
  dnd: "bg-star-red",
  offline: "bg-nebula-subtle",
};

const notifIcons: Record<string, { icon: string; color: string }> = {
  mention: { icon: "AtSign", color: "text-star-blue" },
  reply: { icon: "Reply", color: "text-star-purple" },
  invite: { icon: "UserPlus", color: "text-star-emerald" },
  system: { icon: "Bell", color: "text-star-amber" },
};

const CosmosPanel = () => {
  const [activeTab, setActiveTab] = useState<PanelTab>("members");

  const tabs: { id: PanelTab; icon: string; label: string; badge?: number }[] = [
    { id: "members", icon: "Users", label: "Участники" },
    { id: "notifications", icon: "Bell", label: "Уведомления", badge: 2 },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  const onlineMembers = members.filter((m) => m.status !== "offline");
  const offlineMembers = members.filter((m) => m.status === "offline");

  const renderMembers = () => (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2">
          В сети — {onlineMembers.length}
        </div>
        <div className="space-y-0.5">
          {onlineMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-nebula-hover/30 transition-colors cursor-pointer group"
            >
              <div className="relative shrink-0">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-[10px] font-bold text-white`}>
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColors[member.status]} border-2 border-nebula-deep`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-star-white truncate">{member.name}</span>
                  {member.role && (
                    <span className={`text-[9px] font-semibold px-1 py-0.5 rounded bg-${member.roleColor}/10 text-${member.roleColor}`}>
                      {member.role}
                    </span>
                  )}
                </div>
                {member.activity && (
                  <div className="text-[11px] text-muted-foreground truncate">{member.activity}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {offlineMembers.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2">
            Не в сети — {offlineMembers.length}
          </div>
          <div className="space-y-0.5 opacity-50">
            {offlineMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-nebula-hover/30 transition-colors cursor-pointer"
              >
                <div className="relative shrink-0">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-[10px] font-bold text-white`}>
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${statusColors[member.status]} border-2 border-nebula-deep`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-star-white truncate">{member.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-1 mb-3">
        <span className="text-xs text-muted-foreground">
          {notifications.filter((n) => !n.read).length} непрочитанных
        </span>
        <button className="text-xs text-star-blue hover:text-star-blue/80 transition-colors">
          Прочитать все
        </button>
      </div>
      {notifications.map((notif) => {
        const iconInfo = notifIcons[notif.type];
        return (
          <div
            key={notif.id}
            className={`flex items-start gap-2.5 px-2.5 py-2.5 rounded-lg transition-colors cursor-pointer ${
              notif.read ? "hover:bg-nebula-hover/20" : "bg-star-blue/5 hover:bg-star-blue/10"
            }`}
          >
            <div className={`w-8 h-8 rounded-full bg-nebula-surface flex items-center justify-center shrink-0 ${iconInfo.color}`}>
              <Icon name={iconInfo.icon} size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-star-white">
                <span className="font-medium">{notif.from}</span>{" "}
                <span className="text-muted-foreground">{notif.content}</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{notif.time} назад</div>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-star-blue mt-2 shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-4">
      <div className="relative">
        <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск по серверу..."
          className="w-full h-9 pl-9 pr-3 rounded-xl bg-nebula-surface/80 border border-nebula-border/30 text-sm text-star-white placeholder:text-muted-foreground focus:outline-none focus:border-star-blue/40 transition-colors"
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
          <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Сообщения</span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
          <Icon name="User" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Пользователи</span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
          <Icon name="Server" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Серверы</span>
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
          <Icon name="FileText" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Файлы</span>
        </button>
      </div>
      <div className="text-center py-8">
        <div className="text-3xl mb-2">🔍</div>
        <p className="text-sm text-muted-foreground">Введите запрос для поиска</p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="h-24 rounded-xl bg-gradient-to-r from-star-blue/20 via-star-purple/20 to-star-pink/20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(108,140,255,0.3),transparent_70%)]" />
        </div>
        <div className="absolute -bottom-6 left-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-star-blue to-star-purple flex items-center justify-center text-xl font-bold text-white border-4 border-nebula-deep">
              Н
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-star-emerald border-3 border-nebula-deep" />
          </div>
        </div>
      </div>

      <div className="pt-6 px-1">
        <h3 className="font-display font-semibold text-lg text-star-white">Навигатор</h3>
        <p className="text-xs text-muted-foreground mt-0.5">navigator#2847</p>

        <div className="mt-3 flex gap-2">
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-star-blue/10 text-star-blue border border-star-blue/20">
            Пилот
          </span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-star-purple/10 text-star-purple border border-star-purple/20">
            Основатель
          </span>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-nebula-surface/50 border border-nebula-border/20">
          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Обо мне</div>
          <p className="text-sm text-foreground leading-relaxed">
            Пилот звездолёта «Аврора». Люблю исследовать новые галактики и пить космический кофе ☕
          </p>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-nebula-surface/50 border border-nebula-border/20">
          <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">Статистика</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-display font-bold gradient-text-blue">247</div>
              <div className="text-[10px] text-muted-foreground">Сообщений</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-display font-bold gradient-text-pink">12</div>
              <div className="text-[10px] text-muted-foreground">Серверов</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-display font-bold gradient-text-amber">89</div>
              <div className="text-[10px] text-muted-foreground">Друзей</div>
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
            <Icon name="Settings" size={14} className="text-muted-foreground" />
            <span className="text-sm text-star-white">Настройки аккаунта</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
            <Icon name="Shield" size={14} className="text-muted-foreground" />
            <span className="text-sm text-star-white">Конфиденциальность</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
            <Icon name="BellRing" size={14} className="text-muted-foreground" />
            <span className="text-sm text-star-white">Уведомления</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-nebula-hover/30 transition-colors text-left">
            <Icon name="Palette" size={14} className="text-muted-foreground" />
            <span className="text-sm text-star-white">Внешний вид</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-[280px] h-full flex flex-col bg-nebula-deep/40 backdrop-blur-md border-l border-nebula-border/20">
      <div className="h-[52px] flex items-center px-2 border-b border-nebula-border/20 shrink-0">
        <div className="flex items-center w-full gap-0.5 p-1 rounded-xl bg-nebula-surface/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 relative flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-nebula-elevated text-star-white shadow-sm"
                  : "text-muted-foreground hover:text-star-white/70"
              }`}
            >
              <Icon name={tab.icon} size={14} />
              {tab.badge && tab.badge > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[14px] h-[14px] flex items-center justify-center rounded-full bg-star-red text-[8px] font-bold text-white px-0.5">
                  {tab.badge}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto nebula-scrollbar p-3">
        {activeTab === "members" && renderMembers()}
        {activeTab === "notifications" && renderNotifications()}
        {activeTab === "search" && renderSearch()}
        {activeTab === "profile" && renderProfile()}
      </div>
    </div>
  );
};

export default CosmosPanel;
