"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = (Math.random() * 1000).toString();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount * 100,
      status: "Processing",
      provider: provider,
      startTime: new Date(),
      token: token,
    },
  });

  return {
    message: "Transaction created",
  };
}
