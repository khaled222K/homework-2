import { LanguageProvider } from './i18n/LanguageContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import Stats from './components/sections/Stats.jsx';
import About from './components/sections/About.jsx';
import Purpose from './components/sections/Purpose.jsx';
import Tracks from './components/sections/Tracks.jsx';
import Programs from './components/sections/Programs.jsx';
import Milestones from './components/sections/Milestones.jsx';
import Projects from './components/sections/Projects.jsx';
import Gallery from './components/sections/Gallery.jsx';
import Difference from './components/sections/Difference.jsx';
import Admission from './components/sections/Admission.jsx';
import Contact from './components/sections/Contact.jsx';
import ChatAssistant from './components/chat/ChatAssistant.jsx';
import DocumentHead from './components/layout/DocumentHead.jsx';

export function App() {
  return (
    <LanguageProvider>
      <DocumentHead />
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Purpose />
        <Tracks />
        <Programs />
        <Milestones />
        <Projects />
        <Gallery />
        <Difference />
        <Admission />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </LanguageProvider>
  );
}

export default App;
