import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/ToolShell';
import NotFoundPage from '@/pages/NotFoundPage';
import { SITE_URL, SITE_NAME, webPageLd, breadcrumbLd, articleLd } from '@/lib/seo';

export const ARTICLES = [
  {
    slug: 'unscramble-words-faster',
    tag: 'Strategy',
    title: 'How to Unscramble Words Faster: 7 Habits of Strong Players',
    description: 'Practical techniques for turning a jumbled rack into words quickly — from prefix hunting to vowel anchoring.',
    body: [
      { p: 'Unscrambling is a skill, not a talent. Players who seem to "see" words instantly are really running a handful of mental routines so well-practiced they feel automatic. Here are the seven that matter most.' },
      { h: '1. Hunt for prefixes and suffixes first' },
      { p: 'Common endings — ING, ED, ER, EST, LY, TION — and beginnings — RE, UN, PRE, OUT, OVER — contain most of the letters in a typical rack. Pull them out mentally and unscramble what is left. A rack like R-E-T-I-N-S-D is intimidating until you park RE and IN at the edges and are left with T, S, D.' },
      { h: '2. Anchor on the vowels' },
      { p: 'Almost every English word needs a vowel, and vowels constrain where consonants can go. With three vowels on your rack, think about which two might sit together (EA, OU, IE, AI) and build outward from that pair.' },
      { h: '3. Sort the rack alphabetically — then scramble it' },
      { p: 'Alphabetizing strips away the misleading order the letters arrived in. If nothing comes after a minute, deliberately shuffle the tiles. A fresh arrangement breaks the mental rut and new words surface.' },
      { h: '4. Learn the two-letter words cold' },
      { p: 'There are only about a hundred of them, and they are the highest-leverage knowledge in any tile game. QI, ZA, XI, XU, JO, and KA turn impossible racks into scoring plays. Our Word Lists page has the full set.' },
      { h: '5. Respect the blank tiles' },
      { p: 'A blank (the ? in our tools) is worth zero points but unlimited flexibility. Spend it on the letter that completes the longest word, not the first word you see.' },
      { h: '6. Practice with a purpose' },
      { p: 'Speed comes from volume with feedback. Unscramble a rack, then check what you missed with the Word Unscrambler. The words you overlooked are exactly the ones worth writing down.' },
      { h: '7. Play the board, not the rack' },
      { p: 'The best word is not always the longest one. A short word on a premium square, or one that opens a lane for your next turn, often beats a flashy bingo. Unscrambling is the means; position is the end.' },
    ],
  },
  {
    slug: 'wordle-opening-strategy',
    tag: 'Wordle',
    title: 'Wordle Opening Strategy: What the First Two Guesses Should Do',
    description: 'Why your opener matters less than your process, and how to use the first two guesses to map the word.',
    body: [
      { p: 'Ask ten Wordle players for the best opening word and you will get eleven answers. The truth is less exciting and more useful: any reasonable opener works if your second guess responds correctly to what the first one taught you.' },
      { h: 'What a good opener actually does' },
      { p: 'An opener is a probe. Its job is to test common letters in common positions. Words built from E, A, R, O, T, L, I, S, N, C cover the letters that appear most often in five-letter English words. Whether you prefer CRANE, SLATE, AUDIO, or ROATE matters far less than avoiding wasted letters like Q, Z, or repeated characters on guess one.' },
      { h: 'The second guess is the real decision' },
      { p: 'After the opener, you hold information: some letters are confirmed, some are excluded, some are floating. The strongest second guesses either lock floating letters into new positions or test a fresh set of common letters. When the opener comes back mostly gray, resist the urge to reuse its letters — a completely new word maps five more letters at once.' },
      { h: 'Use the helper as a checklist, not an oracle' },
      { p: 'Our Wordle Helper filters the open word list against the clues you enter. When it shows forty candidates, the right move is usually a guess that splits those candidates — testing letters that appear in many of them — rather than gambling on one. When it shows two, trust your read of which word the puzzle is more likely to use: answers lean toward familiar vocabulary.' },
      { h: 'Hard mode changes the math' },
      { p: 'In hard mode every guess must reuse confirmed clues, so you cannot burn a guess on fresh letters. That makes early guesses with common letters even more valuable, and makes traps — words like _IGHT with many possible first letters — genuinely dangerous. When you spot a trap forming, solve for the distinguishing letter before committing.' },
      { h: 'A calm process beats a clever word' },
      { p: 'The players with long streaks are not luckier; they are more systematic. Probe broadly, respond to the clues, watch for traps, and take the extra thirty seconds on guess four. The grid rewards patience.' },
    ],
  },
  {
    slug: 'two-letter-words',
    tag: 'Word Lists',
    title: 'The Two-Letter Words Every Word-Game Player Should Know',
    description: 'About a hundred tiny words decide close games. Here is how to learn them and which ones matter most.',
    body: [
      { p: 'In tile-based word games, two-letter words are the connective tissue of high scores. They let you play parallel to existing words, dump awkward letters, and reach premium squares that longer words cannot touch. There are only about a hundred of them in the standard word list — a weekend of effort for a lifetime of points.' },
      { h: 'The high-value oddballs' },
      { p: 'Start with the words that rescue impossible tiles: QI (the life force, and the only common way to play a Q without a U), ZA (slang for pizza), XI and XU (a Greek letter and a Vietnamese coin), JO (a Scottish sweetheart), and KA, KI, EX, OX, AX. These ten words alone transform how you see J, Q, X, and Z.' },
      { h: 'The vowel dumps' },
      { p: 'AA (a type of lava), AE (Scots for one), AI (a three-toed sloth), OE (a whirlwind), OI (a greeting). Vowel-heavy racks stop being a problem once these are automatic.' },
      { h: 'How to actually memorize them' },
      { p: 'Do not read the list top to bottom — quiz yourself. Our Word Lists page shows the full set; copy it, cover the answers, and recall ten at a time. Then play them deliberately in your next few games, even when a longer word is available. Retrieval under pressure is what makes them stick.' },
      { h: 'A note on dictionaries' },
      { p: 'Word validity depends on the dictionary your game uses. Our list follows the public-domain ENABLE word list, which closely matches most casual games but may differ slightly from any publisher\'s official list. When in doubt, check before you challenge.' },
    ],
  },
  {
    slug: 'wildcards-and-patterns',
    tag: 'How-to',
    title: 'Wildcards and Patterns: Getting the Most Out of Word Search',
    description: 'How ? wildcards, positional patterns, and stacked filters turn a word finder into a precision instrument.',
    body: [
      { p: 'Every tool on this site shares one search engine, and it speaks two small languages: racks and patterns. Learning the difference — and how to combine them — is the difference between scrolling a thousand results and seeing the word you need at the top.' },
      { h: 'Racks: order does not matter' },
      { p: 'A rack is a bag of letters. Enter T?MES and the engine finds every word buildable from those tiles, where ? becomes any single letter. Use racks for tile games, jumbles, and any puzzle where letters can be rearranged freely.' },
      { h: 'Patterns: position is everything' },
      { p: 'A pattern fixes letters in place. C?T only matches three-letter words starting with C and ending in T. Patterns are for crosswords, hangman-style games, and any grid where some squares are known.' },
      { h: 'Stack filters to shrink the haystack' },
      { p: 'The real power is in combination. Letters R?TAIN plus "starts with RE" plus a maximum length of seven turns hundreds of results into a shortlist. "Must include letters" is the quiet hero: it requires letters to appear somewhere without fixing their position — perfect when a crossing word hints at a letter.' },
      { h: 'Choose the right dictionary mode' },
      { p: 'The full dictionary is exhaustive but includes rare and archaic words. Common-words mode limits results to a 10,000-word frequency list — ideal for classroom puzzles and casual games where obscure answers frustrate rather than delight.' },
      { h: 'Sort for the situation' },
      { p: 'Longest-first finds bingos; highest-score finds value; A-to-Z is fastest when you are scanning for a word you half-remember. The same results, three different lenses.' },
    ],
  },
];

export function LearnPage() {
  return (
    <>
      <Helmet>
        <title>Learn — Word-Game Strategy Guides & How-Tos | WordCraft Tool</title>
        <meta name="description" content="Practical, original guides for word-game players: unscrambling technique, Wordle strategy, must-know word lists, and search tips." />
        <link rel="canonical" href={`${SITE_URL}/learn`} />
      </Helmet>
      <Seo title="Learn — WordCraft Tool" description="Word-game strategy guides and how-tos." url={`${SITE_URL}/learn`} siteName={SITE_NAME} />
      <JsonLd data={[
        webPageLd({ title: 'Learn — Word-Game Strategy Guides', description: 'Practical guides for word-game players.', path: '/learn' }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Learn', path: '/learn' }]),
      ]} />
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Learn' }]} />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Learn the craft
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Short, practical guides written by word-game players. No filler — just technique
          you can use in your next game.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/learn/${a.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{a.tag}</span>
                <span className="mt-2 font-display text-xl font-semibold leading-snug text-foreground">{a.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.description}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                  Read guide
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <AdSlot className="mt-12" minHeight={90} />
      </div>
    </>
  );
}

export function LearnArticlePage() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return <NotFoundPage />;
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{`${article.title} | WordCraft Tool`}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={`${SITE_URL}/learn/${article.slug}`} />
      </Helmet>
      <Seo title={article.title} description={article.description} url={`${SITE_URL}/learn/${article.slug}`} siteName={SITE_NAME} type="article" />
      <JsonLd data={[
        articleLd({ title: article.title, description: article.description, path: `/learn/${article.slug}` }),
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Learn', path: '/learn' }, { name: article.title, path: `/learn/${article.slug}` }]),
      ]} />
      <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Learn', to: '/learn' }, { label: article.title }]} />
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{article.tag}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{article.description}</p>
        <div className="mt-8">
          {article.body.map((block, i) => (
            block.h ? (
              <h2 key={i} className="mt-8 font-display text-2xl font-semibold text-foreground">{block.h}</h2>
            ) : (
              <p key={i} className="mt-4 leading-relaxed text-foreground/90">{block.p}</p>
            )
          ))}
        </div>
        <AdSlot className="mt-10" minHeight={90} />
        <nav aria-label="More guides" className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-xl font-semibold text-foreground">Keep reading</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/learn/${a.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{a.tag}</span>
                  <span className="mt-1 text-sm font-semibold text-foreground">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/learn" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All guides
          </Link>
        </nav>
      </article>
    </>
  );
}
