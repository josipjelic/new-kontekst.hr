import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/hr/Footer.jsx';
import Nav from './components/hr/Nav.jsx';
import EnFooter from './components/en/Footer.jsx';
import EnNav from './components/en/Nav.jsx';
import HrHome from './pages/hr/Home.jsx';
import EnHome from './pages/en/Home.jsx';
import HrQuestionnaire from './pages/hr/Questionnaire.jsx';
import EnQuestionnaire from './pages/en/Questionnaire.jsx';
import { usePointerMotion } from './hooks/usePointerMotion.js';
import { useScrollReveal } from './hooks/useScrollReveal.js';

function CroatianSite() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'hr' }} />
      <Nav />
      <main>
        <HrHome />
      </main>
      <Footer />
    </>
  );
}

function EnglishSite() {
  return (
    <>
      <EnNav />
      <main>
        <EnHome />
      </main>
      <EnFooter />
    </>
  );
}

export default function App() {
  usePointerMotion();
  useScrollReveal();

  return (
    <Routes>
      <Route path="/" element={<CroatianSite />} />
      {/* Do not add path="/en/" + Navigate: RR matches it for `/en` with higher rank than this route, so `<Navigate>` renders null (blank page). */}
      <Route path="/en" element={<EnglishSite />} />
      <Route path="/upitnik" element={<HrQuestionnaire />} />
      <Route path="/en/questionnaire" element={<EnQuestionnaire />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
