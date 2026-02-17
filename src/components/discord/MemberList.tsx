import Icon from "@/components/ui/icon";

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "idle" | "dnd" | "offline";
  activity?: string;
  role?: string;
  roleColor?: string;
}

const members: { category: string; users: Member[] }[] = [
  {
    category: "АДМИНЫ — 2",
    users: [
      { id: "1", name: "CyberAdmin", avatar: "🤖", status: "online", activity: "Настраивает сервер", role: "АДМИН", roleColor: "neon-pink" },
      { id: "2", name: "NeonMod", avatar: "⚔️", status: "online", activity: "Следит за порядком", role: "МОДЕР", roleColor: "neon-pink" },
    ],
  },
  {
    category: "НЕТРАННЕРЫ — 4",
    users: [
      { id: "3", name: "NightRunner", avatar: "🦾", status: "online", activity: "Cyberpunk 2077", role: "НЕТРАННЕР", roleColor: "neon-cyan" },
      { id: "4", name: "GhostInShell", avatar: "👻", status: "idle", role: "НЕТРАННЕР", roleColor: "neon-cyan" },
      { id: "5", name: "DataMiner", avatar: "⛏️", status: "online", role: "НЕТРАННЕР", roleColor: "neon-cyan" },
      { id: "6", name: "ZeroDay", avatar: "💀", status: "dnd", activity: "Не беспокоить", role: "НЕТРАННЕР", roleColor: "neon-cyan" },
    ],
  },
  {
    category: "УЧАСТНИКИ — 5",
    users: [
      { id: "7", name: "SynthWave", avatar: "🎧", status: "online", activity: "Spotify — Synthwave", role: "DJ", roleColor: "neon-purple" },
      { id: "8", name: "NeonArtist", avatar: "🎨", status: "online", activity: "Photoshop", role: "ХУДОЖНИК", roleColor: "neon-green" },
      { id: "9", name: "PixelKid", avatar: "🕹️", status: "idle" },
      { id: "10", name: "ChromeHeart", avatar: "💎", status: "online" },
      { id: "11", name: "WireFrame", avatar: "🔧", status: "offline" },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "bg-neon-green";
    case "idle": return "bg-neon-yellow";
    case "dnd": return "bg-neon-red";
    default: return "bg-muted-foreground/40";
  }
};

const getRoleClasses = (color?: string) => {
  switch (color) {
    case "neon-pink": return "text-neon-pink";
    case "neon-cyan": return "text-neon-cyan";
    case "neon-purple": return "text-neon-purple";
    case "neon-green": return "text-neon-green";
    default: return "text-foreground/80";
  }
};

const MemberList = () => {
  return (
    <div className="w-60 bg-cyber-dark border-l border-cyber-border h-full overflow-y-auto cyber-scrollbar">
      <div className="px-4 pt-4">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Поиск участников"
            className="w-full h-7 bg-cyber-darker border border-cyber-border rounded px-2 pl-7 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-neon-cyan/50 font-body transition-colors"
          />
          <Icon name="Search" size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
        </div>
      </div>

      {members.map((group) => (
        <div key={group.category} className="mb-2">
          <h3 className="px-4 py-1.5 text-[10px] font-cyber tracking-widest text-muted-foreground/40 uppercase">
            {group.category}
          </h3>
          {group.users.map((member) => (
            <button
              key={member.id}
              className="w-full flex items-center gap-2 px-4 py-1.5 hover:bg-cyber-hover/40 transition-colors group cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className={`w-8 h-8 rounded-full bg-cyber-panel border border-cyber-border flex items-center justify-center text-sm group-hover:border-neon-cyan/30 transition-colors ${member.status === "offline" ? "opacity-40" : ""}`}>
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-cyber-dark ${getStatusColor(member.status)}`} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className={`text-xs font-body truncate ${getRoleClasses(member.roleColor)} ${member.status === "offline" ? "opacity-40" : ""}`}>
                  {member.name}
                </p>
                {member.activity && member.status !== "offline" && (
                  <p className="text-[10px] text-muted-foreground/30 truncate flex items-center gap-1 font-body">
                    {member.activity.includes("Spotify") ? (
                      <Icon name="Music" size={10} className="text-neon-green/60" />
                    ) : member.activity.includes("Cyberpunk") || member.activity.includes("Photoshop") ? (
                      <Icon name="Gamepad2" size={10} className="text-neon-purple/60" />
                    ) : null}
                    {member.activity}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MemberList;
