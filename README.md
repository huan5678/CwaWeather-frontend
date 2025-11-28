# WEATHER_OS // RAW METEOROLOGICAL DATA

![License](https://img.shields.io/badge/license-MIT-black.svg)
![React](https://img.shields.io/badge/SYSTEM-REACT_18-000000)
![Vite](https://img.shields.io/badge/BUILD-VITE_5-000000)
![Style](https://img.shields.io/badge/VISUAL-NEO_BRUTALISM-ff00ff)

**WEATHER_OS** 是一個激進的氣象資訊系統。我們屏棄了傳統天氣 App 的過度裝飾與擬物化設計，轉而採用 **Anti-Design (Neo-Brutalism)** 語言。

**核心理念：**
*   **RAW**: 數據即介面。不做無謂的修飾。
*   **BOLD**: 高對比度、粗框線、強烈的視覺衝擊。
*   **SYSTEM**: 將氣象資訊視為系統參數，提供儀表板式的監控體驗。

專案架構已全面升級為 React + Vite，在桌面端提供全寬幅的數據中控台，在行動端則提供高效率的垂直資訊流。

---

## ⚡ SYSTEM CAPABILITIES (功能模組)

*   **DASHBOARD OVERVIEW (總覽)**：
    *   **STATUS**: 即時氣溫與天氣現象監控。
    *   **ADVISORY**: 直白的穿衣與攜帶建議（例如：「需要帶傘」、「適合短袖」）。
    *   **LOCATOR**: 支援全台縣市快速切換與 GPS 定位鎖定。
*   **ANALYTICS (數據分析)**：
    *   **36HR TREND**: 透過高對比折線圖，精確掃描未來 36 小時的氣溫與降雨機率走勢。
*   **PROJECTIONS (預報)**：
    *   **GRID VIEW**: 模組化的未來時段預報卡片，資訊一目瞭然。
*   **FAVORITES (收藏)**：
    *   **MEMORY**: 本地端儲存常駐監控地點，快速存取。
*   **RESPONSIVE LAYOUT (響應式架構)**：
    *   **MOBILE**: 垂直堆疊流 (Vertical Stack Flow)。
    *   **DESKTOP**: 非對稱控制台佈局 (Asymmetric Console Layout) - 左側控制，右側全寬數據。

---

## 🛠 技術堆疊

*   **核心框架**: [React 18](https://reactjs.org/)
*   **建置工具**: [Vite](https://vitejs.dev/)
*   **樣式系統**: [Styled-components](https://styled-components.com/) (CSS-in-JS)
*   **圖表庫**: [Recharts](https://recharts.org/) (SVG 響應式圖表)
*   **圖示庫**: [Lucide React](https://lucide.dev/)
*   **資料來源**: 中央氣象署 (CWA) 開放資料平台 (透過自建 Backend API)

---

## 🚀 安裝與執行

### 前置需求
*   Node.js (v16 或更高版本)
*   npm 或 yarn

### 1. 下載專案
```bash
git clone https://github.com/your-username/CwaWeather-frontend.git
cd CwaWeather-frontend
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 設定環境變數
在專案根目錄建立 `.env` 檔案，並設定 API Endpoint：
```env
VITE_API_BASE_URL=https://cwa-backend-api.zeabur.app/api
```

### 4. 啟動開發伺服器
```bash
npm run dev
```
瀏覽器開啟 `http://localhost:5173` 即可看到畫面。

### 5. 建置生產版本
```bash
npm run build
```

---

## 📂 專案結構

```
src/
├── api/            # API 客戶端設定 (Axios)
├── components/     # React UI 組件 (WeatherCard, Chart, etc.)
├── data/           # 靜態資料 (城市列表、座標)
├── styles/         # 全域樣式與主題變數 (GlobalStyle.js)
├── utils/          # 工具函式 (Geolocation, LocalStorage)
├── App.jsx         # 主應用程式邏輯與佈局
└── main.jsx        # 入口點
```

---

## 🤝 貢獻方式

歡迎任何形式的貢獻！如果您發現 Bug 或有新功能建議：

1.  Fork 本專案。
2.  建立您的 Feature Branch (`git checkout -b feature/AmazingFeature`)。
3.  提交您的變更 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到 Branch (`git push origin feature/AmazingFeature`)。
5.  開啟 Pull Request。

---

## 📄 授權

本專案採用 [MIT License](LICENSE) 授權。