import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../store/chat";

export const Chat = () => {
  const messages = useSelector(selectMessages);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <aside className="chat-sidebar" aria-label="Chat">
      <div className="chat-sidebar__header">
        <h2>Chat</h2>
        <span>{messages.length} Nachrichten</span>
      </div>
      <div className="chat-sidebar__messages">
        {messages.map((message, index) => (
          <p className="chat-message" key={index}>
            {message}
          </p>
        ))}
        {messages.length === 0 && (
          <p className="chat-sidebar__empty">Noch keine Nachrichten.</p>
        )}
        <div ref={chatEndRef} />
      </div>
    </aside>
  );
};
