# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the FIN GATE contact form in just a few minutes.

## Overview

The integration consists of:
- **Google Sheet**: Stores form submissions
- **Google Apps Script**: Receives form data and writes to sheet
- **Frontend Form**: Sends data to Google Apps Script

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"FIN GATE Contact Form Submissions"**
4. In the first row, add these headers exactly (case-sensitive):

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Date | Name | Email | Phone | Service | Message |

⚠️ **Important**: Headers must match exactly (case-sensitive)

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions > Apps Script**
2. You'll see a new tab with `Code.gs` file
3. **Delete all existing code** in the file
4. **Copy and paste** the entire code from `google-apps-script-backend.js`
5. Click **File > Save** (or Ctrl+S)
6. Name the project **"FIN GATE Form Handler"**

## Step 3: Run Initial Setup

1. In the Apps Script editor, make sure `initialSetup` is selected in the function dropdown
2. Click the **▶️ Run** button
3. **Authorization Required** dialog will appear:
   - Click **"Review permissions"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to FIN GATE Form Handler (unsafe)"**
   - Click **"Allow"**
4. You should see **"Execution completed"** in the console

## Step 4: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **"Web app"**
4. Configure deployment:
   - **Description**: "FIN GATE Contact Form Handler"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone"
5. Click **"Deploy"**
6. **IMPORTANT**: Copy the **Web app URL** (starts with `https://script.google.com/macros/s/...`)
7. Click **"Done"**

## Step 5: Update Frontend Code

1. Open `finfree/contact-form-handler.js`
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with your actual web app URL from Step 4
4. Save the file

## Step 6: Include Script in HTML

Add this script tag to your HTML files (before closing `</body>` tag):

```html
<script src="./contact-form-handler.js"></script>
```

For the main pages, add it after the existing scripts:
- `index.html`
- `services.html` 
- `certificates.html`

## Testing the Integration

1. Open your website
2. Scroll to the contact form
3. Fill out all required fields:
   - Name
   - Email
   - Phone
   - Service (select from dropdown)
   - Message (optional)
4. Click **"Send Message"**
5. You should see:
   - Loading spinner while submitting
   - Success message: "Thank you for your message! We will get back to you soon."
   - Form fields reset
6. Check your Google Sheet - new row should appear with the data

## Troubleshooting

### Form not submitting?
- Check browser console for errors (F12 → Console tab)
- Verify Google Apps Script URL is correct
- Make sure all required fields are filled

### Data not appearing in sheet?
- Check Google Apps Script execution logs (Apps Script editor → Executions)
- Verify sheet headers match form field names exactly
- Make sure you ran `initialSetup()` function

### Getting permission errors?
- Re-run the authorization process in Step 3
- Make sure web app is deployed with "Anyone" access

### Still having issues?
1. Test the Google Apps Script directly:
   - In Apps Script editor, select `testFormSubmission` function
   - Click **▶️ Run**
   - Check if test data appears in your sheet
2. Check the browser network tab (F12 → Network) when submitting form
3. Look at Google Apps Script execution logs for detailed error messages

## Security Notes

- The web app runs under your Google account permissions
- Form data is stored in your private Google Sheet
- Only you can access the sheet and script unless you explicitly share them
- The web app URL can be public but only accepts form data

## Next Steps

Once everything is working:
1. You can customize the Google Sheet (add formatting, charts, etc.)
2. Set up email notifications when new submissions arrive
3. Add more form fields by updating both the sheet headers and form HTML
4. Consider adding Google Analytics tracking for form submissions

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Google Apps Script execution logs
3. Test with the provided test function
4. Verify all setup steps were completed correctly
