'use client'
import { useAuth } from '@/context/isLogined';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {

  const { accessToken } = useAuth();
  console.log(accessToken,'여기가 accessToken')


  return (
    <header className=' fixed w-full h-[60px] shadow-md bg-white z-50'>
      <div className='h-full flex items-start justify-between px-[50px]'>
        <Link href={'/'}>
          <Image src={'/icon.png'} alt='IconImage' width={100} height={100}></Image>
        </Link>
      { accessToken && <Link href={'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/user/google/callback'}>
          <button className='flex items-center justify-center  h-[50px] m-[5px] shadow-md rounded-md  p-[20px]'>
            <Image src={'/google.png'} alt='GoogleImage' width={30} height={30}></Image>
            <span className='font-bold ml-[5px]'>Google Login</span>
          </button>
        </Link>}
        {
          accessToken! &&
          <div className='flex items-center justify-center  h-[50px] m-[5px] p-[20px]'>
            <div className='w-[40px] h-[40px] overflow-hidden rounded-full shadow-md bg-slate-200'>
              <Image src={'/photo.png'} alt='ProfileImage' width={40} height={40}></Image>
            </div>
            <span className='font-bold ml-[20px]'>email@gmail.com</span>
          </div>
        }
      </div>
    </header>
  )
}
