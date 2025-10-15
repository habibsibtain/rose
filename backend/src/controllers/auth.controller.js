import { eq } from 'drizzle-orm';
import { db } from '../index.ts'
import * as schema from '../db/schema.ts'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  try {

    const {username, email, password} = req.body;  // will add profile picture functionality lateer.
    if( !username || !email || !password) return res.status(401).json({msg: 'Please provide username, email and password.'})
    
    const existing_user = await db.query.users.findFirst({
      where: eq(schema.users.email, email)
    })
    if(existing_user) return res.status(401).json({msg: 'User already available.'})

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt)

    const user = await db.transaction(async (tx) => {
      const [u] = await tx.insert(schema.users).values({
        username,
        email,
        passwordHash: password_hash
      }).returning()

      if(!u) throw new Error('Failed to create user.')

      await tx.insert(schema.channels).values({
        userId: user.userId,
        channelName: user.username,
        description: `Welcome to the channel of ${user.username}`
      })
      
      return u;
    })

    const token = await jwt.sign({userId: user.userId, username: user.username}, process.env.JWT_SECRET)

    return res.status(201).json({
      msg: 'Registraion Successfull.',
      data: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        token
      }
    })

  } catch (error) {
    res.status(501).json({msg: 'Server error during signup.', error})
  }
}

export const login = async (req, res) => {
  try {

    const { email, password } = req.body; 
    if( !email || !password ) return res.status(401).json({msg: 'Please provide email and password.'})
    
    const existing_user = await db.query.users.findFirst({
      where: eq(schema.users.email, email)
    })
    if(!existing_user) return res.status(401).json({msg: 'User not available.'})

    const is_match = await bcrypt.compare(password, user.passwordHash);
    if(!is_match) return res.status(401).json({msg: 'Incorrect password.'})

    const token = await jwt.sign({userId: user.userId, username: user.username}, process.env.JWT_SECRET)

    return res.status(201).json({
      msg: 'Login Successfull.',
      data: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        token
      }
    })

  } catch (error) {
    res.status(501).json({msg: 'Server error during login.', error})
  }
}
