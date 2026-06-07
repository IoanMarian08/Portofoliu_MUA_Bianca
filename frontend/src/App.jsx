import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import MeetYourArtist from './pages/MeetYourArtist';
import Contact from './pages/Contact';
import MakeAppointment from './pages/MakeAppointment';
import Instagram from './pages/Instagram';
import FAQs from './pages/FAQs';
import PortfolioCategory from './pages/PortfolioCategory';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/meet-your-artist" element={<MeetYourArtist />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/make-an-appointment" element={<MakeAppointment />} />
        <Route path="/instagram" element={<Instagram />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/portfolio/:slug" element={<PortfolioCategory />} />
      </Route>
    </Routes>
  );
}

export default App;
