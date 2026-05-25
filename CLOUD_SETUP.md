# Cloud Save/Load Setup Instructions

## Overview
The xiangqi application now supports multiple cloud save options:
1. **Supabase Cloud Storage** - Save games to a database with user authentication
2. **Google Drive** - Save games directly to your Google Drive

### Features:
- 📧 **Email Login/Register** - Create account with email and password
- 🔐 **Google Login** - Quick sign-in with Google account
- ☁️ **Save Game** - Save to Supabase cloud with custom name and notes
- 📥 **Load Game** - Browse and load any saved game from cloud
- 🗂️ **Google Drive** - Save/load PGN files to/from Google Drive
- 💾 **Save PGN** (Local) - Download PGN file to device
- 📂 **Load PGN** (Local) - Upload PGN file from device

## Part 1: Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: Choose a name (e.g., "xiangqi-games")
   - **Database Password**: Create a strong password
   - **Region**: Select the closest region to your users
5. Wait for the project to be created (takes a few minutes)

### Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll find two important values:
   - **Project URL**: Something like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`

3. Open `index.html` and update these lines:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

Replace with your actual credentials:
```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### Step 3: Configure Authentication Providers

#### Enable Email/Password Authentication:
1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Email** and make sure it's enabled
3. Optionally disable email confirmation for testing (not recommended for production)

#### Enable Google OAuth:
1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list and click to expand it
3. Toggle **Enable Sign in with Google** to ON

##### Create Google OAuth Credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth client ID**
6. Select **Web application**
7. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - Also add your local development URL if testing locally
8. Copy the **Client ID** and **Client Secret**

##### Back in Supabase:
1. Paste the Google **Client ID** into the Supabase Google provider settings
2. Paste the Google **Client Secret** into the Supabase Google provider settings
3. Click **Save**

### Step 4: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste the following SQL and run it:

```sql
-- Create games table with extended fields
CREATE TABLE IF NOT EXISTS games (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  game_id TEXT NOT NULL,
  game_name TEXT,
  notes TEXT,
  pgn TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_games_user_id ON games(user_id);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own games
CREATE POLICY "Users can view their own games"
  ON games FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own games
CREATE POLICY "Users can insert their own games"
  ON games FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own games
CREATE POLICY "Users can delete their own games"
  ON games FOR DELETE
  USING (auth.uid() = user_id);
```

## Part 2: Google Drive Setup (Optional)

To enable Google Drive save/load functionality:

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one

### Step 2: Enable Google Drive API

1. Go to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click **Enable**

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Web application**
4. Add authorized JavaScript origins:
   - Your website URL (e.g., `https://yourdomain.com`)
   - For local testing: `http://localhost`, `http://localhost:8080`, etc.
5. Copy the **Client ID**

### Step 4: Update index.html

Find and update these values in the `connectGoogleDrive()` function:
```javascript
apiKey: 'YOUR_GOOGLE_API_KEY',
clientId: 'YOUR_GOOGLE_CLIENT_ID',
```

## Step 5: Test the Features

1. Open `index.html` in your browser
2. You should see the "CLOUD · 云存储" panel

### Testing Supabase Features:
1. Click "📧 Email Login / Register" to create an account or login
   - Or use "🔐 Google Login" for quick sign-in
2. After logging in, you'll see:
   - Your email address
   - "☁️ Save Game" button
   - "📥 Load Game" button
   - "🗂️ Google Drive" button
3. Click "☁️ Save Game":
   - Enter a game name (optional)
   - Add notes (optional)
   - Click "💾 Save"
4. Click "📥 Load Game":
   - See a list of all your saved games
   - Click any game to load it

### Testing Google Drive Features:
1. Click "🗂️ Google Drive"
2. Click "🔗 Connect Google Drive"
3. Authorize the application when prompted
4. Use "💾 Save to Drive" or "📂 Load from Drive"

## Feature Summary

### Local PGN (Always Available)
| Button | Function |
|--------|----------|
| 💾 Save PGN | Downloads PGN file to local device |
| 📂 Load PGN | Uploads PGN file from local device |

### Supabase Cloud (Requires Login)
| Button | Function |
|--------|----------|
| 📧 Email Login/Register | Create account or login with email/password |
| 🔐 Google Login | Quick sign-in with Google account |
| ☁️ Save Game | Save game to cloud with custom name and notes |
| 📥 Load Game | Browse and select from all saved games |
| Logout | Sign out of account |

### Google Drive (Requires Connection)
| Button | Function |
|--------|----------|
| 🔗 Connect Google Drive | Authorize Google Drive access |
| 💾 Save to Drive | Save PGN file directly to Google Drive |
| 📂 Load from Drive | Browse and load PGN files from Google Drive |

## Notes

1. **Security**: The database uses Row Level Security (RLS) to ensure users can only access their own games.

2. **Email Confirmation**: By default, Supabase requires email confirmation. You can disable this in **Authentication** → **Providers** → **Email** for testing purposes.

3. **Password Requirements**: Passwords must be at least 6 characters long.

4. **Game Management**: 
   - Each save creates a new record with timestamp
   - Load Game shows all saved games sorted by date
   - You can save multiple versions of the same game

5. **Development vs Production**: 
   - For local development, add localhost URLs to OAuth redirect URIs
   - For production, add your production domain

## Troubleshooting

### "Supabase is not configured" error
Make sure you've replaced the placeholder credentials in `index.html`.

### Email registration doesn't work
- Check that Email provider is enabled in Supabase
- Check browser console for errors
- Verify email format is correct

### Google login doesn't work
- Verify Google OAuth is enabled in Supabase
- Check Client ID and Secret are correct
- Ensure redirect URI is properly configured

### Google Drive connection fails
- Verify Google Drive API is enabled
- Check OAuth credentials are correct
- Ensure authorized origins include your domain

### "No saved games found"
This appears when you haven't saved any games yet. Click "☁️ Save Game" first.

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth - Email/Password](https://supabase.com/docs/guides/auth/auth-email-password)
- [Supabase Auth - Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Drive API Documentation](https://developers.google.com/drive/api)
