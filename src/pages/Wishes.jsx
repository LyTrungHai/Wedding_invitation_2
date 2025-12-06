import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import {
  Calendar,
  Clock,
  ChevronDown,
  User,
  MessageCircle,
  Send,
  Smile,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { formatEventDate } from "@/lib/formatEventDate";

export default function Wishes() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [newWish, setNewWish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [wishes, setWishes] = useState([]);
  const [toast, setToast] = useState(null);

  const options = [
    { value: "ATTENDING", label: "Có, tôi sẽ tham dự" },
    { value: "NOT_ATTENDING", label: "Không, tôi không thể tham dự" },
    { value: "MAYBE", label: "Có thể, tôi sẽ xác nhận sau" },
  ];

  // Load message từ sessionStorage
  useEffect(() => {
    const lastWish = JSON.parse(sessionStorage.getItem("lastWish"));
    if (lastWish) {
      setWishes([lastWish]);
    }
  }, []);

  // Tự hide toast sau 3s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!newWish.trim() || !name.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xgvgzdwk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message: newWish, attendance }),
      });

      if (!response.ok) {
        setToast({ type: "error", message: "Gửi lời chúc thất bại!" });
        return;
      }

      const newWishObj = {
        id: wishes.length + 1,
        name,
        message: newWish,
        attending: attendance,
        timestamp: new Date().toISOString(),
      };

      setWishes((prev) => [newWishObj, ...prev]);
      sessionStorage.setItem("lastWish", JSON.stringify(newWishObj));

      setNewWish("");
      setName("");
      setAttendance("");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      setToast({ type: "success", message: "Gửi lời chúc thành công!" });
    } catch (error) {
      setToast({ type: "error", message: "Gửi lời chúc thất bại!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case "ATTENDING":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "NOT_ATTENDING":
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case "MAYBE":
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <section id="wishes" className="min-h-screen relative overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Toast tự chế */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white z-50 transition-opacity ${
            toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-14"
        >
          <span className="inline-block text-rose-500 font-medium">
            Lời chúc và tin nhắn
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
            Gửi những lời chúc tốt đẹp nhất đến chúng mình 💌
          </h2>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-[1px] w-12 bg-rose-200" />
            <MessageCircle className="w-5 h-5 text-rose-400" />
            <div className="h-[1px] w-12 bg-rose-200" />
          </div>
        </motion.div>

        {/* Danh sách lời chúc */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-4 animate-marquee"
            style={{
              display: "inline-flex",
              animation: "scroll 30s linear infinite",
            }}
          >
            {wishes.concat(wishes).map((wish, index) => (
              <motion.div
                key={`${wish.id}-${index}`}
                className="group relative w-[280px] flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />
                <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                  <div className="flex items-start space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                      {wish.name[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-800 text-sm truncate">
                          {wish.name}
                        </h4>
                        {getAttendanceIcon(wish.attending)}
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />
                        <time>{formatEventDate(wish.timestamp)}</time>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {wish.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CSS animation cho marquee */}
        <style>{`
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
          }
        `}</style>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <form onSubmit={handleSubmitWish} className="relative">
            <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg space-y-4">
              {/* Họ tên */}
              <div>
                <label className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                  <User className="w-4 h-4" />
                  <span>Tên của bạn</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 transition-all text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Trạng thái tham dự */}
              <div className="relative">
                <label className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Bạn có tham dự không?</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 text-left flex items-center justify-between"
                >
                  <span
                    className={attendance ? "text-gray-700" : "text-gray-400"}
                  >
                    {attendance
                      ? options.find((o) => o.value === attendance)?.label
                      : "Chọn trạng thái..."}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border overflow-hidden"
                    >
                      {options.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setAttendance(option.value);
                            setIsOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left ${
                            attendance === option.value
                              ? "bg-rose-50 text-rose-600"
                              : "text-gray-700 hover:bg-rose-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <input type="hidden" name="attendance" value={attendance} />
              </div>

              {/* Lời chúc */}
              <div>
                <label className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Lời chúc của bạn</span>
                </label>
                <textarea
                  name="message"
                  value={newWish}
                  onChange={(e) => setNewWish(e.target.value)}
                  placeholder="Gửi lời chúc đến cô dâu và chú rể..."
                  className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 resize-none transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Smile className="w-5 h-5" />
                  <span className="text-sm">Gửi lời chúc của bạn 💕</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all ${
                    isSubmitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-rose-500 hover:bg-rose-600"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}</span>
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
