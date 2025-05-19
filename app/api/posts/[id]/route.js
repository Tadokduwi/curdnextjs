import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id } = await context.params; // ✅ ต้อง await
  await connectMongoDB();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, context) {
  const { id } = await context.params; // ✅ ต้อง await
  const { newTitle: title, newImg: img, newContent: content } = await req.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(id, { title, img, content });
  return NextResponse.json({ message: "Post updated" }, { status: 200 });
}
