import HeroVideo from '../components/HeroVideo';
import MenuColumns from '../components/MenuColumns';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactBlock from '../components/ContactBlock';

function Home() {
  return (
    <>
      <HeroVideo />
      <div className="content-frame">
        <MenuColumns />
        <PortfolioGrid />
        <ContactBlock />
      </div>
    </>
  );
}

export default Home;
