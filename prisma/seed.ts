import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.projectTechnology.deleteMany()
  await prisma.project.deleteMany()
  await prisma.technology.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.education.deleteMany()
  await prisma.research.deleteMany()

  const techNames = [
    'Python', 'Flask', 'FastAPI', 'React.js', 'React Native', 'Node.js', 
    'Express.js', 'Next.js', 'PostgreSQL', 'Prisma', 'MongoDB', 'SQL', 
    'VectorDB', 'TypeScript', 'JavaScript', 'Pandas', 'NumPy', 'Scikit-learn', 
    'PyTorch', 'CNN', 'LLAMA 3.1', 'Stripe', 'AWS S3', 'Mailchimp', 'AdPlugg'
  ]

  const createdTechs: Record<string, string> = {}
  for (const name of techNames) {
    const tech = await prisma.technology.create({
      data: { name, category: 'Core' }
    })
    createdTechs[name] = tech.id
  }

  const projectsData = [
    {
      title: 'EDUVENTS',
      slug: 'eduvents',
      shortDescription: 'Educational Events Marketplace connecting organizers with educators.',
      description: 'A specialized educational events marketplace connecting event organizers with educators. Includes event submission, administrative approval, payments, event discovery, organizer accounts, site users, advertising integration, email marketing, and event lifecycle automation.',
      year: '2026',
      category: 'Full-Stack / Marketplace',
      featured: true,
      githubUrl: 'https://github.com/ALIYASIR545',
      liveUrl: 'https://eduvents.example.com',
      techs: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe', 'AWS S3', 'Mailchimp', 'AdPlugg']
    },
    {
      title: 'Smart Crop Disease AI System',
      slug: 'smart-crop-disease-ai',
      shortDescription: 'Deep learning solution for real-time agricultural disease diagnosis.',
      description: 'An AI-powered mobile and web application using Deep Learning (CNN) to detect diseases in crops like potato, maize, and tomato from uploaded images, providing instant diagnosis and actionable treatment recommendations.',
      year: '2025',
      category: 'AI / Computer Vision',
      featured: true,
      githubUrl: 'https://github.com/ALIYASIR545',
      techs: ['Python', 'Flask', 'React Native', 'CNN', 'PyTorch', 'Pandas']
    },
    {
      title: 'Role-Based Knowledge Hub LMS',
      slug: 'knowledge-hub-lms',
      shortDescription: 'Enterprise LMS with granular role-based access control and analytics.',
      description: 'A comprehensive Learning Management System featuring multi-tenant architecture, course delivery engines, progress analytics, and strict RBAC controls.',
      year: '2025',
      category: 'Full-Stack Web',
      featured: true,
      githubUrl: 'https://github.com/ALIYASIR545',
      techs: ['Flask', 'React.js', 'MongoDB', 'Python', 'JavaScript']
    },
    {
      title: 'Code-Fixer AI',
      slug: 'code-fixer-ai',
      shortDescription: 'LLM-driven automated debugging and code optimization tool.',
      description: 'A high-throughput application leveraging LLAMA 3.1 to analyze buggy code, detect security flaws, and output optimized, production-grade refactored code across Python, Java, and JavaScript.',
      year: '2026',
      category: 'AI Engineering',
      featured: true,
      githubUrl: 'https://github.com/ALIYASIR545',
      techs: ['Python', 'LLAMA 3.1', 'React.js', 'FastAPI']
    },
    {
      title: 'Hadith Vault',
      slug: 'hadith-vault',
      shortDescription: 'High-precision Islamic literature search and analytics engine.',
      description: 'A structured web application for querying authenticated Hadith literature with accurate translations, references, and high-performance search across multi-gigabyte text datasets.',
      year: '2025',
      category: 'Data & Web Engine',
      featured: false,
      githubUrl: 'https://github.com/ALIYASIR545',
      techs: ['Python', 'React.js', 'SQL', 'FastAPI']
    }
  ]

  for (const p of projectsData) {
    const { techs, ...projectDetails } = p
    const project = await prisma.project.create({ data: projectDetails })
    for (const tName of techs) {
      if (createdTechs[tName]) {
        await prisma.projectTechnology.create({
          data: { projectId: project.id, technologyId: createdTechs[tName] }
        })
      }
    }
  }

  await prisma.experience.createMany({
    data: [
      {
        role: 'Project Manager & Full Stack Developer',
        company: 'Sprintx',
        period: 'Jan 2026 - Present',
        description: 'Managing technical delivery and engineering full-stack enterprise applications.',
        responsibilities: [
          'Architecting full-stack web platforms serving active business clients.',
          'Leading sprint planning, system design, and database schema migrations.',
          'Enforcing code quality, API security, and performance optimization across teams.'
        ],
        order: 1
      },
      {
        role: 'Full Stack Software Developer',
        company: 'Voltaic.AI',
        period: 'Sep 2025 - Dec 2025',
        description: 'Engineered AI-integrated web software in a fast-paced environment.',
        responsibilities: [
          'Developed microservices using Python Flask and modern React.js with Vite.',
          'Integrated LLM API pipelines and custom data pre-processing workflows.',
          'Optimized database queries and front-end rendering performance.'
        ],
        order: 2
      },
      {
        role: 'Research Assistant & Data Engineer',
        company: 'KICS UET Lahore',
        period: 'Aug 2024 - Sep 2025',
        description: 'Collaborated with Huawei Lab on full-stack automation and AI research.',
        responsibilities: [
          'Constructed reliable data pipelines and clean datasets for machine learning models.',
          'Developed web tools for automated system testing and data ingestion.',
          'Co-authored technical prototypes and architectural research frameworks.'
        ],
        order: 3
      }
    ]
  })

  await prisma.education.createMany({
    data: [
      {
        degree: 'Master of Science in Software Engineering (MSSE)',
        institution: 'UET - University of Engineering and Technology Lahore',
        period: '2024 - Present',
        gpa: '3.81 / 4.00 (95.5%)',
        details: [
          'Focus: Advanced Software Architecture, Machine Learning, AI Engineering, Agile System Design.',
          'Research: Multimodal early disease and pattern detection frameworks.'
        ],
        order: 1
      },
      {
        degree: 'Bachelor of Science in Computer Science (BSCS)',
        institution: 'The University of Agriculture IBMS Peshawar',
        period: 'Sep 2019 - Jul 2023',
        gpa: '3.01 / 4.00',
        details: [
          'Core Focus: Data Structures, Operating Systems, Database Systems, Web Engineering, AI.',
          'Built foundational competence in Python, C++, and Web Development.'
        ],
        order: 2
      }
    ]
  })

  await prisma.research.createMany({
    data: [
      {
        title: 'AI Exam Cheating Detection',
        topic: 'Educational AI & Computer Vision',
        problem: 'Detecting anomalous patterns and academic integrity violations during digital examinations non-intrusively.',
        approach: 'Leveraging spatial-temporal feature analysis via Recurrent Neural Networks (RNN) and feature extraction on video/log datasets.',
        technologies: ['Python', 'PyTorch', 'RNN', 'Scikit-learn', 'Pandas'],
        status: 'Active Research Project',
        order: 1
      },
      {
        title: 'Multimodal Dyslexia Early Detection',
        topic: 'Predictive Healthcare Analytics',
        problem: 'Identifying early signs of dyslexia in young learners using non-invasive cognitive and behavioral data.',
        approach: 'Training predictive classifiers (Random Forest, SVM) on structured handwriting, motor performance, and speech timing features.',
        technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
        status: 'Research Proposal & Methodology Stage',
        order: 2
      },
      {
        title: 'Early Clinical Sepsis Prediction',
        topic: 'Healthcare Predictive Modeling',
        problem: 'Early clinical warning for sepsis onset to reduce intensive care unit mortality rates.',
        approach: 'Building high-sensitivity temporal classification algorithms over MIMIC-style electronic health record (EHR) time-series data.',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
        status: 'Completed Prototype',
        order: 3
      }
    ]
  })
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })