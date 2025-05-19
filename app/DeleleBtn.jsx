"use client"

import React from 'react'

function DeleleBtn({ id }) {

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?")

    if (confirmed) {
      const res = await fetch(`https://curdnextjs-gules.vercel.app/api/posts?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        window.location.reload()
      }

    }
  }

  return (

      <a style={{ cursor: "pointer" }} onClick={handleDelete} className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg ">
        Delete
      </a>

  ) 
}

export default DeleleBtn 
