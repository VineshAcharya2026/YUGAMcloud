import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  res.json({ message: 'Auth endpoint scaffolding' });
});

export default router;
