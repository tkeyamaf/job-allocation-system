import { Router, Request, Response } from 'express';
import pool from '../config/database';

const router = Router();

// POST /api/candidates — create a new candidate profile
router.post('/candidates', async (req: Request, res: Response) => {
  const {
    full_name,
    email,
    phone,
    city,
    state,
    preferred_titles,
    job_types,
    work_setting,
    salary_min,
    salary_max,
    years_experience,
    industries,
    timeframe,
    linkedin_url,
    portfolio_url,
    skills,
    certifications,
    education,
    work_authorization,
    availability_date,
    preferred_companies,
    summary,
  } = req.body;

  // Validate required fields
  if (!full_name || typeof full_name !== 'string' || full_name.trim() === '') {
    res.status(400).json({ error: 'full_name is required' });
    return;
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    res.status(400).json({ error: 'email is required' });
    return;
  }

  // Basic email format check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email.trim())) {
    res.status(400).json({ error: 'email format is invalid' });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO candidates (
        full_name, email, phone, city, state,
        preferred_titles, job_types, work_setting,
        salary_min, salary_max, years_experience,
        industries, timeframe, linkedin_url, portfolio_url,
        skills, certifications, education,
        work_authorization, availability_date,
        preferred_companies, summary
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8,
        $9, $10, $11,
        $12, $13, $14, $15,
        $16, $17, $18,
        $19, $20,
        $21, $22
      ) RETURNING *`,
      [
        full_name.trim(),
        email.trim().toLowerCase(),
        phone || null,
        city || null,
        state || null,
        preferred_titles || null,
        job_types || null,
        work_setting || null,
        salary_min !== undefined ? Number(salary_min) : null,
        salary_max !== undefined ? Number(salary_max) : null,
        years_experience !== undefined ? Number(years_experience) : null,
        industries || null,
        timeframe || null,
        linkedin_url || null,
        portfolio_url || null,
        skills || null,
        certifications || null,
        education || null,
        work_authorization || null,
        availability_date || null,
        preferred_companies || null,
        summary || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    // Unique constraint on email
    if (err.code === '23505') {
      res.status(409).json({ error: 'A candidate with this email already exists' });
      return;
    }
    console.error('Error creating candidate:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/candidates/:id — get candidate by ID
router.get('/candidates/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRe.test(id)) {
    res.status(400).json({ error: 'Invalid candidate ID format' });
    return;
  }

  try {
    const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Candidate not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching candidate:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
