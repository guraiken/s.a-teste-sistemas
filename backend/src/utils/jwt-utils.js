import jwt from 'jsonwebtoken';
import { env } from '../env.js';

export const signTokenAcesso = (payload) => {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: '1h' });
};

export const signTokenRefresh = (payload) => {
    return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: '30d' });
};

export const verifyTokenAcesso = (token) => {
    return jwt.verify(token, env.jwtSecret);
};

export const verifyTokenRefresh = (token) => {
    return jwt.verify(token, env.jwtRefreshSecret);
};
