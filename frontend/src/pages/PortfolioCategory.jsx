import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { getPortfolioItemBySlug } from '../data/portfolio';
import { useTranslation } from '../hooks/useTranslation';

function PortfolioCategory() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const item = getPortfolioItemBySlug(slug);

  if (!item) {
    return (
      <section className="page-section">
        <div className="content-frame">
          <PageHeader
            eyebrow={t('portfolio.galleryEyebrow')}
            title={t('portfolio.categoryNotFoundTitle')}
            description={t('portfolio.categoryNotFoundDescription')}
          />
          <Button as={Link} to="/">
            {t('portfolio.backToPortfolio')}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="content-frame">
        <PageHeader
          eyebrow={t('portfolio.galleryEyebrow')}
          title={t(item.titleKey)}
          description={t('portfolio.galleryDescription')}
        />

        <Reveal className="portfolio-category-topbar">
          <Button as={Link} to="/">
            {t('portfolio.backToPortfolio')}
          </Button>
        </Reveal>

        <div className="portfolio-gallery">
          {item.images.map((image, index) => (
            <Reveal key={`${item.slug}-${index}`} delay={index * 30}>
              <figure className="portfolio-gallery__item">
                <img
                  src={image}
                  alt={`${t(item.titleKey)} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioCategory;
