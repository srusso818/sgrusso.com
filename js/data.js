/* ==========================================================================
   SGRusso.com — Concise, High-Impact Architectural Content Store (v2)
   Focused on Datacenter Modernization, Cloud Repatriation, Disaster Recovery,
   Systems Architecture, Cybersecurity, DevOps, and Sovereign On-Premises AI.
   ========================================================================== */

window.SGR_DATA = {
  stackDecks: [
    {
      id: "ai",
      code: "LAYER 04",
      name: "Sovereign Enterprise AI",
      sub: "NVIDIA H100 · vLLM · Llama 3.3 70B · $0 Cloud Token Egress",
      metric: "100% On-Prem Privacy"
    },
    {
      id: "compute",
      code: "LAYER 03",
      name: "Modernized Datacenter Core",
      sub: "VMware vSphere 8 · Dell PowerStore SAN · Dual-Campus iSCSI",
      metric: "Zero-Downtime vMotion"
    },
    {
      id: "security",
      code: "LAYER 02",
      name: "Zero-Trust & DevOps Mesh",
      sub: "AD CS PKI · Docker · FastAPI/Redis · Proofpoint DMARC",
      metric: "Cryptographic Auth"
    },
    {
      id: "vault",
      code: "LAYER 01",
      name: "Air-Gapped Recovery Vault",
      sub: "Veeam B&R · Dell EMC Data Domain · Quantum Scalar LTO-9",
      metric: "3-2-1-1 Ransomware Proof"
    }
  ],

  pillars: [
    {
      num: "01",
      id: "datacenter",
      kicker: "Cloud Repatriation & Core Refresh",
      title: "Datacenter Modernization Without the Cloud Tax",
      lead:
        "Replace aging server rooms and runaway cloud OpEx with dense, self-healing on-premises compute and NVMe/iSCSI SAN fabrics that pay for themselves.",
      metricLabel: "Workload Cutover Disruption",
      metricValue: "0 min",
      diagramMode: "datacenter",
      nodes: ["vSphere 8 Cluster", "PowerStore SAN", "10/25GbE iSCSI", "Campus Replica"],
      tags: [
        "VMware vSphere 8",
        "ESXi & vCenter",
        "Dell PowerStore SAN",
        "Live vMotion",
        "Cloud Repatriation"
      ]
    },
    {
      num: "02",
      id: "onprem-ai",
      kicker: "Private Accelerated Compute",
      title: "Sovereign On-Premises Enterprise AI",
      lead:
        "Deliver ChatGPT-scale 70B reasoning and multimodal generation on dedicated NVIDIA H100 GPUs inside your own walls—zero per-token SaaS fees, zero data leakage.",
      metricLabel: "External Cloud Data Egress",
      metricValue: "0 Bytes",
      diagramMode: "ai",
      nodes: ["NVIDIA H100 GPUs", "vLLM · Llama 70B", "FLUX · ComfyUI", "Internal RAG / Voice"],
      tags: [
        "NVIDIA H100",
        "vLLM Engine",
        "Llama 3.3 70B",
        "Open WebUI",
        "FLUX & ComfyUI",
        "Sovereign RAG"
      ]
    },
    {
      num: "03",
      id: "dr",
      kicker: "Continuity & Immutable Vaulting",
      title: "Air-Gapped Disaster Recovery",
      lead:
        "Engineer deterministic recovery against worst-case ransomware through deduplicated disk tiers backed by physical, offline LTO-9 tape vaulting.",
      metricLabel: "Recovery Posture",
      metricValue: "3-2-1-1",
      diagramMode: "dr",
      nodes: ["Production VMs", "Veeam Proxies", "Data Domain", "LTO-9 Air-Gap"],
      tags: [
        "Veeam Backup & Replication",
        "Dell EMC Data Domain",
        "Quantum Scalar i3",
        "LTO-9 Tape",
        "DR Runbooks"
      ]
    },
    {
      num: "04",
      id: "architecture",
      kicker: "Resilient Topology Design",
      title: "High-Availability Systems Architecture",
      lead:
        "Architect multi-campus dark-fiber backbones, SD-WAN failover, and fault-tolerant storage/compute topologies forged across $1T+ trading desks and 24/7 civic operations.",
      metricLabel: "Measured Fleet Uptime",
      metricValue: "99%+",
      diagramMode: "arch",
      nodes: ["Campus A Core", "Dark-Fiber Ring", "Campus B Core", "Meraki SD-WAN"],
      tags: [
        "Systems Architecture",
        "Dark-Fiber Rings",
        "Cisco Meraki SD-WAN",
        "Hybrid M365 / Entra ID",
        "Capacity Planning"
      ]
    },
    {
      num: "05",
      id: "cybersecurity",
      kicker: "Identity & Perimeter Hardening",
      title: "Zero-Trust Cybersecurity & Enterprise PKI",
      lead:
        "Eliminate credential risk with internal certificate authorities, automated SCEP mobile auth, strict DMARC mail defense, and battle-tested incident response.",
      metricLabel: "Endpoint & Mail Posture",
      metricValue: "Zero-Trust",
      diagramMode: "sec",
      nodes: ["AD CS Root PKI", "NDES / Ivanti MDM", "Duo MFA", "Proofpoint DMARC"],
      tags: [
        "AD CS / PKI / NDES",
        "Duo MFA",
        "Proofpoint Essentials",
        "SPF / DKIM / DMARC",
        "Ivanti MDM",
        "Incident Response"
      ]
    },
    {
      num: "06",
      id: "devops",
      kicker: "Pipelines & Fleet Orchestration",
      title: "DevOps, Containers & Automation",
      lead:
        "Bridge bare-metal infrastructure with modern software delivery using Dockerized AI/API stacks, async Redis queues, PowerShell automation, and GitOps workflows.",
      metricLabel: "Deployment Model",
      metricValue: "Automated",
      diagramMode: "devops",
      nodes: ["Git / PowerShell", "Docker Containers", "FastAPI + Redis", "KACE / PDQ Fleet"],
      tags: [
        "Docker",
        "Python FastAPI",
        "Redis Queues",
        "PowerShell",
        "GitOps / CI",
        "KACE & PDQ Automation"
      ]
    }
  ],

  repatriationMetrics: [
    {
      label: "3-Year Infrastructure Cost Predictability",
      sovereign: 95,
      cloud: 38,
      sovereignNote: "Fixed hardware amortization · $0 token/egress tax",
      cloudNote: "Metered compute, storage, bandwidth & per-seat creep"
    },
    {
      label: "Data & AI Sovereignty / Regulatory Control",
      sovereign: 100,
      cloud: 45,
      sovereignNote: "100% in-house custody · Air-gapped & CJIS/finance ready",
      cloudNote: "Third-party multi-tenant custody & vendor policy shifts"
    },
    {
      label: "SAN Storage & H100 GPU Interconnect Speed",
      sovereign: 96,
      cloud: 58,
      sovereignNote: "Sub-ms local NVMe/iSCSI & direct PCIe/NVLink throughput",
      cloudNote: "WAN latency & throttled virtualized IOPS tiers"
    },
    {
      label: "Ransomware Air-Gap & Deterministic Restore",
      sovereign: 98,
      cloud: 62,
      sovereignNote: "Physical offline LTO-9 tape + local Data Domain speed",
      cloudNote: "Slow multi-TB WAN rehydration bottlenecks during crises"
    }
  ],

  projects: [
    {
      id: "proj-ai",
      badge: "ON-PREM AI · H100",
      title: "Sovereign Multi-GPU Enterprise AI Platform",
      summary:
        "Built a private NVIDIA H100 AI stack running Llama 3.3 70B (vLLM), FLUX/ComfyUI, and FastAPI/Redis—eliminating public cloud AI costs and data exposure.",
      challenge:
        "County departments needed frontier LLM reasoning, document retrieval, and voice/GIS automation without exposing sensitive civic or judicial records to external SaaS APIs.",
      execution:
        "Architected dedicated NVIDIA H100 GPU servers running containerized vLLM (Llama 3.3 70B), ComfyUI/FLUX image pipelines, Python FastAPI + Redis job queues, Open WebUI, internal RAG patterns, and a Cisco CUCM telephone assistant PoC.",
      impact:
        "Delivered ChatGPT-caliber capability entirely on-premises with zero recurring token fees and complete statutory data sovereignty.",
      stack: ["NVIDIA H100", "vLLM", "Llama 3.3 70B", "Docker", "FastAPI", "Redis", "Open WebUI", "Cisco CUCM"]
    },
    {
      id: "proj-san",
      badge: "DATACENTER · SAN",
      title: "Dual-Campus vSphere 8 & PowerStore Modernization",
      summary:
        "Refreshed legacy hypervisors and Dell EMC arrays onto VMware vSphere 8 and replicated Dell PowerStore SANs with zero production downtime.",
      challenge:
        "Aging virtualization clusters and legacy SAN arrays risked storage bottlenecks across 24/7 courts, detention, law enforcement, and financial operations.",
      execution:
        "Deployed modern ESXi hosts on vSphere 8, redesigned redundant iSCSI and vMotion fabrics, and executed live workload migrations to Dell PowerStore storage with automated snapshots and cross-campus replication.",
      impact:
        "Cut storage latency, eliminated unplanned maintenance windows, and established seamless campus-to-campus failover.",
      stack: ["VMware vSphere 8", "ESXi / vCenter", "Dell PowerStore", "iSCSI Fabric", "vMotion", "Cross-Campus HA"]
    },
    {
      id: "proj-dr",
      badge: "DISASTER RECOVERY",
      title: "3-2-1-1 Cyber-Resilient Backup & LTO-9 Air-Gap",
      summary:
        "Engineered ransomware-proof recovery uniting Veeam, Dell EMC Data Domain deduplication, and offline Quantum Scalar i3 LTO-9 tape.",
      challenge:
        "Modern ransomware targets network-attached backups first, requiring true physical air-gapping alongside rapid local VM restoration.",
      execution:
        "Re-architected Veeam Backup & Replication proxies and retention policies across Dell EMC Data Domain appliances, Synology tiers, and a Quantum Scalar i3 LTO-9 tape library.",
      impact:
        "Guaranteed offline immutable media isolation while slashing full-VM and granular file restore times.",
      stack: ["Veeam B&R", "Dell EMC Data Domain", "Quantum Scalar i3", "LTO-9 Tape", "Synology NAS"]
    },
    {
      id: "proj-pki",
      badge: "ZERO-TRUST · PKI",
      title: "Enterprise PKI, Certificate Auth & Supervised MDM",
      summary:
        "Deployed internal Microsoft AD CS PKI, NDES/SCEP, Duo MFA, and Ivanti Neurons MDM for zero-touch passwordless mobile security.",
      challenge:
        "Expanding iOS fleets needed strict compliance and seamless Exchange access without password fatigue or unmanaged device exposure.",
      execution:
        "Integrated AD CS certificate lifecycle management with NDES/SCEP, Ivanti Neurons & Sentry, Apple Business Manager supervised policies, Duo MFA, and consolidated DigiCert TLS.",
      impact:
        "Automated zero-touch iPhone provisioning and enforced cryptographic certificate authentication across the enterprise.",
      stack: ["Microsoft AD CS", "NDES / SCEP", "Ivanti Neurons & Sentry", "Apple ABM", "Duo MFA", "DigiCert TLS"]
    },
    {
      id: "proj-sec",
      badge: "CYBERSECURITY · IR",
      title: "Incident Containment, AD Hardening & Mail Defense",
      summary:
        "Commended by the County Judge for frontline 2022 incident response; modernized AD DS and cut over Cisco ESA to Proofpoint DMARC.",
      challenge:
        "High-stakes municipal threat environments demanded rapid incident containment, hardened identity tiers, and modernized anti-spoofing email gateways.",
      execution:
        "Served on the frontline Cybersecurity Incident Response Team, raised Active Directory to Server 2019 functional levels with hardened GPOs, and migrated Exchange 2019 CU15 mail defense from Cisco ESA to Proofpoint Essentials (SPF/DKIM/DMARC).",
      impact:
        "Safely restored county operations—earning formal commendation from County Judge Joseph Wood—and locked down perimeter email and identity.",
      stack: ["Incident Response", "Active Directory", "Exchange 2019 CU15", "Proofpoint", "SPF/DKIM/DMARC", "CrowdStrike"]
    },
    {
      id: "proj-fin",
      badge: "DEVOPS & TELEMETRY",
      title: "“Client Viewer” Platform for $1T+ Institutional MSP",
      summary:
        "Conceived and led a unified infrastructure telemetry tool across 500+ hedge funds and private equity firms—slashing escalation MTTR.",
      challenge:
        "Supporting 500+ fast-growing financial firms (~30% YoY growth) meant critical topology data was scattered, slowing high-pressure trading-desk escalations.",
      execution:
        "Designed and led development of a centralized operational intelligence portal unifying live environment specs and runbooks for 200+ engineers and deployment teams.",
      impact:
        "Eliminated manual lookup errors and accelerated senior escalation resolution across datacenters backing over $1T in client AUM.",
      stack: ["Architecture Design", "Operational Telemetry", "Runbook Automation", "Datacenter SLAs", "$1T+ AUM Ecosystem"]
    }
  ],

  career: [
    {
      dates: "2026 — Present",
      org: "Russo Technology Consulting",
      role: "Founder & Principal Infrastructure Consultant",
      location: "Northwest Arkansas",
      summary:
        "Independent infrastructure architecture, datacenter modernization, cybersecurity hardening, and GitOps deployment practice advising regional organizations."
    },
    {
      dates: "2022 — 2026",
      org: "Washington County Government",
      role: "Systems Administrator & Infrastructure Lead",
      location: "Fayetteville, AR",
      summary:
        "Architected sovereign NVIDIA H100 enterprise AI, dual-campus vSphere 8 & Dell PowerStore SAN refreshes, LTO-9 air-gapped DR, AD CS PKI / Ivanti MDM, and Proofpoint/Exchange 2019 security for 350+ staff. Commended by the County Judge for cybersecurity incident response."
    },
    {
      dates: "2017 — 2021",
      org: "Edge Technology Group",
      role: "Team Lead & Senior Escalation Engineer",
      location: "Greenwich, CT",
      summary:
        "Top-tier escalation resolver and creator of “Client Viewer” at a premier financial MSP supporting 500+ hedge funds and private equity firms managing over $1T in combined AUM."
    },
    {
      dates: "2014 — 2017",
      org: "Jennison Associates",
      role: "Senior Service Technician / Systems Lead",
      location: "New York, NY",
      summary:
        "Administered 430 servers and 500 workstations in a $189B AUM trading environment; led 400+ user MDM migration, 300+ endpoint SSD refresh, and Acronis DR rollout."
    },
    {
      dates: "2007 — 2014",
      org: "K2 Advisors (Franklin Templeton)",
      role: "Assistant Vice President of Information Technology",
      location: "Stamford, CT · Global",
      summary:
        "Maintained 99%+ uptime across 90 virtual servers, 11 ESXi hosts, and 9 EqualLogic SANs across US, UK, and APAC offices as firm AUM scaled from $7B to $10B+ through Franklin Templeton acquisition."
    },
    {
      dates: "2004 — 2007",
      org: "J. Brown Advertising / G2PM (Grey Worldwide)",
      role: "IT / Network Administrator",
      location: "Stamford, CT",
      summary:
        "Led multi-office Windows Server 2003, Active Directory, and Mac OS X Server modernization across four U.S. offices."
    }
  ]
};
