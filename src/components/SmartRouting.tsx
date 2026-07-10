import { Zap, Clock, Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const routingTiers = [
  {
    level: '高置信度',
    confidence: '≥ 85',
    condition: '无时效性风险',
    action: '直接返回 AI 答案',
    icon: Zap,
    color: 'emerald',
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    statusIcon: CheckCircle,
    features: [
      'AI 直接生成回答',
      '标注「AI 生成」标识',
      '毫秒级响应速度',
      '适用：常识性、基础性问题',
    ],
    tag: 'AI 直达',
  },
  {
    level: '中置信度',
    confidence: '60 - 84',
    condition: '涉及时效性 / 政策变动',
    action: '快速验证 · 单专家',
    icon: Clock,
    color: 'gold',
    bgGradient: 'from-gold-500/20 to-amber-500/20',
    borderColor: 'border-gold-500/50',
    textColor: 'text-gold-400',
    statusIcon: AlertTriangle,
    features: [
      '推送给 1 名在线领域专家',
      '30 秒内确认或修正',
      '超时自动转派下一位',
      '适用：市场数据、政策解读',
    ],
    tag: '热门选择',
    highlighted: true,
  },
  {
    level: '低置信度',
    confidence: '< 60',
    condition: '涉及重大投资决策',
    action: '深度验证 · 双专家',
    icon: Shield,
    color: 'rose',
    bgGradient: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    statusIcon: XCircle,
    features: [
      '推送给 2 名专家交叉验证',
      '90 秒内完整作答',
      '双专家意见不一致时升级',
      '适用：投资建议、风险评估',
    ],
    tag: '最高保障',
  },
];

export default function SmartRouting() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="routing" className="relative py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={ref} className={`text-center mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">智能路由</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
            置信度分级 · <span className="text-gradient-gold">智能决策</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            路由引擎实时评估每一个问题，在效率与权威之间找到最优平衡点
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {routingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative reveal ${isVisible ? 'visible' : ''} ${
                tier.highlighted ? 'md:-mt-4 md:mb-4' : ''
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1 bg-gold-gradient text-navy-900 text-sm font-bold rounded-full shadow-glow-gold">
                    {tier.tag}
                  </div>
                </div>
              )}

              <div
                className={`relative h-full bg-glass rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] border ${tier.borderColor} ${
                  tier.highlighted ? 'shadow-glow-gold' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.bgGradient} rounded-3xl opacity-30`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${tier.bgGradient} border ${tier.borderColor}`}>
                      <tier.icon className={`w-8 h-8 ${tier.textColor}`} />
                    </div>
                    {!tier.highlighted && (
                      <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10">
                        {tier.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 font-serif">{tier.level}</h3>
                  <p className="text-gray-400 text-sm mb-6">{tier.condition}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`text-5xl font-bold font-serif ${tier.textColor}`}>
                        {tier.confidence}
                      </span>
                      <span className="text-gray-500 text-sm">分</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${tier.bgGradient.replace('/20', '')}`}
                        style={{
                          width: tier.confidence.includes('≥')
                            ? '90%'
                            : tier.confidence.includes('<')
                            ? '50%'
                            : '72%',
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">置信度区间</p>
                  </div>

                  <div className="flex items-center gap-2 mb-6 pb-6 border-b border-white/5">
                    <tier.statusIcon className={`w-5 h-5 ${tier.textColor}`} />
                    <span className="text-white font-medium">{tier.action}</span>
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full ${tier.textColor.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
