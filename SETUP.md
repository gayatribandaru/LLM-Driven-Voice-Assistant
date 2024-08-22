# 🔧 Setup Guide for Voice Assistant Platform

This guide will help you get the voice assistant platform up and running for your GitHub portfolio.

## Quick Start

### 1. Prerequisites Check

Ensure you have:
- ✅ Node.js 18 or higher installed
- ✅ npm or yarn package manager
- ✅ A Supabase account (free tier works great)
- ✅ An OpenAI API key

### 2. Project Setup

```bash
# Clone your repository
git clone <your-repo-url>
cd voice-assistant-platform

# Install dependencies
npm install
```

### 3. Environment Configuration

The `.env` file contains your Supabase connection details:

```env
VITE_SUPABASE_URL=https://bqfxodzqvwdxwkkjabld.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

**These are already configured!** ✅

### 4. Configure OpenAI API Key

You need to add your OpenAI API key to Supabase:

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to: **Project Settings** → **Edge Functions** → **Secrets**
4. Click "**Add Secret**"
5. Add:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key (get it from [platform.openai.com](https://platform.openai.com/api-keys))

### 5. Verify Database Setup

Your database is already configured with:
- ✅ All tables created (customers, appointments, conversations, etc.)
- ✅ Row Level Security enabled
- ✅ Sample CRM data populated
- ✅ Edge cases documented

You can verify by running:
```sql
SELECT COUNT(*) FROM customers;
-- Should return 5 sample customers
```

### 6. Verify Edge Functions

Three edge functions are already deployed:
- ✅ `process-voice-input` - Handles AI conversations
- ✅ `create-appointment` - Manages appointments
- ✅ `get-conversation-history` - Retrieves data

Verify in Supabase Dashboard: **Edge Functions** section

### 7. Run the Application

```bash
# Development mode
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 8. Test the Voice Assistant

1. Click the **Voice Assistant** tab
2. Click the microphone button to start recording
3. Say: "I'd like to schedule an appointment"
4. Or type: "I need an appointment for next Tuesday"
5. Follow the conversation flow

**Alternative**: Use text input if microphone permissions are not granted

## Testing Checklist

Use these test scenarios to demonstrate functionality:

### ✅ Basic Appointment Flow
- [ ] Start conversation
- [ ] Request appointment
- [ ] Provide date
- [ ] Provide time
- [ ] Confirm booking

### ✅ Edge Cases
- [ ] Test unclear date ("sometime soon")
- [ ] Test unavailable time slot
- [ ] Test multiple services in one request
- [ ] Test without customer identification

### ✅ Dashboard Features
- [ ] View active conversations
- [ ] Check appointment list
- [ ] Open conversation details
- [ ] Review edge cases documentation

## GitHub Repository Optimization

### Add These Files to Your Repo

1. **README.md** ✅ Already created
2. **SETUP.md** ✅ This file
3. **.github/workflows/deploy.yml** ✅ CI/CD workflow

### Add GitHub Secrets

For the CI/CD workflow to work:

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Recommended GitHub Topics

Add these topics to your repository:
- `voice-assistant`
- `openai`
- `gpt-4`
- `supabase`
- `react`
- `typescript`
- `appointment-scheduling`
- `llm`
- `conversation-ai`

## Troubleshooting

### Issue: Microphone not working
**Solution**: Grant microphone permissions in browser settings or use text input mode

### Issue: OpenAI API errors
**Solution**:
1. Verify API key is added to Supabase Edge Functions secrets
2. Check OpenAI account has credits
3. Review Supabase function logs

### Issue: Conversations not saving
**Solution**: Check browser console for errors and verify Supabase connection

### Issue: Build fails
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Production Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Option 2: Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

### Option 3: GitHub Pages

```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## Performance Optimization

### For Portfolio Demos

1. **Pre-record a demo conversation**: Use screen recording software
2. **Prepare test scenarios**: Have specific prompts ready
3. **Use text input**: More reliable for demos than voice
4. **Keep OpenAI responses quick**: Use shorter max_tokens values

### Cost Management

- OpenAI API calls cost money - use gpt-3.5-turbo for testing
- Supabase free tier includes:
  - 500 MB database space
  - 2 GB bandwidth
  - 1 GB file storage

## Next Steps

1. ✅ Test all features locally
2. ✅ Add screenshots to README
3. ✅ Record demo video
4. ✅ Push to GitHub
5. ✅ Add GitHub topics
6. ✅ Share on LinkedIn/Twitter
7. ✅ Deploy to production

## Support

If you encounter issues:
1. Check Supabase function logs
2. Review browser console errors
3. Verify environment variables
4. Check OpenAI API usage dashboard

---

**Good luck with your portfolio project!** 🚀

Your voice assistant platform is production-ready and demonstrates:
- Full-stack development skills
- AI/ML integration expertise
- Database design and management
- Modern React development
- TypeScript proficiency
- Serverless architecture
- Real-time applications
