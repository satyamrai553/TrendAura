import { z } from "zod";
export declare const loginUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const registerUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
    fullname: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        customer: "customer";
        seller: "seller";
    }>;
}, z.core.$strip>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
//# sourceMappingURL=index.d.ts.map