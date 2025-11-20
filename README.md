# Steelwool Africa Lead Generation PWA

A Progressive Web App for managing lead generation follow-ups for Steelwool Africa LTD.

## Features

- 📱 **Installable** - Works as a standalone app on mobile and desktop
- 🔒 **Secure Authentication** - Role-based access for Supervisors and Sales Reps
- 📊 **Lead Management** - View, qualify, and track leads
- 🌐 **Offline Support** - Basic functionality available without internet
- 🔄 **Real-time Sync** - Connects to Google Sheets via Apps Script

## File Structure

```
steelwool-leads-pwa/
├── index.html              # Main application page
├── app.js                  # Application logic
├── service-worker.js       # PWA offline support
├── manifest.json           # PWA configuration
├── icons/                  # App icons (various sizes)
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md              # This file
```

## Setup Instructions

### Step 1: Prepare Google Apps Script

1. Open your Google Sheets document
2. Go to **Extensions > Apps Script**
3. Replace the default code with the Apps Script code provided
4. Save the project

### Step 2: Deploy Google Apps Script as Web App

1. In Apps Script, click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: Steelwool Leads API
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/XXXXXXXXX/exec`)
7. Click **Done**

### Step 3: Create App Icons

You need to create app icons in various sizes. You can:

**Option A: Use a Logo Generator Tool**
- Visit [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) or similar
- Upload your company logo
- Generate all required icon sizes

**Option B: Manual Creation**
- Create PNG images with the following sizes:
  - 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- Name them as: `icon-72x72.png`, `icon-96x96.png`, etc.
- Place all icons in the `icons/` folder

**Quick Start (Temporary):**
For testing, you can use a simple colored square:
1. Create a 512x512 image with your brand colors
2. Use an online tool to resize it to all required sizes
3. Or use placeholder images initially

### Step 4: Setup GitHub Repository

1. Create a new repository on GitHub
2. Name it: `steelwool-leads-pwa`
3. Make it **Public** (required for GitHub Pages)

### Step 5: Upload Files to GitHub

Upload these files to your repository:
- `index.html`
- `app.js`
- `service-worker.js`
- `manifest.json`
- `icons/` folder (with all icon files)
- `README.md`

### Step 6: Enable GitHub Pages

1. Go to your repository **Settings**
2. Scroll to **Pages** section
3. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment
6. Your PWA will be available at: `https://YOUR-USERNAME.github.io/steelwool-leads-pwa/`

### Step 7: Configure the PWA

1. Open your PWA URL in a browser
2. In the yellow **Configuration** section:
3. Paste your Google Apps Script Web App URL
4. Click **Save Configuration**
5. The app is now ready to use!

## Usage

### For Supervisors

1. Select **Supervisor** role
2. Enter the supervisor password when prompted
3. You can:
   - View all generated leads
   - Load individual leads by customer code
   - Edit qualification status
   - Approve or Decline leads
   - Assign sales reps to leads

### For Sales Representatives

1. Select **Sales Representative** role
2. Enter your email and password
3. You can:
   - View your qualified (approved) leads
   - Load individual leads by customer code
   - Update presentation status for approved leads

## Installing the PWA

### On Mobile (Android/iOS)

**Android:**
1. Open the PWA URL in Chrome
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home screen"
4. Follow the prompts

**iOS:**
1. Open the PWA URL in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

### On Desktop (Windows/Mac/Linux)

**Chrome/Edge:**
1. Open the PWA URL
2. Look for the install icon (➕ or computer icon) in the address bar
3. Click it and follow the prompts

**Or:**
1. Click the three dots menu
2. Select "Install Steelwool Leads..."
3. Click "Install"

## Updating the App

### To Update Google Apps Script:
1. Make changes in Apps Script
2. Click **Deploy > Manage deployments**
3. Click the edit icon (pencil) for your active deployment
4. Change **Version** to "New version"
5. Click **Deploy**

### To Update the PWA:
1. Edit files in your GitHub repository
2. Commit and push changes
3. Users will get the update automatically on next visit
4. You may need to update the `CACHE_NAME` in `service-worker.js` to force refresh

## Troubleshooting

### "Please configure the Google Apps Script URL first"
- Make sure you've entered and saved the Web App URL in the configuration section
- Check that the URL is correct and starts with `https://script.google.com/`

### "Connection failed"
- Check your internet connection
- Verify the Google Apps Script is deployed correctly
- Make sure "Who has access" is set to "Anyone" in deployment settings

### "Invalid credentials"
- Double-check your email and password
- Passwords are case-sensitive
- For sales reps, ensure your email matches the one in column B of the sheet

### PWA won't install
- Make sure you're using HTTPS (GitHub Pages provides this automatically)
- Try a different browser (Chrome/Edge work best)
- Check that manifest.json is accessible

### Icons not showing
- Verify all icon files are in the `icons/` folder
- Check file names match exactly (e.g., `icon-192x192.png`)
- Icons must be PNG format

## Security Notes

- **Passwords** are stored in the Apps Script code (server-side)
- Never share your deployed Web App URL publicly if it contains sensitive data
- Consider using Google's built-in authentication for production use
- The PWA stores the Script URL locally for convenience

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify your Google Apps Script deployment
3. Check browser console for error messages (F12)

## License

Copyright © 2025 Steelwool Africa LTD. All rights reserved.

---

**Version:** 1.0.0  
**Last Updated:** 2025