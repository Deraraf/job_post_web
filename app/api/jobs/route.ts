// app/api/jobs/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { title, type, company, location, description } = data;
    if (!title || !type || !company || !location || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        ...data,
        postedById: session.user.id,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// --- GET all jobs (Data is public, no authentication needed) ---
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        postedAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
