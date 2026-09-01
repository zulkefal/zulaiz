import { z } from "zod";

export const volumeOptions = [
  "Under 500 tickets a month",
  "500 to 1,500 tickets a month",
  "1,500 to 4,000 tickets a month",
  "Over 4,000 tickets a month",
  "Not sure yet",
] as const;

export const channelOptions = [
  "Email",
  "Live chat",
  "WISMO and tracking",
  "Returns and exchanges",
  "Guest messaging",
  "Student and member support",
  "Reviews and social",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid work email address."),
  company: z.string().trim().min(1, "Please tell us your brand name."),
  website: z.string().trim().optional(),
  volume: z.enum(volumeOptions, { message: "Please pick a ticket volume." }),
  channels: z.array(z.enum(channelOptions)).min(1, "Pick at least one channel."),
  message: z.string().trim().max(2000).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<keyof ContactInput, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
