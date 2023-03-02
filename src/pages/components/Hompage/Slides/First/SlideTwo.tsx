import React from 'react'
import UserProfileTag from '@/pages/components/Common/ProfileTag/UserProfileTag'
import { GET_USER } from '../../../../Graphql/Query';
import { useQuery } from '@apollo/client';

type Props = {}

const SlideTwo = (props: Props) => {
  const {data,loading,error} = useQuery(GET_USER)
  let arr;
  const ownUser = !loading && data && data.getAllUsers.find((data: any) => data._id === localStorage.getItem('UserId'))




  const users =  !loading && data && ownUser && data.getAllUsers.filter((data: any) => data.category === ownUser.category)

  if(users){
    if(users.length < 5){
      arr = users.filter((data: any) => data._id !== localStorage.getItem('UserId'))
    } else {
      arr = users.slice(0,5).filter((data: any) => data._id !== localStorage.getItem('UserId'))
    }
  }
  return (
    <div className="lg:flex justify-center hidden ">
      <div className="mt-10  shadow-lg min-h-[100px] px-10 border-y bg-gray-100 rounded-2xl border-gray-300 p-3 ">
        <h1 className="text-center font-semibold -tracking-tighter">Suggested Profile</h1>
        {
          arr && users ? arr.map((data: any, index: number) => {
            return(
              <div key={index}>
              <UserProfileTag 
                image={data.image.url}
                category={data.category}
                description={data.bio}
                name={data.fullName}
                userId={data._id}
                followingData={data.followers}
              />
            </div>
            )
          })
          :
          <h1>No Suggested Profile</h1>
        }
       
      </div>
    </div>
  )
}

export default SlideTwo
