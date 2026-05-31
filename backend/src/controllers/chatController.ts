import { Request, Response } from 'express';
import { generateChatReply } from '../services/chatService';

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body as { message?: string };

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.',
      });
    }

    const reply = generateChatReply(message.trim());

    return res.status(200).json({
      success: true,
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('[CHAT-ERROR]', err);
    return res.status(500).json({
      success: false,
      message: 'Chat service temporarily unavailable.',
      error: err.message,
    });
  }
};
