import QRHai from "@/assets/qr_hai.jpg";
import QRNhu from "@/assets/qr_nhu.jpg";
const config = {
  data: {
    // Main invitation title that appears on the page
    title: "Thiệp mời cưới Trung Hải & Quỳnh Như",
    // Opening message/description of the invitation
    description:
      "Chúng mình sắp kết hôn và trân trọng kính mời bạn cùng chung vui trong khoảnh khắc đặc biệt này", // Nanti ini dibikin random
    // Groom's name
    groomName: "Trung Hải",
    // Bride's name
    brideName: "Quỳnh Như",
    // Groom's parents names
    parentGroom: "Bapak Groom & Ibu Groom",
    // Bride's parents names
    parentBride: "Bapak Bride & Ibu Bride",
    // Wedding date (format: YYYY-MM-DD)
    date: "2025-12-21",
    // Google Maps link for location (short clickable link)
    maps_url: "https://maps.app.goo.gl/kqadzKyg593MjtFPA",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    // maps_embed:
    //   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0000000000005!2d106.8270733147699!3d-6.175392995514422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4f1b6d7b1e7%3A0x2e69f4f1b6d7b1e7!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1633666820004!5m2!1sid!2sid",
    // Event time (free format, example: "10:00 - 12:00 WIB")
    maps_embed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.7251742372323!2d108.10288349873917!3d15.877252267661829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314203b137f99083%3A0x77a9df62539122e0!2zVHJ1bmcgVMOibSBI4buZaSBOZ2jhu4sgVGnhu4djIEPGsOG7m2kgUGjDumMgR2lhIEtoYW5n!5e1!3m2!1svi!2s!4v1764779132837!5m2!1svi!2s",
    
    time: "10h30",
    // Venue/building name
    location: "Tiệc cưới được tổ chức tại:",
    // Full address of the wedding venue
    address: "Số 227 Nguyễn Tất Thành, Thị trấn Ái Nghĩa, Đại Lộc, Quảng Nam (cũ)",
    // Image that appears when link is shared on social media
    ogImage: "/images/og-image.jpg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
      {
        // First event name
        title: "Lễ Thành Hôn",
        // Event date (format: YYYY-MM-DD)
        date: "2025-12-21",
        // Start time (format: HH:MM)
        startTime: "09:00 AM",
        // End time (format: HH:MM)
        endTime: "17:30",
        // Event venue
        location: "Grand Ballroom, Hotel Majesty",
        // Full address
        address: "Jl. Jend. Sudirman No.1, Jakarta",
      },
      {
        // Second event name
        title: "Tiệc cưới",
        date: "2025-12-21",
        startTime: "11:00 AM",
        location: "Grand Ballroom, Hotel Majesty",
        address: "Jl. Jend. Sudirman No.1, Jakarta",
      }
      // You can add more agenda items with the same format
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "/audio/Golden_Hour.mp3", // or /audio/nature-sound.mp3
      // Music title to display
      title: "Golden Hour", // or Nature Sound
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true
    },

    // List of bank accounts for digital envelope/gifts
    banks: [
      {
        bank: "VietcomBank",
        accountNumber: "9375224867",
        accountName: "NGUYEN THI QUYNH NHU",
        qrImage: QRNhu,
      },
      {
        // Bank name
        bank: "VietcomBank",
        // Account number
        accountNumber: "1047012633",
        // Account holder name (all uppercase)
        accountName: "LY TRUNG HAI",
        qrImage: QRHai,

      },
      // You can add more banks with the same format
    ]
  }
};

export default config;