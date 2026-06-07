import Reveal from './Reveal';

function PageHeader({ eyebrow, title, description }) {
  return (
    <Reveal className="page-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {description ? <p className="page-header__description">{description}</p> : null}
    </Reveal>
  );
}

export default PageHeader;
