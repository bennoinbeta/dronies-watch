import { NextFunction, Request, Response } from 'express';
import { signedCookie } from 'cookie-parser';
import { getRepository } from 'typeorm';
import { Session } from '../../db/entities/Session';
import config from '../../config';

const sessionRepository = getRepository(Session);
const discordSessionConfig = config.session.discord;

// Middleware function
export async function deserializeSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies[discordSessionConfig.name] == null) return next();

  // Retrieve Session id from the cookies
  const sessionId = signedCookie(
    req.cookies[discordSessionConfig.name],
    discordSessionConfig.secret,
  ).toString();

  // Check if Session exists
  const sessionDB = await sessionRepository.findOne({
    sessionId,
  });
  if (sessionDB == null) return next();

  // Check if Session is expired
  const currentTime = new Date();
  if (sessionDB.expiresAt < currentTime) {
    // Delete expired sessions from the database
    // TODO create cronjob that deletes expired session every day
    await sessionRepository.delete(sessionDB);
    return next();
  }

  const data = JSON.parse(sessionDB.userId);
  req.userId = data;

  return next(); // Go to next middleware
}
