import { Code, Building2, Award, CheckCircle2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const roles = [
  {
    icon: Code,
    title: 'AI 工程师',
    subtitle: '技术搭建者',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    items: [
      {
        title: '部署路由引擎',
        desc: '模型输出层后挂接置信度评估模块，小模型二分类判断是否需要人工验证',
      },
      {
        title: '建立专家画像库',
        desc: '按领域标签（宏观/固收/权益/衍生品）给专家打标签，确保精准匹配',
      },
      {
        title: '设计在线学习 Pipeline',
        desc: '专家验证数据 → 去标识化 → 质量抽检 → 每周 LoRA 微调',
      },
    ],
  },
  {
    icon: Building2,
    title: '金融机构',
    subtitle: '客户与合作方',
    color: 'from-gold-400 to-amber-500',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/30',
    textColor: 'text-gold-400',
    items: [
      {
        title: '灵活接入方式',
        desc: '调用 FinLive API，传入问题 + 业务场景标签（合规审查/客户投顾）',
      },
      {
        title: '策略自主配置',
        desc: '后台设置「强制人工验证」触发条件，投资建议类问题可强制过人',
      },
      {
        title: '完整审计日志',
        desc: '所有专家验证记录全程可追溯，满足金融行业合规监管要求',
      },
    ],
  },
  {
    icon: Award,
    title: '金融专家',
    subtitle: '兼职 / 全职',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    items: [
      {
        title: '严格注册认证',
        desc: '提交金融从业资质（CFA/CPA/证券从业资格等），通过领域测试准入',
      },
      {
        title: '灵活在线接单',
        desc: '「滴滴接单」模式，可设置在线/忙碌/离线状态，时间自由掌控',
      },
      {
        title: '优质计酬规则',
        desc: '按响应次数计费，响应越快、修正越精准，获得额外质量奖励',
      },
    ],
  },
];

export default function RolesSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="roles" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div ref={ref} className={`text-center mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
            <span className="text-gold-400 text-sm font-medium">各方角色</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
            三方共赢 · <span className="text-gradient-gold">各展所长</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI 工程师、金融机构、专家网络，每个角色都在生态中发挥独特价值
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-full bg-glass rounded-3xl p-8 hover:border-gold-500/30 transition-all duration-500 group overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${role.color} opacity-60`} />
                
                <div className={`${role.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${role.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className={`w-8 h-8 ${role.textColor}`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 font-serif">{role.title}</h3>
                <p className={`text-sm font-medium ${role.textColor} mb-6`}>{role.subtitle}</p>

                <div className="space-y-5">
                  {role.items.map((item, idx) => (
                    <div key={idx} className="group/item">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${role.textColor} flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`} />
                        <div>
                          <h4 className="text-white font-medium mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
