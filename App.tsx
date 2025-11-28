import React from 'react';
import { Background3D } from './components/Background3D';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="font-sans text-white min-h-screen selection:bg-gold-500 selection:text-black relative bg-black">
      <Background3D />
      <Navbar />
      
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>

      <footer className="bg-black py-10 text-center border-t border-white/5 relative z-10">
        <p className="text-gray-600 font-display text-xs tracking-widest uppercase">
          © 2024 Esraa. Graphic Designer. <br/>
          <span className="opacity-50 mt-2 block">All Rights Reserved.</span>
        </p>
      </footer>
    </div>
  );
}

export default App;