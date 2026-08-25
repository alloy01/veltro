interface AuthUser {
    id: string;
    username: string;
}

interface Cookie {
    cookie: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
            cookies?: Cookie;
        }
    }
}

export {};