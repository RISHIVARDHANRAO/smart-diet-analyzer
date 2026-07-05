import type { CommunityPost } from './types'

export const communityPosts: CommunityPost[] = [
  {
    id: '1',
    title: 'My 30-Day Weight Loss Journey',
    description: 'Started at 95kg and committed to a 500 calorie deficit. Just hit 90kg! The key was consistency with meal prep and daily walks.',
    author: 'Sarah Chen',
    avatar: '👩‍🦰',
    category: 'Success Stories',
    upvotes: 342,
    comments: 45,
    tags: ['Weight Loss', 'Motivation', 'Diet Tips'],
    createdAt: '2 days ago',
    replies: [
      {
        id: 'c1',
        author: 'Mike Johnson',
        avatar: '👨‍💼',
        content: 'This is amazing! What was your go-to meal for lunch?',
        createdAt: '1 day ago',
        likes: 23
      }
    ]
  },
  {
    id: '2',
    title: 'Best High-Protein Snacks Under 200 Calories',
    description: 'Greek yogurt with berries (150 cal), protein bar (180 cal), hard-boiled eggs (80 cal), almonds (190 cal). These keep me full all day!',
    author: 'Alex Rivera',
    avatar: '🧑‍🍳',
    category: 'Healthy Food Tips',
    upvotes: 256,
    comments: 28,
    tags: ['Protein', 'Snacks', 'Quick Ideas'],
    createdAt: '4 days ago',
    replies: [
      {
        id: 'c2',
        author: 'Emma Wilson',
        avatar: '👩‍🏫',
        content: 'I always forget about hard-boiled eggs! Do you meal prep them?',
        createdAt: '3 days ago',
        likes: 15
      }
    ]
  },
  {
    id: '3',
    title: 'Struggling with Keto Diet',
    description: 'Day 5 on keto and experiencing the keto flu. Feeling tired and dizzy. Is this normal? How long until I feel better?',
    author: 'James Park',
    avatar: '👨‍💻',
    category: 'Ask the Community',
    upvotes: 89,
    comments: 42,
    tags: ['Keto', 'Help Needed', 'Nutrition'],
    createdAt: '1 week ago',
    replies: [
      {
        id: 'c3',
        author: 'Dr. Lisa',
        avatar: '👩‍⚕️',
        content: 'Keto flu typically lasts 3-5 days. Make sure you&apos;re getting enough electrolytes!',
        createdAt: '6 days ago',
        likes: 78
      }
    ]
  },
  {
    id: '4',
    title: 'Diabetes-Friendly Low-Carb Meals',
    description: 'Been managing Type 2 diabetes for 2 years. My favorite meals: cauliflower rice stir-fry, grilled chicken with broccoli, and zucchini noodles with marinara.',
    author: 'Tom Davis',
    avatar: '👨‍🌾',
    category: 'Healthy Food Tips',
    upvotes: 198,
    comments: 31,
    tags: ['Diabetes', 'Low Carb', 'Meal Ideas'],
    createdAt: '3 days ago'
  },
  {
    id: '5',
    title: 'How do I track protein intake correctly?',
    description: 'I want to ensure I&apos;m hitting my 150g protein goal. Should I count protein from all foods or focus on specific sources?',
    author: 'Rachel Green',
    avatar: '👩‍🎓',
    category: 'Ask the Community',
    upvotes: 124,
    comments: 27,
    tags: ['Protein', 'Tracking', 'Nutrition Tips'],
    createdAt: '5 days ago'
  },
  {
    id: '6',
    title: 'Broke My Fast with the Right Foods!',
    description: 'After 16 hours of intermittent fasting, I broke my fast with bone broth, avocado, and eggs. Felt amazing and no digestive issues!',
    author: 'Marcus Lee',
    avatar: '🧘‍♂️',
    category: 'Success Stories',
    upvotes: 267,
    comments: 36,
    tags: ['Intermittent Fasting', 'Success', 'Nutrition'],
    createdAt: '1 week ago',
    replies: [
      {
        id: 'c4',
        author: 'Sofia',
        avatar: '🇪🇸',
        content: 'The bone broth is key! Many people mess up breaking fast with heavy foods.',
        createdAt: '6 days ago',
        likes: 42
      }
    ]
  }
]

export const categories = [
  'All Posts',
  'Recent Discussions',
  'Healthy Food Tips',
  'Diet Success Stories',
  'Ask the Community'
]

export const allTags = [
  'Weight Loss',
  'Muscle Gain',
  'Keto',
  'Diabetes',
  'Protein',
  'Low Carb',
  'Intermittent Fasting',
  'Vegan',
  'Gluten Free',
  'Motivation'
]
