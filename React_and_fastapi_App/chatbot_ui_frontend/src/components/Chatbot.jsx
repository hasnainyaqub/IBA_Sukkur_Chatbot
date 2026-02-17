import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

function Chatbot({ title = "Website Assistant" }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hello 👋 How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Convert bot message text into formatted HTML
  const parseBotMessage = (text) => {
    let html = text;

    html = html.replace(
      /^\*\*(.+?)\*\*$/gm,
      "<h3 class='bot-heading'>$1</h3>"
    );

    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    html = html.replace(/^\s*[-*+] (.*$)/gim, "<li>$1</li>");

    if (html.includes("<li>")) {
      html =
        "<ul class='bot-list'>" +
        html.replace(/<\/li>\s*<li>/g, "</li><li>") +
        "</ul>";
    }

    if (html.includes("|")) {
      const lines = html.split("\n");
      let tableHTML = "<table class='bot-table'>";
      lines.forEach((line) => {
        if (line.trim() === "" || line.startsWith("*")) return;
        const cols = line.split("|").map((c) => c.trim());
        if (cols.length > 1) {
          tableHTML += "<tr>";
          cols.forEach((col) => (tableHTML += `<td>${col}</td>`));
          tableHTML += "</tr>";
        }
      });
      tableHTML += "</table>";
      html = tableHTML;
    }

    html = html.replace(/\n/g, "<br/>");

    return html;
  };

  const sendMessage = async (text) => {
    const finalMessage = text || message;
    if (finalMessage.trim() === "") return;

    const userMsg = {
      text: finalMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalMessage }),
      });

      const data = await response.json();

      const botReply = {
        text: parseBotMessage(
          data.response || "No response from server"
        ),
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const errorReply = {
        text: "⚠ Server error. Please try again later.",
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorReply]);
    }

    setTyping(false);
  };

  return (
    <div className="chatbot-container">

      {/* SHOW TOGGLE ONLY WHEN CLOSED */}
      {!open && (
        <button
          className="chatbot-toggle"
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}

      {/* SHOW CHAT WINDOW ONLY WHEN OPEN */}
      {open && (
        <div className="chatbot-box">

          {/* Header */}
          <div className="chatbot-header">
            {title}
            <span
              className="close-btn"
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            >
              ✖
            </span>
          </div>

          {/* Messages */}
          <div className="chatbot-body">

            <div className="quick-buttons">
              <button onClick={() => sendMessage("Admission Info")}>
                Admission Info
              </button>
              <button onClick={() => sendMessage("Courses Details")}>
                Courses
              </button>
              <button onClick={() => sendMessage("Contact Support")}>
                Contact
              </button>
            </div>

            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="avatar">🤖</div>
                )}

                <div className="message-bubble">
                  {msg.sender === "bot" ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  ) : (
                    <p>{msg.text}</p>
                  )}

                  <span className="time">{msg.time}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="message-row bot">
                <div className="avatar">🤖</div>
                <div className="typing">...</div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Footer */}
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
            />
            <button onClick={() => sendMessage()}>
              ➤
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Chatbot;
