"use client";

export default function ChatListItem({
  name,
  lastMessage,
  time,
  unread,
  onClick,
}: {
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-gray-50 cursor-pointer transition shadow-sm border"
    >
      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold">
          {name[0]}
        </div>

        {/* Online dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-900 truncate">
            {name}
          </p>
          <span className="text-xs text-gray-400">
            {time}
          </span>
        </div>

        <p className="text-sm text-gray-500 truncate">
          {lastMessage}
        </p>
      </div>

      {/* Unread badge */}
      {unread > 0 && (
        <div className="ml-2 min-w-[20px] h-5 px-2 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
          {unread}
        </div>
      )}
    </div>
  );
}
