/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {
  blogContent: String
  blogName: String
  category: String
  image?: {
    public_id: String
    url: String
  }
  userId: String
}

const Page = ({ blogContent, blogName, category, image }: Props) => {
  return (
    <>
      <div className="container mx-auto overflow-hidden max-w-full min-h-screen mt-12 py-10">
        <div className="max-auto h-auto py-5 grid mx-auto place-content-center">
          <img
            src={image.url ? image.url : '/assets/noimage/NoImage.jpg'}
            alt="Blog-Image"
            className="max-w-[500px] max-h-[500px] object-cover"
          />
        </div>
        <div className="w-full h-auto">
          <h1 className="text-center text-xl md:text-4xl font-semibold py-4">
            {blogName}
          </h1>
          <div className="break-words leading-10 whitespace-pre-wrap md:px-10">
            {blogContent}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
