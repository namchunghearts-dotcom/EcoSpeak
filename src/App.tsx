import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { ECO_ZONES, EcoZone } from './constants';
import { Book, Gamepad2, Mic2, Map as MapIcon, ChevronLeft, Volume2, Star } from 'lucide-react';
import { SpeakingLab } from './components/SpeakingLab';

function MapView() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {ECO_ZONES.map((zone) => (
        <motion.button
          key={zone.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/${zone.id}`)}
          className="clay-card p-6 flex flex-col items-center text-center group relative overflow-hidden"
        >
          <div className={`absolute inset-0 opacity-10 ${zone.color}`} />
          <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform">{zone.icon}</span>
          <h3 className="text-2xl font-black text-gray-800 mb-2">{zone.name}</h3>
          <p className="text-gray-500 font-medium">Explore the {zone.name.toLowerCase()} world!</p>
        </motion.button>
      ))}
    </div>
  );
}

function ZoneView({ onPractice }: { onPractice: (word: string) => void }) {
  const { zoneId } = useParams();
  const navigate = useNavigate();
  const zone = ECO_ZONES.find(z => z.id === zoneId);

  if (!zone) return <div>Zone not found</div>;

  return (
    <div className="space-y-8">
      <div className="clay-card p-8 text-center relative overflow-hidden">
        <div className={`absolute inset-0 opacity-10 ${zone.color}`} />
        <span className="text-8xl mb-4 block">{zone.icon}</span>
        <h2 className="text-4xl font-black text-gray-800 mb-4">{zone.name} Zone</h2>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate(`/${zone.id}/dictionary`)} className="clay-button bg-blue-50 text-blue-600 flex items-center gap-2">
            <Book size={20} /> Dictionary
          </button>
          <button onClick={() => navigate(`/${zone.id}/game`)} className="clay-button bg-yellow-50 text-yellow-600 flex items-center gap-2">
            <Gamepad2 size={20} /> Play Game
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zone.vocab.map((item) => (
          <div key={item.word} className="clay-card p-4 flex gap-4 items-center">
            <img 
              src={item.image} 
              alt={item.word} 
              className="w-24 h-24 rounded-2xl object-cover shadow-inner"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-800">{item.word}</h4>
              <p className="text-blue-500 font-medium text-sm mb-2">{item.translation}</p>
              <button 
                onClick={() => onPractice(item.word)}
                className="text-xs font-black uppercase tracking-widest text-white bg-green-500 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-green-600 transition-colors"
              >
                <Mic2 size={12} /> Practice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DictionaryView({ onPractice }: { onPractice: (word: string) => void }) {
  const { zoneId } = useParams();
  const zone = ECO_ZONES.find(z => z.id === zoneId);

  if (!zone) return <div className="clay-card p-8 text-center font-bold">Zone not found</div>;

  const playSentence = (sentence: string) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{zone.icon}</span>
        <h2 className="text-3xl font-black text-gray-800">Visual Dictionary: {zone.name}</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {zone.vocab.map((item, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.word} 
            className="clay-card p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow"
          >
            <div className="relative group">
              <img 
                src={item.image} 
                alt={item.word} 
                className="w-full md:w-56 h-40 rounded-2xl object-cover shadow-md border-4 border-white"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                <button 
                  onClick={() => onPractice(item.word)}
                  className="bg-white p-3 rounded-full shadow-lg text-blue-500 hover:scale-110 transition-transform"
                >
                  <Mic2 size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-3xl font-black text-blue-600 tracking-tight">{item.word}</h3>
                  <span className="bg-blue-100 px-4 py-1 rounded-full text-sm font-black text-blue-500 uppercase tracking-wider">{item.translation}</span>
                </div>
                
                <div className="clay-inset p-4 mt-2 relative group">
                  <p className="text-gray-700 font-medium text-lg italic leading-relaxed pr-10">"{item.example}"</p>
                  <button 
                    onClick={() => playSentence(item.example)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-600 transition-colors"
                    title="Listen to sentence"
                  >
                    <Volume2 size={24} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => onPractice(item.word)}
                  className="clay-button bg-green-500 text-white flex-1 flex items-center justify-center gap-2 py-2"
                >
                  <Mic2 size={18} /> Practice Speaking
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GameZone() {
  const { zoneId } = useParams();
  const zone = ECO_ZONES.find(z => z.id === zoneId);
  const [gameState, setGameState] = useState<'menu' | 'labeling' | 'rescue'>('menu');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  if (!zone) return <div className="clay-card p-8 text-center font-bold">Zone not found</div>;

  useEffect(() => {
    if (gameState !== 'menu' && !gameFinished) {
      const options = [...zone.vocab.map(v => v.word)];
      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      setShuffledOptions(options);
    }
  }, [currentQuestion, gameState, gameFinished, zone]);

  const startGame = (mode: 'labeling' | 'rescue') => {
    setGameState(mode);
    setScore(0);
    setCurrentQuestion(0);
    setGameFinished(false);
    setFeedback(null);
  };

  const handleAnswer = (word: string) => {
    if (feedback) return;

    const isCorrect = word === zone.vocab[currentQuestion].word;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(s => s + 1);
      // Play success sound (simple beep)
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion < zone.vocab.length - 1) {
        setCurrentQuestion(q => q + 1);
      } else {
        setGameFinished(true);
      }
    }, 1000);
  };

  if (gameState === 'menu') {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-black text-gray-800 text-center">Choose a Game!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startGame('labeling')} 
            className="clay-card p-8 flex flex-col items-center gap-4 hover:bg-blue-50 transition-colors border-b-8 border-blue-200"
          >
            <div className="text-7xl mb-2">🏷️</div>
            <h3 className="text-2xl font-black text-blue-600">Labeling Master</h3>
            <p className="text-gray-500 font-medium text-center">Match the words to the pictures!</p>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startGame('rescue')} 
            className="clay-card p-8 flex flex-col items-center gap-4 hover:bg-green-50 transition-colors border-b-8 border-green-200"
          >
            <div className="text-7xl mb-2">🛡️</div>
            <h3 className="text-2xl font-black text-green-600">Eco Rescue</h3>
            <p className="text-gray-500 font-medium text-center">Save the {zone.name} by answering correctly!</p>
          </motion.button>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="clay-card p-12 text-center"
      >
        <div className="text-8xl mb-6">🏆</div>
        <h2 className="text-4xl font-black text-gray-800 mb-2">Mission Complete!</h2>
        <p className="text-2xl text-gray-500 mb-8">
          You earned <span className="text-blue-600 font-black">{score * 10}</span> Eco Points!
        </p>
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(zone.vocab.length)].map((_, i) => (
            <Star 
              key={i} 
              size={32} 
              fill={i < score ? "#fbbf24" : "none"} 
              color={i < score ? "#fbbf24" : "#e5e7eb"} 
            />
          ))}
        </div>
        <button onClick={() => setGameState('menu')} className="clay-button bg-blue-500 text-white px-12 py-4 text-xl">
          Play Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="clay-card p-8 relative overflow-hidden">
      {/* Background decoration for Rescue mode */}
      {gameState === 'rescue' && (
        <div className="absolute inset-0 pointer-events-none opacity-10 flex items-end justify-around">
          {[...Array(score)].map((_, i) => (
            <span key={i} className="text-6xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
              {zone.id === 'forest' ? '🌳' : zone.id === 'volcano' ? '💎' : zone.id === 'ocean' ? '🐚' : '🌴'}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex flex-col">
          <span className="font-black text-gray-400 uppercase tracking-widest text-xs">Progress</span>
          <div className="w-32 h-3 bg-gray-100 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500" 
              style={{ width: `${((currentQuestion + 1) / zone.vocab.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-right">
          <span className="font-black text-gray-400 uppercase tracking-widest text-xs">Eco Score</span>
          <p className="font-black text-2xl text-green-500 leading-none">{score * 10}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="relative"
          >
            <img 
              src={zone.vocab[currentQuestion].image} 
              alt="Guess me" 
              className={`w-64 h-64 rounded-[2.5rem] object-cover shadow-2xl border-8 border-white transition-transform ${feedback === 'correct' ? 'scale-110' : feedback === 'wrong' ? 'animate-shake' : ''}`}
              referrerPolicy="no-referrer"
            />
            {feedback && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                className={`absolute inset-0 flex items-center justify-center text-8xl`}
              >
                {feedback === 'correct' ? '✅' : '❌'}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <h3 className="text-3xl font-black text-gray-800 mb-2">
            {gameState === 'labeling' ? 'What is this?' : `Save the ${zone.name}!`}
          </h3>
          <p className="text-gray-500 font-medium">Pick the correct word</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {shuffledOptions.map((word) => (
            <motion.button 
              key={word}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(word)}
              disabled={!!feedback}
              className={`clay-button py-4 text-xl transition-colors ${
                feedback === 'correct' && word === zone.vocab[currentQuestion].word ? 'bg-green-500 text-white' :
                feedback === 'wrong' && word !== zone.vocab[currentQuestion].word ? 'opacity-50' :
                'hover:bg-blue-50 text-gray-700'
              }`}
            >
              {word}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  const navigate = useNavigate();
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <MapIcon size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 leading-none">EcoSpeak</h1>
            <span className="text-blue-500 font-bold text-sm tracking-wider uppercase">Junior</span>
          </div>
        </Link>
        
        <Routes>
          <Route path="/" element={null} />
          <Route path="*" element={
            <button 
              onClick={() => navigate(-1)}
              className="clay-button flex items-center gap-2 text-gray-600"
            >
              <ChevronLeft size={20} /> Back
            </button>
          } />
        </Routes>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/:zoneId" element={<ZoneView onPractice={setSpeakingWord} />} />
          <Route path="/:zoneId/dictionary" element={<DictionaryView onPractice={setSpeakingWord} />} />
          <Route path="/:zoneId/game" element={<GameZone />} />
        </Routes>
      </main>

      {/* Speaking Lab Modal */}
      <AnimatePresence>
        {speakingWord && (
          <SpeakingLab 
            word={speakingWord} 
            onClose={() => setSpeakingWord(null)} 
          />
        )}
      </AnimatePresence>

      <footer className="mt-12 text-center text-gray-400 text-sm font-medium">
        Developed by Team EcoSpeak Junior (Tâm Khuê, Minh Vĩ, Nhựt Trường, Quốc Anh)
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}
