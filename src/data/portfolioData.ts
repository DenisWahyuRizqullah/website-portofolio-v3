import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Denis Wahyu Rizqullah',
    shortName: 'Denis W. Rizqullah',
    role: 'Computer Systems & Software Engineer',
    degree: 'B.Eng. in Computer Engineering — Universitas Brawijaya',
    tagline:
      'Developing reliable and efficient systems across software and embedded hardware.',
    location: 'Malang, Indonesia',
    email: 'deniswahyu26@gmail.com',
    phone: '+62 823 3160 3633',
    status: 'Available for Engineering Roles',
    bioParagraphs: [
      'I am a Computer Engineering graduate specializing in the intersection of low-level embedded hardware and production software systems. My engineering work spans IoT telemetry architecture, embedded firmware (C++, NodeMCU, ESP8266, Raspberry Pi), computer vision algorithms, and modern web applications.',
      'I bridge the gap between physical mechanics and digital interfaces. Whether calibrating NEMA 17 stepper motors for remote telecom antenna alignment at Telkomsel, deploying offline neural networks on edge compute nodes via MQTT, or benchmarking mobile image processing pipelines, I engineer deterministic, verifiable solutions.',
      'Rooted in Scandinavian minimalist engineering principles: every line of code serves a measurable purpose, and visual clarity stems from structural discipline rather than superficial decoration.',
    ],
    resumes: [
      {
        label: 'Resume — Software Engineering',
        sublabel: 'CV_SE_Denis_Wahyu_Rizqullah.pdf',
        url: '/assets/resume/CV_SE_Denis_Wahyu_Rizqullah.pdf',
      },
      {
        label: 'Resume — IT Support',
        sublabel: 'CV_ITSP_Denis_Wahyu_Rizqullah.pdf',
        url: '/assets/resume/CV_ITSP_Denis_Wahyu_Rizqullah.pdf',
      },
    ],
    socials: [
      {
        label: 'GitHub',
        url: 'https://github.com/DenisWahyuRizqullah',
        handle: 'DenisWahyuRizqullah',
      },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/deniswahyurizqullah',
        handle: 'in/deniswahyurizqullah',
      },
      {
        label: 'Instagram',
        url: 'https://instagram.com/denis_hhmm',
        handle: '@denis_hhmm',
      },
    ],
  },

  pillars: [
    {
      index: '01',
      code: 'SYS_COUNT',
      label: 'ENGINEERED SYSTEMS',
      value: '7+ Projects',
      detail: 'Embedded firmware, edge AI, computer vision & fullstack web',
    },
    {
      index: '02',
      code: 'PEER_REVIEW',
      label: 'RESEARCH PUBLICATION',
      value: 'J-PTIIK',
      detail: 'Published paper on mobile microscopic blood cell detection',
    },
    {
      index: '03',
      code: 'FIELD_OPS',
      label: 'INDUSTRY DEPLOYMENT',
      value: 'Telkomsel',
      detail: 'Antenna azimuth wireless actuation system deployed for field tests',
    },
    {
      index: '04',
      code: 'TECH_FOUNDATION',
      label: 'CORE RUNTIME',
      value: 'C++  Python',
      detail: 'microcontrollers to neural network inference',
    },
  ],

  projects: [
    {
      id: 1,
      indexStr: '01',
      title: 'WiFi-Based Antenna Rotator Prototype',
      subtitle: 'Remote Telecommunication Antenna Alignment System — Telkomsel',
      date: 'Feb – Jun 2024',
      location: 'Malang, Indonesia',
      description:
        'Wireless microcontroller-driven stepper actuation system enabling ground-level technicians to rotate and align telecommunication antennas via an embedded web interface without climbing physical towers.',
      tags: ['Embedded C++', 'NodeMCU ESP8266', 'NEMA 17 Stepper', 'Embedded Web Server', 'Hardware-Software Integration'],
      category: 'IoT & Embedded Hardware',
      featured: true,
      metric: '0 Climbs · ±1.8° Precision',
      caseStudy: {
        about: [
          'Engineered during my internship at PT Telekomunikasi Selular (Telkomsel) as a Software and Hardware Developer, this system removes the hazardous necessity for telecom technicians to physically scale communication towers for routine antenna azimuth adjustments.',
          'The unit configures an ESP8266 NodeMCU microcontroller as an authenticated standalone local access point, hosting an embedded HTTP web application that communicates directly with mechanical drive circuitry.',
        ],
        background: [
          'Conventional antenna alignment requires technicians to climb 30–50 meter telecommunication masts to adjust azimuth angles—introducing severe fall hazards, weather downtime, and significant operational expenditure.',
          'A ground-level wireless controller provides immediate, safe, and repeatable angular adjustments while technicians remain grounded.',
        ],
        objectives: [
          'Design an isolated wireless control mechanism for remote antenna orientation.',
          'Configure NodeMCU as a standalone WiFi AP serving an embedded web control panel.',
          'Interface a geared NEMA 17 stepper motor (200 steps/rev) for fine-grained clockwise and counterclockwise angular stepping.',
          'Validate wireless stability, step precision, and thermal tolerance in field environments.',
        ],
        methodology: [
          'The NodeMCU broadcasts an isolated WiFi network and serves a lightweight HTML/CSS interface over a private static IP.',
          'Technician inputs (angle increments, direction triggers) are transmitted as low-latency HTTP commands directly parsed by the C++ firmware.',
          'The firmware generates precise PWM step-and-direction pulse trains through motor driver circuitry, rotating the gear-reduced NEMA 17 motor in micro-steps.',
        ],
        challenge: [
          'Maintaining continuous wireless connection stability while driving high-current stepper coils without inducing brownouts or step slippage.',
          'Resolved through separate power rail isolation, capacitor decoupling, firmware interrupt timer calibration, and custom gear reduction for smooth mechanical torque.',
        ],
        images: [
          '/assets/img/telkomsel1.webp',
          '/assets/img/telkomsel2.webp',
          '/assets/img/telkomsel3.jpg',
          '/assets/img/telkomsel4.jpeg',
          '/assets/img/telkomsel5.jpeg',
        ],
        reportUrl: '/assets/report/Laporan_magang.pdf',
        reportLabel: 'Read Internship Technical Report (PDF)',
      },
    },
    {
      id: 2,
      indexStr: '02',
      title: 'Red Blood Cell Detection System',
      subtitle: 'Smartphone Microscopic Analysis via Optimized Multi-Template Matching',
      date: 'Aug – Dec 2024',
      location: 'Malang, Indonesia',
      description:
        'Resource-efficient mobile computer vision system that localizes and classifies microscopic blood cell categories on entry-level Android devices using deterministic template matching.',
      tags: ['Python', 'Kotlin', 'OpenCV', 'Template Matching', 'Mobile Vision', 'Academic Research'],
      category: 'Computer Vision & Mobile Systems',
      featured: true,
      metric: '4 Templates · 0.6 Corr Thresh',
      caseStudy: {
        about: [
          'A smartphone-based microscopic blood cell detection application designed to automate blood smear screening without demanding expensive laboratory workstation GPUs or cloud connectivity.',
          'Published as a full scientific paper in Jurnal Pengembangan Teknologi Informasi dan Ilmu Komputer (J-PTIIK).',
        ],
        background: [
          'Manual blood cell counting under light microscopes is labor-intensive and prone to human observer fatigue. Meanwhile, heavy deep neural network detectors typically exceed the memory and compute limits of entry-level smartphones in rural health clinics.',
          'Optimized multi-template matching provides a deterministic, low-latency detection pipeline with minimal compute overhead.',
        ],
        objectives: [
          'Develop a lightweight smartphone-compatible cell localization pipeline for peripheral blood smear images.',
          'Detect and classify neutrophils, lymphocytes, monocytes, and eosinophils.',
          'Empirically evaluate template bank dimensions and correlation thresholds to determine the optimal trade-off between recall and inference latency.',
          'Enable accessible point-of-care hematology diagnostics in resource-constrained environments.',
        ],
        methodology: [
          'Smear microphotographs are acquired, normalized in color space, and fed into the mobile detection engine.',
          'Curated morphological template matrices slide across candidate image regions, calculating normalized cross-correlation response maps.',
          'Peak response coordinates exceeding the 0.6 threshold are bounded, non-maximum suppressed, and counted per classification category.',
        ],
        challenge: [
          'Managing false positives stemming from stain variation, illumination non-uniformity, and overlapping erythrocyte boundaries on mobile CPUs.',
          'Resolved by systematic grid search benchmarking across threshold curves—demonstrating that a 4-template configuration at a 0.6 threshold yielded optimal accuracy-to-compute ratio.',
        ],
        images: [
          '/assets/img/mandiri/red-blood/rb1.jpeg',
          '/assets/img/mandiri/red-blood/rb2.jpeg',
          '/assets/img/mandiri/red-blood/rb3.jpeg',
          '/assets/img/mandiri/red-blood/rb4.jpeg',
          '/assets/img/mandiri/red-blood/template-matching.png',
        ],
        reportUrl: '/assets/report/J-PTIIK Paper_Denis Wahyu Rizqullah.pdf',
        reportLabel: 'Read Published J-PTIIK Paper (PDF)',
      },
    },
    {
      id: 3,
      indexStr: '03',
      title: 'Smart Plantation Weather Prediction',
      subtitle: 'Edge Artificial Neural Network Inference & MQTT Telemetry System',
      date: 'Aug – Nov 2024',
      location: 'Universitas Brawijaya, Malang',
      description:
        'Distributed edge IoT smart agriculture architecture coupling ESP8266 telemetry nodes with an on-device Artificial Neural Network (ANN) running locally on a Raspberry Pi 3B broker.',
      tags: ['Edge AI', 'Raspberry Pi 3B', 'Python', 'C++', 'ESP8266', 'MQTT Broker', 'ANN'],
      category: 'Edge AI & Distributed IoT',
      featured: true,
      metric: 'Zero Cloud · Real time Inference',
      caseStudy: {
        about: [
          'An integrated microclimate monitoring and irrigation management system that uses on-device neural network inference to classify impending weather conditions and automate soil hydration.',
        ],
        background: [
          'Fixed irrigation timers disregard impending rainstorms, leading to severe water waste and waterlogged root systems. In remote plantation zones, cloud-dependent AI systems fail during cellular dropouts.',
          'Deploying lightweight neural inference directly onto a localized edge gateway guarantees autonomous, uninterrupted decision-making.',
        ],
        objectives: [
          'Build an Artificial Neural Network (ANN) for short-term microclimate classification.',
          'Deploy the model onto a Raspberry Pi 3B serving concurrently as local MQTT broker and edge compute host.',
          'Stream continuous environmental telemetry (temperature, humidity, water levels) from distributed ESP8266 sensor nodes.',
          'Trigger automated solenoid irrigation valves based strictly on local edge predictions.',
        ],
        methodology: [
          'Remote ESP8266 nodes periodically poll DHT11 and soil moisture probes, publishing JSON payloads over lightweight MQTT topics.',
          'The Raspberry Pi edge broker ingests sensor vectors, applies moving-average noise filtering, and feeds the normalized inputs into the ANN classifier.',
          'Inference classifications immediately dictate whether to execute or suppress planned irrigation intervals.',
        ],
        challenge: [
          'Executing reliable continuous neural network inference within the constrained RAM and CPU budget of a Raspberry Pi 3B while juggling concurrent MQTT connections.',
          'Overcome by optimizing network topology, pruning redundant hidden layers, and introducing asynchronous I/O loops.',
        ],
        images: [
          '/assets/img/mandiri/weather-pred/comparative_analysis_dashboard.png',
          '/assets/img/mandiri/weather-pred/evaluation_dashboard.png',
        ],
      },
    },
    {
      id: 4,
      indexStr: '04',
      title: 'IoT Residential Fire & Gas Hazard Network',
      subtitle: 'Multi-House Real Time Emergency Telemetry over MQTT',
      date: 'Oct 2025',
      location: 'Malang, Indonesia',
      description:
        'Scalable residential telemetry network utilizing ESP8266 flame and gas sensor nodes with strict House-ID routing to alert security personnel with instant hazard localization.',
      tags: ['IoT Architecture', 'C++', 'ESP8266', 'MQTT Protocol', 'Emergency Telemetry'],
      category: 'IoT & Embedded Hardware',
      featured: false,
      metric: 'House ID Namespaced Routing',
      caseStudy: {
        about: [
          'A safety monitoring network engineered for residential clusters to detect pre-ignition combustible gas accumulation and open flame events before fires spread.',
        ],
        background: [
          'Traditional surveillance cameras only identify visible smoke after a fire has already broken out and cannot detect invisible gas leaks inside sealed homes.',
        ],
        objectives: [
          'Equip individual residential units with dedicated ESP8266 sensor nodes.',
          'Stream continuous hazard telemetry over QoS-configured MQTT topics.',
          'Route telemetry with deterministic house metadata for immediate physical dispatch.',
        ],
        methodology: [
          'Each household unit polls MQ-series gas and optical flame sensors via analog and digital GPIO.',
          'An anomaly triggers an immediate high-priority MQTT publish event tagged with the specific house unit identifier.',
          'Central guard monitoring dashboards trigger visual and audible alarms with exact street/unit coordinates.',
        ],
        challenge: [
          'Eliminating false alarms and packet collisions across multi-node concurrent broadcast scenarios.',
          'Solved via hysteresis thresholding in C++ firmware and strict topic namespacing.',
        ],
      },
    },
    {
      id: 5,
      indexStr: '05',
      title: 'ResNet-50 + ViT Hybrid Vision Architecture',
      subtitle: 'Convolutional Local Feature Extraction with Vision Transformer Attention',
      date: '2024',
      location: 'Malang, Indonesia',
      description:
        'Hybrid computer vision pipeline merging ResNet-50 spatial convolutional representations with Vision Transformer (ViT) global self-attention mechanisms for complex image classification tasks.',
      tags: ['Deep Learning', 'Python', 'TensorFlow', 'ResNet-50', 'Vision Transformer (ViT)', 'OpenCV'],
      category: 'Computer Vision & Machine Learning',
      featured: false,
      metric: 'Hybrid CNN Transformer',
      caseStudy: {
        about: [
          'An experimental computer vision architecture benchmark evaluating how combining local inductive bias from CNNs with global receptive fields from Vision Transformers improves complex classification performance.',
        ],
      },
    },
    {
      id: 6,
      indexStr: '06',
      title: 'Village SME Digital Presence & Export Catalog',
      subtitle: 'Web Platform & Digitalization Initiative — KKN Universitas Brawijaya',
      date: 'Jun – Jul 2023',
      location: 'Sumberkramat, Probolinggo',
      description:
        'End-to-end web catalog and digital presence engineered during a university community service initiative (KKN Universitas Brawijaya) in Sumberkramat Village, Probolinggo. Transformed an offline, word-of-mouth teak wood furniture craft business into an online showcase accessible to domestic and international prospective buyers.',
      tags: ['WordPress Architecture', 'cPanel & DNS', 'SSL/HTTPS', 'Field Photography', 'Product Digitization', 'Community Outreach'],
      category: 'Web Platform & Digitization',
      featured: false,
      metric: 'End-to-End SME Launch',
      caseStudy: {
        about: [
          'Initiated as part of Universitas Brawijaya\'s community service program (KKN) in Sumberkramat Village, Probolinggo, this project empowered local teak wood artisans (Narto Jati Furniture) to transition from traditional word-of-mouth marketing into the digital economy.',
          'By establishing an authenticated online catalog with high-fidelity workshop photography and structured product categories, the platform provided the rural workshop with its first credible online footprint for broader market outreach.',
        ],
        objectives: [
          'Overcome geographic and digital isolation by replacing conventional word of mouth promotion with an accessible web catalog.',
          'Deploy a secure, performant WordPress architecture configured on cPanel with custom DNS routing and HTTPS/SSL encryption.',
          'Photograph, curate, and catalog physical teak furniture products directly within rural workshop environments.',
          'Deliver pragmatic digital literacy training to help the SME owner navigate digital inquiries and communicate with remote buyers.',
        ],
        methodology: [
          'On Site Workshop Audit & Photography: Conducted field visits to capture high-resolution imagery of handcrafted teak tables, chairs, and custom furniture pieces amidst active woodworking processes.',
          'Web Architecture & Hosting Deployment: Set up cPanel hosting, mapped custom domain DNS records, installed automated SSL certificates, and configured a lightweight WordPress environment.',
          'Categorized Product Architecture: Structured products into modular galleries with detailed dimensions, timber specifications, and direct WhatsApp contact actions for seamless inquiry conversion.',
          'Owner Handover & Digital Enablement: Provided hands-on training on digital communication etiquette and catalog sharing to ensure self-sustained operational continuity.',
        ],
        challenge: [
          'Technical & Operational Bottleneck: Capturing clean product photography within a dusty, active sawmill workshop without studio lighting, paired with low initial digital literacy on the part of the artisan.',
          'Resolution: Executed natural light outdoor photo sessions with post-capture color correction and web-ready image compression. Simplified operational workflows into visual step by step guides, allowing the owner to easily share direct product URLs via mobile messaging.',
        ],
        images: [
          '/assets/img/mandiri/website-village/Screenshot_56.png',
          '/assets/img/mandiri/website-village/IMG_0965.jpg',
          '/assets/img/mandiri/website-village/IMG_20230705_135157.jpg',
          '/assets/img/mandiri/website-village/IMG_0993.jpg',
        ],
      },
    },
    {
      id: 7,
      indexStr: '07',
      title: 'Biometric Smart Home Access Lock',
      subtitle: 'Embedded Optical Fingerprint & Solenoid Control System',
      date: '2024',
      location: 'Malang, Indonesia',
      description:
        'Microcontroller-based door access control system implementing optical biometric template matching and fail-safe solenoid actuation written in bare-metal C++.',
      tags: ['Embedded Systems', 'C++', 'Biometrics', 'Microcontroller', 'Actuator Control'],
      category: 'IoT & Embedded Hardware',
      featured: false,
      metric: '<800ms Biometric Match',
      caseStudy: {
        about: [
          'An embedded physical access security prototype combining an optical fingerprint module with relay-driven 12V solenoid locking mechanisms.',
        ],
      },
    },
  ],

  ethos: [
    {
      indexStr: '01',
      title: 'BUILT TO WORK, NOT JUST IMPRESS',
      subtitle: 'Practical Engineering',
      narrative:
        'I focus on building software that holds up under daily use. Clean APIs, readable code, and thoughtful design matter far more to me than chasing trends or overengineering simple problems.',
    },
    {
      indexStr: '02',
      title: 'BRIDGING BOTH WORLDS',
      subtitle: 'Software Meets Hardware',
      narrative:
        'Working across embedded systems and modern web apps taught me to see the whole picture. I bridge low level hardware communication with responsive web and mobile interfaces that feel effortless to operate.',
    },
    {
      indexStr: '03',
      title: 'RESILIENT AT THE EDGE',
      subtitle: 'Fast & Independent',
      narrative:
        'Great tools should stay reliable even with limited resources or unstable networks. I lean on lightweight on device machine learning and local messaging protocols to keep systems responsive where it counts.',
    },
    {
      indexStr: '04',
      title: 'MEASURE, CALIBRATE, DOCUMENT',
      subtitle: 'Real World Accuracy',
      narrative:
        'Guesswork has no place in production systems. I validate every build through real benchmarks, hardware calibration, and clear documentation so teams can trust and maintain what gets shipped.',
    },
  ],

  experiences: [
    {
      id: 'exp-formulatrix',
      role: 'Junior Software Engineer Graduate Intern',
      organization: 'Formulatrix',
      period: 'Aug 2026 – Nov 2026',
      location: 'Salatiga, Indonesia',
      type: 'Graduate Engineering Internship',
      highlights: [
        'Developed and maintained internal production software using React.js, TypeScript, and ASP.NET Core Web API (.NET 10), integrating SignalR and RESTful endpoints for real-time status monitoring and reliable backend-to-firmware communication with Raspberry Pi 4.',
        'Designed and implemented a sharding space encoding algorithm in C#, reducing cross-machine code collision rates from 20.66% to 2.7% across dedicated production PCs.',
        'Engineered a semi-automated calibration tool in Python utilizing motor encoder pulse feedback to support hardware calibration and improve measurement accuracy in production processes.',
        'Created and maintained REST API documentation, feature changelogs, and user manuals, providing clear technical references for system usage, maintenance, and team collaboration.',
      ],
      tags: ['React.js', 'TypeScript', 'ASP.NET Core', 'C#', 'SignalR', 'Python', 'Raspberry Pi 4'],
    },
    {
      id: 'exp-telkomsel',
      role: 'Software and Hardware Developer Intern',
      organization: 'PT Telekomunikasi Selular (Telkomsel)',
      period: 'Feb 2024 – Jun 2024',
      location: 'Malang, Indonesia',
      type: 'Industry Engineering Internship (MSIB)',
      highlights: [
        'Engineered a wireless antenna azimuth orientation control prototype allowing field technicians to calibrate cellular antennas from ground level without scaling communication towers.',
        'Configured an ESP8266 NodeMCU microcontroller as an authenticated standalone WiFi access point serving an embedded control web interface over private IP.',
        'Interfaced a NEMA 17 stepper motor (200 steps/rev) with precision gear reduction to translate directional web inputs into high-torque angular rotation.',
        'Conducted on-site field validation to verify wireless session stability, step accuracy, and operational safety.',
      ],
      tags: ['C++', 'NodeMCU ESP8266', 'NEMA 17 Stepper', 'Embedded Web UI', 'Wireless Protocols'],
      reportUrl: '/assets/report/Laporan_magang.pdf',
      reportLabel: 'Internship Technical Report (PDF)',
    },
  ],

  skills: [
    {
      category: 'Engineering Domains',
      code: 'SYS_DOMAINS',
      description: 'Core architectural competencies across hardware-software boundaries.',
      items: [
        'IoT Architecture & Telemetry',
        'Embedded Firmware & Actuation',
        'Computer Vision & Image Processing',
        'Edge Machine Learning (ANN, ViT)',
        'Fullstack Web Applications',
        'Distributed MQTT Broker Systems',
      ],
    },
    {
      category: 'Programming Languages & Runtimes',
      code: 'LANG_RUNTIME',
      description: 'Primary languages for bare-metal firmware, neural pipelines, and user interfaces.',
      items: [
        'C / C++',
        'Python',
        'TypeScript / JavaScript',
        'Kotlin (Android)',
        'HTML5 & Modern CSS',
        'SQL',
      ],
    },
    {
      category: 'Hardware, Toolchains & Infrastructure',
      code: 'INFRA_TOOLS',
      description: 'Microcontrollers, sensors, computing modules, and engineering tools.',
      items: [
        'ESP8266 / NodeMCU',
        'Raspberry Pi 3B',
        'NEMA 17 Steppers & Motor Drivers',
        'MQTT Broker & Client',
        'OpenCV & TensorFlow / Keras',
        'Git & GitHub',
        'Linux / Bash',
        'Arduino IDE & PlatformIO',
      ],
    },
  ],
};
