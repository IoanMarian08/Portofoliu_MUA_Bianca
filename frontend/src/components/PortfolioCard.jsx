import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

function PortfolioCard({ item }) {
  const { t } = useTranslation();
  const title = t(item.titleKey);

  return (
    <Link className="portfolio-card" to={`/portfolio/${item.slug}`}>
      <div className="portfolio-card__image-wrap">
        <img
          src={item.image}
          alt={`${title} ${t('portfolio.modalImageSuffix')}`}
          loading="lazy"
          decoding="async"
        />
        <span className="portfolio-card__overlay" />
        <span className="portfolio-card__title">{title}</span>
      </div>
    </Link>
  );
}

export default PortfolioCard;
