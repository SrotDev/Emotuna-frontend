import { MessageCard } from "./MessageCard";

interface Message {
  id: string;
  platform: "instagram" | "facebook" | "twitter";
  username: string;
  snippet: string;
  tag?: string;
  isSpam?: boolean;
  isOffensive?: boolean;
  fullMessage?: string;
  aiDraftReply?: string;
}

interface MessageSectionProps {
  title: string;
  messages: Message[];
  isSpam?: boolean;
}

export function MessageSection({ title, messages, isSpam = false }: MessageSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            id={message.id}
            platform={message.platform}
            username={message.username}
            snippet={message.snippet}
            tag={message.tag}
            isSpam={isSpam || message.isSpam}
            isOffensive={message.isOffensive}
            fullMessage={message.fullMessage}
            aiDraftReply={message.aiDraftReply}
          />
        ))}
      </div>
    </div>
  );
}