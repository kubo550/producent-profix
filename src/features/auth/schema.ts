import * as z from 'zod';

export const loginSchema = z.object({
  password: z.string().min(1, { error: 'Podaj hasło.' }).max(200),
  displayName: z
    .string({ error: 'Podaj swoje imię.' })
    .trim()
    .min(2, { error: 'Imię musi mieć co najmniej 2 znaki.' })
    .max(40, { error: 'Imię może mieć maksymalnie 40 znaków.' }),
});
