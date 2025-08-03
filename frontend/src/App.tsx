import React, { useEffect, useState } from 'react';
import './App.css'; // Assume all styles are moved into App.css or used inline as needed

const features = [
  {
    icon: '🧙‍♂',
    title: 'Trade & Gift your Swaps',
    text: 'Mint NFTs that are tradable or giftable, giving you total control over your swap intent before execution.',
  },
  {
    icon: '🌉',
    title: 'Cross-chain Magic',
    text: 'Seamless integration with 1inch Fusion+ and LayerZero to execute real cross-chain swaps from Polygon to Sui and beyond.',
  },
  {
    icon: '🔥',
    title: 'Execute with a Burn',
    text: 'Burn your SwapScroll NFT at will to trigger the actual onchain swap — delay or pre-commit your trades with ease.',
  }
];

const timelineSteps = [
  {
    icon: '🪄',
    label: 'Mint',
    desc: 'Mint a SwapScroll NFT embedding your swap intent — chain, tokens, and amount.'
  },
  {
    icon: '🤝',
    label: 'Hold / Trade / Gift',
    desc: 'Keep your SwapScrolls or pass them on to others — flexibility at your fingertips.'
  },
  {
    icon: '🔥',
    label: 'Burn to Execute',
    desc: 'Burn your NFT to fire the swap on-chain using 1inch Fusion+ and LayerZero messaging.'
  },
  {
    icon: '🏅',
    label: 'Claim Rewards',
    desc: 'Receive tokens on the destination chain alongside exclusive achievement NFTs — the magic complete!'
  }
];

function App() {
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('nav a');
      const scrollY = window.scrollY;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 80;
        const sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const name = e.target.contactName.value.trim();
    const email = e.target.contactEmail.value.trim();
    const message = e.target.contactMessage.value.trim();

    if (name.length < 2 || email.length < 5 || message.length < 5) {
      setContactStatus("Please provide valid name, email and message.");
      return;
    }

    setContactStatus("Sending message…");
    setTimeout(() => {
      setContactStatus(Thanks, ${name}! Your message has been sent.);
      e.target.reset();
    }, 1800);
  };

  return (
    <div className="App">
      <header>
        <div className="header-left">
          <div className="header-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>0xSwap</div>
          <nav>
            <a href="#hero" className="active">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#footer">Contact</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="login-btn" onClick={() => alert("Redirecting to Login / Sign Up...")}>Login / Sign Up</button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-text">
            <h1 className="hero-title">Summon the Power of Cross-chain Swaps!</h1>
            <p className="hero-subtitle">0xSwap lets you mint magical NFTs embodying your future cross-chain swap intent — hold, trade, or burn at your moment of choice.</p>
            <div className="cta-container">
              <button className="btn-primary" onClick={() => window.location.href = 'mint.html'}>Mint a SwapScroll</button>
              <button className="btn-secondary" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>See How it Works</button>
            </div>
          </div>
          <div className="scroll-floating">
            {/* Put your magic scroll SVG component here */}
          </div>
        </section>

        <section id="features" className="features">
          {features.map((feat, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{feat.icon}</div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-text">{feat.text}</p>
            </div>
          ))}
        </section>

        <section id="how-it-works" className="how-it-works">
          <h2 className="how-title">How <span style={{ color: '#ffe77c' }}>0xSwap</span> Works</h2>
          <div className="timeline">
            {timelineSteps.map((step, i) => (
              <div key={i} className="timeline-step">
                <div className="timeline-icon">{step.icon}</div>
                <div className="timeline-label">{step.label}</div>
                <div className="timeline-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="footer">
        <p>&copy; 2025 0xSwap — Powered by 1inch Fusion+ and LayerZero</p>
        <div className="footer-links">
          {/* Replace hrefs with real URLs */}
          <a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
          <a href="https://github.com/yourgithub">GitHub</a>
          <a href="https://twitter.com/yourtwitter">Twitter</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label htmlFor="contactName">Name</label>
            <input type="text" name="contactName" required />
            <label htmlFor="contactEmail">Email</label>
            <input type="email" name="contactEmail" required />
            <label htmlFor="contactMessage">Message</label>
            <textarea name="contactMessage" required></textarea>
            <button type="submit">Send</button>
          </form>
          <p style={{ marginTop: '12px', color: '#ffe77c', fontWeight: 600 }}>{contactStatus}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;