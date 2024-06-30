import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db";
// import { getDateDifference } from "../../../utils/dateUtils";

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
    .input(z.object({ 
      title: z.string(), 
      description: z.string().optional(), 
      imageUrl: z.string() 
    }))
    .mutation(async ({ input, ctx }) => {
      const { title, description, imageUrl } = input;
      const userId = ctx.session.user.id;

      await prisma.picture.create({
        data: { title, description, imageUrl, userId },
      });
    }),

  // Protected route to add a like to a picture
  addLike: protectedProcedure
    .input(z.object({ pictureId: z.string() }))
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
    const userId = ctx.session.user.id;

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

    // const now = new Date();
    // // const createdAt = user.createdAt ?? new Date();
    // const { years, months, days, hours } = getDateDifference(user.createdAt, now);

    // const timeSinceJoin = 
    //   years ? `${years} year(s)` :
    //   months ? `${months} month(s)` :
    //   days ? `${days} day(s)` :
    //   `${hours} hour(s)`;

    // const totalLikes = user.picture.reduce((acc, pic) => acc + pic.likes.length, 0);
    
    // return {
    //   fullName: user.name ?? "",
    //   timeSinceJoin,
    //   totalLikes,
    // };
  }),
});
