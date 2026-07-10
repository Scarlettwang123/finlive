import { Zap, Clock, Shield, Database, Check } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const pricingPlans = [
  {
    name: 'AI 直接回答',
    tagline: '高置信度场景',
    icon: Zap,
    price: '按量计费',
    priceDesc: '成本极低',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    features: [
      'AI 直接生成，毫秒级响应',
      '置信度 ≥ 85 分自动放行',
      '标注「AI 生成」溯源标识',
      '适用：常识性、基础性问题',
      '按 API 调用量收费',
    ],
    highlight: false,
  },
  {
    name: '快速验证',
    tagline: '30 秒响应',
    icon: Clock,
    price: '基础 + 专家费',
    priceDesc: '性价比之选',
    color: 'from-gold-400 to-amber-500',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/50',
    textColor: 'text-gold-400',
    features: [
      '1 名在线领域专家审核',
      '30 秒内确认 / 修正',
      '超时自动转派机制',
      '适用：市场数据、政策解读',
      '基础验证费 + 专家响应费',
    ],
    highlight: true,
  },
  {
    name: '深度验证',
    tagline: '90 秒 / 双专家',
    icon: Shield,
    price: '2× 专家费 + 加急',
    priceDesc: '最高级别保障',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    features: [
      '2 名专家交叉验证',
      '90 秒内完整作答',
      '意见不一致自动升级',
      '适用：投资建议、风险评估',
      '2 倍专家费 + 加急服务费',
    ],
    highlight: false,
  },
  {
    name: '数据回流',
    tagline: '模型训练授权',
    icon: Database,
    price: '一次性买断',
    priceDesc: '长期价值投资',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    features: [
      '专家修正数据授权使用',
      '去标识化处理保障隐私',
      '高质量标注训练数据',
      '加速模型知识迭代',
      '一次性买断费，永久授权',
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="relative py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={ref} className={`text-center mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">收费模式</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
            灵活计费 · <span className="text-gradient-gold">按需选择</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            四种场景对应不同计费方式，从纯 AI 到双专家验证，满足各类业务需求
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div
                className={`relative h-full bg-glass rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] border ${
                  plan.highlight ? `${plan.borderColor} shadow-glow-gold` : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 right-8">
                    <div className="px-4 py-1 bg-gold-gradient text-navy-900 text-sm font-bold rounded-full">
                      推荐
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-6">
                  <div className={`${plan.bgColor} p-4 rounded-2xl border ${plan.borderColor}`}>
                    <plan.icon className={`w-7 h-7 ${plan.textColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">{plan.name}</h3>
                    <p className="text-sm text-gray-400">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-6 pb-6 border-b border-white/5">
                  <div className={`text-2xl font-bold ${plan.textColor} font-serif`}>
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{plan.priceDesc}</div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <div className={`${plan.bgColor} p-0.5 rounded-full mt-0.5 flex-shrink-0`}>
                        <Check className={`w-4 h-4 ${plan.textColor}`} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
