import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { name: '系统架构', href: '#architecture' },
  { name: '核心流程', href: '#process' },
  { name: '智能路由', href: '#routing' },
  { name: '各方角色', href: '#roles' },
  { name: '收费模式', href: '#pricing' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/80 backdrop-blur-xl border-b border-gold-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-glow-gold">
              <Sparkles className="w-5 h-5 text-navy-900" />
            </div>
            <span className="text-xl font-bold font-serif text-white group-hover:text-gold-300 transition-colors">
              Fin<span className="text-gradient-gold">Live</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 hover:text-gold-400 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="px-5 py-2.5 bg-gold-gradient text-navy-900 font-semibold text-sm rounded-lg hover:scale-105 transition-transform shadow-glow-gold">
              立即体验
            </button>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-gold-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-3 bg-gold-gradient text-navy-900 font-semibold rounded-lg mt-2">
                立即体验
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
