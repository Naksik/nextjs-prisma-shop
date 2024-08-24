import {z} from 'zod'

// This function converts ZodString to integer
export function ZStringToInteger(zodString: z.ZodString) {
  return zodString.transform((val) => parseInt(val, 10))
}
