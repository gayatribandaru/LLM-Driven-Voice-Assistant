# 🎙️ LLM-Driven Voice Assistant Platform

A voice assistant prototype built with OpenAI APIs for intelligent appointment scheduling and customer interactions. Features prompt-engineered conversation flows, context chaining, comprehensive fallback logic, and real-time monitoring capabilities.

## 🚀 Features

### Core Functionality
- **Voice-to-Text Processing**: Real-time voice transcription with Web Audio API
- **LLM-Powered Responses**: Context-aware conversations using OpenAI GPT-4
- **Appointment Scheduling**: Automated booking with conflict detection
- **Context Chaining**: Maintains conversation history for natural dialogue flow
- **Fallback Logic**: Handles edge cases with graceful degradation

### User Interface
- **Voice Interface**: Interactive chat with voice recording and text input
- **Admin Dashboard**: Real-time monitoring of conversations and appointments
- **Documentation Portal**: Comprehensive edge case scenarios and handling strategies
- **Responsive Design**: Optimized for desktop and mobile experiences

### Technical Features
- **Edge Functions**: Serverless API endpoints for processing and business logic
- **Database Integration**: Supabase PostgreSQL with Row Level Security
- **Type Safety**: Full TypeScript implementation
- **Real-time Updates**: Live conversation and appointment tracking

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase Edge Functions (Deno runtime)
- **AI/ML**: OpenAI GPT-4 API, Web Speech API
- **Database**: Supabase PostgreSQL
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- OpenAI API key

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd voice-assistant-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

The `.env` file should contain:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up OpenAI API Key**

The OpenAI API key is configured automatically in Supabase Edge Functions as `OPENAI_API_KEY`. You need to add it through your Supabase project dashboard:
- Go to Project Settings > Edge Functions > Secrets
- Add `OPENAI_API_KEY` with your OpenAI API key value

5. **Database is already configured**

The database schema has been deployed with:
- Customer records table
- Appointments table with conflict detection
- Conversations and messages tables
- Edge cases documentation table
- Sample CRM data pre-populated

## 🎯 Usage

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📱 Application Structure

### Voice Interface
- **Location**: Main landing page
- **Purpose**: Primary user interaction point
- **Features**:
  - Voice recording with visual feedback
  - Text input alternative
  - Real-time conversation display
  - Text-to-speech responses
  - Session management

### Admin Dashboard
- **Location**: Dashboard tab
- **Purpose**: Monitor system activity
- **Features**:
  - Active conversation tracking
  - Appointment overview
  - Conversation history with full transcripts
  - Customer information display
  - Status indicators and analytics

### Documentation Portal
- **Location**: Documentation tab
- **Purpose**: Edge case reference
- **Features**:
  - Pre-documented edge cases
  - Handling strategies
  - Example conversation flows
  - Searchable scenarios

## 🔄 Conversation Flow

1. **Initialization**
   - User starts conversation via voice or text
   - System creates session and conversation record
   - System prompt establishes assistant behavior

2. **Context Building**
   - Each message is stored with timestamps
   - Conversation history is maintained
   - Context is passed to OpenAI for continuity

3. **Intent Recognition**
   - OpenAI analyzes user input
   - Identifies appointment scheduling intent
   - Extracts relevant parameters (date, time, service)

4. **Validation & Confirmation**
   - System validates extracted information
   - Checks for conflicts
   - Confirms details with user

5. **Fulfillment**
   - Creates appointment record
   - Links to customer profile
   - Updates conversation status

## 🛡️ Edge Cases Handled

### 1. Unclear Date/Time
- **Strategy**: Ask clarifying questions with specific options
- **Fallback**: Suggest next available slots

### 2. Multiple Service Requests
- **Strategy**: Handle sequentially with clear confirmation
- **Fallback**: Prioritize based on context

### 3. No Available Slots
- **Strategy**: Apologize and offer nearest alternatives
- **Fallback**: Provide waitlist option

### 4. Customer Identification Failure
- **Strategy**: Request identifying information politely
- **Fallback**: Create new customer record

### 5. Poor Audio Quality
- **Strategy**: Request repetition and confirm understanding
- **Fallback**: Switch to text input

## 🔐 Security Features

- Row Level Security (RLS) enabled on all tables
- API key protection via server-side functions
- Input validation and sanitization
- CORS headers properly configured
- Secure credential handling

## 📊 Database Schema

### Tables

**customers**
- Customer profiles and preferences
- Contact information
- CRM integration data

**appointments**
- Scheduled appointments
- Service type and status
- Linked to customer records

**conversations**
- Session tracking
- Status and metadata
- Customer association

**conversation_messages**
- Individual messages
- Role identification (user/assistant/system)
- Confidence scores

**edge_cases**
- Documented scenarios
- Handling strategies
- Example conversations

## 🚀 Deployment

### Supabase Edge Functions

Three edge functions are deployed:

1. **process-voice-input**
   - Handles voice/text input processing
   - Manages OpenAI API integration
   - Maintains conversation context

2. **create-appointment**
   - Appointment creation logic
   - Conflict detection
   - Customer management

3. **get-conversation-history**
   - Retrieves conversation records
   - Provides admin dashboard data

### Frontend Deployment

Can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🧪 Testing Scenarios

### Happy Path
1. User requests appointment
2. System asks for date preference
3. User provides date
4. System asks for time
5. User provides time
6. System confirms and books

### Edge Cases
1. Test unclear input handling
2. Test no available slots scenario
3. Test multiple requests in one message
4. Test poor audio simulation
5. Test customer identification flow

## 📈 Future Enhancements

- [ ] Actual Whisper API integration for audio transcription
- [ ] Multi-language support
- [ ] SMS/Email notifications
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Advanced analytics dashboard
- [ ] A/B testing for prompt optimization
- [ ] Voice cloning for personalized responses
- [ ] Integration with popular CRM systems
- [ ] Webhook support for external systems

## 🤝 Contributing

This is a prototype project built for demonstration purposes. For production use:

1. Replace simulated transcription with actual Whisper API
2. Implement proper authentication
3. Add comprehensive error logging
4. Set up monitoring and alerting
5. Conduct security audit
6. Add end-to-end tests

## 🙋 Support

For questions or issues:
1. Check the edge cases documentation
2. Review the conversation logs in admin dashboard
3. Consult the Supabase function logs

## 🎓 Learning Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Web Speech API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
