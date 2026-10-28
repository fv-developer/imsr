export interface StreamItem {
  id: number;
  num: string;
  yearLabel: string;
  title: string;
  quote: string;
  description: string;
  learnBadges: string[];
  keyOutcomes: string[];
  coreSubjects?: string;
}

// 1. Marketing Management Curriculum (BBA & B.Com)
export const MARKETING_MANAGEMENT_STREAMS: StreamItem[] = [
  {
    id: 1,
    num: "01",
    yearLabel: "YEAR 1 / SEMESTER 1",
    title: "Marketing Fundamentals & Business Foundations",
    quote: "Build a strong foundation in marketing, management, economics, and communication while developing essential professional and entrepreneurial skills.",
    description: "Understand marketing principles, human resource management, economics, international sports management, business mathematics, statistics, IT, and professional communication.",
    learnBadges: [
      "Marketing",
      "Management",
      "Economics",
      "Business Mathematics",
    ],
    keyOutcomes: [
      "Understand marketing principles, management practices, and economic concepts.",
      "Develop analytical, mathematical, and IT skills for business applications.",
      "Build communication, professional, and entrepreneurial skills.",
    ],
  },
  {
    id: 2,
    num: "02",
    yearLabel: "YEAR 1 / SEMESTER 2",
    title: "Marketing Mix & Digital Business",
    quote: "Explore modern marketing strategies, digital business tools, and global business environments to understand how organisations create value.",
    description: "Learn marketing mix, e-marketing, advertising, international sports management, Indian economy, business mathematics, data and artificial intelligence, and workplace communication.",
    learnBadges: [
      "Marketing Mix",
      "E-Marketing",
      "Advertising",
      "Data & AI",
    ],
    keyOutcomes: [
      "Understand marketing mix strategies and digital marketing fundamentals.",
      "Analyse global and Indian business environments.",
      "Apply data, AI, and financial literacy concepts to business decisions.",
    ],
  },
  {
    id: 3,
    num: "03",
    yearLabel: "YEAR 2 / SEMESTER 3",
    title: "Business Economics & Corporate Management",
    quote: "Develop an understanding of business economics, corporate communication, and quantitative analysis to make informed business decisions.",
    description: "Explore business economics, brand management, management concepts, corporate communication, public relations, quantitative techniques, research methods, Hindi, and field-based learning.",
    learnBadges: [
      "Business Economics",
      "Brand Management",
      "Corporate Communication",
      "Quantitative Techniques",
    ],
    keyOutcomes: [
      "Apply economic and management concepts to business situations.",
      "Develop brand communication and public relations skills.",
      "Use quantitative techniques and research methods for analysis.",
    ],
  },
  {
    id: 4,
    num: "04",
    yearLabel: "YEAR 2 / SEMESTER 4",
    title: "Business Law & Digital Marketing",
    quote: "Understand business regulations, digital marketing strategies, and supply chain operations while developing community engagement and professional skills.",
    description: "Study business law, rural marketing, logistics and supply chain management, corporate communication, quantitative techniques, digital marketing, and community engagement.",
    learnBadges: [
      "Business Law",
      "Rural Marketing",
      "Supply Chain Management",
      "Digital Marketing",
    ],
    keyOutcomes: [
      "Understand legal principles and their application in business.",
      "Apply digital and rural marketing strategies to different markets.",
      "Develop knowledge of logistics, supply chains, and community engagement.",
    ],
  },
  {
    id: 5,
    num: "05",
    yearLabel: "YEAR 3 / SEMESTER 5",
    title: "Consumer Behaviour & Marketing Innovation",
    quote: "Understand consumer psychology, explore marketing automation, and develop innovative strategies for customer engagement and business growth.",
    description: "Explore new dimensions in marketing, marketing automation, consumer behaviour, industrial marketing, sales and distribution management, entrepreneurship development, and career readiness.",
    learnBadges: [
      "Consumer Behaviour",
      "Marketing Automation",
      "Industrial Marketing",
      "Sales & Distribution",
    ],
    keyOutcomes: [
      "Analyse consumer preferences and purchasing behaviour.",
      "Understand marketing automation and industrial marketing strategies.",
      "Develop sales, distribution, and entrepreneurial skills.",
    ],
  },
  {
    id: 6,
    num: "06",
    yearLabel: "YEAR 3 / SEMESTER 6",
    title: "Marketing Strategy & Brand Development",
    quote: "Build expertise in brand creation, marketing research, retail management, and strategic marketing through practical business applications.",
    description: "Learn creative approaches to marketing and branding, marketing for non-profit organisations, events and experiential marketing, marketing research, retail management, strategic marketing, and internship-based learning.",
    learnBadges: [
      "Marketing & Branding",
      "Marketing Research",
      "Retail Management",
      "Strategic Marketing",
    ],
    keyOutcomes: [
      "Develop creative marketing and brand-building strategies.",
      "Apply research methods to understand markets and consumer needs.",
      "Understand retail operations, strategic marketing, and experiential marketing.",
    ],
  },
  {
    id: 7,
    num: "07",
    yearLabel: "YEAR 4 / SEMESTER 7",
    title: "Integrated Marketing & Campaign Management",
    quote: "Explore integrated marketing, media planning, and creative campaign development while building skills in strategic communication and research.",
    description: "Study artificial intelligence in marketing, media planning and buying, service marketing, production and material management, creativity and campaign planning, total quality management, and research methodology.",
    learnBadges: [
      "AI in Marketing",
      "Media Planning",
      "Service Marketing",
      "Campaign Planning",
    ],
    keyOutcomes: [
      "Understand the role of AI in modern marketing practices.",
      "Develop media planning, buying, and campaign management skills.",
      "Apply research and quality management principles to marketing projects.",
    ],
  },
  {
    id: 8,
    num: "08",
    yearLabel: "YEAR 4 / SEMESTER 8",
    title: "International Business & Marketing Analytics",
    quote: "Develop a strategic understanding of international business, integrated marketing communications, and financial markets while preparing for professional practice.",
    description: "Explore international business, business analytics, integrated marketing communications, customer relationship management, intellectual property rights, financial markets and institutions, and internship-based learning.",
    learnBadges: [
      "International Business",
      "Business Analytics",
      "Integrated Marketing Communications",
      "Customer Relationship Management",
    ],
    keyOutcomes: [
      "Analyse international business environments and business performance.",
      "Develop integrated marketing communication and customer relationship strategies.",
      "Understand intellectual property, financial markets, and professional business practices.",
    ],
  },
];

// 2. Entrepreneurship Curriculum (BBA & B.Com)
export const ENTREPRENEURSHIP_STREAMS: StreamItem[] = [
  {
    id: 1,
    num: "01",
    yearLabel: "YEAR 1 / SEMESTER 1",
    title: "Accounting Fundamentals & Business Foundations",
    quote: "Build a strong foundation in accounting, finance, management, and economics while developing essential business and entrepreneurial skills.",
    description: "Understand accounting and finance, management principles, economics, international sports management, business mathematics, statistics, IT, and entrepreneurial development.",
    learnBadges: [
      "Accounting & Finance",
      "Management",
      "Economics",
      "Entrepreneurship",
    ],
    keyOutcomes: [
      "Understand accounting principles, financial concepts, and management fundamentals.",
      "Apply economic and mathematical concepts to business situations.",
      "Develop entrepreneurial thinking, communication, and professional skills.",
    ],
  },
  {
    id: 2,
    num: "02",
    yearLabel: "YEAR 1 / SEMESTER 2",
    title: "Cost Accounting & Business Analytics",
    quote: "Develop financial understanding and analytical skills while exploring human resource management, digital technologies, and business operations.",
    description: "Explore cost accounting, human resource management, principles of management, international sports management, Indian economy, business mathematics, data and artificial intelligence, and business development.",
    learnBadges: [
      "Cost Accounting",
      "Human Resource Management",
      "Business Mathematics",
      "Data & AI",
    ],
    keyOutcomes: [
      "Understand cost accounting and its role in financial decision-making.",
      "Analyse business and economic environments using quantitative concepts.",
      "Apply digital tools, AI fundamentals, and entrepreneurial skills to business activities.",
    ],
  },
  {
    id: 3,
    num: "03",
    yearLabel: "YEAR 2 / SEMESTER 3",
    title: "Entrepreneurship & Financial Management",
    quote: "Explore venture creation, direct and indirect taxation, and business economics while developing analytical and management capabilities.",
    description: "Learn startup and new venture management, direct and indirect taxation, business economics, corporate communication, public relations, quantitative techniques, spreadsheet analysis, and research fundamentals.",
    learnBadges: [
      "Entrepreneurship",
      "Taxation",
      "Business Economics",
      "Spreadsheet Analysis",
    ],
    keyOutcomes: [
      "Understand the process of establishing and managing new ventures.",
      "Develop knowledge of taxation and business economics.",
      "Apply spreadsheet tools, quantitative techniques, and research methods to business problems.",
    ],
  },
  {
    id: 4,
    num: "04",
    yearLabel: "YEAR 2 / SEMESTER 4",
    title: "Family Business & Business Law",
    quote: "Understand family business operations, legal frameworks, and management practices while developing digital and community engagement skills.",
    description: "Explore family business management, business law, management accounting, corporate communication, public relations, quantitative techniques, digital marketing, and community engagement.",
    learnBadges: [
      "Family Business Management",
      "Business Law",
      "Management Accounting",
      "Digital Marketing",
    ],
    keyOutcomes: [
      "Understand family business structures and management practices.",
      "Apply legal and accounting concepts to business decision-making.",
      "Develop digital marketing, communication, and community engagement skills.",
    ],
  },
  {
    id: 5,
    num: "05",
    yearLabel: "YEAR 3 / SEMESTER 5",
    title: "Strategic Management & Business Development",
    quote: "Build strategic thinking and business development capabilities while exploring industrial relations, marketing, advertising, and entrepreneurship.",
    description: "Study strategic management, industrial relations, creative marketing and branding, advertising management, entrepreneurship development, commerce in business, and career readiness.",
    learnBadges: [
      "Strategic Management",
      "Industrial Relations",
      "Marketing & Branding",
      "Advertising Management",
    ],
    keyOutcomes: [
      "Understand strategic planning and organisational management.",
      "Develop creative marketing, branding, and advertising strategies.",
      "Apply entrepreneurship and business development concepts to practical situations.",
    ],
  },
  {
    id: 6,
    num: "06",
    yearLabel: "YEAR 3 / SEMESTER 6",
    title: "Business Planning & Entrepreneurial Finance",
    quote: "Develop expertise in business planning, entrepreneurial finance, and international business while understanding social impact and organisational growth.",
    description: "Explore social entrepreneurship and non-profit organisation management, entrepreneurial finance and funding, business tax planning, international business, entrepreneurial orientation, and internship-based learning.",
    learnBadges: [
      "Entrepreneurial Finance",
      "Business Tax Planning",
      "International Business",
      "Social Entrepreneurship",
    ],
    keyOutcomes: [
      "Understand funding options and financial planning for entrepreneurial ventures.",
      "Apply tax planning and international business concepts.",
      "Evaluate social entrepreneurship opportunities and develop practical business skills.",
    ],
  },
  {
    id: 7,
    num: "07",
    yearLabel: "YEAR 4 / SEMESTER 7",
    title: "Enterprise Resource Planning & Business Innovation",
    quote: "Explore enterprise resource planning, financial services, and business innovation while developing digital marketing and research capabilities.",
    description: "Learn enterprise resource planning, change and innovation management, financial services and institutional support, design thinking, digital business and growth marketing, marketing channels, and research methodology.",
    learnBadges: [
      "Enterprise Resource Planning",
      "Innovation Management",
      "Financial Services",
      "Digital Business & Growth Marketing",
    ],
    keyOutcomes: [
      "Understand enterprise resource planning and business process integration.",
      "Apply innovation management and design thinking to business challenges.",
      "Explore financial services, digital marketing, and research methodologies.",
    ],
  },
  {
    id: 8,
    num: "08",
    yearLabel: "YEAR 4 / SEMESTER 8",
    title: "Business Analytics & Financial Strategy",
    quote: "Develop advanced business and financial understanding while exploring AI-powered analytics, international property rights, and strategic decision-making.",
    description: "Study micro, small and medium enterprise management, technology and analytical use of AI, financial statement analysis, intellectual property rights, enterprise risk management, decision science, and internship-based learning.",
    learnBadges: [
      "MSME Management",
      "AI & Business Analytics",
      "Financial Statement Analysis",
      "Enterprise Risk Management",
    ],
    keyOutcomes: [
      "Understand MSME operations and the role of technology in business.",
      "Analyse financial statements and apply data-driven decision-making techniques.",
      "Evaluate enterprise risks and understand intellectual property rights and decision science.",
    ],
  },
];

// 3. Business Administration Curriculum (BBA & B.Com)
export const BUSINESS_ADMINISTRATION_STREAMS: StreamItem[] = [
  {
    id: 1,
    num: "01",
    yearLabel: "YEAR 1 / SEMESTER 1",
    title: "Accounting & Financial Foundations",
    quote: "Build a strong foundation in accounting, finance, management, and economics while developing essential analytical and professional skills.",
    description: "Understand accounting and finance, management principles, economics, international sports management, business mathematics, statistics, IT, and professional communication.",
    learnBadges: [
      "Accounting & Finance",
      "Management",
      "Economics",
      "Business Mathematics",
    ],
    keyOutcomes: [
      "Understand accounting principles, financial concepts, and management fundamentals.",
      "Apply economic and mathematical concepts to business situations.",
      "Develop analytical, communication, and professional skills.",
    ],
  },
  {
    id: 2,
    num: "02",
    yearLabel: "YEAR 1 / SEMESTER 2",
    title: "Marketing & Human Resource Management",
    quote: "Explore marketing strategies, human resource management, and management accounting while developing digital and analytical capabilities.",
    description: "Learn marketing principles, human resource management, management accounting, international sports management, Indian economy, business mathematics, data and artificial intelligence, and negotiation skills.",
    learnBadges: [
      "Marketing",
      "Human Resource Management",
      "Management Accounting",
      "Data & AI",
    ],
    keyOutcomes: [
      "Understand marketing principles and human resource management practices.",
      "Apply accounting and economic concepts to business decisions.",
      "Develop data analysis, negotiation, and professional communication skills.",
    ],
  },
  {
    id: 3,
    num: "03",
    yearLabel: "YEAR 2 / SEMESTER 3",
    title: "Taxation & Business Economics",
    quote: "Understand taxation, microeconomics, and marketing fundamentals while developing quantitative analysis and spreadsheet skills.",
    description: "Explore marketing mix, direct and indirect taxation, microeconomics, corporate communication, public relations, quantitative techniques, spreadsheet analysis, and field-based learning.",
    learnBadges: [
      "Marketing Mix",
      "Taxation",
      "Microeconomics",
      "Spreadsheet Analysis",
    ],
    keyOutcomes: [
      "Understand direct and indirect taxation and their business implications.",
      "Analyse microeconomic concepts and marketing strategies.",
      "Apply quantitative techniques and spreadsheets to business problems.",
    ],
  },
  {
    id: 4,
    num: "04",
    yearLabel: "YEAR 2 / SEMESTER 4",
    title: "Financial Management & Digital Marketing",
    quote: "Develop financial management capabilities while exploring macroeconomics, corporate communication, and digital marketing strategies.",
    description: "Study financial management, training and development, macroeconomics, corporate communication, public relations, quantitative techniques, digital marketing, and community engagement.",
    learnBadges: [
      "Financial Management",
      "Training & Development",
      "Macroeconomics",
      "Digital Marketing",
    ],
    keyOutcomes: [
      "Understand financial management and economic principles.",
      "Develop knowledge of employee training and organisational communication.",
      "Apply digital marketing and quantitative techniques to business scenarios.",
    ],
  },
  {
    id: 5,
    num: "05",
    yearLabel: "YEAR 3 / SEMESTER 5",
    title: "Strategic Management & Business Operations",
    quote: "Build strategic thinking and operational management skills while exploring international business, consumer behaviour, and labour relations.",
    description: "Learn strategic management, operations research and management, international business, industrial relations and labour laws, consumer behaviour, entrepreneurship development, and career readiness.",
    learnBadges: [
      "Strategic Management",
      "Operations Research",
      "International Business",
      "Consumer Behaviour",
    ],
    keyOutcomes: [
      "Understand strategic planning and operational decision-making.",
      "Analyse international business environments and consumer behaviour.",
      "Apply labour law and entrepreneurship concepts to practical business situations.",
    ],
  },
  {
    id: 6,
    num: "06",
    yearLabel: "YEAR 3 / SEMESTER 6",
    title: "Wealth Management & Business Development",
    quote: "Explore wealth planning, financial decision-making, and business development while understanding logistics, regulatory frameworks, and international marketing.",
    description: "Study wealth management and financial planning, decision science, business development and networking, logistics and supply chain management, business regulatory frameworks, international marketing, and internship-based learning.",
    learnBadges: [
      "Wealth Management",
      "Decision Science",
      "Supply Chain Management",
      "International Marketing",
    ],
    keyOutcomes: [
      "Understand financial planning and wealth management principles.",
      "Apply decision science and networking skills to business development.",
      "Explore supply chain operations, regulatory frameworks, and international marketing.",
    ],
  },
  {
    id: 7,
    num: "07",
    yearLabel: "YEAR 4 / SEMESTER 7",
    title: "Financial Systems & Risk Management",
    quote: "Develop an understanding of financial systems, investment analysis, and risk management while strengthening business analytics and research skills.",
    description: "Explore the Indian financial system, investment analysis and portfolio management, business law, data analytics, derivatives and risk management, total quality management, and research methodology.",
    learnBadges: [
      "Financial Systems",
      "Portfolio Management",
      "Data Analytics",
      "Risk Management",
    ],
    keyOutcomes: [
      "Understand the Indian financial system and investment management principles.",
      "Apply data analytics to financial and business decision-making.",
      "Analyse derivatives, financial risks, and quality management practices.",
    ],
  },
  {
    id: 8,
    num: "08",
    yearLabel: "YEAR 4 / SEMESTER 8",
    title: "Financial Analysis & Digital Finance",
    quote: "Build advanced analytical capabilities while exploring financial statement modelling, service marketing, e-commerce, and emerging digital financial technologies.",
    description: "Study financial statement analysis and financial modelling, service marketing, e-commerce, fintech, digital currency, and internship-based learning.",
    learnBadges: [
      "Financial Statement Analysis",
      "Financial Modelling",
      "E-Commerce",
      "Fintech & Digital Currency",
    ],
    keyOutcomes: [
      "Analyse financial statements and develop financial modelling skills.",
      "Understand service marketing, e-commerce, and digital financial technologies.",
      "Explore fintech, digital currencies, and practical applications through internship experience.",
    ],
  },
];

// 4. Artificial Intelligence Curriculum (BBA & B.Com)
export const ARTIFICIAL_INTELLIGENCE_STREAMS: StreamItem[] = [
  {
    id: 1,
    num: "01",
    yearLabel: "YEAR 1 / SEMESTER 1",
    title: "Management Foundations & Business Analytics",
    quote: "Build a strong foundation in management, business economics, and quantitative analysis while developing entrepreneurial and professional skills.",
    description: "Understand management and organisational behaviour, microeconomics for business decisions, business mathematics and statistics, quantitative methods, entrepreneurship, tourism, professional development, business communication, sustainability, and foundational AI concepts.",
    learnBadges: [
      "Management",
      "Business Economics",
      "Business Analytics",
      "Entrepreneurship",
    ],
    keyOutcomes: [
      "Understand management principles and economic concepts for business decisions.",
      "Apply quantitative methods, statistics, and AI fundamentals to business problems.",
      "Develop entrepreneurial thinking, communication, and professional skills.",
    ],
  },
  {
    id: 2,
    num: "02",
    yearLabel: "YEAR 1 / SEMESTER 2",
    title: "Financial Accounting & Digital Business",
    quote: "Explore financial accounting, global business environments, and emerging technologies while developing analytical, entrepreneurial, and innovation-driven capabilities.",
    description: "Learn financial management and accounting, applied AI, macroeconomics, global business environments, database management and SQL, psychology, international sports management, tourism, design thinking, business analytics, and responsible innovation.",
    learnBadges: [
      "Financial Accounting",
      "Global Business",
      "Database Management",
      "AI & Innovation",
    ],
    keyOutcomes: [
      "Understand financial accounting and global business environments.",
      "Apply databases, SQL, and data visualisation to business challenges.",
      "Develop design thinking, entrepreneurial, and responsible innovation skills.",
    ],
  },
  {
    id: 3,
    num: "03",
    yearLabel: "YEAR 2 / SEMESTER 3",
    title: "AI Marketing & Business Automation",
    quote: "Explore AI-powered marketing, business automation, and data-driven decision-making while understanding customer relationships and emerging technologies.",
    description: "Study algorithmic marketing and growth hacking, automated operations and AI workflows, machine learning for business, business law and data privacy, event management, customer relationship management, system design, and community building.",
    learnBadges: [
      "AI Marketing",
      "Business Automation",
      "Machine Learning",
      "Customer Relationship Management",
    ],
    keyOutcomes: [
      "Understand AI-driven marketing and growth strategies.",
      "Explore machine learning and automation for business operations.",
      "Apply customer relationship management and data privacy concepts to business situations.",
    ],
  },
  {
    id: 4,
    num: "04",
    yearLabel: "YEAR 2 / SEMESTER 4",
    title: "Strategic Management & Predictive Analytics",
    quote: "Develop strategic leadership and analytical capabilities while exploring financial operations, international business, and generative AI.",
    description: "Learn strategic management, innovation management and scaling, predictive analytics and machine learning applications, corporate finance, international sports management, international analytics, and generative AI.",
    learnBadges: [
      "Strategic Management",
      "Predictive Analytics",
      "Corporate Finance",
      "Generative AI",
    ],
    keyOutcomes: [
      "Understand strategic planning, innovation, and business growth.",
      "Apply predictive analytics and machine learning to business decisions.",
      "Explore corporate finance, international business, and generative AI applications.",
    ],
  },
  {
    id: 5,
    num: "05",
    yearLabel: "YEAR 3 / SEMESTER 5",
    title: "Entrepreneurial Finance & Applied Technology",
    quote: "Build entrepreneurial and financial expertise while exploring fintech, AI, cloud computing, and emerging digital business opportunities.",
    description: "Study applied economics, entrepreneurship, specialisation tracks in fintech, growth engineering, AI product leadership and digital commerce, cloud computing, AI operations, career readiness, research, and project-based learning.",
    learnBadges: [
      "Entrepreneurial Finance",
      "Fintech",
      "AI & Digital Commerce",
      "Cloud Computing",
    ],
    keyOutcomes: [
      "Understand entrepreneurial finance and applied economic principles.",
      "Explore fintech, AI product development, and digital commerce opportunities.",
      "Develop practical technology, research, and professional skills through projects.",
    ],
  },
  {
    id: 6,
    num: "06",
    yearLabel: "YEAR 3 / SEMESTER 6",
    title: "Global Business Strategy & Emerging Technologies",
    quote: "Develop a global business perspective while exploring emerging technologies, digital transformation, and specialised career pathways.",
    description: "Learn global business strategy, emerging technologies, digital transformation and business intelligence, entrepreneurship, specialised technology tracks, research methods for business, and capstone projects.",
    learnBadges: [
      "Global Business Strategy",
      "Emerging Technologies",
      "Business Intelligence",
      "Entrepreneurship",
    ],
    keyOutcomes: [
      "Understand global business strategies and technology-driven transformation.",
      "Apply business intelligence and emerging technologies to practical challenges.",
      "Develop specialised expertise through research and capstone projects.",
    ],
  },
  {
    id: 7,
    num: "07",
    yearLabel: "YEAR 4 / SEMESTER 7",
    title: "Advanced AI Strategy & Digital Innovation",
    quote: "Explore advanced AI strategy, industry-led innovation, and digital technologies while developing leadership and research capabilities.",
    description: "Study advanced AI strategy for business leaders, industry immersion, live consulting projects, conferences and seminars, leadership ethics and corporate governance, entrepreneurship, digital currency, and research.",
    learnBadges: [
      "Advanced AI Strategy",
      "Industry Immersion",
      "Corporate Governance",
      "Digital Currency",
    ],
    keyOutcomes: [
      "Evaluate advanced AI strategies for business leadership.",
      "Apply knowledge through industry immersion and live consulting projects.",
      "Understand corporate governance, ethical leadership, and emerging digital technologies.",
    ],
  },
  {
    id: 8,
    num: "08",
    yearLabel: "YEAR 4 / SEMESTER 8",
    title: "Venture Launch & Business Transformation",
    quote: "Transform innovative ideas into scalable ventures while exploring startup leadership, business growth, and financial innovation.",
    description: "Explore the evolving tech landscape, dissertation and venture launch, building startups and processes, applied venture research and development, venture financing and investor relations, and startup legal and IP compliance.",
    learnBadges: [
      "Venture Launch",
      "Startup Strategy",
      "Venture Financing",
      "Legal & IP Compliance",
    ],
    keyOutcomes: [
      "Develop and evaluate startup ideas and venture launch strategies.",
      "Understand venture financing, investor relations, and business growth.",
      "Apply research, legal compliance, and intellectual property principles to entrepreneurial ventures.",
    ],
  },
];

// 5. B.Sc (Hons.) in Digital Media & Growth Marketing (6 Semesters / 3 Years)
export const BSC_DIGITAL_MEDIA_STREAMS: StreamItem[] = [
  {
    id: 1,
    num: "01",
    yearLabel: "YEAR 1 / SEMESTER 1",
    title: "Digital Media & Marketing Foundations",
    quote: "Build a strong foundation in digital media, marketing principles, visual communication, and professional skills.",
    description: "Understand digital media, marketing fundamentals, accounting, human resource management, visual communication, managerial skills, and environmental and cultural studies.",
    learnBadges: [
      "Digital Media",
      "Marketing",
      "Visual Communication",
      "Business Skills",
    ],
    keyOutcomes: [
      "Understand digital media and core marketing principles.",
      "Develop visual communication and professional skills.",
      "Apply foundational business knowledge to digital projects.",
    ],
    coreSubjects: "Core subjects include Introduction to Digital Media, Principles of Marketing, Visual Communication, and Foundation of Managerial Skills.",
  },
  {
    id: 2,
    num: "02",
    yearLabel: "YEAR 1 / SEMESTER 2",
    title: "Integrated Marketing & Digital Communication",
    quote: "Create compelling brand communication, understand search marketing, and use multimedia storytelling to connect with audiences.",
    description: "Explore integrated marketing communication, SEO and SEM, advertising and branding, corporate finance, organisational behaviour, copywriting, multimedia storytelling, data and AI.",
    learnBadges: [
      "SEO & SEM",
      "Branding",
      "Copywriting",
      "Artificial Intelligence",
    ],
    keyOutcomes: [
      "Develop integrated marketing and brand communication strategies.",
      "Understand search engine optimisation and paid search marketing.",
      "Create engaging copy and multimedia content for digital platforms.",
    ],
    coreSubjects: "Core subjects include Integrated Marketing Communication, Introduction to SEO and SEM, Advertising & Branding, and Copywriting and Multimedia Storytelling.",
  },
  {
    id: 3,
    num: "03",
    yearLabel: "YEAR 2 / SEMESTER 3",
    title: "Social Media & Digital Campaign Management",
    quote: "Manage social media campaigns, strengthen digital sales, and build customer relationships through creative and strategic communication.",
    description: "Study social media marketing, campaign management, e-commerce, digital sales, digital PR, corporate communication, consumer behaviour, design thinking, and field projects.",
    learnBadges: [
      "Social Media",
      "E-Commerce",
      "Digital PR",
      "Campaign Management",
    ],
    keyOutcomes: [
      "Plan and manage social media campaigns.",
      "Understand digital sales and e-commerce strategies.",
      "Apply consumer insights and design thinking to marketing projects.",
    ],
    coreSubjects: "Core subjects include Social Media Marketing & Campaign Management, E-commerce & Digital Sales, Digital PR and Corporate Communication, and Design Thinking & Innovation.",
  },
  {
    id: 4,
    num: "04",
    yearLabel: "YEAR 2 / SEMESTER 4",
    title: "Predictive Analytics & Media Planning",
    quote: "Use data-driven insights, strategic media planning, and user-focused design to improve marketing performance.",
    description: "Explore predictive analytics in marketing, media planning and buying, legal aspects, cybersecurity, managerial economics, graphic design, user experience, and business communication.",
    learnBadges: [
      "Marketing Analytics",
      "Media Buying",
      "Graphic Design",
      "UX Design",
    ],
    keyOutcomes: [
      "Interpret marketing data to identify trends and opportunities.",
      "Plan media investments and campaign placements.",
      "Apply graphic design and user experience principles to digital communication.",
    ],
    coreSubjects: "Core subjects include Predictive Analytics in Marketing, Media Planning & Buying, Legal Aspects & Cyber Security, and Graphic Design & User Experience.",
  },
  {
    id: 5,
    num: "05",
    yearLabel: "YEAR 3 / SEMESTER 5",
    title: "Performance Marketing & Advanced SEO",
    quote: "Optimise digital campaigns, strengthen content strategies, and use marketing research to improve customer acquisition and engagement.",
    description: "Develop expertise in advanced SEO, content strategy, performance marketing, customer relationship management, marketing research, and virtual and augmented reality applications.",
    learnBadges: [
      "Advanced SEO",
      "Performance Marketing",
      "Marketing Research",
      "CRM",
    ],
    keyOutcomes: [
      "Develop advanced SEO and content marketing strategies.",
      "Evaluate campaign performance and marketing effectiveness.",
      "Use research and customer relationship management to improve marketing decisions.",
    ],
    coreSubjects: "Core subjects include Advanced SEO & Content Strategy, Performance Marketing, Marketing Research, and Virtual and Augmented Reality Applications.",
  },
  {
    id: 6,
    num: "06",
    yearLabel: "YEAR 3 / SEMESTER 6",
    title: "Strategic Digital Marketing & Growth Analytics",
    quote: "Build integrated digital strategies, analyse business performance, and deliver measurable growth through data-driven marketing.",
    description: "Explore strategic digital marketing, digital business analytics, decision science, global digital media trends, podcasting, advanced audio production, and a capstone project.",
    learnBadges: [
      "Digital Strategy",
      "Business Analytics",
      "Decision Science",
      "Audio Production",
    ],
    keyOutcomes: [
      "Develop strategic digital marketing plans.",
      "Apply analytics and decision science to growth opportunities.",
      "Produce digital audio content and demonstrate learning through a capstone project.",
    ],
  },
];

// 6. Diploma in Digital Media and Growth Marketing (2 Semesters / 1 Year)
export const DIPLOMA_DIGITAL_MEDIA_STREAMS: StreamItem[] = [
  {
    id: 1,
    num: "01",
    yearLabel: "YEAR 1 / SEMESTER 1",
    title: "Digital Marketing & Media Planning",
    quote: "Build digital marketing strategies, create engaging content, and plan media campaigns to strengthen online brand presence.",
    description: "Learn digital marketing fundamentals, media planning and buying, social media marketing, search engine optimisation, creative digital writing, global digital media trends, and capstone project development.",
    learnBadges: [
      "Digital Marketing",
      "Social Media",
      "SEO",
      "Media Planning",
    ],
    keyOutcomes: [
      "Develop digital marketing and social media strategies.",
      "Plan media campaigns and optimise search visibility.",
      "Create compelling digital content aligned with market trends.",
    ],
  },
  {
    id: 2,
    num: "02",
    yearLabel: "YEAR 1 / SEMESTER 2",
    title: "Performance Marketing & Customer Engagement",
    quote: "Optimise search campaigns, develop content strategies, and improve customer engagement through data-driven digital experiences.",
    description: "Explore search engine marketing, content strategy, website planning and development, consumer behaviour, customer relationship management, online reputation management, design thinking, and capstone projects.",
    learnBadges: [
      "SEM",
      "Content Strategy",
      "Customer Engagement",
      "ORM",
    ],
    keyOutcomes: [
      "Plan search engine marketing campaigns and content strategies.",
      "Understand customer behaviour and relationship management.",
      "Manage online reputation and develop user-focused digital experiences.",
    ],
  },
];

// Mapping helper to return the curriculum for any given program slug
export function getCurriculumForProgram(slug: string): StreamItem[] {
  switch (slug) {
    case "bba-in-business-administration-marketing-management":
    case "bcom-in-business-administration-marketing-management":
    case "bba-marketing-management":
    case "bcom-marketing-management":
      return MARKETING_MANAGEMENT_STREAMS;

    case "bba-in-business-administration-entrepreneurship":
    case "bcom-in-business-administration-entrepreneurship":
    case "bba-entrepreneurship":
    case "bcom-entrepreneurship":
      return ENTREPRENEURSHIP_STREAMS;

    case "bba-in-business-administration":
    case "bcom-in-business-administration":
    case "bba-business-administration":
    case "bcom-business-administration":
      return BUSINESS_ADMINISTRATION_STREAMS;

    case "bba-in-artificial-intelligence":
    case "bcom-in-business-administration-artificial-intelligence":
    case "bba-artificial-intelligence":
    case "bcom-artificial-intelligence":
      return ARTIFICIAL_INTELLIGENCE_STREAMS;

    case "bsc-in-digital-media-growth-marketing":
    case "bsc-digital-media-growth-marketing":
      return BSC_DIGITAL_MEDIA_STREAMS;

    case "diploma-in-digital-media-and-growth-marketing":
    case "diploma-in-digital-media-growth-marketing":
    case "diploma-digital-media-growth-marketing":
      return DIPLOMA_DIGITAL_MEDIA_STREAMS;

    default:
      return BUSINESS_ADMINISTRATION_STREAMS;
  }
}
