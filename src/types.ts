import { z } from 'zod';


export const addLike = z.object({
  pictureId: z.string(),
});

export const PictureUpload = z.object({ 
    title: z.string(), 
    description: z.string().optional(), 
    imageUrl: z.string(),
    userId: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  createdAt: z.date(),
  picture: z.array(PictureUpload),
  likes: z.array(addLike),
});