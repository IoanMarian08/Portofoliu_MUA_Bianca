import { useTranslation } from '../hooks/useTranslation';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <p>{t('footer.copyright')}</p>
    </footer>
  );
}

export default Footer;
