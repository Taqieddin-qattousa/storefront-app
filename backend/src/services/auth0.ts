// Auth0 middleware for verifying Auth0 JWT tokens
import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env;

// Middleware to verify Auth0 JWT tokens
export const verifyAuth0Token = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as never,
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

// Error handler for Auth0 JWT errors
export const handleAuth0Error = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid or missing Auth0 token' });
  }
  next(err);
};
