'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { allTags } from '@/lib/community-data'

interface CreatePostFormProps {
  onSubmit: (title: string, description: string, tags: string[]) => void
  onCancel: () => void
}

export function CreatePostForm({ onSubmit, onCancel }: CreatePostFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && description.trim()) {
      onSubmit(title, description, selectedTags)
      setTitle('')
      setDescription('')
      setSelectedTags([])
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Create a New Post</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your topic?"
            maxLength={100}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">{title.length}/100</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your story, question, or tips..."
            maxLength={500}
            rows={5}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary resize-none"
          />
          <p className="mt-1 text-xs text-muted-foreground">{description.length}/500</p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Tags (select up to 3)
          </label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : selectedTags.length >= 3
                      ? 'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Selected tags:</p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={!title.trim() || !description.trim()}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-primary/90"
          >
            Post
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
