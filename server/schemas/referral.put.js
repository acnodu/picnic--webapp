import { z } from 'zod';

export default z.object({
    code: z.string().length(6),
});
