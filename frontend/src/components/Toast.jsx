import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

function Toast({ id, type = "success", message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} className="toast-icon success" />;
      case "error":
        return <AlertCircle size={20} className="toast-icon error" />;
      case "info":
      default:
        return <Info size={20} className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast-item toast-${type}`}>
      {getIcon()}
      <span className="toast-message">{message}</span>
      <button onClick={() => onClose(id)} className="toast-close-btn">
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
