import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ECO_ZONES, EcoZone } from './constants';
import { Book, Gamepad2, Mic2, Map as MapIcon, ChevronLeft } from 'lucide-react';
import { SpeakingLab } from './components/SpeakingLab';

export default function App() {
  const [view, setView] = useState<'map' | 'zone' | 'game' | 'dictionary'>('map');
  const [selectedZone, setSelectedZone] = useState<EcoZone | null>(null);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  const handleZoneSelect = (zone: EcoZone) => {
    setSelectedZone(zone);
    setView('zone');
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <MapIcon size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 leading-none">EcoSpeak</h1>
            <span className="text-blue-500 font-bold text-sm tracking-wider uppercase">Junior</span>
          </div>
        </div>
        
        {view !== 'map' && (
          <button 
            onClick={() => setView('map')}
            className="clay-button flex items-center gap-2 text-gray-600"
          >
            <ChevronLeft size={20} /> Back
          </button>
        )}
      </header>

      <main className="flex-1">
        {view === 'map' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ECO_ZONES.map((zone) => (
              <motion.button
                key={zone.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleZoneSelect(zone)}
                className="clay-card p-6 flex flex-col items-center text-center group relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-10 ${zone.color}`} />
                <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform">{zone.icon}</span>
                <h3 className="text-2xl font-black text-gray-800 mb-2">{zone.name}</h3>
                <p className="text-gray-500 font-medium">Explore the {zone.name.toLowerCase()} world!</p>
              </motion.button>
            ))}
          </div>
        )}

        {view === 'zone' && selectedZone && (
          <div className="space-y-8">
            <div className="clay-card p-8 text-center relative overflow-hidden">
              <div className={`absolute inset-0 opacity-10 ${selectedZone.color}`} />
              <span className="text-8xl mb-4 block">{selectedZone.icon}</span>
              <h2 className="text-4xl font-black text-gray-800 mb-4">{selectedZone.name} Zone</h2>
              <div className="flex justify-center gap-4">
                <button onClick={() => setView('dictionary')} className="clay-button bg-blue-50 text-blue-600 flex items-center gap-2">
                  <Book size={20} /> Dictionary
                </button>
                <button onClick={() => setView('game')} className="clay-button bg-yellow-50 text-yellow-600 flex items-center gap-2">
                  <Gamepad2 size={20} /> Play Game
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedZone.vocab.map((item) => (
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
                      onClick={() => setSpeakingWord(item.word)}
                      className="text-xs font-black uppercase tracking-widest text-white bg-green-500 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-green-600 transition-colors"
                    >
                      <Mic2 size={12} /> Practice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'dictionary' && selectedZone && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-800 mb-6">Visual Dictionary: {selectedZone.name}</h2>
            {selectedZone.vocab.map((item) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={item.word} 
                className="clay-card p-6 flex flex-col md:flex-row gap-6"
              >
                <img 
                  src={item.image} 
                  alt={item.word} 
                  className="w-full md:w-48 h-32 rounded-2xl object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-blue-600">{item.word}</h3>
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-bold text-gray-500">{item.translation}</span>
                  </div>
                  <p className="text-gray-600 italic mb-4">"{item.example}"</p>
                  <button 
                    onClick={() => setSpeakingWord(item.word)}
                    className="clay-button py-2 text-sm flex items-center gap-2"
                  >
                    <Mic2 size={16} /> Speak this word
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {view === 'game' && selectedZone && (
          <GameZone zone={selectedZone} />
        )}
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

function GameZone({ zone }: { zone: EcoZone }) {
  const [gameState, setGameState] = useState<'menu' | 'labeling' | 'rescue'>('menu');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const startLabeling = () => {
    setGameState('labeling');
    setScore(0);
    setCurrentQuestion(0);
    setGameFinished(false);
  };

  const handleAnswer = (word: string) => {
    if (word === zone.vocab[currentQuestion].word) {
      setScore(s => s + 1);
    }
    
    if (currentQuestion < zone.vocab.length - 1) {
      setCurrentQuestion(q => q + 1);
    } else {
      setGameFinished(true);
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button onClick={startLabeling} className="clay-card p-8 flex flex-col items-center gap-4 hover:bg-yellow-50 transition-colors">
          <div className="text-6xl">🏷️</div>
          <h3 className="text-2xl font-black">Labeling Game</h3>
          <p className="text-gray-500">Drag the names to the right places!</p>
        </button>
        <button className="clay-card p-8 flex flex-col items-center gap-4 opacity-50 cursor-not-allowed">
          <div className="text-6xl">🛡️</div>
          <h3 className="text-2xl font-black">Eco Rescue</h3>
          <p className="text-gray-500">Coming Soon!</p>
        </button>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="clay-card p-12 text-center">
        <h2 className="text-4xl font-black mb-4">Well Done! 🎉</h2>
        <p className="text-xl mb-8">You got <span className="text-blue-600 font-black">{score}/{zone.vocab.length}</span> correct!</p>
        <button onClick={() => setGameState('menu')} className="clay-button bg-blue-500 text-white">
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <div className="clay-card p-8">
      <div className="flex justify-between items-center mb-8">
        <span className="font-black text-gray-400 uppercase tracking-widest">Question {currentQuestion + 1}/{zone.vocab.length}</span>
        <span className="font-black text-green-500">Score: {score}</span>
      </div>

      <div className="flex flex-col items-center gap-8">
        <img 
          src={zone.vocab[currentQuestion].image} 
          alt="Guess me" 
          className="w-64 h-64 rounded-3xl object-cover shadow-lg"
          referrerPolicy="no-referrer"
        />
        <h3 className="text-2xl font-bold text-gray-700">What is this?</h3>
        <div className="grid grid-cols-2 gap-4 w-full">
          {zone.vocab.map((v) => (
            <button 
              key={v.word}
              onClick={() => handleAnswer(v.word)}
              className="clay-button hover:bg-blue-50"
            >
              {v.word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
