import jwt from 'jsonwebtoken'
import { db } from '../index.ts'
import * as schema from '../db/schema.ts'
import { eq } from 'drizzle-orm'


export const authorization = async(req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if(!token) return res.status(401).json({msg: 'Token not found'})

    const decoded_token = jwt.verify(token , process.env.JWT_SECRET)
    const user = await db.query.users.findFirst({
      where: eq(schema.users.userId, decoded_token.id),
      columns: {
        passwordHash: false
      }
    })
    if(!user) return res.status(401).json({msg: 'User belonging to this toekn do not exist.'})

    req.user = user;
    next();
  } catch (error) {
    return res.status(501).json({msg: 'Server error while authorizing.'})
  }
}