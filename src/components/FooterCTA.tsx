import { ArrowRight, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function FooterCTA() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[180px] opacity-50" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <div className="bg-glass rounded-3xl p-10 md:p-16 text-center border border-gold-500/20 shadow-glow-gold">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-gold-300 font-medium">立即开启金融 AI 新时代</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              让 AI 的效率与专家的智慧
              <br />
              <span className="text-gradient-gold">为每一个金融问题保驾护航</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              无论是券商投研、银行客服还是财富管理，FinLive 都能为您的业务提供
              <br className="hidden md:block" />
              高效、准确、合规的 AI 问答解决方案
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="group px-10 py-4 bg-gold-gradient text-navy-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-glow-gold hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]">
                申请免费试用
                <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 bg-transparent text-white font-medium rounded-xl border border-white/20 hover:border-gold-500/50 hover:bg-white/5 transition-all duration-300">
                预约产品演示
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@finlive.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>400-888-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>北京 · 上海 · 深圳</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-16 text-center text-sm text-gray-600 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <p className="mb-2">© 2025 FinLive 金融智答系统 · 保留所有权利</p>
          <p className="text-xs">
            本产品仅供金融机构专业使用 · 投资有风险，决策需谨慎
          </p>
        </div>
      </div>
    </section>
  );
}
