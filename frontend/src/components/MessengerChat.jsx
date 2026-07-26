import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Phone, Sparkles } from "lucide-react";

function MessengerChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Xin chào! 👋 Cảm ơn bạn đã liên hệ HoaCaiDo Phenikaa Store. Chúng tôi có thể hỗ trợ gì cho bạn hôm nay?",
      time: "Vừa xong"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Giả lập câu trả lời tự động từ bộ phận CSKH / Bot Phenikaa Store
    setTimeout(() => {
      let replyText = "Cảm ơn bạn đã nhắn tin! Nhân viên tư vấn HoaCaiDo Phenikaa Store sẽ kiểm tra và phản hồi ngay trong giây lát ạ.";
      
      const lower = text.toLowerCase();
      if (lower.includes("iphone") || lower.includes("17")) {
        replyText = "Dạ iPhone 17 Pro Max chính hãng đang có chương trình Đặt Trước tặng gói Bảo Hành 24 Tháng + Trả góp 0%. Bạn có muốn nhận báo giá chi tiết không ạ?";
      } else if (lower.includes("bảo hành") || lower.includes("lỗi")) {
        replyText = "Dạ tất cả sản phẩm tại Phenikaa Store đều được cam kết bảo hành 24 tháng chính hãng và lỗi 1 đổi 1 trong 30 ngày toàn quốc ạ!";
      } else if (lower.includes("trả góp") || lower.includes("giá")) {
        replyText = "Dạ cửa hàng hỗ trợ trả góp 0% qua thẻ tín dụng hoặc CCCD, trả trước 0đ nhận máy ngay trong 15 phút ạ!";
      } else if (lower.includes("balo") || lower.includes("bình nước")) {
        replyText = "Dạ phụ kiện Phenikaa Uni (Bình giữ nhiệt Inox 304 & Balo chống nước) đang được giảm 20% cho sinh viên Edu ạ!";
      }

      const botReply = {
        id: Date.now() + 1,
        sender: "bot",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1200);
  };

  const quickSuggestions = [
    "Tư vấn iPhone 17 Pro Max",
    "Chính sách bảo hành 24t",
    "Hướng dẫn mua trả góp 0%",
    "Ưu đãi phụ kiện Phenikaa"
  ];

  return (
    <>
      {/* Khung Chat Box Nổi Messenger */}
      {isOpen && (
        <div className="messenger-chat-window">
          {/* Header Chat Box */}
          <div className="chat-window-header">
            <div className="header-info">
              <div className="bot-avatar-box">
                <Bot size={20} />
                <span className="online-indicator"></span>
              </div>
              <div className="header-title">
                <strong>HoaCaiDo Messenger Support</strong>
                <span><Sparkles size={12} /> Trực tuyến 24/7 (Sẵn sàng hỗ trợ)</span>
              </div>
            </div>
            <div className="header-actions">
              <a 
                href="https://m.me" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-open-app" 
                title="Mở ứng dụng Messenger"
              >
                Mở app
              </a>
              <button onClick={() => setIsOpen(false)} className="btn-close-chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Thân Chat chứa tin nhắn */}
          <div className="chat-window-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-bubble ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="msg-avatar"><Bot size={14} /></div>
                )}
                <div className="msg-content">
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-bubble bot typing">
                <div className="msg-avatar"><Bot size={14} /></div>
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Các câu hỏi gợi ý nhanh */}
          <div className="quick-suggestions-row">
            {quickSuggestions.map((item, idx) => (
              <button key={idx} onClick={() => handleSendMessage(item)}>
                {item}
              </button>
            ))}
          </div>

          {/* Ô Nhập Tin Nhắn */}
          <form 
            className="chat-window-footer" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn-send-msg" disabled={!inputText.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Bộ Nút Floating Action Contacts */}
      <div className="floating-contact-widgets">
        <a href="tel:1900633471" className="floating-btn phone" title="Gọi mua hàng 1900.633.471">
          <Phone size={22} />
        </a>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`floating-btn messenger ${isOpen ? "active" : ""}`} 
          title="Nhắn tin Messenger"
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
          {!isOpen && <span className="messenger-ping-badge">1</span>}
        </button>

        <a 
          href="https://zalo.me" 
          target="_blank" 
          rel="noreferrer" 
          className="floating-btn zalo" 
          title="Chat qua Zalo"
        >
          <span className="zalo-text">Zalo</span>
        </a>
      </div>
    </>
  );
}

export default MessengerChat;
