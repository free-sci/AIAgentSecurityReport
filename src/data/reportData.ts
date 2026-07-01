import { ScanEye, ShieldOff, Brain, Eye, FileWarning, ShieldAlert } from 'lucide-react';
import { createElement } from 'react';
import type { ReportCardData } from '../components/vulnerability/ReportCard';

// Type for the icon components
type IconComponent = typeof ScanEye;

// Phase-specific report data
export const PHASE_REPORTS: Record<string, ReportCardData[]> = {
  'phase-1': [
    {
      id: 'r1',
      code: 'VUL-R-01',
      title: '需求定义中的安全假设缺失 (Missing Security Posture)',
      riskLevel: 'high',
      icon: createElement(FileWarning as IconComponent),
      iconBgClass: 'bg-red-50',
      iconTextClass: 'text-red-600',
      description:
        '在需求规划阶段，若未将对抗性输入检测、权限最小化及合规性需求纳入功能规格，将导致后续阶段产生难以修复的架构级缺陷。研究表明，67% 的 Agent 安全事件可追溯至需求阶段的遗漏。',
      defenseBox: {
        label: '核心防御方案',
        content: '建立基于 STRIDE-LM 的安全需求矩阵，将安全属性映射为可测试的验收条件。',
      },
      secondaryBox: {
        label: '行业采纳率',
        content: '仅 34% 的组织在需求阶段开展系统化威胁建模',
      },
    },
    {
      id: 'r2',
      code: 'VUL-R-02',
      title: '过度信任 Chain-of-Thought 的可靠性',
      riskLevel: 'medium',
      icon: createElement(Brain as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '需求方可能错误假定思维链推理始终正确且无害。然而，对抗性样本已证明可操纵 CoT 过程，从而引导 Agent 做出符合攻击者意图的决策。',
      defenseBox: {
        label: '预防策略',
        content: '在需求中明确 CoT 输出的审计要求与安全边界定义。',
      },
      secondaryBox: {
        label: '漏洞发现趋势',
        content: '近半年相关 CVE 数量同比增长 215%',
      },
    },
  ],
  'phase-2': [
    {
      id: 'r3',
      code: 'VUL-P-01',
      title: '感知源验证失效 (Input Source Trust Deficit)',
      riskLevel: 'high',
      icon: createElement(ScanEye as IconComponent),
      iconBgClass: 'bg-blue-50',
      iconTextClass: 'text-blue-600',
      description:
        '在架构设计阶段，如果未明确定义感知源的身份验证机制，Agent 可能会接受来自未授权或恶意构造的数据源输入。这种情况在多模态 Agent 中尤为突出，攻击者可以通过特定的图像伪影或超声波指令直接操纵 Agent 的初始认知。',
      defenseBox: {
        label: '核心防御方案',
        content: '建立基于公钥基础设施 (PKI) 的多源数据签名验证模型。',
      },
      secondaryBox: {
        label: '测评覆盖率',
        content: '',
        isProgress: true,
        progressPercent: 85,
      },
    },
    {
      id: 'r4',
      code: 'VUL-P-02',
      title: '多模态诱导对抗攻击',
      riskLevel: 'medium',
      icon: createElement(ShieldOff as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '攻击者利用深度神经网络在图像/语音处理中的脆弱性，通过添加人眼不可察觉的噪声（对抗扰动），使得感知层将恶意目标误识为合法指令。架构层需引入感知预处理沙箱。分析表明，80% 的开源多模态模型在无防御状态下极易受此攻击影响。',
      defenseBox: {
        label: '研究前沿',
        content: '目前正探索基于非扩散模型的感知噪声过滤算法，初步收效显著。',
      },
      secondaryBox: {
        label: '典型攻击成本',
        content: '极低 (低代码工具即可生成对抗样本)',
      },
    },
  ],
  'phase-3': [
    {
      id: 'r5',
      code: 'VUL-C-01',
      title: '不安全工具调用链拼接',
      riskLevel: 'high',
      icon: createElement(ShieldAlert as IconComponent),
      iconBgClass: 'bg-red-50',
      iconTextClass: 'text-red-600',
      description:
        '编码阶段常见的风险是将 LLM 生成的工具调用参数直接拼接到系统命令或 SQL 查询中。攻击者可通过提示注入使 Agent 生成的参数包含命令注入 payload，从而逃逸沙箱限制。',
      defenseBox: {
        label: '编码实践',
        content: '强制使用参数化工具调用接口，禁止字符串拼接方式构造系统命令。',
      },
      secondaryBox: {
        label: 'SAST 检出率',
        content: '',
        isProgress: true,
        progressPercent: 62,
      },
    },
    {
      id: 'r6',
      code: 'VUL-C-02',
      title: '第三方 Agent SDK 供应链投毒',
      riskLevel: 'medium',
      icon: createElement(Eye as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '开发者广泛使用的 Agent 框架 SDK 可能被植入恶意后门，在特定条件下泄露用户会话数据或篡改工具执行逻辑。2024 年已有 3 起真实的 AI SDK 供应链攻击事件。',
      defenseBox: {
        label: '防护措施',
        content: '锁定 SDK 版本哈希，使用 Sigstore 或类似工具验证包完整性。',
      },
      secondaryBox: {
        label: '影响范围',
        content: '波及约 12,000+ 下游应用',
      },
    },
  ],
  'phase-4': [
    {
      id: 'r7',
      code: 'VUL-T-01',
      title: '动态 Jailbreak 的自动化渗透测试',
      riskLevel: 'high',
      icon: createElement(ScanEye as IconComponent),
      iconBgClass: 'bg-blue-50',
      iconTextClass: 'text-blue-600',
      description:
        '评估阶段需模拟 Tree of Attacks with Pruning (TAP) 等自动化越狱框架，对 Agent 安全对齐进行压力测试。这些框架利用 LLM 自动生成并剪枝攻击路径，发现人工红队遗漏的漏洞。',
      defenseBox: {
        label: '测试标准',
        content: '推荐采用 ASRP-EVAL 基准，包含 2,400+ 对抗测试用例。',
      },
      secondaryBox: {
        label: '绕过率',
        content: '主流 Agent 平均绕过率达 42%',
      },
    },
    {
      id: 'r8',
      code: 'VUL-T-02',
      title: '权限提升路径的静态分析缺失',
      riskLevel: 'medium',
      icon: createElement(ShieldOff as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        'Agent 间交互协议中存在的权限传递漏洞传统 SAST 工具难以发现，需引入基于图数据库的权限传递路径分析。',
      defenseBox: {
        label: '工具链',
        content: '构建 Neo4j 权限图 + Cypher 查询发现隐蔽提权路径。',
      },
      secondaryBox: {
        label: '检出率提升',
        content: '',
        isProgress: true,
        progressPercent: 78,
      },
    },
  ],
  'phase-5': [
    {
      id: 'r9',
      code: 'VUL-D-01',
      title: '部署配置中的默认凭证泄露',
      riskLevel: 'high',
      icon: createElement(FileWarning as IconComponent),
      iconBgClass: 'bg-red-50',
      iconTextClass: 'text-red-600',
      description:
        'Agent 部署时使用的默认 API 密钥、模型访问令牌及工具服务的认证凭证若未修改，将成为攻击者获取 Agent 控制权的捷径。',
      defenseBox: {
        label: '最佳实践',
        content: '部署流水线中强制密钥轮换与动态密钥注入，禁用静态默认凭证。',
      },
      secondaryBox: {
        label: '暴露事件',
        content: '2024年公开暴露 Agent 凭证事件 37 起',
      },
    },
    {
      id: 'r10',
      code: 'VUL-D-02',
      title: '容器逃逸与 Agent 沙箱边界突破',
      riskLevel: 'medium',
      icon: createElement(ShieldAlert as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        'Agent 在 Docker/Kubernetes 环境中运行时，若未配置安全的 seccomp/AppArmor 策略，可能通过恶意工具调用触发容器逃逸。',
      defenseBox: {
        label: '加固方案',
        content: '启用 gVisor 或 Kata Containers 提供硬件级隔离。',
      },
      secondaryBox: {
        label: '容器安全评分',
        content: '',
        isProgress: true,
        progressPercent: 55,
      },
    },
  ],
  'phase-6': [
    {
      id: 'r11',
      code: 'VUL-O-01',
      title: 'Agent 记忆投毒与持续性误导',
      riskLevel: 'high',
      icon: createElement(Brain as IconComponent),
      iconBgClass: 'bg-blue-50',
      iconTextClass: 'text-blue-600',
      description:
        '运行时阶段，攻击者可通过多次交互逐步污染 Agent 的长期记忆/RAG 知识库，使得 Agent 在后续所有对话中持续输出错误或不安全的内容。',
      defenseBox: {
        label: '检测方法',
        content: '部署记忆一致性验证器，周期性比对记忆条目与可信基准的偏差。',
      },
      secondaryBox: {
        label: '恢复时间',
        content: '平均需 48+ 小时发现记忆投毒攻击',
      },
    },
    {
      id: 'r12',
      code: 'VUL-O-02',
      title: '多 Agent 合谋与信息泄露',
      riskLevel: 'medium',
      icon: createElement(Eye as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '在多 Agent 系统中，恶意 Agent 可能利用合法通信信道进行隐写通信，绕过信息流控制策略，将敏感数据传输给外部实体。',
      defenseBox: {
        label: '监控措施',
        content: '对各 Agent 间消息进行语义熵分析，检测异常信息密度。',
      },
      secondaryBox: {
        label: '检测准确率',
        content: '',
        isProgress: true,
        progressPercent: 71,
      },
    },
  ],
  'phase-7': [
    {
      id: 'r13',
      code: 'VUL-E-01',
      title: 'Agent 退役后的数据残留风险',
      riskLevel: 'high',
      icon: createElement(FileWarning as IconComponent),
      iconBgClass: 'bg-red-50',
      iconTextClass: 'text-red-600',
      description:
        'Agent 模型权重、对话记忆及工具调用日志在退役后未被彻底清除，可能通过模型反演攻击恢复用户隐私数据。',
      defenseBox: {
        label: '处置标准',
        content: '执行 NIST SP 800-88 介质清理流程，模型权重需经过密码学粉碎。',
      },
      secondaryBox: {
        label: '合规缺口',
        content: '仅 12% 组织有 AI Agent 退役 SOP',
      },
    },
    {
      id: 'r14',
      code: 'VUL-E-02',
      title: '已吊销 Agent 身份的会话劫持',
      riskLevel: 'medium',
      icon: createElement(ShieldOff as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '退役 Agent 的 API 令牌或 OAuth 授权若未被同步吊销，攻击者可能劫持遗留的身份认证信息继续访问相关资源。',
      defenseBox: {
        label: '关键步骤',
        content: '建立 Agent 身份全生命周期管理系统，确保退役同步触发凭据吊销。',
      },
      secondaryBox: {
        label: '平均吊销延迟',
        content: '企业环境平均 7 天完成全量凭据吊销',
      },
    },
  ],
};

// Sub-axis specific report data
export const SUB_AXIS_REPORTS: Record<string, ReportCardData[]> = {
  perception: [
    {
      id: 'sa1',
      code: 'SA-P-01',
      title: '视觉对抗补丁攻击 (Adversarial Patch)',
      riskLevel: 'high',
      icon: createElement(ScanEye as IconComponent),
      iconBgClass: 'bg-blue-50',
      iconTextClass: 'text-blue-600',
      description:
        '通过在物理世界中放置精心设计的对抗补丁，可使 Agent 的视觉感知模块将恶意目标识别为良性物体。此类攻击在自动驾驶 Agent 中已被证实可导致灾难性误判。',
      defenseBox: {
        label: '防御前沿',
        content: '引入基于频域分析的实时异常检测层，识别输入中的对抗性高频噪声。',
      },
      secondaryBox: {
        label: '部署覆盖率',
        content: '',
        isProgress: true,
        progressPercent: 45,
      },
    },
    {
      id: 'sa2',
      code: 'SA-P-02',
      title: '音频隐身指令 (Inaudible Voice Commands)',
      riskLevel: 'medium',
      icon: createElement(ShieldOff as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '利用超声波或频段压制技术，向 Agent 发出人类无法察觉但机器可解析的恶意指令。扬声器与麦克风的非线性特性使得防护极具挑战。',
      defenseBox: {
        label: '缓解方案',
        content: '在音频前端加入带通滤波器，限定可接受频率范围在 100Hz-8kHz。',
      },
      secondaryBox: {
        label: '攻击成功率',
        content: '无防护 Agent 攻击成功率超 90%',
      },
    },
  ],
  memory: [
    {
      id: 'sa3',
      code: 'SA-M-01',
      title: 'RAG 知识库中毒 (Knowledge Poisoning)',
      riskLevel: 'high',
      icon: createElement(Brain as IconComponent),
      iconBgClass: 'bg-red-50',
      iconTextClass: 'text-red-600',
      description:
        '攻击者通过 SEO 投毒、恶意文档上传等手段污染 Agent 的 RAG 知识源，使得召回增强生成返回攻击者控制的虚假信息。',
      defenseBox: {
        label: '防御架构',
        content: '多层来源验证 + 知识一致性评分 + 对抗性文档过滤。',
      },
      secondaryBox: {
        label: '真实攻击案例',
        content: '2024 年 Q3 已发现 15+ 针对企业 Agent 的 RAG 投毒事件',
      },
    },
  ],
  decision: [
    {
      id: 'sa4',
      code: 'SA-D-01',
      title: '目标劫持与奖励函数篡改',
      riskLevel: 'high',
      icon: createElement(Brain as IconComponent),
      iconBgClass: 'bg-red-50',
      iconTextClass: 'text-red-600',
      description:
        '通过精心构造的提示或环境反馈，诱导 Agent 将攻击者的目标内化为自身指令。在基于 RLHF 的 Agent 中，此类攻击可绕过安全对齐。',
      defenseBox: {
        label: '检测机制',
        content: '实时目标一致性监控 + 行为偏离告警阈值配置。',
      },
      secondaryBox: {
        label: '防御成熟度',
        content: '',
        isProgress: true,
        progressPercent: 38,
      },
    },
  ],
  action: [
    {
      id: 'sa5',
      code: 'SA-A-01',
      title: '过度赋权与工具滥用',
      riskLevel: 'high',
      icon: createElement(ShieldAlert as IconComponent),
      iconBgClass: 'bg-red-50',
      iconTextClass: 'text-red-600',
      description:
        'Agent 被授予超出任务范围的工具权限（如文件系统写入、网络外联），攻击者可通过注入诱导 Agent 滥用这些权限执行恶意操作。',
      defenseBox: {
        label: '最小权限原则',
        content: '动态权限令牌，按任务上下文的必需操作集生成临时授权范围。',
      },
      secondaryBox: {
        label: '权限过度率',
        content: '企业 Agent 平均被授予 3.2x 超出实际需要的权限',
      },
    },
  ],
  interaction: [
    {
      id: 'sa6',
      code: 'SA-I-01',
      title: 'Agent 间信任边界腐蚀',
      riskLevel: 'medium',
      icon: createElement(Eye as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '在多 Agent 协作场景中，一个被攻陷的 Agent 可利用其他 Agent 的隐式信任，传递恶意指令或虚假感知数据，引发级联感染。',
      defenseBox: {
        label: '信任模型',
        content: '零信任 Agent 网格，每次跨 Agent 请求均需独立认证与授权。',
      },
      secondaryBox: {
        label: '传播速度',
        content: '无防护多 Agent 系统中攻击3跳内可达全集群',
      },
    },
  ],
  governance: [
    {
      id: 'sa7',
      code: 'SA-G-01',
      title: 'Agent 审计日志不可抵赖性缺失',
      riskLevel: 'medium',
      icon: createElement(FileWarning as IconComponent),
      iconBgClass: 'bg-amber-50',
      iconTextClass: 'text-amber-600',
      description:
        '多数 Agent 系统的决策日志缺乏密码学签名，无法在安全事件发生后提供具有法律效力的证据链路。这在受监管行业中是严重的合规缺口。',
      defenseBox: {
        label: '合规要求',
        content: '引入区块链或透明日志 (Certificate Transparency) 确保日志不可篡改。',
      },
      secondaryBox: {
        label: '行业合规率',
        content: '',
        isProgress: true,
        progressPercent: 22,
      },
    },
  ],
};

// Phase descriptions for the page header
export const PHASE_DESCRIPTIONS: Record<string, { title: string; description: string }> = {
  'phase-1': {
    title: '需求规划阶段',
    description:
      '此阶段聚焦于Agent系统安全需求的识别、威胁建模初步规划及安全功能边界的定义，是整个安全生命周期的起点。',
  },
  'phase-2': {
    title: '架构设计阶段',
    description:
      '基于三维评估模型，通过对"能力表面横切"与"研究方向纵切"的深度解构，为架构设计阶段提供颗粒度极细的安全漏洞库与图文详述。',
  },
  'phase-3': {
    title: '编码开发阶段',
    description:
      '该阶段聚焦 Agent 代码实现中的安全编码实践，涵盖工具调用安全、SDK 供应链防护及代码级别的漏洞分析。',
  },
  'phase-4': {
    title: '安全测试评估阶段',
    description:
      '针对已开发的 Agent 系统进行自动化与人工结合的多维度安全测试，包括对抗性评估、权限审查与合规校验。',
  },
  'phase-5': {
    title: '部署交付阶段',
    description:
      'Agent 上线部署前的安全加固与配置核查，确保凭证管理、容器安全及网络隔离策略符合生产环境安全标准。',
  },
  'phase-6': {
    title: '运行迭代阶段',
    description:
      'Agent 生产运行中的持续安全监控、记忆完整性保护及多Agent协同安全，应对运行时涌现的新型攻击模式。',
  },
  'phase-7': {
    title: '退役销毁阶段',
    description:
      '确保退役 Agent 的数据彻底清除、身份凭据注销及模型权重安全销毁，防止数据残留与身份劫持风险。',
  },
};
