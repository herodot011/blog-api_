import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validate = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                status: 'fail',
                errors: result.error.issues.map((e) => ({
                    field: e.path[0],
                    message: e.message
                }))
            });
        }
        next();
    };
};

export default validate;