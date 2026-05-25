# westzone

Design and Architecture
```
1. links in headerFooterManager.js use absolute file path (the url), so that regardless where the html located, links work.
```

The tournament management tie breaker rule as follow:  
These metrics are used as tie-breakers in the standings:  
1 Tournament Points are the primary sorting factor.  
2 If teams have the same Tournament Points, then Goals For (GF) is used as the first tie-breaker.  
3 If teams are still tied, the head-to-head result between the tied teams is used.  
4 Finally, if all of the above are tied, Goal Difference (GD) is used as the last tie-breaker.  

## Xiangqi (Chinese Chess) - Cloud Save/Load Feature

The xiangqi application now supports saving and loading games to/from the cloud using Supabase with Google authentication.

### Features

#### Local PGN (Existing)
- **💾 Save PGN**: Downloads the PGN file to your local device
- **📂 Load PGN**: Uploads a PGN file from your local device

#### Cloud Save/Load (New)
- **🔐 Google Login**: Authenticate with Google via Supabase
- **☁️ Save Game**: Save the current game state to the cloud (requires login)
- **📥 Load Game**: Load your most recent saved game from the cloud (requires login)
- **Logout**: Sign out of your Google account

### Setup Instructions

See [CLOUD_SETUP.md](./CLOUD_SETUP.md) for detailed setup instructions including:
1. Creating a Supabase project
2. Configuring Google OAuth
3. Setting up the database table
4. Testing the feature
