import { Router } from 'express'
import { login, signup } from '../controllers/auth.controller'

const router = Router()

router.route('/auth/signup').post(signup)
router.route('/auth/login').post(login)

export default router