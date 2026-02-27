import { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';

/**
 * FAQ 元件 - 提供手風琴（Accordion）效果的常見問題區塊
 */
function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問答</span>
                    <h2 id="faq-title" className="section-header__title">
                        有任何疑問嗎？
                    </h2>
                    <p className="section-header__desc">
                        這裡有您最關心的問題解答。如果您還有其他疑問，歡迎隨時聯繫我們的客服團隊。
                    </p>
                </div>

                <div className="faq__list">
                    {FAQ_DATA.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''}`}
                        >
                            <button 
                                className="faq__question"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span>{item.question}</span>
                                <span className={`faq__icon ${activeIndex === index ? 'faq__icon--active' : ''}`}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                            <div 
                                id={`faq-answer-${index}`}
                                className="faq__answer-wrapper"
                                style={{ 
                                    maxHeight: activeIndex === index ? '500px' : '0',
                                    opacity: activeIndex === index ? '1' : '0'
                                }}
                            >
                                <div className="faq__answer">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
