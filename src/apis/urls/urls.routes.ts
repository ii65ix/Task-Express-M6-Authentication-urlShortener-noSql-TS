import express from 'express';
// import { auth } from '../../middlewares/auth';
const router = express.Router();

import { shorten, redirect, deleteUrl, authorize } from './urls.controllers';

router.post('/shorten/:userId',authorize, shorten);
router.get('/:code',authorize ,redirect);
router.delete('/:code', authorize , deleteUrl);

export default router;