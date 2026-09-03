import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import {
  WordFinderPage, UnscramblerPage, AnagramPage, CrosswordPage,
} from './pages/ToolPages';
import WordlePage from './pages/WordlePage';
import { ScramblePage, DefinitionPage, WordListsPage } from './pages/ExtraPages';
import { LearnPage, LearnArticlePage } from './pages/LearnPage';
import {
  AboutPage, ContactPage, PrivacyPage, TermsPage, DisclaimerPage,
} from './pages/StaticPages';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/word-finder" element={<WordFinderPage />} />
          <Route path="/word-unscrambler" element={<UnscramblerPage />} />
          <Route path="/anagram-solver" element={<AnagramPage />} />
          <Route path="/wordle-helper" element={<WordlePage />} />
          <Route path="/crossword-finder" element={<CrosswordPage />} />
          <Route path="/scramble-generator" element={<ScramblePage />} />
          <Route path="/definition-finder" element={<DefinitionPage />} />
          <Route path="/word-lists" element={<WordListsPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:slug" element={<LearnArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
