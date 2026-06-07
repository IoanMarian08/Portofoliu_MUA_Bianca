import { portfolioItems } from '../data/portfolio';
import { useTranslation } from '../hooks/useTranslation';
import PortfolioCard from './PortfolioCard';
import Reveal from './Reveal';

function PortfolioGrid() {
  const { t } = useTranslation();

  return (
    <section className="section section--portfolio">
      <Reveal className="section-heading">
        <p className="eyebrow">{t('home.portfolioEyebrow')}</p>
        <h2>{t('home.portfolioTitle')}</h2>
      </Reveal>

      <div className="portfolio-grid">
        {portfolioItems.map((item, index) => (
          <Reveal key={item.id} delay={index * 80}>
            <PortfolioCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default PortfolioGrid;
