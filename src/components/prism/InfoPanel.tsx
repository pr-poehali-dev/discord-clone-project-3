import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "profile" | "notifications" | "search" | "settings";

interface Notification {
  id: string;
  type: "message" | "invite" | "system" | "mention";
  from: string;
  content: string;
  time: string;
  read: boolean;
  avatar: string;
  gradient: string;
}

const notifications: Notification[] = [
  { id: "1", type: "message", from: "Дизайн-команда", content: "Новое сообщение в чате", time: "5 мин", read: false, avatar: "ДК", gradient: "from-glow-coral to-glow-rose" },
  { id: "2", type: "invite", from: "Максим Петров", content: "Приглашает вас в «Startup Lab»", time: "30 мин", read: false, avatar: "МП", gradient: "from-glow-violet to-glow-sky" },
  { id: "3", type: "mention", from: "Проект «Аврора»", content: "@Вы упомянуты в обсуждении", time: "1 час", read: true, avatar: "ПА", gradient: "from-glow-amber to-glow-coral" },
  { id: "4", type: "system", from: "Prism", content: "Обновление безопасности установлено", time: "3 часа", read: true, avatar: "P", gradient: "from-glow-mint to-glow-sky" },
  { id: "5", type: "invite", from: "Катя Смирнова", content: "Хочет добавить вас в контакты", time: "5 часов", read: true, avatar: "КС", gradient: "from-glow-rose to-glow-violet" },
];

const notifTypeIcons: Record<string, { icon: string; color: string }> = {
  message: { icon: "MessageCircle", color: "text-glow-sky" },
  invite: { icon: "UserPlus", color: "text-glow-violet" },
  system: { icon: "Shield", color: "text-glow-mint" },
  mention: { icon: "AtSign", color: "text-glow-amber" },
};

const InfoPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: "profile", icon: "User", label: "Профиль" },
    { id: "notifications", icon: "Bell", label: "Уведомления", badge: 2 },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "settings", icon: "Settings", label: "Настройки" },
  ];

  const renderProfile = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="relative">
        <div className="h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-glow-mint/10 via-glow-violet/10 to-glow-coral/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(52,211,153,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(167,139,250,0.1),transparent_60%)]" />
        </div>
        <div className="absolute -bottom-8 left-4">
          <div className="relative">
            <div className="w-[72px] h-[72px] rounded-2xl p-[2px] status-ring">
              <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-glow-violet to-glow-coral flex items-center justify-center text-2xl font-bold text-white">
                А
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-glow-mint border-[3px] border-prism-base flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-lg text-foreground">Алексей Николаев</h3>
          <div className="w-4 h-4 rounded-full bg-glow-sky/20 flex items-center justify-center">
            <Icon name="Check" size={10} className="text-glow-sky" />
          </div>
        </div>
        <p className="text-xs text-prism-muted mt-0.5">@alexey_n · в сети</p>

        <div className="flex gap-1.5 mt-3 flex-wrap">
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-glow-mint/10 text-glow-mint border border-glow-mint/15">
            Разработчик
          </span>
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-glow-violet/10 text-glow-violet border border-glow-violet/15">
            Premium
          </span>
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-glow-amber/10 text-glow-amber border border-glow-amber/15">
            Ранний доступ
          </span>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-prism-surface/60 border border-prism-border/20">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-prism-muted mb-2">Обо мне</div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Фронтенд-разработчик. Люблю минималистичный дизайн и чистый код. Работаю над продуктами будущего.
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-prism-muted">
            <Icon name="MapPin" size={12} />
            Москва, Россия
          </div>
        </div>

        <div className="mt-3 p-3.5 rounded-xl bg-prism-surface/60 border border-prism-border/20">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-prism-muted mb-3">Статистика</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xl font-display font-bold gradient-mint">1.2K</div>
              <div className="text-[10px] text-prism-muted mt-0.5">Сообщений</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-display font-bold gradient-coral">89</div>
              <div className="text-[10px] text-prism-muted mt-0.5">Контактов</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-display font-bold gradient-violet">14</div>
              <div className="text-[10px] text-prism-muted mt-0.5">Групп</div>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3.5 rounded-xl bg-prism-surface/60 border border-prism-border/20">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-prism-muted mb-2">Статус</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <span className="text-sm text-foreground/80">Работаю над Prism v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-xs text-prism-muted">{notifications.filter((n) => !n.read).length} новых</span>
        <button className="text-xs text-glow-mint hover:text-glow-mint/80 transition-colors font-medium">
          Прочитать все
        </button>
      </div>
      {notifications.map((n) => {
        const iconInfo = notifTypeIcons[n.type];
        return (
          <div
            key={n.id}
            className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer ${
              n.read ? "hover:bg-prism-hover/40" : "bg-glow-mint/[0.03] hover:bg-glow-mint/[0.06] border border-glow-mint/5"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.gradient} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
              {n.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon name={iconInfo.icon} size={12} className={iconInfo.color} />
                <span className="text-sm font-medium text-foreground truncate">{n.from}</span>
              </div>
              <p className="text-xs text-prism-muted mt-0.5">{n.content}</p>
              <span className="text-[10px] text-prism-subtle mt-1 block">{n.time} назад</span>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-glow-mint mt-2 shrink-0" />}
          </div>
        );
      })}
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="relative">
        <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-prism-muted" />
        <input
          type="text"
          placeholder="Поиск пользователей..."
          className="w-full h-10 pl-9 pr-3 rounded-xl bg-prism-surface border border-prism-border/30 text-sm text-foreground placeholder:text-prism-muted focus:outline-none focus:border-glow-mint/30 transition-colors"
          autoFocus
        />
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-prism-muted px-1 mb-2">Недавние</div>
        {[
          { name: "Алиса Волкова", tag: "@alisa_v", gradient: "from-glow-mint to-glow-sky", online: true },
          { name: "Максим Петров", tag: "@max_p", gradient: "from-glow-violet to-glow-sky", online: true },
          { name: "Катя Смирнова", tag: "@katya_s", gradient: "from-glow-rose to-glow-violet", online: false },
        ].map((user) => (
          <div key={user.tag} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-prism-hover/40 transition-colors cursor-pointer">
            <div className="relative">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${user.gradient} flex items-center justify-center text-[10px] font-bold text-white`}>
                {user.name.split(" ").map((w) => w[0]).join("")}
              </div>
              {user.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-glow-mint border-2 border-prism-base" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-foreground">{user.name}</div>
              <div className="text-[11px] text-prism-muted">{user.tag}</div>
            </div>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-prism-muted hover:text-glow-mint hover:bg-prism-hover transition-all">
              <Icon name="MessageCircle" size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-2xl bg-prism-surface/60 flex items-center justify-center mx-auto mb-3">
          <Icon name="UserSearch" size={22} className="text-prism-subtle" />
        </div>
        <p className="text-sm text-prism-muted">Найдите друзей по имени или тегу</p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-1 animate-fade-in">
      {[
        { icon: "User", label: "Мой аккаунт", desc: "Имя, email, пароль", color: "text-glow-mint" },
        { icon: "Shield", label: "Конфиденциальность", desc: "Кто видит профиль и статус", color: "text-glow-violet" },
        { icon: "BellRing", label: "Уведомления", desc: "Звуки, push, email-дайджест", color: "text-glow-amber" },
        { icon: "Palette", label: "Внешний вид", desc: "Тема, цвета, размер шрифта", color: "text-glow-sky" },
        { icon: "Globe", label: "Язык и регион", desc: "Русский, Москва UTC+3", color: "text-glow-coral" },
        { icon: "Lock", label: "Безопасность", desc: "2FA, активные сессии", color: "text-glow-rose" },
        { icon: "HardDrive", label: "Данные и хранилище", desc: "Кэш, автозагрузка медиа", color: "text-glow-lime" },
        { icon: "HelpCircle", label: "Помощь", desc: "FAQ, поддержка, документация", color: "text-prism-muted" },
      ].map((item) => (
        <button
          key={item.label}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-prism-hover/40 transition-all text-left group"
        >
          <div className={`w-9 h-9 rounded-xl bg-prism-surface flex items-center justify-center ${item.color} shrink-0 group-hover:bg-prism-elevated transition-colors`}>
            <Icon name={item.icon} size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-foreground">{item.label}</div>
            <div className="text-[11px] text-prism-muted">{item.desc}</div>
          </div>
          <Icon name="ChevronRight" size={14} className="text-prism-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}

      <div className="pt-3 mt-3 border-t border-prism-border/20">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-glow-coral/5 transition-all text-left group">
          <div className="w-9 h-9 rounded-xl bg-glow-coral/10 flex items-center justify-center text-glow-coral shrink-0">
            <Icon name="LogOut" size={16} />
          </div>
          <span className="text-sm text-glow-coral">Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-[300px] h-full flex flex-col bg-prism-base border-l border-prism-border/25">
      <div className="h-[60px] flex items-center px-3 border-b border-prism-border/25 shrink-0">
        <div className="flex items-center w-full gap-1 p-1 rounded-xl bg-prism-surface/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 relative flex items-center justify-center py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-prism-elevated text-foreground shadow-sm"
                  : "text-prism-muted hover:text-foreground"
              }`}
            >
              <Icon name={tab.icon} size={15} />
              {tab.badge && tab.badge > 0 && (
                <div className="absolute -top-0.5 right-1 min-w-[14px] h-3.5 flex items-center justify-center rounded-full bg-glow-coral text-[8px] font-bold text-white px-0.5">
                  {tab.badge}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto prism-scroll p-3.5">
        {activeTab === "profile" && renderProfile()}
        {activeTab === "notifications" && renderNotifications()}
        {activeTab === "search" && renderSearch()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  );
};

export default InfoPanel;
