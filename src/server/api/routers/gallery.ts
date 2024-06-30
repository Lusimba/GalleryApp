import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
import { PictureUpload, addLike } from "../../../types";

export const galleryRouter = createTRPCRouter({
  // Public route to get all pictures
  getAllPictures: publicProcedure.query(async () => { 
    return prisma.picture.findMany({
      include: {
        user: { select: { id: true, name: true, image: true } },
      }
    });
  }),

  // Protected route to get user's own pictures
  getMyPictures: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return prisma.picture.findMany({
      where: { userId },
    });
  }),

  // Protected route to upload a picture
  uploadPicture: protectedProcedure
    .input(PictureUpload)
    .mutation(async ({ input, ctx }) => {
      const { title, description, imageUrl } = input;
      const userEmail = ctx.session.user.email;
      const user = await prisma.user.findUnique({
        where: { email: userEmail ?? '' },
      });
      const id = user?.id ?? '';

      await prisma.picture.create({
        data: { title, description, imageUrl, user: { connect: { id } } },
      });
    }),

  // Protected route to add a like to a picture
  addLike: protectedProcedure
    .input(addLike)
    .mutation(async ({ input, ctx }) => {
      const { pictureId } = input;
      const userId = ctx.session.user.id;

      await prisma.like.create({
        data: { userId, pictureId },
      });
    }),
  
  // Protected route to delete a like from a picture
  deleteLike: protectedProcedure
    .input(z.object({ pictureId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { pictureId } = input;
      const userId = ctx.session.user.id;

      await prisma.like.deleteMany({
        where: {
          pictureId,
          userId,
        },
      });
    }),

  // Protected route to get basic user profile and stats
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.session.user.email;
      const loggedinUser = await prisma.user.findUnique({
        where: { email: userEmail ?? '' },
      });
    const userId = loggedinUser?.id ?? '';
    

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        picture: {
          include: {
            likes: true
          }
        }
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),
});
