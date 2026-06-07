import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Reveal from './Reveal';

const faqKeys = [
  'pronounceName',
  'bookingAdvance',
  'bridalTrialRecommended',
  'bridalTrialDetails',
  'bridalTrialsForBrideOnly',
  'bookWeddingDay',
  'privateLocation',
  'travel',
  'travelFee',
  'bridalPackages',
  'preparation',
  'afterSubmit'
];

function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <div className="faq-list">
      {faqKeys.map((itemKey, index) => {
        const isOpen = activeIndex === index;

        return (
          <Reveal key={itemKey} delay={index * 80}>
            <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
              <button
                type="button"
                className="faq-item__button"
                aria-expanded={isOpen}
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
              >
                <span>{t(`faqPage.items.${itemKey}.question`)}</span>
                <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
              </button>
              <div className="faq-item__content">
                <p>{t(`faqPage.items.${itemKey}.answer`)}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
