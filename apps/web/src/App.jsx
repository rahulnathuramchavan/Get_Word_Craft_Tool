import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
const HomePage = lazy(() => import('./pages/HomePage'));

// Lazy load tool pages
const WordFinderPage = lazy(() => import('./pages/ToolPages').then((m) => ({ default: m.WordFinderPage })));
const UnscramblerPage = lazy(() => import('./pages/ToolPages').then((m) => ({ default: m.UnscramblerPage })));
const AnagramPage = lazy(() => import('./pages/ToolPages').then((m) => ({ default: m.AnagramPage })));
const CrosswordPage = lazy(() => import('./pages/ToolPages').then((m) => ({ default: m.CrosswordPage })));
const WordlePage = lazy(() => import('./pages/WordlePage'));
const ScramblePage = lazy(() => import('./pages/ExtraPages').then((m) => ({ default: m.ScramblePage })));
const DefinitionPage = lazy(() => import('./pages/ExtraPages').then((m) => ({ default: m.DefinitionPage })));
const WordListsPage = lazy(() => import('./pages/ExtraPages').then((m) => ({ default: m.WordListsPage })));

// Lazy load learn & static pages
const LearnPage = lazy(() => import('./pages/LearnPage').then((m) => ({ default: m.LearnPage })));
const LearnArticlePage = lazy(() => import('./pages/LearnPage').then((m) => ({ default: m.LearnArticlePage })));
const AboutPage = lazy(() => import('./pages/StaticPages').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/StaticPages').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/StaticPages').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/StaticPages').then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/StaticPages').then((m) => ({ default: m.DisclaimerPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-5xl items-center justify-center px-4 py-16 text-muted-foreground" role="status">
      <div className="flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-hidden="true" />
        <span className="text-sm font-medium">Loading page…</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageFallback />}>
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
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
