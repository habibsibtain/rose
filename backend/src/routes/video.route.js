import { Router } from 'express'
import { create_comment, get_all_videos, get_video_by_id, toggle_like } from '../controllers/video.controller';
import { authorization } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(get_all_videos)
router.route('/:id').get(get_video_by_id)

router.route('/:id/comment').post( authorization,  create_comment)
router.route('/:id/toggle-like').post( authorization,  toggle_like)