"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../trpc/react';
import { useSession } from 'next-auth/react';

interface SidebarProps {
  onButtonClick: (page: string) => void;
}

const calculateMemberDuration = (createdAt: Date): string => {
    const currentDate = new Date();
    const joinedDate = new Date(createdAt);

    const duration = currentDate.getTime() - joinedDate.getTime();
    const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((duration % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((duration % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (years > 0) {
        return `${years} y`;
    } else if (months > 0) {
        return `${months} m`;
    } else if (days > 0){
        return `${days} d`;
    } else {
        return `${hours} h`;
    }
};

const Sidebar: React.FC<SidebarProps> = ({ onButtonClick }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [current, setCurrent] = useState<string>('community');
    const [memberDuration, setMemberDuration] = useState<string>("");
    const [totalLikes, setTotalLikes] = useState<number>(0);

    const activeStyle = 'text-white text-lg mb-4 w-full py-2 bg-[#D927C7] rounded-[.5rem]';
    const inactiveStyle = 'text-white text-lg mb-4 w-full py-2';

    const { data: user } = api.gallery.getUserStats.useQuery();
    
    useEffect(() => {
        const duration = calculateMemberDuration(new Date(user? user?.createdAt : ''));
        setMemberDuration(duration);
        // setTotalLikes(user?.totalLikes ?? 0); still buggy. I will set it as 0 for now.
        setTotalLikes(0);
    }, [user]);
    

  const handleSignIn = () => {
    router.push('/login');
  };
  
  const togglePage = (page: string) => {
    setCurrent(page);
    onButtonClick(page);
  };

  return (
    <div className="bg-[#3F3F3F] grid grid-rows-[80%,20%] h-screen flex flex-col">
      <div className='flex items-center justify-center'>
        <div className='w-full'>
                  <button
                      className={current === 'community' ? activeStyle : inactiveStyle}
                      onClick={() => togglePage('community')}
                  >
                      Community
                  </button>
                  <button
                      className={current === 'mystore' ? activeStyle : inactiveStyle}
                      onClick={() => togglePage('mystore')}
                  >
                      My Store
                  </button>
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
                    <b>{session?.user?.name}</b>
                    <p>Joined for {memberDuration} / + {totalLikes} Likes</p>
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
