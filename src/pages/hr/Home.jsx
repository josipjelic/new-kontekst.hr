import Hero from '../../components/hr/Hero.jsx';
import Services from '../../components/hr/Services.jsx';
import HowWeWork from '../../components/hr/HowWeWork.jsx';
import AboutUs from '../../components/hr/AboutUs.jsx';
import Contact from '../../components/hr/Contact.jsx';
import { useScrollToHash } from '../../hooks/useScrollToHash.js';

export default function Home() {
  useScrollToHash('/');

  return (
    <>
      <Hero />
      <Services />
      <HowWeWork />
      <AboutUs />
      <Contact />
    </>
  );
}
