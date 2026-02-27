import { useState, useEffect } from 'react';

/**
 * CookieConsent 元件
 * 用於在頁面底部顯示隱私權同意彈窗。
 * 使用 localStorage 紀錄使用者的選擇，若已同意則不再顯示。
 */
const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 檢查 localStorage 中是否已有同意記錄
        const consent = localStorage.getItem('cookie-consent-accepted');
        if (!consent) {
            // 如果沒有紀錄，延遲一下再顯示彈窗，增加視覺效果
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        // 儲存同意狀態到 localStorage
        localStorage.setItem('cookie-consent-accepted', 'true');
        // 隱藏彈窗
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent" id="cookie-consent-popup">
            <div className="cookie-consent__content">
                <h4 className="cookie-consent__title">隱私權與 Cookie 同意</h4>
                <p className="cookie-consent__text">
                    我們使用 Cookie 來提升您的瀏覽體驗並分析流量。點擊「我同意」即表示您同意我們使用 Cookie。
                </p>
            </div>
            <div className="cookie-consent__actions">
                <button 
                    className="btn btn--white btn--sm" 
                    onClick={() => setIsVisible(false)}
                    aria-label="拒絕或稍後再說"
                >
                    拒絕
                </button>
                <button 
                    className="btn btn--primary btn--sm" 
                    onClick={handleAccept}
                    id="accept-cookie-btn"
                >
                    我同意
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
