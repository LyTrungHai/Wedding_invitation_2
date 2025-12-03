import config from "@/config/config";
import { motion } from "framer-motion";
import {
  Copy,
  Gift,
  CheckCircle,
  Wallet,
  Building2,
  X,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Gifts() {
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);

  // Run animation once
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  // ✅ Copy theo accountNumber thay vì bank
  const copyToClipboard = (text, accountNumber) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountNumber);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  // ✅ Hàm tải QR về
  // const handleDownload = (qrUrl, bankName) => {
  //   const link = document.createElement("a");
  //   link.href = qrUrl;
  //   link.download = `QR-${bankName || "Bank"}.png`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <>
      <section id="gifts" className="min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              Quà Cưới
            </motion.span>

            <motion.div
              initial={{ scale: 0 }}
              animate={hasAnimated ? { scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <Gift className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={hasAnimated ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-4 max-w-md mx-auto"
            >
              <p className="text-gray-600 italic text-sm">
                Sự hiện diện và lời chúc phúc của quý khách là niềm hạnh phúc
                lớn lao đối với chúng mình. Nếu quý khách muốn gửi tặng thêm
                chút tình cảm, xin vui lòng tham khảo thông tin bên dưới 💌
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={hasAnimated ? { scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 pt-4"
            >
              <div className="h-px w-8 bg-rose-200/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
              <div className="h-px w-8 bg-rose-200/50" />
            </motion.div>
          </motion.div>

          {/* Bank List */}
          <div className="max-w-2xl mx-auto grid gap-6">
            {config.data.banks.map((account, index) => (
              <motion.div
                key={account.accountNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * index + 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                  <div className="flex items-center justify-evenly">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm">
                        <Building2 className="w-full h-full text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {account.bank}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {account.accountName}
                        </p>
                      </div>

                      {/* ✅ QR image clickable */}
                      <div
                        onClick={() => setSelectedQR(account)}
                        className="w-[100px] aspect-square rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all hover:scale-105 cursor-pointer border border-rose-100"
                        style={{
                          backgroundImage: `url(${account.qrImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                    <Wallet className="w-5 h-5 text-rose-400 ml-2" />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between bg-gray-50/80 px-4 py-3 rounded-lg">
                      <p className="font-mono text-gray-700">
                        {account.accountNumber}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          copyToClipboard(
                            account.accountNumber,
                            account.accountNumber
                          )
                        }
                        className="flex items-center space-x-1 text-rose-500 hover:text-rose-600"
                      >
                        {copiedAccount === account.accountNumber ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copiedAccount === account.accountNumber
                            ? "Copied!"
                            : "Copy"}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Modal phóng to QR + tải xuống */}
      {selectedQR && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedQR(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative bg-white p-6 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ảnh QR */}
            <img
              src={selectedQR.qrImage}
              alt="QR Zoom"
              className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-2xl shadow-lg border border-gray-200 object-cover"
            />

            {/* Nút đóng */}
            <button
              onClick={() => setSelectedQR(null)}
              className="absolute -top-3 -right-3 bg-white text-rose-600 rounded-full p-1 shadow hover:bg-rose-50 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Nút tải xuống */}
            {/* <button
              onClick={() =>
                handleDownload(selectedQR.qrImage, selectedQR.bank)
              }
              className="mt-5 flex items-center justify-center gap-2 px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all duration-300 shadow-md w-full"
            >
              <Download className="w-5 h-5" />
              Tải mã QR
            </button> */}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
