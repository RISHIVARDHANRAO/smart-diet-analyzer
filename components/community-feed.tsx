'use client'

import { useState } from 'react'
import { ThumbsUp, MessageCircle } from 'lucide-react'
import type { CommunityPost } from '@/lib/types'

interface CommunityFeedProps {
  post: CommunityPost
  onUpvote: () => void
  currentUserEmail?: string
}

export function CommunityFeed({ post, onUpvote, currentUserEmail }: CommunityFeedProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayName = post.author === currentUserEmail ? 'you' : post.author

  return (
    <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl">{post.avatar}</div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-card-foreground">{displayName}</p>
            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
          </div>
        </div>
        <span className="whitespace-nowrap rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-card-foreground">{post.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{post.description}</p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-6 border-t border-border pt-4">
        <button
          onClick={onUpvote}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{post.upvotes}</span>
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments}</span>
        </button>
      </div>

      {/* Comments Section */}
      {isExpanded && post.replies && post.replies.length > 0 && (
        <div className="mt-4 border-t border-border pt-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Recent Comments</p>
          {post.replies.map((reply) => {
            const commentDisplayName = reply.author === currentUserEmail ? 'you' : reply.author
            return (
            <div key={reply.id} className="rounded-lg bg-secondary/30 p-3">
              <div className="flex items-start gap-2">
                <span className="text-lg">{reply.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-card-foreground">{commentDisplayName}</p>
                    <p className="text-xs text-muted-foreground">{reply.createdAt}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{reply.content}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">❤️ {reply.likes}</p>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      )}

      {/* Expand Button */}
      {post.replies && post.replies.length > 0 && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="mt-3 text-xs text-primary transition-colors hover:text-primary/80"
        >
          View {post.replies.length} comment{post.replies.length !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  )
}
