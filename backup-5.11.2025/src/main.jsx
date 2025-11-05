import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n' // i18n konfigürasyonu

// Scrollbar'ı tamamen gizle (macOS overlay scrollbar için agresif yaklaşım)
const hideScrollbar = () => {
  // HTML element
  document.documentElement.style.scrollbarWidth = 'none';
  document.documentElement.style.msOverflowStyle = 'none';
  document.documentElement.style.setProperty('scrollbar-width', 'none', 'important');
  
  // Body element
  if (document.body) {
    document.body.style.scrollbarWidth = 'none';
    document.body.style.msOverflowStyle = 'none';
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.style.setProperty('scrollbar-width', 'none', 'important');
    document.body.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
  }
  
  // Tüm elementler için scrollbar gizle (macOS overlay scrollbar dahil)
  const styleId = 'hide-scrollbar-style';
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      *::-webkit-scrollbar {
        width: 0px !important;
        height: 0px !important;
        display: none !important;
        visibility: hidden !important;
        background: transparent !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        opacity: 0 !important;
      }
      *::-webkit-scrollbar-track {
        display: none !important;
        visibility: hidden !important;
        width: 0px !important;
        background: transparent !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        opacity: 0 !important;
      }
      *::-webkit-scrollbar-thumb {
        display: none !important;
        visibility: hidden !important;
        width: 0px !important;
        background: transparent !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        opacity: 0 !important;
      }
      html, body {
        -webkit-overflow-scrolling: touch !important;
        overflow-style: none !important;
      }
      /* macOS overlay scrollbar için ekstra gizleme */
      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        width: 0px !important;
        height: 0px !important;
        display: none !important;
        background: transparent !important;
        opacity: 0 !important;
      }
      /* macOS overlay scrollbar hover efektini tamamen devre dışı bırak */
      *::-webkit-scrollbar-thumb:hover {
        width: 0px !important;
        display: none !important;
        visibility: hidden !important;
        background: transparent !important;
        transform: none !important;
        scale: 1 !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        opacity: 0 !important;
      }
      *::-webkit-scrollbar:hover {
        width: 0px !important;
        display: none !important;
        visibility: hidden !important;
        background: transparent !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        opacity: 0 !important;
      }
      html::-webkit-scrollbar-thumb:hover,
      body::-webkit-scrollbar-thumb:hover {
        width: 0px !important;
        display: none !important;
        visibility: hidden !important;
        background: transparent !important;
        transform: none !important;
        scale: 1 !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        opacity: 0 !important;
      }
      html::-webkit-scrollbar:hover,
      body::-webkit-scrollbar:hover {
        width: 0px !important;
        display: none !important;
        visibility: hidden !important;
        background: transparent !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Tüm scrollbar elementlerini DOM'dan gizle
  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    if (el.style) {
      el.style.setProperty('scrollbar-width', 'none', 'important');
      el.style.setProperty('-ms-overflow-style', 'none', 'important');
    }
  });
};

// Sayfa yüklendiğinde ve sonrasında çalıştır
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideScrollbar);
} else {
  hideScrollbar();
}

// Ekstra güvenlik için - birden fazla kez çalıştır
setTimeout(hideScrollbar, 0);
setTimeout(hideScrollbar, 100);
setTimeout(hideScrollbar, 500);
setTimeout(hideScrollbar, 1000);

// Scroll event'inde de kontrol et
window.addEventListener('scroll', hideScrollbar, { passive: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


