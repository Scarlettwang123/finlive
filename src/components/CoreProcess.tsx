import { MessageSquare, Brain, GitBranch, UserCheck, RefreshCcw } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: '用户提问',
    description: '通过 API 或 Web 界面输入金融问题',
    example: '"今天央行 MLF 操作利率是多少？对债市有什么影响？"',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI 预生成 + 置信度打分',
    description: '大模型生成初稿，路由引擎同步评估风险',
    details: [
      '提取时效性实体（日期、利率、政策等）',
      '与训练数据截止时间对比',
      '数值型答案与内部数据库交叉验证',
      '输出置信度分数 + 风险标签',
    ],
    color: 'text-gold-400',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/30',
  },
  {
    icon: GitBranch,
    step: '03',
    title: '智能路由决策',
    description: '根据置信度和风险等级动态分流',
    details: [
      '高置信度（≥85分）：直接返回 AI 答案',
      '中置信度（60-84分）：单专家快速验证',
      '低置信度（<60分）：双专家深度验证',
      '涉及投资决策：强制人工验证',
    ],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    icon: UserCheck,
    step: '04',
    title: '专家秒级响应',
    description: '7×24 在线专家网络按需验证',
    details: [
      '✓ 确认：AI 答案正确，直接放行',
      '✏️ 修正：修改错误部分，提交修正版',
      '🔄 重写：AI 答案不可用，专家重新作答',
      '⏱️ 30秒超时自动转派下一位专家',
    ],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    icon: RefreshCcw,
    step: '05',
    title: '结果回流与迭代',
    description: '带溯源标识返回，数据反哺模型进化',
    details: [
      '答案标注来源：AI生成 / 专家验证',
      '显示验证专家资质与经验背景',
      '专家修正数据进入高质量标注库',
      '每周 LoRA 微调，缩短知识滞后周期',
    ],
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
];

export default function CoreProcess() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="process" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div ref={ref} className={`text-center mb-20 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">核心流程</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
            一次请求 · <span className="text-gradient-gold">五步闭环</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            从提问到答案，每一步都透明可追溯，效率与权威兼得
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/20 via-gold-500/40 to-gold-500/20" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative pl-20 md:pl-28 reveal ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`absolute left-0 md:left-4 w-16 h-16 md:w-20 md:h-20 ${step.bgColor} rounded-2xl border ${step.borderColor} flex items-center justify-center z-10 backdrop-blur-sm`}>
                  <step.icon className={`w-7 h-7 md:w-8 md:h-8 ${step.color}`} />
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy-900 border border-gold-500/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-gold-400 font-serif">{step.step}</span>
                  </div>
                </div>

                <div className="bg-glass rounded-2xl p-6 md:p-8 hover:border-gold-500/20 transition-all duration-300 group">
                  <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 font-serif`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  
                  {step.example && (
                    <div className="bg-glass-light rounded-xl p-4 border-l-2 border-gold-500/50">
                      <p className="text-sm text-gray-300 italic">{step.example}</p>
                    </div>
                  )}

                  {step.details && (
                    <ul className="grid sm:grid-cols-2 gap-2 mt-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className={`w-1.5 h-1.5 rounded-full ${step.bgColor.replace('/10', '')} flex-shrink-0`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
