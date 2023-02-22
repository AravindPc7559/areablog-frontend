/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {}

const Comments = (props: Props) => {
  return (
    <div className='mt-5'>
      <div className="flex gap-3">
        <img
          className="rounded-full w-[40px] h-[40px]"
          src="https://i.pinimg.com/originals/a6/3b/d8/a63bd8280f1534119f9ed77108a550bf.jpg"
          alt=""
        />
        <div>
          <h1 className="-mt-1">Aravind Pc</h1>
          <span className='text-xs'>Poster On: 21/2/2022</span>
        </div>
      </div>
      <div className='px-12 mt-3'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod cum a minus. Deleniti consequatur reprehenderit quos fugiat dolor mollitia voluptates, tenetur suscipit? Officia, ipsa. Possimus cum enim quod odit necessitatibus vitae, sunt dolores dolorum! Ut voluptate, laboriosam quasi quam nam itaque vitae nisi repudiandae cumque temporibus quidem iure! Pariatur repellendus perspiciatis eius facere nostrum voluptates, assumenda dolor. Animi iste nesciunt illo eaque in dolor voluptatem, tempora sequi sed, minima est mollitia? Reiciendis iste, sint quod a, cum in eveniet eum, sequi suscipit delectus expedita ullam exercitationem harum? Saepe accusantium aspernatur sint voluptatum corporis rerum, quas id incidunt. Debitis, odio!</p>
      </div>
    </div>
  )
}

export default Comments
