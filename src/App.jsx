import Footer from './components/layout/Footer.jsx';
import Nav from './components/layout/Nav.jsx';
import Home from './pages/Home.jsx';
import { usePointerMotion } from './hooks/usePointerMotion.js';
import { useScrollReveal } from './hooks/useScrollReveal.js';

export default function App() {
  usePointerMotion();
  useScrollReveal();

  return (
    <>
      <Nav />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}
