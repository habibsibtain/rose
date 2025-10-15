import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  bigint,
  pgEnum,
  boolean,
  date,
  real,
  uuid,
} from 'drizzle-orm/pg-core';


// -- ENUMS --
// We define enums separately in PostgreSQL for type safety.
export const videoVisibilityEnum = pgEnum('video_visibility', ['public', 'private', 'unlisted']);
export const likeTypeEnum = pgEnum('like_type', ['like', 'dislike']);
export const playlistVisibilityEnum = pgEnum('playlist_visibility', ['public', 'private']);


// -- 1. CORE ENTITIES --

// users: Stores information about registered users.
export const users = pgTable('users', {
  userId: uuid('user_id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  profilePictureUrl: varchar('profile_picture_url', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// channels: Each user has one channel.
export const channels = pgTable('channels', {
  channelId: uuid('channel_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique(),
  channelName: varchar('channel_name', { length: 100 }).notNull(),
  description: text('description'),
  bannerImageUrl: varchar('banner_image_url', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// videos: Stores all information related to individual videos.
export const videos = pgTable('videos', {
  videoId: uuid('video_id').primaryKey().defaultRandom(),
  channelId: uuid('channel_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  videoUrl: varchar('video_url', { length: 255 }).notNull(),
  thumbnailUrl: varchar('thumbnail_url', { length: 255 }).notNull(),
  duration: integer('duration').notNull(),
  views: bigint('views', { mode: 'number' }).default(0),
  visibility: videoVisibilityEnum('visibility').default('public'),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true }).defaultNow(),
  category: varchar('category', { length: 50 }),
});


// -- 2. USER INTERACTION ENTITIES --

// comments: Stores comments on videos, including replies.
export const comments = pgTable('comments', {
  commentId: uuid('comment_id').primaryKey().defaultRandom(),
  videoId: uuid('video_id').notNull(),
  userId: uuid('user_id').notNull(),
  parentCommentId: uuid('parent_comment_id'),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// likes: Handles likes/dislikes for videos and comments.
export const likes = pgTable('likes', {
  likeId: uuid('like_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  videoId: uuid('video_id'),
  commentId: uuid('comment_id'),
  likeType: likeTypeEnum('like_type').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// subscriptions: Connects users (subscribers) to channels.
export const subscriptions = pgTable('subscriptions', {
  subscriptionId: uuid('subscription_id').primaryKey().defaultRandom(),
  subscriberId: uuid('subscriber_id').notNull(),
  channelId: uuid('channel_id').notNull(),
  subscribedAt: timestamp('subscribed_at', { withTimezone: true }).defaultNow(),
});


// -- 3. CONTENT ORGANIZATION & HISTORY --

// playlists: Allows users to create and manage video playlists.
export const playlists = pgTable('playlists', {
  playlistId: uuid('playlist_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  title: varchar('title', { length: 150 }).notNull(),
  description: text('description'),
  visibility: playlistVisibilityEnum('visibility').default('public'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// playlist_videos: A many-to-many relationship linking playlists to videos.
export const playlistVideos = pgTable('playlist_videos', {
  playlistVideoId: uuid('playlist_video_id').primaryKey().defaultRandom(),
  playlistId: uuid('playlist_id').notNull(),
  videoId: uuid('video_id').notNull(),
  videoOrder: integer('video_order').notNull(),
});

// watch_history: Tracks the videos a user has watched.
export const watchHistory = pgTable('watch_history', {
  historyId: uuid('history_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  videoId: uuid('video_id').notNull(),
  watchedAt: timestamp('watched_at', { withTimezone: true }).defaultNow(),
  progress: integer('progress'), // Watch progress in seconds
});

// search_history: Tracks user search queries.
export const searchHistory = pgTable('search_history', {
  searchId: uuid('search_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  query: varchar('query', { length: 255 }).notNull(),
  searchedAt: timestamp('searched_at', { withTimezone: true }).defaultNow(),
});


// -- 4. NOTIFICATIONS & ANALYTICS --

// notifications: Stores notifications for users.
export const notifications = pgTable('notifications', {
  notificationId: uuid('notification_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  sourceUserId: uuid('source_user_id'),
  videoId: uuid('video_id'),
  commentId: uuid('comment_id'),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// video_analytics: Stores aggregated analytics data for videos.
export const videoAnalytics = pgTable('video_analytics', {
  analyticsId: uuid('analytics_id').primaryKey().defaultRandom(),
  videoId: uuid('video_id').notNull(),
  date: date('date').notNull(),
  dailyViews: integer('daily_views').default(0),
  watchTimeMinutes: bigint('watch_time_minutes', { mode: 'number' }).default(0),
  impressions: integer('impressions').default(0),
  ctr: real('ctr').default(0.0), // Click-through rate
});


// -- RELATIONS --

// User Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  channel: one(channels, {
    fields: [users.userId],
    references: [channels.userId],
  }),
  comments: many(comments),
  likes: many(likes),
  subscriptions: many(subscriptions),
  playlists: many(playlists),
  watchHistory: many(watchHistory),
  searchHistory: many(searchHistory),
  notifications: many(notifications),
}));

// Channel Relations
export const channelsRelations = relations(channels, ({ one, many }) => ({
  user: one(users, {
    fields: [channels.userId],
    references: [users.userId],
  }),
  videos: many(videos),
  subscribers: many(subscriptions),
}));

// Video Relations
export const videosRelations = relations(videos, ({ one, many }) => ({
  channel: one(channels, {
    fields: [videos.channelId],
    references: [channels.channelId],
  }),
  comments: many(comments),
  likes: many(likes),
  playlistVideos: many(playlistVideos),
  analytics: many(videoAnalytics),
}));

// Comment Relations
export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.userId],
  }),
  video: one(videos, {
    fields: [comments.videoId],
    references: [videos.videoId],
  }),
  parentComment: one(comments, {
    fields: [comments.parentCommentId],
    references: [comments.commentId],
    relationName: 'replies',
  }),
  replies: many(comments, {
    relationName: 'replies',
  }),
  likes: many(likes),
}));

// Like Relations
export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.userId],
  }),
  video: one(videos, {
    fields: [likes.videoId],
    references: [videos.videoId],
  }),
  comment: one(comments, {
    fields: [likes.commentId],
    references: [comments.commentId],
  }),
}));

// Subscription Relations
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  subscriber: one(users, {
    fields: [subscriptions.subscriberId],
    references: [users.userId],
  }),
  channel: one(channels, {
    fields: [subscriptions.channelId],
    references: [channels.channelId],
  }),
}));

// Playlist Relations
export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  user: one(users, {
    fields: [playlists.userId],
    references: [users.userId],
  }),
  playlistVideos: many(playlistVideos),
}));

// PlaylistVideos Relations
export const playlistVideosRelations = relations(playlistVideos, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistVideos.playlistId],
    references: [playlists.playlistId],
  }),
  video: one(videos, {
    fields: [playlistVideos.videoId],
    references: [videos.videoId],
  }),
}));

// Watch History Relations
export const watchHistoryRelations = relations(watchHistory, ({ one }) => ({
    user: one(users, {
        fields: [watchHistory.userId],
        references: [users.userId],
    }),
    video: one(videos, {
        fields: [watchHistory.videoId],
        references: [videos.videoId],
    }),
}));

// Search History Relations
export const searchHistoryRelations = relations(searchHistory, ({ one }) => ({
    user: one(users, {
        fields: [searchHistory.userId],
        references: [users.userId],
    }),
}));

// Notification Relations
export const notificationsRelations = relations(notifications, ({ one }) => ({
    user: one(users, {
        fields: [notifications.userId],
        references: [users.userId],
    }),
    sourceUser: one(users, {
        fields: [notifications.sourceUserId],
        references: [users.userId],
    }),
    video: one(videos, {
        fields: [notifications.videoId],
        references: [videos.videoId],
    }),
    comment: one(comments, {
        fields: [notifications.commentId],
        references: [comments.commentId],
    }),
}));

// Video Analytics Relations
export const videoAnalyticsRelations = relations(videoAnalytics, ({ one }) => ({
    video: one(videos, {
        fields: [videoAnalytics.videoId],
        references: [videos.videoId],
    }),
}));
