# Social Media Management System - Technical Specification

## Overview

This document outlines the architecture, features, and implementation plan for the BenchBarrier Social Media Management System. This system enables automated posting, scheduling, AI-generated content, analytics integration, and visual content creation across multiple social media platforms.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Social Media Management System                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │  Admin Dashboard│  │  Content Engine  │  │  Analytics Hub │ │
│  │   (Next.js UI)  │  │  (AI + Scheduler)│  │ (Google + Meta)│ │
│  └────────┬────────┘  └────────┬─────────┘  └────────┬───────┘ │
│           │                    │                      │          │
│  ┌────────▼──────────────────────────────────────────▼───────┐  │
│  │              Backend API (Next.js API Routes)              │  │
│  │  - Authentication      - Post Management                   │  │
│  │  - Content Generation  - Analytics Aggregation             │  │
│  │  - Image Processing    - Platform Integration              │  │
│  └────────────────────────────┬───────────────────────────────┘  │
│                               │                                   │
│  ┌────────────────────────────▼───────────────────────────────┐  │
│  │              Database (Supabase PostgreSQL)                │  │
│  │  - Posts & Schedules  - Media Assets                       │  │
│  │  - Analytics Data     - User Preferences                   │  │
│  │  - Templates          - Platform Connections                │  │
│  └────────────────────────────┬───────────────────────────────┘  │
│                               │                                   │
│  ┌────────────────────────────▼───────────────────────────────┐  │
│  │          External Services Integration Layer               │  │
│  │  - Instagram Graph API    - Twitter API v2                 │  │
│  │  - Facebook Graph API     - LinkedIn API                   │  │
│  │  - TikTok Business API    - Pinterest API                  │  │
│  │  - OpenAI GPT-4          - Google Analytics                │  │
│  │  - Cloudinary CDN        - Meta Business Suite             │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Database Schema

### Tables

#### 1. social_posts
```sql
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  media_urls JSONB DEFAULT '[]',
  platforms JSONB NOT NULL, -- ['instagram', 'facebook', 'twitter']
  status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, published, failed
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}', -- platform-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX idx_social_posts_status ON social_posts(status);
CREATE INDEX idx_social_posts_scheduled_for ON social_posts(scheduled_for);
```

#### 2. content_templates
```sql
CREATE TABLE content_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- product_launch, promotion, engagement, etc.
  template_content TEXT NOT NULL,
  variables JSONB DEFAULT '[]', -- ['product_name', 'discount', 'date']
  platforms JSONB DEFAULT '[]',
  is_public BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_content_templates_user_id ON content_templates(user_id);
CREATE INDEX idx_content_templates_category ON content_templates(category);
```

#### 3. social_analytics
```sql
CREATE TABLE social_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  impressions INTEGER DEFAULT 0,
  engagements INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  raw_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_analytics_post_id ON social_analytics(post_id);
CREATE INDEX idx_social_analytics_platform ON social_analytics(platform);
CREATE INDEX idx_social_analytics_synced_at ON social_analytics(synced_at);
```

#### 4. platform_connections
```sql
CREATE TABLE platform_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  account_id VARCHAR(255),
  account_name VARCHAR(255),
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  scopes JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform, account_id)
);

CREATE INDEX idx_platform_connections_user_id ON platform_connections(user_id);
CREATE INDEX idx_platform_connections_platform ON platform_connections(platform);
```

#### 5. media_library
```sql
CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL, -- image/jpeg, video/mp4
  file_size INTEGER,
  storage_url TEXT NOT NULL,
  cdn_url TEXT,
  thumbnail_url TEXT,
  alt_text TEXT,
  tags JSONB DEFAULT '[]',
  dimensions JSONB, -- {"width": 1080, "height": 1080}
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_media_library_user_id ON media_library(user_id);
CREATE INDEX idx_media_library_file_type ON media_library(file_type);
```

#### 6. ai_content_history
```sql
CREATE TABLE ai_content_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  generated_content TEXT NOT NULL,
  model VARCHAR(100), -- gpt-4, gpt-3.5-turbo
  tokens_used INTEGER,
  platform VARCHAR(50),
  was_used BOOLEAN DEFAULT FALSE,
  rating INTEGER, -- 1-5 stars
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ai_content_history_user_id ON ai_content_history(user_id);
CREATE INDEX idx_ai_content_history_was_used ON ai_content_history(was_used);
```

#### 7. posting_schedule
```sql
CREATE TABLE posting_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0-6 (Sunday-Saturday)
  time_slot TIME NOT NULL,
  platforms JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_posting_schedule_user_id ON posting_schedule(user_id);
```

## API Endpoints

### Post Management

#### POST /api/social/posts
Create a new social media post
```typescript
interface CreatePostRequest {
  title: string;
  content: string;
  mediaUrls?: string[];
  platforms: Platform[];
  scheduledFor?: Date;
  metadata?: Record<string, any>;
}

interface CreatePostResponse {
  post: SocialPost;
  success: boolean;
}
```

#### GET /api/social/posts
List all posts with pagination and filtering
```typescript
interface ListPostsQuery {
  status?: 'draft' | 'scheduled' | 'published' | 'failed';
  platform?: Platform;
  startDate?: string;
  endDate?: string;
  page?: number;
  perPage?: number;
}

interface ListPostsResponse {
  posts: SocialPost[];
  total: number;
  page: number;
  perPage: number;
}
```

#### PUT /api/social/posts/:id
Update a post
```typescript
interface UpdatePostRequest {
  title?: string;
  content?: string;
  mediaUrls?: string[];
  platforms?: Platform[];
  scheduledFor?: Date;
  status?: PostStatus;
}
```

#### DELETE /api/social/posts/:id
Delete a post

### Content Generation

#### POST /api/social/ai/generate
Generate content using AI
```typescript
interface GenerateContentRequest {
  prompt: string;
  platform: Platform;
  tone?: 'professional' | 'casual' | 'enthusiastic' | 'informative';
  length?: 'short' | 'medium' | 'long';
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  model?: 'gpt-4' | 'gpt-3.5-turbo';
}

interface GenerateContentResponse {
  content: string;
  tokensUsed: number;
  suggestions: string[];
}
```

#### POST /api/social/ai/suggest-topics
Get content topic suggestions
```typescript
interface SuggestTopicsRequest {
  industry?: string;
  previousPosts?: string[];
  platform: Platform;
}

interface SuggestTopicsResponse {
  topics: Array<{
    title: string;
    description: string;
    estimatedEngagement: 'low' | 'medium' | 'high';
  }>;
}
```

#### POST /api/social/ai/optimize
Optimize existing content
```typescript
interface OptimizeContentRequest {
  content: string;
  platform: Platform;
  goal?: 'engagement' | 'clicks' | 'awareness';
}

interface OptimizeContentResponse {
  originalContent: string;
  optimizedContent: string;
  changes: string[];
  estimatedImprovement: number; // percentage
}
```

### Template Management

#### GET /api/social/templates
List content templates
```typescript
interface ListTemplatesQuery {
  category?: string;
  platform?: Platform;
}

interface ListTemplatesResponse {
  templates: ContentTemplate[];
}
```

#### POST /api/social/templates
Create a new template
```typescript
interface CreateTemplateRequest {
  name: string;
  category: string;
  templateContent: string;
  variables: string[];
  platforms: Platform[];
}
```

#### POST /api/social/templates/:id/use
Use a template to create content
```typescript
interface UseTemplateRequest {
  variables: Record<string, string>; // { product_name: "BenchBarrier Pro" }
}

interface UseTemplateResponse {
  content: string;
}
```

### Analytics

#### GET /api/social/analytics/overview
Get analytics overview
```typescript
interface AnalyticsOverviewQuery {
  startDate: string;
  endDate: string;
  platform?: Platform;
}

interface AnalyticsOverviewResponse {
  totalImpressions: number;
  totalEngagements: number;
  averageEngagementRate: number;
  topPost: SocialPost;
  platformBreakdown: Record<Platform, PlatformMetrics>;
  trends: Array<{
    date: string;
    impressions: number;
    engagements: number;
  }>;
}
```

#### GET /api/social/analytics/posts/:id
Get analytics for specific post
```typescript
interface PostAnalyticsResponse {
  post: SocialPost;
  analytics: Record<Platform, {
    impressions: number;
    engagements: number;
    clicks: number;
    engagementRate: number;
    demographics?: any;
  }>;
  comparison: {
    vsAverage: number; // percentage
    vsLastPost: number; // percentage
  };
}
```

#### POST /api/social/analytics/sync
Sync analytics from platforms
```typescript
interface SyncAnalyticsRequest {
  platforms?: Platform[];
  startDate?: string;
  endDate?: string;
}

interface SyncAnalyticsResponse {
  synced: number;
  failed: number;
  errors: string[];
}
```

### Platform Integration

#### POST /api/social/platforms/connect
Connect a social media account
```typescript
interface ConnectPlatformRequest {
  platform: Platform;
  authCode?: string;
  redirectUri?: string;
}

interface ConnectPlatformResponse {
  connection: PlatformConnection;
  authUrl?: string; // If OAuth flow needed
}
```

#### DELETE /api/social/platforms/:id/disconnect
Disconnect a platform

#### POST /api/social/platforms/:id/refresh
Refresh access token

### Media Management

#### POST /api/social/media/upload
Upload media file
```typescript
interface UploadMediaRequest {
  file: File;
  altText?: string;
  tags?: string[];
}

interface UploadMediaResponse {
  media: MediaAsset;
  url: string;
  thumbnailUrl?: string;
}
```

#### GET /api/social/media
List media library
```typescript
interface ListMediaQuery {
  type?: 'image' | 'video';
  tags?: string[];
  page?: number;
}
```

#### DELETE /api/social/media/:id
Delete media asset

### Image Design

#### POST /api/social/design/generate
Generate image using AI
```typescript
interface GenerateImageRequest {
  prompt: string;
  style?: 'brutalist' | 'modern' | 'minimal';
  dimensions?: { width: number; height: number };
  platform?: Platform; // Auto-size for platform
}

interface GenerateImageResponse {
  imageUrl: string;
  metadata: any;
}
```

#### POST /api/social/design/edit
Edit existing image
```typescript
interface EditImageRequest {
  imageUrl: string;
  filters?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    blur?: number;
  };
  overlays?: Array<{
    type: 'text' | 'logo' | 'shape';
    content?: string;
    position: { x: number; y: number };
    style?: any;
  }>;
  resize?: { width: number; height: number };
}
```

### Scheduling

#### GET /api/social/schedule
Get posting schedule
```typescript
interface GetScheduleResponse {
  schedule: PostingSchedule[];
  upcomingPosts: SocialPost[];
}
```

#### POST /api/social/schedule
Create or update schedule slot
```typescript
interface CreateScheduleRequest {
  dayOfWeek: number; // 0-6
  timeSlot: string; // "09:00"
  platforms: Platform[];
  timezone?: string;
}
```

#### POST /api/social/schedule/auto-fill
Auto-fill schedule with content suggestions

## Frontend Components

### Dashboard Structure

```
app/
├── dashboard/
│   ├── layout.tsx              # Dashboard layout with sidebar
│   ├── page.tsx                # Dashboard home/overview
│   ├── posts/
│   │   ├── page.tsx           # Posts list
│   │   ├── new/
│   │   │   └── page.tsx       # Create new post
│   │   └── [id]/
│   │       ├── page.tsx       # View/edit post
│   │       └── analytics/
│   │           └── page.tsx   # Post analytics
│   ├── schedule/
│   │   └── page.tsx           # Calendar view
│   ├── analytics/
│   │   ├── page.tsx           # Analytics overview
│   │   └── [platform]/
│   │       └── page.tsx       # Platform-specific analytics
│   ├── content/
│   │   ├── templates/
│   │   │   └── page.tsx       # Template library
│   │   ├── ai-generator/
│   │   │   └── page.tsx       # AI content generation
│   │   └── media/
│   │       └── page.tsx       # Media library
│   ├── design/
│   │   └── page.tsx           # Image design workspace
│   └── settings/
│       ├── page.tsx           # General settings
│       └── platforms/
│           └── page.tsx       # Connected platforms
```

### Key Components

#### components/dashboard/

**Sidebar Navigation**
```typescript
// components/dashboard/sidebar.tsx
export const DashboardSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-stone-950 border-r-2 border-stone-800">
      <nav>
        <NavItem icon={HomeIcon} href="/dashboard" label="Overview" />
        <NavItem icon={FileTextIcon} href="/dashboard/posts" label="Posts" />
        <NavItem icon={CalendarIcon} href="/dashboard/schedule" label="Schedule" />
        <NavItem icon={BarChartIcon} href="/dashboard/analytics" label="Analytics" />
        <NavItem icon={SparklesIcon} href="/dashboard/content/ai-generator" label="AI Generator" />
        <NavItem icon={ImageIcon} href="/dashboard/design" label="Design Studio" />
        <NavItem icon={SettingsIcon} href="/dashboard/settings" label="Settings" />
      </nav>
    </aside>
  );
};
```

**Post Editor**
```typescript
// components/dashboard/post-editor.tsx
interface PostEditorProps {
  initialPost?: SocialPost;
  onSave: (post: Partial<SocialPost>) => Promise<void>;
}

export const PostEditor: React.FC<PostEditorProps> = ({ initialPost, onSave }) => {
  const [content, setContent] = useState(initialPost?.content || '');
  const [platforms, setPlatforms] = useState<Platform[]>(initialPost?.platforms || []);
  const [mediaUrls, setMediaUrls] = useState<string[]>(initialPost?.mediaUrls || []);
  const [scheduledFor, setScheduledFor] = useState<Date | null>(initialPost?.scheduledFor || null);

  return (
    <div className="space-y-6">
      <PlatformSelector 
        selected={platforms}
        onChange={setPlatforms}
      />
      
      <ContentTextarea
        value={content}
        onChange={setContent}
        platforms={platforms}
        maxLength={getMaxLength(platforms)}
      />
      
      <MediaUploader
        urls={mediaUrls}
        onUpload={(url) => setMediaUrls([...mediaUrls, url])}
        onRemove={(url) => setMediaUrls(mediaUrls.filter(u => u !== url))}
      />
      
      <SchedulePicker
        value={scheduledFor}
        onChange={setScheduledFor}
      />
      
      <div className="flex gap-4">
        <Button onClick={() => onSave({ content, platforms, mediaUrls, scheduledFor, status: 'draft' })}>
          Save Draft
        </Button>
        <Button onClick={() => onSave({ content, platforms, mediaUrls, scheduledFor, status: 'scheduled' })}>
          Schedule Post
        </Button>
      </div>
    </div>
  );
};
```

**AI Content Generator**
```typescript
// components/dashboard/ai-content-generator.tsx
export const AIContentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch('/api/social/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, platform: 'instagram' }),
    });
    const data = await response.json();
    setGeneratedContent(data.content);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>What would you like to post about?</Label>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Announce our new BenchBarrier Pro product with 20% launch discount"
          rows={3}
        />
      </div>
      
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Content'}
      </Button>
      
      {generatedContent && (
        <div className="border-2 border-blue-500 p-4">
          <Label>Generated Content</Label>
          <p className="mt-2">{generatedContent}</p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => navigator.clipboard.writeText(generatedContent)}>
              Copy
            </Button>
            <Button onClick={() => {/* Open in post editor */}}>
              Use This Content
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
```

**Analytics Dashboard**
```typescript
// components/dashboard/analytics-overview.tsx
export const AnalyticsOverview: React.FC<{ dateRange: DateRange }> = ({ dateRange }) => {
  const { data, loading } = useAnalytics(dateRange);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          title="Total Impressions"
          value={data.totalImpressions}
          change={data.impressionsChange}
          icon={EyeIcon}
        />
        <MetricCard 
          title="Engagements"
          value={data.totalEngagements}
          change={data.engagementsChange}
          icon={HeartIcon}
        />
        <MetricCard 
          title="Engagement Rate"
          value={`${data.averageEngagementRate}%`}
          change={data.engagementRateChange}
          icon={TrendingUpIcon}
        />
        <MetricCard 
          title="Posts Published"
          value={data.totalPosts}
          icon={FileTextIcon}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={data.trends} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={data.platformBreakdown} />
        </CardContent>
      </Card>
    </div>
  );
};
```

**Calendar Schedule View**
```typescript
// components/dashboard/calendar-view.tsx
export const CalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { posts, schedule } = useSchedule(currentMonth);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-mono uppercase">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            Previous
          </Button>
          <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            Next
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-mono uppercase text-sm text-stone-400">
            {day}
          </div>
        ))}
        
        {generateCalendarDays(currentMonth).map(day => (
          <CalendarDay
            key={day.toString()}
            date={day}
            posts={posts.filter(p => isSameDay(p.scheduledFor, day))}
            schedule={schedule.filter(s => s.dayOfWeek === day.getDay())}
          />
        ))}
      </div>
    </div>
  );
};
```

**Image Design Studio**
```typescript
// components/dashboard/design-studio.tsx
export const DesignStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-mono uppercase">Design Tools</h3>
        
        <Tabs defaultValue="upload">
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="ai">AI Generate</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <FileUploader onUpload={setSelectedImage} />
          </TabsContent>
          
          <TabsContent value="ai">
            <AIImageGenerator onGenerate={setSelectedImage} />
          </TabsContent>
          
          <TabsContent value="templates">
            <TemplateGallery onSelect={setSelectedImage} />
          </TabsContent>
        </Tabs>
        
        {selectedImage && (
          <div className="space-y-4">
            <h4 className="font-mono uppercase">Filters</h4>
            <FilterSlider
              label="Brightness"
              value={filters.brightness}
              onChange={(v) => setFilters({ ...filters, brightness: v })}
            />
            <FilterSlider
              label="Contrast"
              value={filters.contrast}
              onChange={(v) => setFilters({ ...filters, contrast: v })}
            />
            <FilterSlider
              label="Saturation"
              value={filters.saturation}
              onChange={(v) => setFilters({ ...filters, saturation: v })}
            />
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-mono uppercase mb-4">Preview</h3>
        <ImagePreview
          src={selectedImage}
          filters={filters}
        />
      </div>
    </div>
  );
};
```

## Platform-Specific Requirements

### Instagram
- Max caption: 2,200 characters
- Max hashtags: 30
- Image ratios: 1:1, 4:5, 1.91:1
- Video: Max 60 seconds (feed), 90 seconds (reels)
- Stories: 15 seconds per story

### Facebook
- Max post: 63,206 characters
- Image: Minimum 1200x630px
- Video: Max 240 minutes
- Link previews: Automatic

### Twitter/X
- Max tweet: 280 characters (4,000 for Premium)
- Image: Max 5MB, up to 4 images
- Video: Max 2 minutes 20 seconds (512MB)
- GIF: Max 15MB

### LinkedIn
- Max post: 3,000 characters
- Image: 1200x627px recommended
- Video: Max 10 minutes
- Articles: Up to 125,000 characters

### TikTok
- Video: 15 seconds to 10 minutes
- Max caption: 150 characters
- Max hashtags: 30
- Video size: Max 287.6MB

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- [ ] Database schema creation
- [ ] Basic API endpoints (CRUD for posts)
- [ ] Authentication & authorization
- [ ] Simple dashboard layout

### Phase 2: Core Features (Weeks 3-4)
- [ ] Post creation & editing
- [ ] Media upload & management
- [ ] Basic scheduling
- [ ] Platform connection (OAuth flows)

### Phase 3: AI Integration (Weeks 5-6)
- [ ] OpenAI integration
- [ ] Content generation
- [ ] Content optimization
- [ ] Topic suggestions

### Phase 4: Analytics (Weeks 7-8)
- [ ] Google Analytics integration
- [ ] Platform analytics sync
- [ ] Analytics dashboard
- [ ] Performance insights

### Phase 5: Advanced Features (Weeks 9-10)
- [ ] Content templates
- [ ] Auto-scheduling
- [ ] Image design studio
- [ ] Batch operations

### Phase 6: Polish & Launch (Weeks 11-12)
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation
- [ ] Beta testing

## Security Considerations

1. **OAuth Token Storage**: Encrypt access tokens in database
2. **Rate Limiting**: Implement per-user and global rate limits
3. **Content Validation**: Sanitize user input, validate media
4. **API Security**: Use API keys, CORS, CSRF protection
5. **Audit Logging**: Log all post publishing and analytics access
6. **Data Privacy**: GDPR compliance, user data export/deletion

## Performance Optimization

1. **Caching**: Redis for analytics data, post drafts
2. **CDN**: Cloudinary for media delivery
3. **Database**: Indexes on frequently queried fields
4. **API**: GraphQL for flexible data fetching
5. **Background Jobs**: Queue for post publishing, analytics sync
6. **Image Optimization**: Automatic compression, format conversion

## Monitoring & Observability

1. **Error Tracking**: Sentry for errors
2. **Performance**: Web Vitals tracking
3. **Usage Analytics**: Track feature usage
4. **API Monitoring**: Response times, error rates
5. **Cost Tracking**: Monitor API usage costs (OpenAI, platforms)

## Future Enhancements

- **Mobile App**: React Native app for on-the-go posting
- **Collaboration**: Team accounts, approval workflows
- **Advanced Analytics**: Sentiment analysis, competitor tracking
- **Video Editing**: Built-in video editor
- **Hashtag Research**: Trending hashtags, suggestions
- **Influencer Tools**: Link in bio, affiliate tracking
- **Multi-account**: Manage multiple brand accounts
- **White Label**: Custom branding for agencies

## Resources

- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api/)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [LinkedIn API](https://docs.microsoft.com/en-us/linkedin/)
- [TikTok Business API](https://developers.tiktok.com/doc/overview)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)

---

**Last Updated**: January 8, 2026  
**Version**: 1.0.0  
**Status**: Design Phase
