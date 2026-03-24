// JOB IMPORT INTEGRATION POINT:
// This service fetches jobs from JSearch (RapidAPI) which aggregates listings from
// LinkedIn, Indeed, Glassdoor, and more. To swap providers, replace fetchJSearchJobs()
// with a different source and normalize to the SampleJob shape below.

import https from 'https';

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

function fetchJSearchJobs(query: string): Promise<SampleJob[]> {
  return new Promise((resolve) => {
    if (!process.env.RAPIDAPI_KEY) {
      resolve(getFallbackJobs());
      return;
    }

    const options = {
      method: 'GET',
      hostname: 'jsearch.p.rapidapi.com',
      path: `/search?query=${encodeURIComponent(query)}&page=1&num_pages=1`,
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const jobs: SampleJob[] = (parsed.data || []).slice(0, 12).map((job: any) => ({
            id: job.job_id || crypto.randomUUID(),
            title: job.job_title || 'Untitled',
            company: job.employer_name || 'Unknown Company',
            location: job.job_city
              ? `${job.job_city}${job.job_state ? ', ' + job.job_state : ''}${job.job_is_remote ? ' (Remote)' : ''}`
              : job.job_is_remote ? 'Remote' : 'Location not specified',
            description: job.job_description
              ? job.job_description.slice(0, 300) + '...'
              : 'No description available.',
            status: 'OPEN',
            jobType: job.job_employment_type || 'Full-time',
            fitScoreMin: 70,
            url: job.job_apply_link || '',
            createdAt: job.job_posted_at_datetime_utc || new Date().toISOString(),
          }));
          resolve(jobs.length > 0 ? jobs : getFallbackJobs());
        } catch {
          resolve(getFallbackJobs());
        }
      });
    });

    req.on('error', () => resolve(getFallbackJobs()));
    req.end();
  });
}

export async function getSampleJobs(query = 'software engineer'): Promise<SampleJob[]> {
  return fetchJSearchJobs(query);
}

function getFallbackJobs(): SampleJob[] {
  return [
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Frontend Engineer',
      company: 'Acme Technology Solutions',
      location: 'Austin, TX (Hybrid)',
      description: 'Join our product team to build modern web applications using React and TypeScript.',
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
      description: 'Analyze large datasets to surface actionable insights for our clients.',
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
      description: 'Design and maintain scalable RESTful APIs using Node.js and PostgreSQL.',
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
      description: 'Create intuitive and beautiful digital experiences for our SaaS platform.',
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
      description: 'Build and deploy ML models that power our recommendation and fraud-detection systems.',
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
      description: 'Manage CI/CD pipelines, Kubernetes clusters, and AWS infrastructure.',
      status: 'REOPENED',
      jobType: 'Full-time',
      fitScoreMin: 70,
      url: '',
      createdAt: new Date().toISOString(),
    },
  ];
}
