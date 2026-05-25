import { verifyTokenAcesso } from '../utils/jwt-utils.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ message: 'Erro no token' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token malformatado' });
    }

    try {
        const decoded = verifyTokenAcesso(token);
        req.usuario = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
