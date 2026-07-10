import { Users, Bot, UserCheck, ArrowDown } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const layers = [
  {
    icon: Users,
    title: '接入层',
    subtitle: 'Access Layer',
    role: '金融机构 / 终端用户',
    features: [
      'API 接口对接券商 APP、投研系统',
      'Web 界面直接提问交互',
      '业务场景标签传递（合规/投顾）',
      '接收带溯源标识的最终答案',
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Bot,
    title: 'AI 层',
    subtitle: 'AI Layer',
    role: '大模型 + 路由引擎',
    features: [
      '大模型基于知识库生成初稿回答',
      '智能提取时效性实体并交叉验证',
      '输出置信度分数与风险标签',
      '动态决策：直接返回 / 转人工验证',
    ],
    color: 'from-gold-400 to-amber-500',
    bgColor: 'bg-gold-500/10',
  },
  {
    icon: UserCheck,
    title: '专家层',
    subtitle: 'Expert Layer',
    role: '7×24 在线金融专家网络',
    features: [
      '秒级响应验证请求',
      '确认 / 修正 / 重写 三选一操作',
      '超时自动转派，确保响应时效',
      '领域精准匹配：宏观/固收/权益/衍生品',
    ],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
];

export default function SystemArchitecture() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="architecture" className="relative py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={ref} className={`text-center mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">系统架构</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
            三层架构 · <span className="text-gradient-gold">各司其职</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            从用户提问到专家验证，每一层都经过精心设计，确保高效、准确、可追溯
          </p>
        </div>

        <div className="relative space-y-4">
          {layers.map((layer, index) => (
            <div key={index} className="relative">
              <div
                className={`bg-glass rounded-3xl p-8 md:p-10 hover:border-gold-500/30 transition-all duration-500 group reveal ${
                  isVisible ? 'visible' : ''
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className={`${layer.bgColor} p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <layer.icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">
                        {layer.title}
                      </h3>
                      <span className="text-sm text-gray-500 font-mono tracking-wider">
                        {layer.subtitle}
                      </span>
                    </div>
                    <p className={`text-lg font-semibold bg-gradient-to-r ${layer.color} bg-clip-text text-transparent mb-4`}>
                      {layer.role}
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {layer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-400">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${layer.color} mt-2 flex-shrink-0`} />
                          <span className="text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-glass-light border border-white/5">
                    <span className="text-3xl font-bold text-gray-600 font-serif">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </div>

              {index < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="relative">
                    <div className="w-px h-8 bg-gradient-to-b from-gold-500/40 to-transparent" />
                    <ArrowDown className="w-4 h-4 text-gold-500/40 absolute -bottom-1 left-1/2 -translate-x-1/2 animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
