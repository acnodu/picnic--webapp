import { z } from 'zod';

export default z.object({
    type: z.enum(['SMS', 'EMAIL']),
});
