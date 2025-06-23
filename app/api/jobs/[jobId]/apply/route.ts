import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session?.user || !session?.user?.id) {
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
  }
  try {
    const { jobId } = await params;

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // check if the user is already applied for the job
    const applicationExists = await prisma.application.findFirst({
      where: {
        jobId: jobId,
        userId: session?.user?.id,
      },
    });

    if (applicationExists) {
      return NextResponse.json(
        { message: "Application already exists" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        title: job.title,
        jobId: jobId,
        userId: session?.user?.id,
        status: "pending",
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Error creating job", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
