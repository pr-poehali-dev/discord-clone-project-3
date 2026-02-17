import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Space {
  id: string;
  name: string;
  emoji: string;
  color: string;
  unread?: number;
  active?: boolean;
}

const spaces: Space[] = [
  { id: "home", name: "Главная", emoji: "🏠", color: "from-aurora-blue to-aurora-purple" },
  { id: "1", name: "Дизайнеры", emoji: "🎨", color: "from-aurora-pink to-aurora-purple" },
  { id: "2", name: "Разработка", emoji: "⚡", color: "from-aurora-sky to-aurora-blue" },
  { id: "3", name: "Музыка", emoji: "🎵", color: "from-aurora-purple to-aurora-pink" },
  { id: "4", name: "Игры", emoji: "🎮", color: "from-aurora-mint to-aurora-sky" },
  { id: "5", name: "Кино", emoji: "🎬", color: "from-aurora-pink to-rose-500" },
];

interface SpaceListProps {
  activeSpace: string;
  onSpaceChange: (id: string) => void;
}

const SpaceList = ({ activeSpace, onSpaceChange }: SpaceListProps) => {
  return (
    <div className="w-[72px] h-full flex flex-col items-center py-3 gap-2 bg-surface">
      {spaces.map((space, i) => {
        const isActive = activeSpace === space.id;
        return (
          <div key={space.id} className="relative group" style={{ animationDelay: `${i * 50}ms` }}>
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1 rounded-r-full transition-all duration-300 ${
                isActive ? "h-8 bg-aurora-blue" : "h-0 group-hover:h-4 bg-white/40"
              }`}
            />
            <button
              onClick={() => onSpaceChange(space.id)}
              className={`w-12 h-12 flex items-center justify-center text-lg transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${space.color} rounded-2xl shadow-lg`
                  : "glass rounded-2xl hover:rounded-xl"
              }`}
            >
              {space.emoji}
            </button>
            {space.unread && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-aurora-pink text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                {space.unread}
              </span>
            )}
          </div>
        );
      })}

      <div className="mt-auto flex flex-col items-center gap-2">
        <div className="w-8 h-px bg-white/10 mb-1" />
        <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/30 hover:text-aurora-mint hover:bg-aurora-mint/10 transition-all duration-300 hover:rounded-xl">
          <Icon name="Plus" size={20} />
        </button>
        <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/30 hover:text-aurora-sky hover:bg-aurora-sky/10 transition-all duration-300 hover:rounded-xl">
          <Icon name="Compass" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SpaceList;
