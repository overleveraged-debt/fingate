/**
 * Google Apps Script for FIN GATE Contact Form
 * This script receives form data via POST request and stores it in Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet with headers: Date, Name, Email, Phone, Service, Message
 * 2. Go to Extensions > Apps Script
 * 3. Replace default code with this script
 * 4. Run initialSetup() function once
 * 5. Deploy as Web App with "Execute as: Me" and "Anyone can access"
 * 6. Copy the web app URL for frontend integration
 */

// Configuration
const SHEET_NAME = 'Sheet1'; // Change this if your sheet has a different name
const scriptProp = PropertiesService.getScriptProperties();

/**
 * Initial setup function - RUN THIS ONCE after creating the script
 * This function stores the spreadsheet ID for future use
 */
function initialSetup() {
  try {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProp.setProperty('key', activeSpreadsheet.getId());
    console.log('✅ Setup complete! Spreadsheet ID stored:', activeSpreadsheet.getId());
  } catch (error) {
    console.error('❌ Setup failed:', error);
    throw new Error('Failed to setup script. Make sure you run this from a Google Sheet.');
  }
}

/**
 * Main function that handles POST requests from the contact form
 * This function is automatically called when the web app receives a POST request
 */
function doPost(e) {
  // Get script lock to prevent concurrent executions
  const lock = LockService.getScriptLock();
  
  try {
    // Try to acquire lock for 10 seconds
    lock.tryLock(10000);
    
    // Log the incoming request for debugging
    console.log('📝 Form submission received');
    console.log('📋 Parameters:', e.parameter);
    
    // Validate required parameters
    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !e.parameter[field] || e.parameter[field].trim() === '');
    
    if (missingFields.length > 0) {
      console.log('❌ Missing required fields:', missingFields);
      return createResponse({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Validate email format
    const email = e.parameter.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return createResponse({
        success: false,
        message: 'Please enter a valid email address'
      });
    }
    
    // Get the spreadsheet
    const spreadsheetId = scriptProp.getProperty('key');
    if (!spreadsheetId) {
      console.log('❌ Spreadsheet ID not found. Run initialSetup() first.');
      return createResponse({
        success: false,
        message: 'Server configuration error. Please contact support.'
      });
    }
    
    const doc = SpreadsheetApp.openById(spreadsheetId);
    const sheet = doc.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      console.log('❌ Sheet not found:', SHEET_NAME);
      return createResponse({
        success: false,
        message: 'Server configuration error. Please contact support.'
      });
    }
    
    // Get headers from the first row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    console.log('📊 Sheet headers:', headers);
    
    // Prepare new row data
    const nextRow = sheet.getLastRow() + 1;
    const newRow = headers.map(function(header) {
      const headerLower = header.toLowerCase();
      
      // Handle special cases
      if (headerLower === 'date' || headerLower === 'timestamp') {
        return new Date();
      }
      
      // Map form parameters to sheet columns
      const paramValue = e.parameter[headerLower] || e.parameter[header] || '';
      return paramValue.toString().trim();
    });
    
    console.log('📝 New row data:', newRow);
    
    // Insert the new row
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    console.log('✅ Data saved successfully to row:', nextRow);
    
    // Return success response
    return createResponse({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      row: nextRow,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error processing form submission:', error);
    
    // Return error response
    return createResponse({
      success: false,
      message: 'Sorry, there was an error processing your request. Please try again or contact us directly.',
      error: error.toString()
    });
    
  } finally {
    // Always release the lock
    lock.releaseLock();
  }
}

/**
 * Helper function to create consistent JSON responses
 */
function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script is working
 * You can run this manually to test the doPost function
 */
function testFormSubmission() {
  const testEvent = {
    parameter: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91 9876543210',
      service: 'Personal Loan',
      message: 'This is a test message from the script'
    }
  };
  
  const result = doPost(testEvent);
  console.log('Test result:', result.getContent());
}

/**
 * Function to get current script URL (helpful for setup)
 */
function getScriptUrl() {
  const url = ScriptApp.getService().getUrl();
  console.log('📎 Current script URL:', url);
  return url;
}

// the simpler approach 
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    let data = e.parameter.data ? JSON.parse(e.parameter.data) : e.parameter;
    
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.message || '',
      'New Lead'
    ]);
    
    MailApp.sendEmail({
      to: 'fingate@gmail.com',
      subject: 'New FIN GATE Lead',
      body: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}`
    });
    
    return ContentService.createTextOutput(JSON.stringify({success: true}));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false}));
  }
}