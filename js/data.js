/* ==========================================================================
   SGRusso.com — Editorialized Architectural Content Store
   Centralized structured data powering the Dossier UI, AI Topology Inspector,
   Case Studies, Capabilities Matrix, Career Ledger, and Command Palette.
   ========================================================================== */

window.SGR_DATA = {
  aiLayers: [
    {
      id: "layer-compute",
      code: "L1 // COMPUTE",
      title: "Dedicated NVIDIA H100 GPU Fabric",
      preview: "NVIDIA H100 Enterprise GPUs · Multi-GPU Allocation · Air-Gapped / On-Premises Compute",
      eyebrow: "Layer 01 — Sovereign Hardware & Accelerated Compute",
      summary:
        "Architected an on-premises, multi-GPU inference cluster inside Washington County datacenters—keeping sensitive judicial, law enforcement, and municipal records strictly within county-controlled boundaries.",
      bullets: [
        "Engineered dedicated enterprise server infrastructure powered by NVIDIA H100 accelerators for high-throughput, low-latency inference.",
        "Partitioned GPU memory and compute scheduling to run concurrent 70B-parameter language reasoning alongside generative vision pipelines without resource contention.",
        "Eliminated external cloud API exposure and per-token SaaS OpEx while preserving full statutory and operational data sovereignty."
      ],
      tags: [
        "NVIDIA H100",
        "Multi-GPU Scheduling",
        "On-Premises Datacenter",
        "CUDA / Container Runtime",
        "Zero Cloud Egress"
      ]
    },
    {
      id: "layer-inference",
      code: "L2 // INFERENCE",
      title: "High-Throughput LLM & Multimodal Engines",
      preview: "Meta Llama 3.3 70B Instruct · vLLM · FLUX · ComfyUI Pipelines",
      eyebrow: "Layer 02 — Reasoning & Generative Model Serving",
      summary:
        "Paired frontier open-weight language models with accelerated diffusion pipelines behind standardized, production-monitored serving runtimes.",
      bullets: [
        "Deployed Meta Llama 3.3 70B Instruct via vLLM for continuous batching, PagedAttention memory efficiency, and OpenAI-compatible REST endpoints.",
        "Integrated FLUX and ComfyUI execution graphs for GPU-accelerated visual synthesis and multimodal workflow processing.",
        "Containerized model runtimes in Docker with health telemetry, deterministic version pinning, and rapid rollback controls."
      ],
      tags: [
        "Meta Llama 3.3 70B",
        "vLLM Engine",
        "OpenAI-Compatible API",
        "FLUX Diffusion",
        "ComfyUI",
        "Docker"
      ]
    },
    {
      id: "layer-orchestration",
      code: "L3 // MIDDLEWARE",
      title: "Asynchronous API Gateway & RAG Architecture",
      preview: "Python FastAPI · Redis Queueing · Open WebUI · Document Retrieval",
      eyebrow: "Layer 03 — Service Orchestration & Knowledge Retrieval",
      summary:
        "Built the middleware fabric uniting conversational interfaces, asynchronous image-generation queues, and internal institutional knowledge retrieval.",
      bullets: [
        "Developed Python FastAPI microservices backed by Redis job queues to orchestrate bursty multimodal requests cleanly across GPU workers.",
        "Deployed and administered Open WebUI as a self-hosted, ChatGPT-caliber workspace tailored for county staff and technical teams.",
        "Designed Retrieval-Augmented Generation (RAG) and enterprise access-control patterns to ground responses in authoritative internal documentation."
      ],
      tags: [
        "Python FastAPI",
        "Redis Job Queues",
        "Open WebUI",
        "RAG Architecture",
        "Enterprise Auth Planning",
        "REST Microservices"
      ]
    },
    {
      id: "layer-enterprise",
      code: "L4 // INTEGRATION",
      title: "Civic Systems, Telephony & GIS Prototypes",
      preview: "Cisco CUCM Voice PoC · Local STT/TTS · Esri ArcGIS Deep Learning · IT Copilot",
      eyebrow: "Layer 04 — Applied Public-Sector & Operations Workflows",
      summary:
        "Extended the platform beyond chat into practical government service delivery—connecting sovereign AI directly to telephony, geospatial platforms, and IT runbooks.",
      bullets: [
        "Architected a public-information telephone assistant proof of concept integrating Cisco Unified Communications Manager (CUCM) with local speech-to-text and text-to-speech pipelines.",
        "Evaluated Esri ArcGIS deep-learning and geospatial AI integrations to accelerate county mapping and planning analysis.",
        "Designed an internal IT engineering copilot to automate system documentation, runbook synthesis, and escalation triage."
      ],
      tags: [
        "Cisco CUCM Integration",
        "Local STT / TTS",
        "Esri ArcGIS AI",
        "Automated Documentation",
        "Public Service Retrieval"
      ]
    }
  ],

  caseStudies: [
    {
      num: "01",
      category: "virtualization",
      domainLabel: "Virtualization & Enterprise SAN",
      title: "Dual-Campus VMware vSphere 8 & Dell PowerStore SAN Modernization",
      brief:
        "Zero-disruption hypervisor refresh and legacy SAN migration supporting courts, law enforcement, detention, and county operations.",
      challenge:
        "Aging hypervisor clusters and legacy Dell EMC storage arrays faced capacity ceilings and cross-campus resiliency bottlenecks across mission-critical 24/7 public-safety and judicial workloads.",
      architecture:
        "Deployed new enterprise ESXi hosts running VMware vSphere 8, re-architected redundant iSCSI storage fabrics and vMotion VMkernel networks, and migrated production datastores onto Dell PowerStore arrays with snapshot schedules and cross-campus replication.",
      outcome:
        "Executed live workload cutovers via vMotion without service interruption, delivering substantially lower storage latency, predictable capacity headroom, and automated campus-to-campus failover readiness.",
      stack: [
        "VMware vSphere 8",
        "ESXi & vCenter",
        "Dell PowerStore",
        "iSCSI Fabric",
        "vMotion",
        "Cross-Campus Replication"
      ]
    },
    {
      num: "02",
      category: "security",
      domainLabel: "Zero-Trust Identity, PKI & Mobility",
      title: "Enterprise PKI, Certificate Lifecycle & Supervised MDM Architecture",
      brief:
        "End-to-end cryptographic identity foundation uniting Microsoft AD CS, NDES/SCEP, Duo MFA, and Ivanti Neurons for Apple fleets.",
      challenge:
        "Growing mobile adoption across county departments required strict device compliance and passwordless/certificate-backed access to Exchange and internal resources without burdening end users.",
      architecture:
        "Engineered an internal Microsoft Active Directory Certificate Services (AD CS) PKI integrated with NDES/SCEP, Ivanti Neurons for MDM, Ivanti Sentry, and Apple Business Manager—paired with Duo MFA and consolidated DigiCert/GoDaddy public TLS governance.",
      outcome:
        "Achieved zero-touch supervised iPhone provisioning, automated certificate-based ActiveSync authentication, and unified compliance enforcement across all county-issued mobile endpoints.",
      stack: [
        "Microsoft AD CS / PKI",
        "NDES & SCEP",
        "Ivanti Neurons & Sentry",
        "Apple Business Manager",
        "Duo MFA",
        "DigiCert TLS"
      ]
    },
    {
      num: "03",
      category: "virtualization",
      domainLabel: "Backup, Vaulting & Disaster Recovery",
      title: "Multi-Tier Cyber-Resilient Backup & LTO-9 Air-Gapped Tape Infrastructure",
      brief:
        "Immutable-ready multi-tier recovery architecture combining Veeam, Dell EMC Data Domain, Synology tiers, and Quantum Scalar i3 LTO-9 tape.",
      challenge:
        "Public-sector ransomware threat models demanded deterministic recovery points and true offline air-gapped media beyond primary disk repositories.",
      architecture:
        "Modernized Veeam Backup & Replication proxy and repository pipelines integrated with Dell EMC Data Domain deduplication appliances, secondary Synology NAS targets, and a Quantum Scalar i3 library writing LTO-9 media.",
      outcome:
        "Established verified 3-2-1-1 backup posture, accelerated full-VM and granular restore RTOs, and instituted repeatable disaster recovery runbooks across both county campuses.",
      stack: [
        "Veeam Backup & Replication",
        "Dell EMC Data Domain",
        "Quantum Scalar i3",
        "LTO-9 Tape",
        "Synology NAS",
        "DR Runbooks"
      ]
    },
    {
      num: "04",
      category: "cloud",
      domainLabel: "Messaging & Email Security",
      title: "Hybrid Exchange 2019 CU15 & Proofpoint Email Gateway Transformation",
      brief:
        "Hardened hybrid Microsoft 365 messaging and cut over enterprise mail defense from legacy Cisco ESA appliances to Proofpoint Essentials.",
      challenge:
        "Evolving phishing and spoofing campaigns required modernized mail-flow inspection, strict sender authentication, and seamless coexistence between on-premises Exchange 2019 and Microsoft Entra ID.",
      architecture:
        "Maintained Exchange Server 2019 through CU15 lifecycle upgrades in hybrid Microsoft 365 / Entra ID topology while leading the gateway migration from Cisco Email Security Appliances (ESA) to Proofpoint Essentials with enforced SPF, DKIM, DMARC, and TLS.",
      outcome:
        "Eliminated legacy hardware maintenance overhead, elevated domain anti-spoofing compliance, and improved inbound threat quarantine visibility across 350+ municipal mailboxes.",
      stack: [
        "Exchange Server 2019 CU15",
        "Microsoft 365 / Entra ID",
        "Proofpoint Essentials",
        "Cisco ESA Migration",
        "SPF / DKIM / DMARC",
        "SMTP TLS"
      ]
    },
    {
      num: "05",
      category: "operations",
      domainLabel: "Campus Networking & SD-WAN",
      title: "Multi-Campus Dark-Fiber Backbone & Cisco Meraki SD-WAN Modernization",
      brief:
        "Resilient inter-campus routing, VLAN segmentation, and SD-WAN rollout connecting distributed county facilities.",
      challenge:
        "Distributed courts, detention, public works, and administrative offices required fault-tolerant inter-building transport and stricter east-west network segmentation.",
      architecture:
        "Administered dark-fiber campus interconnects alongside Cisco switching, enterprise firewalls, and Cisco Meraki SD-WAN appliances—enforcing granular VLAN segmentation, site-to-site VPNs, and redundant enterprise DNS/DHCP.",
      outcome:
        "Improved multi-site failover resiliency, isolated sensitive operational subnets, and simplified branch telemetry and firewall policy governance.",
      stack: [
        "Cisco Networking",
        "Cisco Meraki SD-WAN",
        "Dark-Fiber Rings",
        "VLAN Segmentation",
        "Enterprise Firewalls",
        "DNS / DHCP / VPN"
      ]
    },
    {
      num: "06",
      category: "cloud",
      domainLabel: "Civic & Enterprise Platforms",
      title: "Mission-Critical Public-Sector Platform & Cloud Application Migrations",
      brief:
        "Rebuilt Esri ArcGIS and CentralSquare server environments and directed the cloud transition of Karpel legal case management.",
      challenge:
        "Core county operations—financial general ledger, countywide GIS mapping, and prosecutorial case management—relied on aging application servers and manual workstation deployment.",
      architecture:
        "Provisioned dedicated Windows Server and SQL Server/SSRS environments for Esri ArcGIS and CentralSquare Finance, led the cloud migration of Karpel case management, and standardized endpoint imaging onto Quest KACE.",
      outcome:
        "Delivered measurable gains in GIS rendering and financial reporting responsiveness, improved attorney remote access uptime, and automated OS provisioning workflows.",
      stack: [
        "Esri ArcGIS Enterprise",
        "CentralSquare",
        "Karpel Cloud Migration",
        "SQL Server / SSRS",
        "Remote Desktop Services",
        "KACE SMA / SDA"
      ]
    },
    {
      num: "07",
      category: "security",
      domainLabel: "Incident Response & Identity Hardening",
      title: "Countywide Cybersecurity Incident Response & Active Directory Modernization",
      brief:
        "Commended by the County Judge for frontline containment, forensic coordination, and forest-wide Active Directory hardening.",
      challenge:
        "During a major 2022 countywide cybersecurity incident, rapid containment, identity remediation, and coordinated recovery with external security partners were mission-critical to restore public services.",
      architecture:
        "Served as a core technical responder on the Cybersecurity Incident Response Team—isolating affected segments, remediating endpoints, advancing Active Directory domain/forest functional levels to Server 2019, and tightening GPO and auditing controls.",
      outcome:
        "Restored countywide operations safely and earned formal recognition from County Judge Joseph Wood for decisive technical leadership under pressure.",
      stack: [
        "Incident Response",
        "Active Directory DS",
        "Group Policy Hardening",
        "CrowdStrike / Endpoint Defense",
        "Netwrix Auditing",
        "MSSP Coordination"
      ]
    },
    {
      num: "08",
      category: "operations",
      domainLabel: "Financial Systems Engineering",
      title: "“Client Viewer” Operational Intelligence Platform for $1T+ AUM MSP",
      brief:
        "Conceived and spearheaded a unified client-infrastructure intelligence portal across 500+ hedge funds and private equity firms.",
      challenge:
        "At a rapidly scaling Greenwich financial MSP (~30% YoY growth), critical configuration and topology data for 500+ trading and investment clients was fragmented across disparate tools, slowing senior escalations.",
      architecture:
        "Designed and led development of “Client Viewer,” consolidating live client environment metadata, escalation context, and operational runbooks into a single unified interface for 200+ engineers, deployment leads, and account teams.",
      outcome:
        "Substantially reduced human error and mean-time-to-resolution (MTTR) on high-stakes trading-desk escalations, driving standout client satisfaction across portfolios exceeding $1T in combined AUM.",
      stack: [
        "Systems Architecture",
        "Operational Telemetry",
        "Escalation Engineering",
        "Datacenter Operations",
        "Institutional Finance SLAs"
      ]
    }
  ],

  capabilities: [
    {
      code: "DOM-01",
      title: "Enterprise AI & GPU Infrastructure",
      desc: "Sovereign on-premises LLM & multimodal inference platforms engineered for data privacy and production throughput.",
      items: [
        "NVIDIA H100 GPUs",
        "vLLM Inference",
        "Llama 3.3 70B",
        "Open WebUI",
        "FLUX & ComfyUI",
        "Python FastAPI",
        "Redis Queues",
        "Docker",
        "RAG Architecture",
        "OpenAI-Compatible APIs"
      ]
    },
    {
      code: "DOM-02",
      title: "Virtualization, Storage & Recovery",
      desc: "High-availability hypervisor clusters, enterprise iSCSI SAN fabrics, and multi-tier air-gapped disaster recovery.",
      items: [
        "VMware vSphere 8",
        "ESXi & vCenter",
        "vMotion",
        "Dell PowerStore SAN",
        "iSCSI Networking",
        "Veeam B&R",
        "Dell EMC Data Domain",
        "Quantum Scalar i3",
        "LTO-9 Tape",
        "Synology NAS"
      ]
    },
    {
      code: "DOM-03",
      title: "Microsoft Core & Hybrid Cloud",
      desc: "Multi-site Active Directory identity, hybrid Exchange messaging, automation scripting, and enterprise server fleets.",
      items: [
        "Windows Server",
        "Active Directory DS",
        "Group Policy (GPO)",
        "Microsoft 365",
        "Microsoft Entra ID",
        "Exchange 2019 CU15",
        "PowerShell",
        "SQL Server / SSRS",
        "Enterprise DNS / DHCP",
        "Remote Desktop Services"
      ]
    },
    {
      code: "DOM-04",
      title: "Cybersecurity, PKI & Mobility",
      desc: "Cryptographic identity, email gateway defense, supervised mobile fleets, and frontline incident containment.",
      items: [
        "AD CS / Enterprise PKI",
        "NDES / SCEP",
        "Proofpoint Essentials",
        "SPF / DKIM / DMARC",
        "Duo MFA",
        "Ivanti Neurons & Sentry",
        "Apple Business Manager",
        "DigiCert TLS",
        "CrowdStrike",
        "Netwrix Auditor"
      ]
    },
    {
      code: "DOM-05",
      title: "Enterprise Networking & Voice",
      desc: "Resilient multi-campus switching, dark-fiber interconnects, SD-WAN modernization, and unified communications.",
      items: [
        "Cisco Routing & Switching",
        "Cisco Meraki SD-WAN",
        "Dark-Fiber Campus Rings",
        "VLAN Segmentation",
        "Enterprise Firewalls",
        "Site-to-Site VPN",
        "Cisco CUCM Telephony",
        "Cisco Umbrella",
        "Packet Diagnostics"
      ]
    },
    {
      code: "DOM-06",
      title: "Platforms & Technical Leadership",
      desc: "Line-of-business infrastructure, endpoint lifecycle automation, vendor governance, and senior escalation ownership.",
      items: [
        "Esri ArcGIS",
        "CentralSquare",
        "Karpel Cloud",
        "KACE SMA / SDA",
        "PDQ Deploy / Inventory",
        "Dell PowerEdge / iDRAC",
        "HPE ProLiant",
        "Change Management",
        "Root Cause Analysis",
        "Vendor Leadership"
      ]
    }
  ],

  career: [
    {
      dates: "2026 — PRESENT",
      location: "Prairie Grove, AR",
      sector: "Independent Advisory",
      org: "Russo Technology Consulting",
      role: "Founder & Principal Technology Consultant",
      summary:
        "Selective independent infrastructure, security, and modern web engineering practice advising regional organizations while pursuing senior enterprise architecture initiatives.",
      highlights: [
        "Deliver end-to-end infrastructure modernization, network remediation, backup resiliency, and cloud readiness engagements from discovery through documented handoff.",
        "Architect and deploy fast, zero-bloat web properties with custom DNS governance, automated TLS lifecycle management, and Git-driven production pipelines."
      ]
    },
    {
      dates: "2022 — 2026",
      location: "Fayetteville, AR",
      sector: "Public Sector · 350+ Staff · Dual Campus",
      org: "Washington County Government",
      role: "Systems Administrator & Infrastructure Lead",
      summary:
        "Owned core datacenter, virtualization, storage, identity, messaging, and sovereign AI infrastructure across dual county campuses serving Courts, Law Enforcement, Detention, Finance, and GIS.",
      highlights: [
        "Engineered a sovereign on-premises NVIDIA H100 enterprise AI platform serving Meta Llama 3.3 70B (vLLM), FLUX/ComfyUI, FastAPI/Redis middleware, Open WebUI, and Cisco CUCM voice prototypes.",
        "Led dual-campus VMware vSphere 8 cluster refresh and live SAN migration from legacy Dell EMC arrays to replicated Dell PowerStore storage.",
        "Designed internal PKI (AD CS, NDES/SCEP) integrated with Ivanti Neurons/Sentry and Apple Business Manager for automated certificate-based mobile authentication.",
        "Administered hybrid Exchange 2019 CU15 and Microsoft Entra ID; migrated enterprise email security from Cisco ESA to Proofpoint Essentials with strict SPF, DKIM, and DMARC.",
        "Modernized cyber-resilient backups across Veeam, Dell EMC Data Domain, Synology, and Quantum Scalar i3 LTO-9 tape; formally commended by County Judge Joseph Wood for 2022 cybersecurity incident response."
      ]
    },
    {
      dates: "2017 — 2021",
      location: "Greenwich, CT",
      sector: "Institutional Finance MSP · $1T+ Client AUM",
      org: "Edge Technology Group",
      role: "Team Lead & Senior Escalation Engineer",
      summary:
        "Senior technical escalation point and team lead at a premier financial MSP supporting 500+ hedge funds, private equity firms, and institutional trading desks expanding ~30% annually.",
      highlights: [
        "Resolved complex, multi-layer workstation, server, storage, and network escalations under unforgiving market-hours SLAs across datacenters supporting over $1 trillion in managed assets.",
        "Conceived and spearheaded “Client Viewer,” unifying critical client topology and operational intelligence for 200+ engineers—dramatically cutting human error and escalation resolution times.",
        "Partnered directly with portfolio managers, CTOs, and C-suite executives to design scalable infrastructure roadmaps aligned with strict financial regulatory standards."
      ]
    },
    {
      dates: "2014 — 2017",
      location: "New York, NY",
      sector: "Institutional Asset Management · $189B AUM",
      org: "Jennison Associates",
      role: "Senior Service Technician / Systems Lead",
      summary:
        "Administered enterprise systems and high-touch trading/engineering support across a 430-server, 500-workstation institutional investment environment.",
      highlights: [
        "Technical lead for the migration of 400+ institutional users from legacy BlackBerry Enterprise Server (BES) to MobileIron MDM on supervised Apple iOS devices.",
        "Directed a 300+ workstation SSD/memory performance refresh, implemented Acronis disaster recovery across 250 endpoints, and authored custom Windows Server 2012 R2 developer images.",
        "Maintained strict configuration hygiene and drift reconciliation across Active Directory, DNS, Group Policy, VMware, Symantec Endpoint, and LDMS."
      ]
    },
    {
      dates: "2007 — 2014",
      location: "Stamford, CT",
      sector: "Global Hedge Fund · US, UK, APAC",
      org: "K2 Advisors (Franklin Templeton)",
      role: "Assistant Vice President of Information Technology",
      summary:
        "Directed global infrastructure projects, security modernization, and 20+ vendor relationships across offices in Connecticut, New York, London, Tokyo, Hong Kong, and Sydney.",
      highlights: [
        "Maintained 99%+ operational uptime across 90 virtual servers, 11 ESXi hosts, and 9 EqualLogic SANs while leading full physical-to-virtual (P2V) datacenter consolidation on HP Blade Systems.",
        "Spearheaded enterprise security upgrades including IDS/IPS, RSA SecurID MFA, WebSense filtering, and Dell KACE lifecycle management.",
        "Scaled core Active Directory, Exchange, and SQL Server environments as firm AUM grew from $7B to $10B+ through its 2012 acquisition by Franklin Templeton Investments."
      ]
    },
    {
      dates: "2004 — 2007",
      location: "Stamford, CT",
      sector: "National Marketing Agency · 4 U.S. Offices",
      org: "J. Brown Advertising / G2 Promotional Marketing",
      role: "IT / Network Administrator",
      summary:
        "Administered multi-site network and cross-platform server infrastructure for 150 employees across Stamford, Cincinnati, Chicago, and Dallas.",
      highlights: [
        "Led company-wide migration from legacy Mac OS 9 to a unified Windows Server 2003, Active Directory, Windows XP, and Mac OS X Server architecture through the firm’s acquisition by Grey Worldwide."
      ]
    }
  ]
};

