import { getServerSession } from "next-auth";
import prisma from '@/lib/prisma';
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export const GetUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  if (session && session.user) {
    // @ts-ignore
    return await prisma.user.findUnique({
      where: {id: session.user.id},
    })
  }
  return null
}