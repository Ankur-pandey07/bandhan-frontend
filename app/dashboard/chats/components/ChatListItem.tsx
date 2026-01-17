"use client";

type ChatListItemProps = {
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  onClick: () => void;
};

export default function ChatListItem({
  name,
  avatar,
  lastMessage,
  time,
  unread = 0,
  onClick,
}: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition rounded-xl"
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-semibold">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          name.charAt(0)
        )}
      </div>

      {/* Center */}
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500 truncate">
          {lastMessage}
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-gray-400">{time}</span>

        {unread > 0 && (
          <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
            {unread}
          </span>
        )}
      </div>
    </button>
  );
}
