import { z } from 'zod';

export default z.object({
    // code is 6 lenght integer
    code: z
        .string()
        .length(6, { message: 'Code must be exactly 6 characters long' })
        .regex(/^\d+$/, { message: 'Code must be a valid integer' }),
});
