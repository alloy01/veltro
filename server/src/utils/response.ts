import type { Response } from "express";

const sendResponse = (res: Response, success: boolean, message: string, statusCode: number, payload?: unknown) => {
    return res.status(statusCode).json({
        success,
        message,
        payload
    });
}

export default sendResponse;