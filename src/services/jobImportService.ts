// JOB IMPORT INTEGRATION POINT: Replace getSampleJobs() with calls to real APIs
// (Indeed, LinkedIn, Greenhouse, Lever, etc.) or CSV/spreadsheet imports.
// Normalize all sources to the same shape:
//   { id, title, company, location, description, status, jobType, fitScoreMin, url, createdAt }
// This service acts as the single entry point for all external job data.

export interface SampleJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  status: string;
  jobType: string;
  fitScoreMin: number;
  url: string;
  createdAt: string;
}

export function getSampleJobs(): SampleJob[] {
  return [
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Frontend Engineer',
      company: 'Acme Technology Solutions',
      location: 'Austin, TX (Hybrid)',
      description:
        'Join our product team to build modern web applications using React and TypeScript. You will collaborate closely with designers and backend engineers to deliver high-quality user experiences.',
      status: 'OPEN',
      jobType: 'Full-time',
      fitScoreMin: 70,
      url: '',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Data Analyst',
      company: 'Bright Analytics Corp',
      location: 'Remote',
      description:
        'Analyze large datasets to surface actionable insights for our clients. Proficiency in SQL, Python, and Tableau is highly valued. Great opportunity for aspiring data professionals.',
      status: 'OPEN',
      jobType: 'Full-time',
      fitScoreMin: 70,
      url: '',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      title: 'Backend Developer',
      company: 'Nova Cloud Systems',
      location: 'Denver, CO (Onsite)',
      description:
        'Design and maintain scalable RESTful APIs using Node.js and PostgreSQL. Work in an agile environment with a focus on performance and reliability.',
      status: 'OPEN',
      jobType: 'Contract',
      fitScoreMin: 70,
      url: '',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
      title: 'UX/UI Designer',
      company: 'Pixel & Craft Studio',
      location: 'New York, NY (Remote)',
      description:
        'Create intuitive and beautiful digital experiences for our SaaS platform. You will conduct user research, build wireframes, and hand off polished designs to engineering.',
      status: 'OPEN',
      jobType: 'Part-time',
      fitScoreMin: 70,
      url: '',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
      title: 'Machine Learning Engineer',
      company: 'DeepMind Analytics',
      location: 'San Francisco, CA (Hybrid)',
      description:
        'Build and deploy ML models that power our recommendation and fraud-detection systems. Strong background in Python, PyTorch, and MLOps pipelines required.',
      status: 'OPEN',
      jobType: 'Full-time',
      fitScoreMin: 70,
      url: '',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
      title: 'DevOps Engineer',
      company: 'CloudBridge Infrastructure',
      location: 'Chicago, IL (Hybrid)',
      description:
        'Manage CI/CD pipelines, Kubernetes clusters, and AWS infrastructure. You will partner with development teams to automate deployments and ensure platform reliability.',
      status: 'REOPENED',
      jobType: 'Full-time',
      fitScoreMin: 70,
      url: '',
      createdAt: new Date().toISOString(),
    },
  ];
}
