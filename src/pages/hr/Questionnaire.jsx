import { Helmet } from 'react-helmet-async';
import Footer from '../../components/hr/Footer.jsx';
import Nav from '../../components/hr/Nav.jsx';
import QuestionnaireWizard from '../../components/hr/Questionnaire.jsx';

export default function QuestionnairePage() {
  return (
    <>
      <Helmet>
        <html lang="hr" />
        <title>Upitnik AI spremnosti — Kontekst.hr</title>
        <meta
          name="description"
          content="Odgovorite na 5 pitanja i dobijte personaliziranu procjenu AI i automatizacije za vaše poslovanje. Besplatno. Rezultat za 2 minute."
        />
        <meta property="og:title" content="Jeste li spremni za AI? Provjerite za 2 minute." />
        <meta
          property="og:description"
          content="Besplatni upitnik za vlasnike tvrtki. 5 pitanja, personalizirana procjena, konkretni sljedeći koraci — od stručnjaka za poslovne automatizacije."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://kontekst.hr/upitnik" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Nav />
      <main id="main-content">
        <QuestionnaireWizard />
      </main>
      <Footer />
    </>
  );
}
