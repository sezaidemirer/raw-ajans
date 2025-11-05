import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading onLoadComplete={() => setIsLoading(false)} />;
  }

  // Development'ta basename yok, production'da (GitHub Pages) var
  const basename = import.meta.env.PROD ? '/raw-ajans' : '';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;

