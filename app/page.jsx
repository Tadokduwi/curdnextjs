"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DeleleBtn from "./DeleleBtn";

export default function Home() {

  const [postData, setPostData] = useState([])

  console.log(postData);


  const getPosts = async () => {
    try {
      const res = await fetch("https://curdnextjs-gules.vercel.app/api/posts", {
        method: "GET",
        cache: "no-store"
      })

      if (!res.ok) {
        throw new Error("Failed to fetch posts")
      }

      const data = await res.json()
      setPostData(data.posts)

    } catch (error) {
      console.log("Error loading posts: ", error);

    }

  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
<main className="container mx-auto my-3">
  <h1 className="text-2xl font-bold">Next.js CRUD + MongoDB</h1>
  <hr className="my-3" />
  <button className="bg-green-500 p-3 text-white rounded">
    <Link href="/create">Create Post</Link>
  </button>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
    {postData && postData.length > 0 ? (
      postData.map(val => (
        <div key={val._id} className="shadow-xl p-6 rounded-xl bg-white">
          <h4 className="text-lg font-semibold mb-2">{val.title}</h4>
          <img src={val.img} alt={val.title} className="w-full h-auto rounded" />
          <p className="mt-2 text-gray-700">{val.content}</p>
          <div className="mt-4 flex gap-2">
            <Link
              className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm"
              href={`/edit/${val._id}`}
            >
              Edit
            </Link>
            <DeleleBtn id={val._id} />
          </div>
        </div>
      ))
    ) : (
      <p className="bg-gray-300 p-3 my-3">You do not have any posts yet</p>
    )}
  </div>
</main>

  );
}
