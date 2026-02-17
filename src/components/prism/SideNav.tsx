import { useState } from "react";
import Icon from "@/components/ui/icon";

type NavSection = "chats" | "contacts" | "invites";

interface Props {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

const SideNav = ({ activeSection, onSectionChange }: Props) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: { id: NavSection; icon: string; label: string; badge?: number }[] = [
    { id: "chats", icon: "MessageCircle", label: "Чаты", badge: 5 },
    { id: "contacts", icon: "Users", label: "Контакты" },
    { id: "invites", icon: "UserPlus", label: "Приглашения", badge: 2 },
  ];

  const bottomItems = [
    { id: "settings", icon: "Settings", label: "Настройки" },
  ];

  return (
    <div className="w-[68px] h-full flex flex-col items-center py-4 bg-prism-void border-r border-prism-border/40">
      <div className="mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-glow-mint to-glow-sky flex items-center justify-center glow-mint">
          <span className="text-lg font-display font-bold text-white">P</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => onSectionChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-glow-mint/15 text-glow-mint"
                    : "text-prism-muted hover:text-foreground hover:bg-prism-hover"
                }`}
              >
                <Icon name={item.icon} size={20} />
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[18px] w-[3px] h-5 rounded-r-full bg-glow-mint" />
                )}
              </button>
              {item.badge && item.badge > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-glow-coral text-[9px] font-bold text-white px-1">
                  {item.badge}
                </div>
              )}
              {isHovered && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fade-in">
                  <div className="prism-glass-strong rounded-lg px-2.5 py-1 text-xs font-medium text-foreground whitespace-nowrap border border-prism-border/40 shadow-xl">
                    {item.label}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2">
        {bottomItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-prism-muted hover:text-foreground hover:bg-prism-hover transition-all duration-200"
            >
              <Icon name={item.icon} size={20} />
            </button>
            {hoveredItem === item.id && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fade-in">
                <div className="prism-glass-strong rounded-lg px-2.5 py-1 text-xs font-medium text-foreground whitespace-nowrap border border-prism-border/40 shadow-xl">
                  {item.label}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-glow-violet to-glow-coral flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:opacity-80 transition-opacity mt-1">
          А
        </div>
      </div>
    </div>
  );
};

export default SideNav;
