import { db } from '../index.ts'
import * as schema from '../db/schema.ts'

export const get_all_videos = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(501).json({msg: 'Server error while fetching all videos.'})
  }
}