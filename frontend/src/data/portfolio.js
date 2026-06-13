import generatedPortfolioImages from './generatedPortfolioImages.json';

const naturalCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
});

const imageBase =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f1e8de" />
          <stop offset="45%" stop-color="#d8c7b8" />
          <stop offset="100%" stop-color="#6d5445" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1500" fill="url(#g)" />
      <circle cx="860" cy="290" r="220" fill="rgba(255,255,255,0.15)" />
      <circle cx="280" cy="1160" r="320" fill="rgba(255,255,255,0.08)" />
      <text x="50%" y="50%" text-anchor="middle" fill="#fffaf2" font-size="72" font-family="Georgia, serif" letter-spacing="12">
        BEAUTY PORTFOLIO
      </text>
    </svg>
  `);

const categoryDefinitions = [
  {
    folderName: 'glam',
    slug: 'glam',
    titleKey: 'portfolio.categories.glam'
  },
  {
    folderName: 'editorial&creative',
    slug: 'editorial-creative',
    titleKey: 'portfolio.categories.editorialCreative'
  },
  {
    folderName: 'retro - pin up',
    slug: 'retro-pin-up',
    titleKey: 'portfolio.categories.retroPinUp'
  },
  {
    folderName: 'bridal',
    slug: 'bridal',
    titleKey: 'portfolio.categories.bridal'
  },
  {
    folderName: 'soft glam',
    slug: 'soft-glam',
    titleKey: 'portfolio.categories.softGlam'
  },
  {
    folderName: 'mature skin',
    slug: 'mature-skin',
    titleKey: 'portfolio.categories.matureSkin'
  },
  {
    folderName: 'fashion show x interact cismigiu',
    slug: 'fashion-show-x-interact-cismigiu',
    titleKey: 'portfolio.categories.fashionShow'
  }
];

function getImageSortKey(imagePath) {
  const decodedPath = decodeURIComponent(imagePath);
  const fileName = decodedPath.split('/').pop() || decodedPath;
  const dotIndex = fileName.lastIndexOf('.');

  return dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
}

function sortImagesNaturally(images) {
  return [...images].sort((left, right) =>
    naturalCollator.compare(getImageSortKey(left), getImageSortKey(right))
  );
}

function buildCategory(definition) {
  const images = sortImagesNaturally(generatedPortfolioImages[definition.folderName] || []);

  return {
    id: definition.slug,
    folderName: definition.folderName,
    slug: definition.slug,
    titleKey: definition.titleKey,
    image: images[0] || imageBase,
    images
  };
}

export const portfolioItems = categoryDefinitions.map(buildCategory);

export function getPortfolioItemBySlug(slug) {
  return portfolioItems.find((item) => item.slug === slug);
}
