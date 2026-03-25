import { Helmet } from 'react-helmet-async';
import Hero from '../../components/en/Hero.jsx';
import Usluge from '../../components/en/Usluge.jsx';
import KakoRadimo from '../../components/en/KakoRadimo.jsx';
import ONama from '../../components/en/ONama.jsx';
import Kontakt from '../../components/en/Kontakt.jsx';

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
      <Usluge />
      <KakoRadimo />
      <ONama />
      <Kontakt />
    </>
  );
}
