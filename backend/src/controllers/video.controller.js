import { db } from '../index.ts'
import * as schema from '../db/schema.ts'
import { and, desc } from 'drizzle-orm'

export const get_all_videos = async (req, res) => {
  try {
    const videos = await db.select({
      videoId: schema.videos.videoId,
      title: schema.videos.title,
      description: schema.videos.description,
      thumbnailUrl: schema.videos.thumbnailUrl,
      videoUrl: schema.videos.videoUrl,
      duration: schema.videos.duration,
      views: schema.videos.views,
      uploadedAt: schema.videos.uploadedAt,
      channelName: schema.channels.channelName,
      channelId: schema.channels.channelId
    }).from(schema.videos)
    .where(eq(schema.videos.visibility, 'public'))
    .leftJoin(schema.channels, eq(schema.videos.channelId, schema.channels.channelId))
    .orderBy(desc(schema.videos.uploadedAt))
    .limit(100)  

    res.status(201).json({data: videos})

  } catch (error) {
    return res.status(501).json({msg: 'Server error while fetching all videos.'})
  }
}


export const get_video_by_id = async (req, res) => {
  const {id} = req.params;

  try {
    const videoResult = await db.query.videos.findFirst({
      where: eq(schema.videos.videoId, id),
      with: {
        channel: {
          columns: {
            channelId: true,
            channelName: true
          }
        },
        comments: {
          with: {
            user: {
              columns: {
                userId: true,
                username: true,
                profilePictureUrl: true
              }
            }
          },
          orderBy: (comments, {desc}) => [desc(comments.createdAt)]
        }
      }
    })

    if (!videoResult) return res.status(401).json({msg: 'Video not Found'})

    // Here in future I  would also fetch likes, subscriber counts etc. in a real app
    // For simplicity, just returning the core video data.

    res.status(201).json({data: videoResult})

  } catch (error) {
    return res.status(501).json({msg: 'Server error while fetching video by id.'})
  }
}


export const create_comment = async (req, res) => {
  const {id: videoId} = req.params
  // In a real app, userId would come from authenticated session (e.g., req.user.id)

  const {userId, content, paraentCommentId} = req.body;

  if( !userId || !content ) return res.status(401).json({msg: 'User Id and content are required.'})

  try {
    const newComment = await db.insert(schema.comments).values({
      videoId, 
      userId,
      content,
      parentCommentId
    }).returning()

    res.status(201).json({data: newComment[0]})

  } catch (error) {
    return res.status(501).json({msg: 'Server error while creating comment.'})
  }
}


export const toggleLike = async (req, res) => {
  const { id: videoId } = req.params;
  // In a real app, userId would come from authenticated session (e.g., req.user.id)
  const { userId, likeType } = req.body; // likeType should be 'like' or 'dislike'

  if (!userId || !likeType || !['like', 'dislike'].includes(likeType)) {
      return res.status(400).json({ message: 'User ID and a valid likeType are required' });
  }

  try {
      const existingLike = await db.query.likes.findFirst({
          where: and(
              eq(schema.likes.userId, userId),
              eq(schema.likes.videoId, videoId)
          )
      });

      if (existingLike) {
          // If the user is performing the same action again (e.g., liking an already liked video), remove the like.
          if (existingLike.likeType === likeType) {
              await db.delete(schema.likes).where(eq(schema.likes.likeId, existingLike.likeId));
              return res.status(200).json({ message: 'Interaction removed' });
          } else {
              // If the user is changing their action (e.g., from like to dislike), update the record.
              const updatedLike = await db.update(schema.likes)
                  .set({ likeType })
                  .where(eq(schema.likes.likeId, existingLike.likeId))
                  .returning();
              return res.status(200).json({ data: updatedLike[0] });
          }
      } else {
          // If no existing interaction, create a new one.
          const newLike = await db.insert(schema.likes).values({
              userId,
              videoId,
              likeType
          }).returning();
          return res.status(201).json({ data: newLike[0] });
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error toggling like' });
  }
};
