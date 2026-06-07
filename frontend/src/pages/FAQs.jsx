import FAQAccordion from '../components/FAQAccordion';
import PageHeader from '../components/PageHeader';
import { useTranslation } from '../hooks/useTranslation';

function FAQs() {
  const { t } = useTranslation();

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          eyebrow={t('faqPage.eyebrow')}
          title={t('faqPage.title')}
          description={t('faqPage.description')}
        />
        <FAQAccordion />
      </div>
    </section>
  );
}

export default FAQs;
