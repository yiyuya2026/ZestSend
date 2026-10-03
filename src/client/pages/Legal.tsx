import { useEffect, type ReactNode } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../components/theme";
import { cn } from "../lib/utils";

export type LegalLocale = "en" | "zh";

type LegalSection = {
  /** 小标题字号的一级条目 */
  heading: string;
  /** 段落（纯文本） */
  body?: string[];
};

export type LegalDocument = {
  /** 页面主标题 */
  heading: string;
  /** 生效/更新日期 */
  updated: string;
  /** 文件内所有条目的公共标题（用于各页之间跳转） */
  label: string;
  /** 简介段落，显示在标题下方 */
  intro?: string;
  sections: LegalSection[];
};

type LegalCopy = {
  back: string;
  contact: string;
  contactLabel: string;
  documents: Record<"privacy" | "terms" | "disclaimer", LegalDocument>;
  footerNote: string;
  siblings: string;
  title: string;
};

const CONTACT_EMAIL = "yiyuya2026@gmail.com";

const copy: Record<LegalLocale, LegalCopy> = {
  zh: {
    back: "返回首页",
    contact: "联系方式",
    contactLabel: "邮件",
    siblings: "相关条款",
    title: "法律条款与隐私",
    footerNote: `本页内容适用于 chat.yiyuya.me。如有疑问请联系 ${CONTACT_EMAIL}。`,
    documents: {
      privacy: {
        label: "隐私政策",
        heading: "隐私政策",
        updated: "生效日期：2026年10月3日",
        intro:
          "yiyuya（chat.yiyuya.me）是基于开源项目 ZestSend 搭建并部署的 WebRTC 点对点通信工具。本政策说明我们在你使用本服务时如何处理信息。",
        sections: [
          {
            heading: "一、我们不收集的信息",
            body: [
              "本服务不设账号系统，无需注册即可使用，完全匿名。我们不收集、不存储、不访问以下信息：通信内容（聊天消息、文件、语音、视频、屏幕共享画面）；加密密钥；联系人列表或通信记录；精确位置数据；任何可直接识别个人身份的信息。",
            ],
          },
          {
            heading: "二、点对点直连模式",
            body: [
              "在大多数情况下，你的数据通过 WebRTC 点对点直连在双方设备之间直接传输。文件、消息、音视频流不经过我们的服务器中转，也不会被服务器存储。",
            ],
          },
          {
            heading: "三、TURN 中继模式",
            body: [
              "当网络环境受限（如企业防火墙、NAT 穿透失败）导致无法建立直连时，连接会通过 Cloudflare TURN 服务器进行中继。在此模式下：",
              "· 数据始终保持端对端加密，TURN 服务器仅转发加密后的数据包，无法读取或解密任何内容。",
              "· TURN 服务器在处理中继后不会保留任何数据。",
              "· Cloudflare 作为基础设施提供商，其数据处理行为受 Cloudflare 隐私政策约束。",
            ],
          },
          {
            heading: "四、加密与信令",
            body: [
              "通信内容由 WebRTC 标准加密保护（数据通道使用 DTLS，音视频使用 SRTP），本服务未使用自研加密算法。",
              "建立连接所需的技术信息（如 IP 地址、端口、编解码协商参数）会经过我们的信令服务器转发，仅限连接建立所必需的最小范围，不包含任何通信内容。",
              "为免误解，请注意端对端加密保护的是通信内容本身：连接元数据（如 IP 地址、端口）在技术上可能被网络服务提供商与基础设施提供商获取；本服务也不对通话对方的身份做额外验证，请只与你信任的人建立连接。",
            ],
          },
          {
            heading: "五、日志数据",
            body: [
              "为了维持服务的稳定性和安全性，我们可能处理最小限度的匿名技术日志（如错误信息、服务性能指标与访问频率）。此类数据不用于识别个人用户，仅在运营必要范围内保留，其中不包含任何通信内容。",
            ],
          },
          {
            heading: "六、第三方服务",
            body: [
              "本服务不集成任何第三方广告 SDK、数据分析 SDK 或数据经纪服务。实际涉及的基础设施包括：Cloudflare（页面托管、信令服务、可选的 TURN 中继）、GitHub（本项目开源代码托管）。若未来启用任何访问统计，我们会在本政策中说明。",
            ],
          },
          {
            heading: "七、数据安全",
            body: [
              "我们采取技术措施保护服务基础设施的安全。但请注意，任何电子通信方式都无法保证绝对安全，请自行评估传输内容的敏感程度。",
            ],
          },
          {
            heading: "八、政策变更",
            body: ["我们可能不定期更新本隐私政策，变更在发布后立即生效。继续使用本服务即视为接受更新后的政策。"],
          },
          {
            heading: "九、联系方式",
            body: ["如有隐私相关问题，请通过邮件联系我们：" + CONTACT_EMAIL],
          },
        ],
      },
      terms: {
        label: "服务条款",
        heading: "服务条款",
        updated: "生效日期：2026年10月3日",
        intro: "使用本服务即表示你已阅读、理解并同意以下条款。",
        sections: [
          {
            heading: "一、服务说明",
            body: [
              "yiyuya 是一个基于开源项目 ZestSend 部署的 WebRTC 点对点连接网页工具，提供以下功能：端对端加密的匿名实时聊天、文件互传、语音通话、视频通话、屏幕共享与同播共享、文本协作、画板。",
            ],
          },
          {
            heading: "二、关于开源项目",
            body: [
              "本服务所基于的软件由 RavelloH 开源，采用 MIT License 发布，原始项目地址为 github.com/RavelloH/ZestSend。本站是在该开源项目基础上自行部署的实例，与原作者无隶属关系，原作者的版权声明与许可声明均予保留。",
              "本服务当前的源代码托管于 github.com/yiyuya2026/ZestSend。",
            ],
          },
          {
            heading: "三、用户责任",
            body: [
              "你承诺合法、合理地使用本服务，不得利用本服务从事以下行为：",
              "· 传输任何违反中华人民共和国法律法规的内容；",
              "· 传输恶意软件、病毒或任何形式的恶意代码；",
              "· 侵犯他人知识产权、隐私权或其他合法权益；",
              "· 进行任何形式的网络攻击或滥用行为。",
            ],
          },
          {
            heading: "四、开源许可",
            body: [
              "本项目所基于的软件采用 MIT License 发布。你可以在 MIT 许可范围内自由使用、复制、修改和分发本软件，但须保留原始版权声明和许可声明。",
            ],
          },
          {
            heading: "五、免责与责任限制",
            body: [
              "本服务按「现状」提供，不提供任何形式的明示或暗示保证，包括但不限于对适用性、无侵权性、适销性或质量满意度的保证。",
              "在任何情况下，服务运营者与开源项目的作者、贡献者均不对因使用或无法使用本服务而产生的任何直接、间接、附带、特殊或衍生的损失承担责任，包括但不限于数据丢失、利润损失或业务中断。",
            ],
          },
          {
            heading: "六、服务可用性",
            body: [
              "本服务不保证不间断运行。由于本服务依赖 Cloudflare Workers 与 WebRTC 技术，可能因网络环境、基础设施故障或不可抗力而暂时不可用。运营者保留随时修改或终止服务的权利。",
            ],
          },
          {
            heading: "七、条款变更",
            body: ["运营者有权随时修改本服务条款，变更在网页公告后立即生效。"],
          },
          {
            heading: "八、联系方式",
            body: ["如对条款有疑问，请通过邮件联系我们：" + CONTACT_EMAIL],
          },
        ],
      },
      disclaimer: {
        label: "免责声明",
        heading: "免责声明",
        updated: "最后更新：2026年10月3日",
        intro: "在使用本服务之前，请仔细阅读并透彻理解本免责声明。你一旦使用本服务，即视为对本声明全部内容的认可和接受。",
        sections: [
          {
            heading: "一、服务性质",
            body: [
              "yiyuya 是基于开源项目 ZestSend 部署的开源免费 WebRTC 点对点通信工具，仅为用户之间的直接连接提供技术通道。本服务不具备互联网内容存储、用户数据留存、通信内容审查等功能，不对传输内容进行任何形式的监控、过滤或干预。",
            ],
          },
          {
            heading: "二、用户行为责任",
            body: [
              "你承诺本着合法、合理的原则使用本服务，不利用本服务进行任何违法、侵害他人合法权益的恶意行为。",
              "你自行承担因传输内容引起的全部法律责任，包括但不限于版权纠纷、隐私侵权、名誉损害等。本开源项目及其部署者不承担任何连带责任。",
            ],
          },
          {
            heading: "三、技术风险",
            body: [
              "本服务依赖 WebRTC 技术和 Cloudflare 基础设施。你理解并同意：",
              "· WebRTC 直连可能因网络环境限制而失败，此时将自动尝试 TURN 中继；",
              "· 任何电子通信方式均存在被第三方截获的理论风险；",
              "· 端到端加密保护的是通信内容，但连接元数据（如 IP 地址）在技术上可能被网络服务提供商获取；",
              "· 房间号较短，请通过其它渠道告知对方，避免在公开场合暴露。",
            ],
          },
          {
            heading: "四、免责范围",
            body: [
              "任何单位或个人因下载、部署或使用本服务及其所基于的开源项目而产生的任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯及其造成的损失（包括但不限于直接、间接、附带或衍生的损失），本开源项目及其部署者不承担任何法律责任。",
              "你对使用本服务可能存在的风险和相关后果将完全由你自行承担。",
            ],
          },
          {
            heading: "五、条款独立性",
            body: [
              "如果本声明的任何部分被认为无效或不可执行，其余部分仍具有完全效力。不可执行的部分声明，并不构成我们放弃执行该声明的权利。",
            ],
          },
          {
            heading: "六、变更权利",
            body: [
              "本声明可随时进行单方面变更，并以网页公告方式公布，公布后立即生效。若你在声明变更后继续使用本服务，表示你已充分阅读、理解并接受修改后的声明内容。",
            ],
          },
          {
            heading: "七、联系方式",
            body: ["如有疑问，请通过邮件联系我们：" + CONTACT_EMAIL],
          },
        ],
      },
    },
  },
  en: {
    back: "Back to home",
    contact: "Contact",
    contactLabel: "Email",
    siblings: "Related documents",
    title: "Legal & Privacy",
    footerNote: `These documents apply to chat.yiyuya.me. Questions? Contact ${CONTACT_EMAIL}.`,
    documents: {
      privacy: {
        label: "Privacy",
        heading: "Privacy Policy",
        updated: "Effective date: October 3, 2026",
        intro:
          "yiyuya (chat.yiyuya.me) is a WebRTC peer-to-peer communication tool deployed on top of the open-source project ZestSend. This policy explains how information is handled when you use the service.",
        sections: [
          {
            heading: "1. Information we do not collect",
            body: [
              "There is no account system and no sign-up, and the service is anonymous. We do not collect, store, or access: communication content (chat messages, files, voice, video, screen sharing), encryption keys, contact lists or communication history, precise location data, or any directly identifying personal information.",
            ],
          },
          {
            heading: "2. Direct peer-to-peer mode",
            body: [
              "In most cases your data travels directly between the two devices over a WebRTC peer-to-peer connection. Files, messages, and media streams are not relayed through, or stored on, our servers.",
            ],
          },
          {
            heading: "3. TURN relay mode",
            body: [
              "When a direct connection is impossible (for example behind a corporate firewall or when NAT traversal fails), the connection is relayed through Cloudflare TURN servers. In that mode:",
              "· Data stays end-to-end encrypted; the TURN server only forwards encrypted packets and cannot read or decrypt anything.",
              "· The TURN server retains no data after relaying.",
              "· Cloudflare's processing as an infrastructure provider is governed by Cloudflare's privacy policy.",
            ],
          },
          {
            heading: "4. Encryption and signaling",
            body: [
              "Communication content is protected by standard WebRTC encryption (DTLS for data channels, SRTP for media). No custom cryptography is used.",
              "Technical information needed to establish a connection (such as IP addresses, ports, and codec negotiation parameters) is forwarded by our signaling server. This is limited to the minimum required to establish the connection and never includes communication content.",
              "To avoid misunderstanding: end-to-end encryption protects the communication content itself. Connection metadata (such as IP addresses and ports) can technically be observed by network and infrastructure providers, and the service does not verify the identity of the remote peer. Only connect with people you trust.",
            ],
          },
          {
            heading: "5. Log data",
            body: [
              "To keep the service stable and secure, we may process minimal anonymous technical logs (such as error reports and performance or frequency metrics). This data is not used to identify individuals, is retained only as long as operationally necessary, and never contains communication content.",
            ],
          },
          {
            heading: "6. Third-party services",
            body: [
              "The service integrates no third-party advertising SDKs, analytics SDKs, or data brokers. The infrastructure involved is Cloudflare (page hosting, signaling, optional TURN relay) and GitHub (open-source code hosting). If any access analytics are enabled in the future, this policy will say so.",
            ],
          },
          {
            heading: "7. Data security",
            body: [
              "We take technical measures to protect the service infrastructure. Note that no electronic communication method can be guaranteed absolutely secure, so please assess the sensitivity of what you transmit.",
            ],
          },
          {
            heading: "8. Changes to this policy",
            body: ["This policy may be updated from time to time; changes take effect when published. Continued use of the service means you accept the updated policy."],
          },
          {
            heading: "9. Contact",
            body: ["For privacy questions, contact us by email: " + CONTACT_EMAIL],
          },
        ],
      },
      terms: {
        label: "Terms",
        heading: "Terms of Service",
        updated: "Effective date: October 3, 2026",
        intro: "By using this service you confirm that you have read, understood, and accepted the terms below.",
        sections: [
          {
            heading: "1. The service",
            body: [
              "yiyuya is a WebRTC peer-to-peer web tool deployed on top of the open-source project ZestSend. It provides end-to-end encrypted anonymous real-time chat, file transfer, voice calls, video calls, screen sharing and shared playback, collaborative text editing, and a shared canvas.",
            ],
          },
          {
            heading: "2. About the open-source project",
            body: [
              "The software this service is built on was open-sourced by RavelloH under the MIT License at github.com/RavelloH/ZestSend. This site is an independently deployed instance of that project and is not affiliated with the original author; the original copyright and license notices are preserved.",
              "The source code for this deployment is hosted at github.com/yiyuya2026/ZestSend.",
            ],
          },
          {
            heading: "3. Your responsibilities",
            body: [
              "You agree to use the service lawfully and reasonably, and not to use it to:",
              "· transmit content that violates the laws and regulations of the People's Republic of China;",
              "· transmit malware, viruses, or any form of malicious code;",
              "· infringe the intellectual property, privacy, or other lawful rights of others;",
              "· carry out any form of network attack or abuse.",
            ],
          },
          {
            heading: "4. Open-source license",
            body: [
              "The underlying software is released under the MIT License. You may freely use, copy, modify, and distribute it within the terms of that license, provided you retain the original copyright and permission notices.",
            ],
          },
          {
            heading: "5. Disclaimer and limitation of liability",
            body: [
              "The service is provided \"as is\", without warranties of any kind, express or implied, including but not limited to fitness for a particular purpose, non-infringement, merchantability, or satisfactory quality.",
              "In no event shall the operator of this service, or the authors and contributors of the open-source project, be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of, or inability to use, the service, including but not limited to data loss, lost profits, or business interruption.",
            ],
          },
          {
            heading: "6. Availability",
            body: [
              "The service is not guaranteed to be uninterrupted. Because it relies on Cloudflare Workers and WebRTC, it may be temporarily unavailable due to network conditions, infrastructure failure, or force majeure. The operator may modify or discontinue the service at any time.",
            ],
          },
          {
            heading: "7. Changes to these terms",
            body: ["The operator may change these terms at any time; changes take effect once announced on this website."],
          },
          {
            heading: "8. Contact",
            body: ["For questions about these terms, contact us by email: " + CONTACT_EMAIL],
          },
        ],
      },
      // 英文页保留一个与中文免责声明对应的条目占位，便于以后补英文全文
      disclaimer: {
        label: "Disclaimer",
        heading: "Disclaimer",
        updated: "Last updated: October 3, 2026",
        intro: "Please read and understand this disclaimer before using the service. By using it you accept the whole of this statement.",
        sections: [
          {
            heading: "1. Nature of the service",
            body: [
              "yiyuya is a free, open-source WebRTC peer-to-peer communication tool deployed on top of the open-source project ZestSend. It only provides a technical channel for direct connections between users. It provides no internet content storage, no user data retention, and no review of communication content, and it does not monitor, filter, or intervene in transmitted content in any way.",
            ],
          },
          {
            heading: "2. Your responsibility for your conduct",
            body: [
              "You agree to use the service lawfully and reasonably, and not to use it for any unlawful or rights-infringing purpose.",
              "You bear sole legal responsibility for the content you transmit, including but not limited to copyright disputes, privacy infringement, and defamation. The open-source project and the operator of this deployment accept no joint liability.",
            ],
          },
          {
            heading: "3. Technical risks",
            body: [
              "The service relies on WebRTC and Cloudflare infrastructure. You understand and agree that:",
              "· a direct WebRTC connection may fail due to network conditions, in which case a TURN relay is attempted automatically;",
              "· any electronic communication carries a theoretical risk of interception by third parties;",
              "· end-to-end encryption protects communication content, while connection metadata (such as IP addresses) can technically be obtained by network providers;",
              "· room codes are short, so share them through another channel rather than in public.",
            ],
          },
          {
            heading: "4. Scope of the disclaimer",
            body: [
              "The open-source project and the operator of this deployment accept no legal liability for any accident, negligence, contract damage, defamation, or copyright or intellectual-property infringement, and any resulting loss (including but not limited to direct, indirect, incidental, or consequential loss) arising from downloading, deploying, or using the service or the open-source project it is based on.",
              "You bear all risks and consequences of using the service entirely yourself.",
            ],
          },
          {
            heading: "5. Severability",
            body: [
              "If any part of this statement is held invalid or unenforceable, the remaining parts remain fully effective, and an unenforceable part does not constitute a waiver of the right to enforce it.",
            ],
          },
          {
            heading: "6. Right to change",
            body: [
              "This statement may be changed unilaterally at any time and is published by announcement on this website, taking effect immediately. Continued use of the service after a change means you have read, understood, and accepted the revised statement.",
            ],
          },
          {
            heading: "7. Contact",
            body: ["For questions, contact us by email: " + CONTACT_EMAIL],
          },
        ],
      },
    },
  },
};

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  const { theme } = useTheme();
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-7",
        className,
      )}
      style={{ backgroundImage: `linear-gradient(160deg, ${theme.accent}14, transparent 60%)` }}
    >
      {children}
    </section>
  );
}

function DocumentBody({ document }: { document: LegalDocument }) {
  return (
    <article className="mt-8 first:mt-0">
      <header>
        <h2 className="text-xl font-bold tracking-[0.02em] text-sky-50 sm:text-2xl">{document.heading}</h2>
        <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-sky-100/60 sm:text-sm">{document.updated}</p>
      </header>
      {document.intro ? (
        <p className="mt-4 text-sm leading-relaxed text-sky-100/80 sm:text-base">{document.intro}</p>
      ) : null}
      <div className="mt-6 space-y-6">
        {document.sections.map((section) => (
          <section key={section.heading}>
            <h3 className="text-sm font-bold tracking-[0.04em] text-sky-50 sm:text-base">{section.heading}</h3>
            {section.body?.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  "mt-2 text-sm leading-relaxed text-sky-100/75 sm:text-base",
                  paragraph.startsWith("·") && "pl-1",
                )}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}

export default function Legal({
  documentId,
  locale,
}: {
  documentId: "privacy" | "terms" | "disclaimer";
  locale: LegalLocale;
}) {
  const text = copy[locale];
  const doc = text.documents[documentId];
  const homePath = locale === "zh" ? "/zh" : "/en";
  const siblings = (["privacy", "terms", "disclaimer"] as const).filter((key) => key !== documentId);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("zestsend_locale", locale);
  }, [locale]);

  return (
    <Layout title={`${doc.heading} · yiyuya`}>
      <div className="zest-viewport w-full overflow-y-auto overscroll-contain">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-10 sm:px-6 sm:py-14">
          <nav className="flex flex-wrap items-center justify-between gap-3 text-[0.8rem] font-semibold tracking-[0.06em] text-sky-100/70 sm:text-sm">
            <a className="transition-colors hover:text-sky-50" href={homePath}>
              ← {text.back}
            </a>
            <span className="text-sky-100/45">chat.yiyuya.me</span>
          </nav>

          <h1 className="mt-6 text-[clamp(1.5rem,4vw,2.1rem)] font-bold tracking-[0.04em] text-sky-50">
            {text.title}
          </h1>

          <nav
            aria-label={text.siblings}
            className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.78rem] font-semibold tracking-[0.06em] text-sky-100/60 sm:text-[0.85rem]"
          >
            {siblings.map((key) => (
              <a
                key={key}
                className="underline decoration-sky-100/30 underline-offset-4 transition-colors hover:text-sky-50"
                href={`/${locale}/${key}`}
              >
                {text.documents[key].label}
              </a>
            ))}
            <span className="text-sky-100/45">
              {text.contactLabel}:{" "}
              <a
                className="underline decoration-sky-100/30 underline-offset-4 transition-colors hover:text-sky-50"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </span>
          </nav>

          <div className="mt-8">
            <Panel>
              <DocumentBody document={doc} />
            </Panel>
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-sky-100/45 sm:text-sm">{text.footerNote}</p>
        </div>
      </div>
    </Layout>
  );
}
