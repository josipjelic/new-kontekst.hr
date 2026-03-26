import { Helmet } from 'react-helmet-async';
import Footer from '../../components/en/Footer.jsx';
import Nav from '../../components/en/Nav.jsx';
import QuestionnaireWizard from '../../components/en/Questionnaire.jsx';

export default function QuestionnairePage() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>AI Readiness Check for Your Business — Kontekst</title>
        <meta
          name="description"
          content="Answer 5 questions and get a personalised AI and automation readiness assessment for your business. Free. Results in under 2 minutes."
        />
        <meta
          property="og:title"
          content="Is your business ready for AI? Find out in 2 minutes."
        />
        <meta
          property="og:description"
          content="Free questionnaire for business owners. 5 questions, a personalised assessment, and concrete next steps — from Croatia's business automation specialists."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://kontekst.hr/en/questionnaire" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Nav hideCta={true} />
      <main id="main-content">
        <QuestionnaireWizard />
      </main>
      <Footer />
    </>
  );
}
