import { Request, Response } from 'express';
import { Contact } from '../models/Contact';
import { Analytics } from '../models/Analytics';
import { sendContactNotification } from '../services/emailService';

// 1. Submit Contact Form Message
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All system parameters are required (Name, Email, Subject, Message).' 
      });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();

    const emailSent = await sendContactNotification({ name, email, subject, message });

    console.log(`[MAILER-SYSTEM] Received new message from ${name} (${email}) — email ${emailSent ? 'sent' : 'skipped (SMTP not configured)'}`);

    return res.status(201).json({
      success: true,
      message: emailSent
        ? 'TRANSMISSION RECEIVED: Notification sent. Chandan will contact you soon.'
        : 'TRANSMISSION RECEIVED: Secure uplink established. Chandan will contact you soon.',
      emailSent,
    });
  } catch (error: any) {
    console.error(`[ERROR] Contact submission failed:`, error);
    return res.status(500).json({
      success: false,
      message: 'SYSTEM FAULT: Message transmission failed. Please retry shortly.',
      error: error.message
    });
  }
};

// 2. Fetch Live Dashboard Statistics & Base Metrics
export const getStats = async (req: Request, res: Response) => {
  try {
    // Retrieve page views from database or default to 1530 if not created
    let viewsRecord = await Analytics.findOne({ metricName: 'page_views' });
    if (!viewsRecord) {
      viewsRecord = new Analytics({ metricName: 'page_views', count: 1250 });
      await viewsRecord.save();
    }

    // Dynamic stats object matching requirements
    // Base experience is 1.7+ years
    const stats = {
      yearsExperience: 1.7,
      apisDeveloped: 22,
      projectsCompleted: 12,
      usersSupported: 5230 + viewsRecord.count, // Dynamic user metrics based on page views!
      pageViews: viewsRecord.count
    };

    return res.status(200).json({
      success: true,
      stats
    });
  } catch (error: any) {
    console.error(`[ERROR] Fetching stats failed:`, error);
    return res.status(500).json({
      success: false,
      message: 'SYSTEM ERROR: Diagnostics data offline.',
      error: error.message
    });
  }
};

// 3. Register a Page View / Increment Counter
export const incrementViews = async (req: Request, res: Response) => {
  try {
    let viewsRecord = await Analytics.findOne({ metricName: 'page_views' });
    if (!viewsRecord) {
      viewsRecord = new Analytics({ metricName: 'page_views', count: 1250 });
    }
    
    viewsRecord.count += 1;
    viewsRecord.lastUpdated = new Date();
    await viewsRecord.save();

    console.log(`[ANALYTICS-SYSTEM] Dynamic portfolio hit registered. Total hits: ${viewsRecord.count}`);

    return res.status(200).json({
      success: true,
      pageViews: viewsRecord.count
    });
  } catch (error: any) {
    console.error(`[ERROR] Registering hit failed:`, error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
