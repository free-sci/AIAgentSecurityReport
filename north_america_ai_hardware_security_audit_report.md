# 北美 AI 硬件与芯片安全研究现状表格审核报告

审核对象：`north_america_ai_hardware_security_table_nicematrix.tex` 及用户粘贴的 TeX 表格。

审核口径：按用户要求，以“一个细分落地对应 3 个代表性成果，对应一个核心主体群”为基本单元，核查 `核心主体`、`代表性成果`、`技术方案`、`核心价值`、`不足` 是否能互相支撑。技术事实优先依据论文原文、项目主页、厂商安全公告、CERT/CC、DARPA、Apple/NVIDIA/AMD/Intel 官方资料。

## 总体结论

表格的 6 个细分落地方向总体成立，18 条代表性成果中大多数成果真实存在，技术方案和不足描述也基本可用。但当前版本存在三类问题：

1. **主体群过宽或错配**：第一组 GPU 浏览器侧信道把 GPU.zip、Hot Pixels、WebGPU-SPY 三个不同团队混为一个主体群；第二组把 LeftoverLocals 与多 GPU 互连侧信道团队合并；第四组列入 Google Cloud、Microsoft Azure，但 3 条成果没有直接对应这两家云厂商的具体发布。
2. **证据口径过强**：`CERT/CC 确认 AMD、Apple、Qualcomm` 这类表述不严谨。CERT VU#446598 可证明协调披露和多厂商影响面，但 Qualcomm、Google 等状态在 CERT 口径中不应写成“确认”。
3. **AI Agent 价值多为合理外推**：浏览器 Agent、多模态 Agent、企业 Agent、提示/响应泄露等价值判断方向合理，但多数原始成果并非专门研究 AI Agent。建议表述为“对 Agent 底层运行环境具有启示”，避免写成原成果直接证明 Agent 风险。

建议修订方式：保留 6 个细分落地，但每个细分落地下的核心主体改为“覆盖 3 个成果的主体群”，或进一步拆成 18 行分别列主体。若保持现在 6 组结构，核心主体栏应写成“相关团队/机构集合”，不要暗示每个主体都参与了每项成果。

## 问题分级

| 等级 | 含义 | 本表主要问题 |
|---|---|---|
| 高 | 直接影响事实准确性或来源支持 | Qualcomm/Google 被 CERT 口径“确认”；WebGPU-SPY 主体归属缺 UCR；云厂商主体未对应具体成果 |
| 中 | 表述可用但需要降级或限定 | AI Agent 价值外推；NVIDIA Secure AI/NRAS 混合硬件机制与产品服务；DARPA AISS 放在“学术侧” |
| 低 | 不影响主结论，但建议精确化 | GPU.zip 年份可写 2023/2024；“显存”与 local memory 概念需区分；“云端多 GPU”对 Beyond the Bridge 略泛 |

## 逐条审核结论

| 细分落地 | 代表性成果 | 对应性结论 | 核查意见 |
|---|---|---|---|
| GPU 渲染、浏览器与微架构侧信道 | GPU.zip | **基本对应** | 成果真实，核心是硬件图形数据压缩导致跨源像素泄露侧信道。技术方案“利用 GPU 压缩、渲染延迟、像素布局差异”基本准确。主体应对应 UT Austin、CMU、University of Washington 等作者单位，不应被 Hot Pixels/WebGPU-SPY 的机构混淆。 |
| GPU 渲染、浏览器与微架构侧信道 | Hot Pixels | **部分对应** | 成果真实，频率、功耗、温度等混合信号用于 GPU/ARM SoC 攻击，浏览器像素窃取和历史嗅探描述可用。主体应补 Georgia Tech、University of Michigan、Ruhr University Bochum；当前主体列表缺 University of Michigan 和 Ruhr，且 CMU/UW/Binghamton 不直接对应该成果。 |
| GPU 渲染、浏览器与微架构侧信道 | WebGPU-SPY | **主体需修正** | 成果真实，WebGPU 沙箱中的 GPU cache/计时攻击用于指纹识别。当前主体列 Binghamton 可能来自作者过往/关联信息，但更稳妥应写 University of California, Riverside 相关团队。价值表述“为浏览器 Agent 底层攻击面建模提供证据”属于合理外推。 |
| GPU 显存、本地内存与多租户 AI 算力隔离 | LeftoverLocals | **基本对应，但措辞需收紧** | 成果真实，确实展示 GPU local memory 残留可泄露 LLM 响应等数据。技术方案应写 local memory/片上本地内存，不宜泛写为显存。影响厂商可写“研究报告涉及 AMD、Apple、Qualcomm 等；CERT/厂商确认状态不完全一致”。 |
| GPU 显存、本地内存与多租户 AI 算力隔离 | Spy in the GPU-box | **基本对应** | 成果真实，NVIDIA DGX 多 GPU 系统中的远端 GPU L2 cache、互连与争用信道描述基本准确。主体应对应 UCR、PNNL 等，不属于 Trail of Bits/UCSC。 |
| GPU 显存、本地内存与多租户 AI 算力隔离 | NVBleed/Beyond the Bridge | **基本对应，需限定** | 成果真实，二者把多 GPU 互连/NVLink/PCIe 争用纳入泄露面。`云端多 GPU` 对 NVBleed 更贴切，对 Beyond the Bridge 应写“多 GPU 互连环境”。第三方云细节不透明这一不足合理。 |
| 硬件木马、供应链可信与安全 EDA | 硬件木马分类与检测 | **对应** | Tehranipoor/Koushanfar 的硬件木马 taxonomy 与检测综述真实，能支撑 IP 复用、外包、测试不足和供应链可信。与 AI 加速器结合不足这一限制准确。 |
| 硬件木马、供应链可信与安全 EDA | 信息流安全验证 | **对应** | Nahiyan 等工作用信息流安全验证检测硬件木马，技术方案“RTL/IP 层、信息流、形式化验证”准确。主体应重点写 University of Florida 等，而不是把 DARPA/Synopsys泛化到该成果。 |
| 硬件木马、供应链可信与安全 EDA | DARPA AISS | **基本对应，但维度需改** | DARPA AISS 真实存在，目标是自动化实现安全硅设计，覆盖侧信道、逆向工程、供应链攻击和恶意硬件等风险。它是政府项目/产业生态牵引，放在“学术侧”略不合适，可改为“政产学侧”或在主体中标明 DARPA 牵引。 |
| 云端机密 AI 加速与 CPU-GPU TEE 协同 | NVIDIA H100 机密计算 | **对应** | H100 confidential computing 支持硬件 RoT、secure/measured boot、SPDM、设备证明、CC-On、CPU-GPU 受保护通道等，描述准确。TCB 复杂这一不足准确。 |
| 云端机密 AI 加速与 CPU-GPU TEE 协同 | AMD SEV-SNP / Intel TDX | **基本对应** | SEV-SNP 与 TDX 均为机密 VM 提供内存加密/完整性/证明能力，可与 GPU 机密计算协同。`加密 bounce buffer/命令签名` 需要绑定具体 NVIDIA H100 CC 实现或云实现，不宜写成 SEV-SNP/TDX 本身功能。 |
| 云端机密 AI 加速与 CPU-GPU TEE 协同 | NVIDIA Secure AI/NRAS | **部分对应** | Secure AI、NRAS、GPU attestation、密钥释放属于 NVIDIA 产品化可信 AI 能力，但应明确这是 NVIDIA 服务/方案，不是独立学术成果。当前主体列 Google Cloud、Microsoft Azure 未由这 3 条成果直接支撑，建议删除或补充对应云厂商资料。 |
| GPU 漏洞响应、驱动修复与硬件安全治理 | CERT/CC VU#446598 | **基本对应，但高风险措辞需改** | CERT/CC VU#446598 真实存在，支持“协调披露、GPU kernel/local memory 泄漏”结论。但不宜写“确认 AMD、Apple、Qualcomm 等均存在风险”；建议改为“围绕 LeftoverLocals 对多家 GPU/平台厂商进行协调披露，部分厂商确认受影响或发布缓解”。 |
| GPU 漏洞响应、驱动修复与硬件安全治理 | AMD-SB-6010 | **对应** | AMD-SB-6010 与 CVE-2023-4969 对应 GPU Memory Leaks，能支撑 AMD 驱动/固件修复、可选运行模式和性能代价描述。 |
| GPU 漏洞响应、驱动修复与硬件安全治理 | Apple/Google 等缓解 | **证据不足，需重写** | Apple 的缓解可从 CERT/vendor status 或 Apple 安全更新侧证明；Google ChromeOS/Google 的具体缓解不能仅用 CERT VU#446598 支撑，因 CERT 对 Google/Chromium OS 状态未必是“确认”。建议改为“Apple、AMD 等已发布或说明缓解；其他厂商状态以公告为准”。 |
| 端云协同私有 AI 与可验证云推理节点 | Apple PCC 架构 | **对应** | Apple PCC 确实将 Apple Silicon、Secure Enclave、Secure Boot、代码签名、受限 OS 引入云端 AI 推理节点。技术方案和核心价值描述准确。 |
| 端云协同私有 AI 与可验证云推理节点 | 无远程 shell/少日志/无特权运行时访问 | **对应** | Apple 官方 PCC 文档明确强调限制运维访问、日志和特权接口，并承诺请求处理后不保留用户数据。该条与核心主体、方案、价值、不足可对应。 |
| 端云协同私有 AI 与可验证云推理节点 | 透明日志/公开镜像/设备侧证明 | **对应** | 透明日志、公开生产软件镜像、设备侧证明是 PCC 的关键机制。`target diffusion` 用于降低定向攻击风险，描述可用。`不直接处理提示注入、工具越权和长期日志治理` 是合理且必要的边界说明。 |

## 按细分落地的修订建议

### 1. GPU 渲染、浏览器与微架构侧信道

当前主体列应改为：

> University of Texas at Austin、Carnegie Mellon University、University of Washington；Georgia Institute of Technology、University of Michigan、Ruhr University Bochum；University of California, Riverside 等浏览器/GPU 侧信道研究团队。

建议说明：这是 3 个相关但不同的研究团队集合。若必须保持“核心主体群”短文本，可写“北美高校主导的浏览器/GPU 侧信道团队，含 UT Austin、CMU、UW、Georgia Tech、University of Michigan、UCR 等”。

### 2. GPU 显存、本地内存与多租户 AI 算力隔离

建议把“GPU 显存、本地内存”改为“GPU local memory、缓存与多 GPU 互连隔离”，因为 LeftoverLocals 重点是 local memory，Spy/NVBleed 重点是 cache/互连。当前主体列应改为：

> Trail of Bits、University of California, Santa Cruz；University of California, Riverside、Pacific Northwest National Laboratory 等。

同时把“CERT 确认 AMD、Apple、Qualcomm”改成“研究与协调披露涉及 AMD、Apple、Qualcomm 等厂商，确认状态以各厂商公告/CERT vendor status 为准”。

### 3. 硬件木马、供应链可信与安全 EDA

内容整体可保留。建议把“学术侧”改为“政产学侧”或在主体列拆开：

> University of Connecticut、Rice University；University of Florida；DARPA AISS 及 EDA/IP 生态参与方。

“Synopsys”只有在有明确引用支撑其参与 AISS 或安全 EDA 产品时再保留，否则会显得主体凭空出现。

### 4. 云端机密 AI 加速与 CPU-GPU TEE 协同

内容总体成立，但主体列建议改为：

> NVIDIA；AMD；Intel；云端机密计算部署平台。

如果要保留 Google Cloud、Microsoft Azure，需要补充其发布的 H100 Confidential Computing、CVM/TDX/SEV-SNP 或 Confidential AI 资料；否则这两家没有在 3 条成果中直接落地。

### 5. GPU 漏洞响应、驱动修复与硬件安全治理

建议将第 3 条代表性成果重写为：

> AMD、Apple 等厂商围绕 LeftoverLocals 影响设备、驱动/固件版本和运行模式发布修复或缓解；Google、Qualcomm 等厂商状态应以各自公告和 CERT vendor status 为准。

这样能避免把 CERT 未确认或状态未知的厂商写成已确认修复。

### 6. 端云协同私有 AI 与可验证云推理节点

该组对应关系最好，基本可保留。唯一建议是将核心主体中的“Apple User Privacy、Core OS、Services Engineering、ML/AI”保留为 Apple 官方联合作者即可，不必拆成多个主体；否则读者可能误解为多个独立机构。

## 可直接替换的关键修订句

1. 原句：`CERT/CC VU#446598 ... 确认 AMD、Apple、Qualcomm 等 GPGPU 平台存在进程隔离不足风险。`

   建议：`CERT/CC VU#446598 围绕 LeftoverLocals 对 GPU kernel/local memory 泄漏进行协调披露，涉及 AMD、Apple、Qualcomm 等多家 GPU/平台厂商，但具体确认与修复状态应以 CERT vendor status 和厂商公告为准。`

2. 原句：`AMD SEV-SNP 和 Intel TDX ... 用加密 bounce buffer/命令签名保护 PCIe 传输。`

   建议：`AMD SEV-SNP 和 Intel TDX 主要保护主机侧机密 VM 的内存、完整性与远程证明；与 NVIDIA H100 等 GPU TEE 结合时，可通过受保护 I/O、设备证明、加密数据通道或实现相关的 bounce buffer 机制形成 CPU-GPU 协同。`

3. 原句：`Apple、Google 等围绕受影响设备、ChromeOS/芯片代际和软件更新路径进行修复或缓解。`

   建议：`AMD、Apple 等厂商围绕受影响设备、驱动/固件版本和运行模式发布修复或缓解；Google、Qualcomm 等相关状态需要单独引用各自公告或 CERT vendor status。`

4. 原句：`NVIDIA Secure AI/NRAS 等产品化能力把 GPU 证明、密钥发布、镜像治理和企业 AI 工作流连接起来。`

   建议：`NVIDIA Secure AI、NRAS/attestation 等产品化能力把 GPU 远程证明、策略校验、密钥发布与企业 AI 工作流连接起来，但该条应归为 NVIDIA 产品/服务能力，而不是独立研究成果。`

## 参考来源

- GPU.zip: https://www.gpu.zip/
- Hot Pixels, USENIX Security 2023: https://www.usenix.org/conference/usenixsecurity23/presentation/taneja
- WebGPU-SPY, arXiv: https://arxiv.org/abs/2401.04349
- LeftoverLocals, arXiv: https://arxiv.org/abs/2401.16603
- CERT/CC VU#446598: https://www.kb.cert.org/vuls/id/446598
- Spy in the GPU-box, arXiv: https://arxiv.org/abs/2203.15981
- Beyond the Bridge, arXiv: https://arxiv.org/abs/2404.03877
- NVBleed, arXiv: https://arxiv.org/abs/2503.17847
- Tehranipoor and Koushanfar, Hardware Trojan taxonomy and detection: https://doi.org/10.1109/MDT.2010.7
- Hardware Trojan Detection through Information Flow Security Verification: https://arxiv.org/abs/1803.04102
- DARPA AISS: https://www.darpa.mil/research/programs/automatic-implementation-of-secure-silicon
- NVIDIA H100 Confidential Computing: https://developer.nvidia.com/blog/confidential-computing-on-h100-gpus-for-secure-and-trustworthy-ai/
- NVIDIA Secure AI: https://developer.nvidia.com/blog/announcing-nvidia-secure-ai-general-availability/
- AMD SEV: https://www.amd.com/en/developer/sev.html
- Intel TDX: https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html
- AMD-SB-6010: https://www.amd.com/en/resources/product-security/bulletin/amd-sb-6010.html
- Apple Private Cloud Compute: https://security.apple.com/blog/private-cloud-compute/
