// Combined auth middleware that accepts both Auth0 tokens and custom JWT tokens
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET, AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env;

// JWKS client for Auth0
const client = jwksClient.default({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

// Get signing key from Auth0
const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
};

// Verify Auth0 token
const verifyAuth0Token = (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: AUTH0_AUDIENCE,
        issuer: `https://${AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
      (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

// Verify custom JWT token
const verifyCustomToken = (token: string): boolean => {
  try {
    jwt.verify(token, TOKEN_SECRET as string);
    return true;
  } catch {
    return false;
  }
};

// Combined middleware
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json('Access denied. Token is missing.');
    }

    // Try Auth0 token first (if AUTH0_DOMAIN is configured)
    if (AUTH0_DOMAIN && AUTH0_AUDIENCE) {
      const isAuth0Valid = await verifyAuth0Token(token);
      if (isAuth0Valid) {
        return next();
      }
    }

    // Fall back to custom JWT token
    const isCustomValid = verifyCustomToken(token);
    if (isCustomValid) {
      return next();
    }

    // Both failed
    return res.status(401).json('Access denied. Invalid token.');
  } catch (_error) {
    return res.status(401).json('Access denied. Token verification failed.');
  }
};

export default verifyToken;
