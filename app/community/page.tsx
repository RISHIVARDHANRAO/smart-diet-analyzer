'use client'

import { useState, useMemo, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { CommunityFeed } from '@/components/community-feed'
import { CreatePostForm } from '@/components/create-post-form'
import { communityPosts, categories, allTags } from '@/lib/community-data'
import type { CommunityPost } from '@/lib/types'

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts)
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('')

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail') || ''
    setCurrentUserEmail(userEmail)
  }, [])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All Posts' ||
        post.category === selectedCategory ||
        (selectedCategory === 'Recent Discussions' && post.category !== 'Success Stories')

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag))

      return matchesCategory && matchesSearch && matchesTags
    })
  }, [posts, selectedCategory, searchQuery, selectedTags])

  const handleCreatePost = (title: string, description: string, tags: string[]) => {
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || 'user@gmail.com' : 'user@gmail.com'
    const newPost: CommunityPost = {
      id: String(posts.length + 1),
      title,
      description,
      author: userEmail,
      avatar: '😊',
      category: 'Recent Discussions',
      upvotes: 0,
      comments: 0,
      tags,
      createdAt: 'just now',
      replies: []
    }
    setPosts([newPost, ...posts])
    setIsCreatingPost(false)
  }

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, upvotes: post.upvotes + 1 }
        : post
    ))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Community</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect with others, share tips, and find inspiration
            </p>
          </header>

          {/* Create Post Section */}
          <div className="mb-8">
            {!isCreatingPost ? (
              <button
                onClick={() => setIsCreatingPost(true)}
                className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-secondary"
              >
                <p className="text-sm text-muted-foreground">Share your story or question...</p>
              </button>
            ) : (
              <CreatePostForm
                onSubmit={handleCreatePost}
                onCancel={() => setIsCreatingPost(false)}
              />
            )}
          </div>

          {/* Filters Section */}
          <div className="mb-6 space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tag Filter */}
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Filter by tags:</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <CommunityFeed
                  key={post.id}
                  post={post}
                  onUpvote={() => handleUpvote(post.id)}
                  currentUserEmail={currentUserEmail}
                />
              ))
            ) : (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">No posts found. Try adjusting your filters!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
