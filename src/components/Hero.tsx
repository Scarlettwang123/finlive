import { Sparkles, Shield, Zap, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-40" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-10 px-4 text-center">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-light mb-8">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-gold-300 font-medium">AI + 人类专家 · 双引擎驱动</span>
          </div>
        </div>

        <h1 
          className="opacity-0 animate-fade-in-up font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="text-gradient-gold text-shadow-gold">FinLive</span>
          <br />
          <span className="text-white">金融智答系统</span>
        </h1>

        <p 
          className="opacity-0 animate-fade-in-up text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ animationDelay: '0.5s' }}
        >
          业界首个「AI 预生成 + 专家秒级验证」双引擎金融问答平台
          <br className="hidden md:block" />
          智能路由引擎精准匹配效率与权威，彻底解决金融 AI 的时效性与合规性痛点
        </p>

        <div 
          className="opacity-0 animate-fade-in-up flex flex-wrap justify-center gap-4 mb-20"
          style={{ animationDelay: '0.7s' }}
        >
          <button className="group px-8 py-4 bg-gold-gradient text-navy-900 font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-glow-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            立即体验
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button className="px-8 py-4 bg-glass text-white font-medium rounded-xl border border-white/10 hover:border-gold-500/50 hover:bg-white/5 transition-all duration-300">
            了解更多
          </button>
        </div>

        <div 
          className="opacity-0 animate-fade-in-up grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          style={{ animationDelay: '0.9s' }}
        >
          {[
            { icon: Zap, value: '秒级', label: '平均响应时间', color: 'text-gold-400' },
            { icon: Shield, value: '99.9%', label: '答案准确率', color: 'text-emerald-400' },
            { icon: Clock, value: '7×24h', label: '专家全天候在线', color: 'text-blue-400' },
            { icon: Sparkles, value: '80%+', label: '效率提升', color: 'text-purple-400' },
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-glass-light rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:border-gold-500/20 border border-transparent"
            >
              <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
              <div className={`text-3xl font-bold font-serif ${item.color} mb-1`}>
                {item.value}
              </div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-gold-500/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
