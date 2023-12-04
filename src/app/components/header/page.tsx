'use client'
import { useAuth } from '@/context/isLogined';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {

  const { accessToken } = useAuth();
  const [email, setEmail] = useState(null);
  const [photo, setPhoto] = useState(null);

  const redirectAfterLogoutPath = () => {
    window.location.href = "https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/user/logout";
  };

  useEffect(() => {
    axios
      .get('https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/user/getEmailAndPhoto', {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          setEmail(response.data.email);
          setPhoto(response.data.photo)
        } else {
        }
      })
      .catch(() => {
      });
  }, []);

  
  return (
    <header className=' fixed w-full h-[60px] shadow-md bg-white z-50'>
      <div className='h-full flex items-start justify-between px-[50px]'>
        <Link href={'/'}>
          <Image src={'/icon.png'} alt='IconImage' width={100} height={100}></Image>
        </Link>
      { accessToken === false && <Link href={'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/user/google/callback'}>
          <button className='flex items-center justify-center  h-[50px] m-[5px] shadow-md rounded-md  p-[20px] hover:bg-blue-300 transition-all'>
            <Image src={'/google.png'} alt='GoogleImage' width={30} height={30}></Image>
            <span className='font-bold ml-[5px]'>Google Login</span>
          </button>
        </Link>}
        {
          accessToken &&
          <div className='flex items-center justify-center  h-[50px] m-[5px] p-[20px]'>
            <div className='w-[40px] h-[40px] overflow-hidden rounded-full shadow-md bg-slate-200'>
              <Image src={ `${photo}`} alt='ProfileImage' width={40} height={40}></Image>
            </div>
            <span className='font-bold ml-[20px]'>{ email }</span>
              <button
                className='ml-[20px] p-[10px] rounded-md shadow-sm shadow-slate-400 hover:bg-slate-400 transition-all'
                onClick={redirectAfterLogoutPath}
              >
              <span className='font-bold'>Logout</span>
            </button>
          </div>
        }
      </div>
    </header>
  )
}
