import { Helmet } from 'react-helmet-async';
import Hero from '../../components/en/Hero.jsx';
import Services from '../../components/en/Services.jsx';
import HowWeWork from '../../components/en/HowWeWork.jsx';
import AboutUs from '../../components/en/AboutUs.jsx';
import Contact from '../../components/en/Contact.jsx';

export default function Home() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>Kontekst.hr — Business Automation &amp; AI for Companies</title>
        <meta
          name="description"
          content="Business automation, n8n workflow solutions, and AI applications for companies. Automate processes and save hours of work every day."
        />
        <link rel="canonical" href="https://kontekst.hr/en/" />
        <link rel="alternate" hrefLang="hr" href="https://kontekst.hr/" />
        <link rel="alternate" hrefLang="en" href="https://kontekst.hr/en/" />
      </Helmet>
      <Hero />
      <Services />
      <HowWeWork />
      <AboutUs />
      <Contact />
    </>
  );
}
