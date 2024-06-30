"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../trpc/react';
import { useSession } from 'next-auth/react';

const Sidebar: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();

//   const { data: userStats } = api.gallery.getUserStats.useQuery(undefined, {
//     enabled: !!session?.user,
//   });

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <div className="bg-[#3F3F3F] grid grid-rows-[80%,20%] h-screen flex flex-col">
      <div className='flex items-center justify-center'>
        <div className='w-full'>
          <button className="text-white text-lg mb-4 w-full py-2 bg-[#D927C7] rounded-[.5rem]">Community</button>
          <button className="text-white text-lg w-full py-2">My Store</button>
        </div>
      </div>
      
      <div className='bg-[#3F3F3F] flex items-center justify-center'>
        {session?.user?.name ? (
          <div className="w-full flex items-center py-3">
            <div className="w-1/4 flex items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full text-white">
                    {session?.user?.name?.charAt(0)}
                </div>
            </div>
            <div className="w-3/4 items-center justify-center">
                <div className="text-white flex-col">
                    <p>{session?.user?.name}</p>
                    {/* <p>Joined for {userStats.timeSinceJoin} / +{userStats.totalLikes} Likes</p> */}
                </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-[#606060] text-white text-lg p-2 rounded-[.5rem] w-full"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
