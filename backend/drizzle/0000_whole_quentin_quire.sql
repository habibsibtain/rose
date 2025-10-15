CREATE TYPE "public"."like_type" AS ENUM('like', 'dislike');--> statement-breakpoint
CREATE TYPE "public"."playlist_visibility" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."video_visibility" AS ENUM('public', 'private', 'unlisted');--> statement-breakpoint
CREATE TABLE "channels" (
	"channel_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"channel_name" varchar(100) NOT NULL,
	"description" text,
	"banner_image_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "channels_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"comment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"parent_comment_id" uuid,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"like_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"video_id" uuid,
	"comment_id" uuid,
	"like_type" "like_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"notification_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"source_user_id" uuid,
	"video_id" uuid,
	"comment_id" uuid,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "playlist_videos" (
	"playlist_video_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"playlist_id" uuid NOT NULL,
	"video_id" uuid NOT NULL,
	"video_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "playlists" (
	"playlist_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(150) NOT NULL,
	"description" text,
	"visibility" "playlist_visibility" DEFAULT 'public',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "search_history" (
	"search_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"query" varchar(255) NOT NULL,
	"searched_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"subscription_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subscriber_id" uuid NOT NULL,
	"channel_id" uuid NOT NULL,
	"subscribed_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"profile_picture_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "video_analytics" (
	"analytics_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_id" uuid NOT NULL,
	"date" date NOT NULL,
	"daily_views" integer DEFAULT 0,
	"watch_time_minutes" bigint DEFAULT 0,
	"impressions" integer DEFAULT 0,
	"ctr" real DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"video_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"channel_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"video_url" varchar(255) NOT NULL,
	"thumbnail_url" varchar(255) NOT NULL,
	"duration" integer NOT NULL,
	"views" bigint DEFAULT 0,
	"visibility" "video_visibility" DEFAULT 'public',
	"uploaded_at" timestamp with time zone DEFAULT now(),
	"category" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "watch_history" (
	"history_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"video_id" uuid NOT NULL,
	"watched_at" timestamp with time zone DEFAULT now(),
	"progress" integer
);
