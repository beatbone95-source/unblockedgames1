import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Search, X, Trophy, Zap, Play } from 'lucide-react';
import { GAMES, Game } from './constants';
import { SnakeGame } from './components/games/SnakeGame';
import { BreakoutGame } from './components/games/BreakoutGame';
import { ClickerGame } from './components/games/ClickerGame';

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = GAMES.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGame = () => {
    if (!selectedGame) return null;
    switch (selectedGame.id) {
      case 'snake': return <SnakeGame />;
      case 'breakout': return <BreakoutGame />;
      case 'clicker': return <ClickerGame />;
      default: return <div className="text-center p-10 font-display text-2xl">GAME COMING SOON...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col">
      {/* Marquee Header */}
      <div className="marquee-container border-b-4 border-black">
        <div className="marquee-content">
          UNBLOCKED GAMES HUB • PLAY ANYWHERE • NO ADS • NO TRACKING • PURE ARCADE FUN • 100% FREE • UNBLOCKED GAMES HUB • PLAY ANYWHERE • NO ADS • NO TRACKING • PURE ARCADE FUN • 100% FREE •
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <Gamepad2 size={40} className="text-black" />
            <h1 className="font-display text-4xl uppercase tracking-tighter">UNBLOCKED.IO</h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH GAMES..." 
              className="w-full pl-10 pr-4 py-2 border-4 border-black font-mono focus:outline-none focus:bg-[#00FF00]/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden lg:flex items-center gap-6 font-display text-sm uppercase">
            <div className="flex items-center gap-1"><Trophy size={16} /> Leaderboards</div>
            <div className="flex items-center gap-1"><Zap size={16} /> New Games</div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full p-6">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredGames.map((game) => (
                <motion.div 
                  key={game.id}
                  layoutId={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="bg-white brutal-border p-4 cursor-pointer group"
                >
                  <div className="relative aspect-video mb-4 overflow-hidden border-2 border-black">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-mono uppercase">
                      {game.category}
                    </div>
                  </div>
                  <h3 className="font-display text-2xl uppercase mb-2">{game.title}</h3>
                  <p className="font-mono text-sm opacity-70 mb-4 line-clamp-2">{game.description}</p>
                  <button className="w-full brutal-btn brutal-border py-2 flex items-center justify-center gap-2">
                    <Play size={20} fill="currentColor" /> PLAY NOW
                  </button>
                </motion.div>
              ))}
              {filteredGames.length === 0 && (
                <div className="col-span-full text-center py-20 font-display text-3xl opacity-20 uppercase">
                  No games found matching your search
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="game-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col gap-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="brutal-border p-2 bg-white hover:bg-black hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="font-display text-4xl uppercase">{selectedGame.title}</h2>
                </div>
                <div className="bg-black text-[#00FF00] px-4 py-1 font-mono text-sm uppercase">
                  Playing: {selectedGame.category}
                </div>
              </div>

              <div className="bg-white brutal-border p-8 min-h-[500px] flex items-center justify-center">
                {renderGame()}
              </div>

              <div className="bg-white brutal-border p-6">
                <h4 className="font-display text-xl uppercase mb-2">About this game</h4>
                <p className="font-mono opacity-80">{selectedGame.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-8 mt-12 border-t-4 border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 size={32} className="text-[#00FF00]" />
              <span className="font-display text-2xl uppercase tracking-tighter">UNBLOCKED.IO</span>
            </div>
            <p className="font-mono text-xs opacity-60">
              The ultimate destination for unblocked browser games. Built for speed, privacy, and fun.
            </p>
          </div>
          <div className="flex flex-col gap-2 font-display text-sm uppercase">
            <span className="text-[#00FF00] mb-2">Quick Links</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
          <div className="flex flex-col gap-2 font-display text-sm uppercase">
            <span className="text-[#00FF00] mb-2">Community</span>
            <a href="#" className="hover:underline">Discord Server</a>
            <a href="#" className="hover:underline">GitHub Repo</a>
            <a href="#" className="hover:underline">Submit a Game</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10 text-center font-mono text-[10px] opacity-40 uppercase">
          © 2026 UNBLOCKED GAMES HUB • NO COOKIES • NO TRACKING • JUST GAMES
        </div>
      </footer>
    </div>
  );
}
