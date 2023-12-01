'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {

  return (
    <header className=' fixed w-full h-[60px] shadow-md bg-white z-50'>
      <div className='h-full flex flex-col items-start justify-center pl-[50px]'>
        <Link href={'/'}>
          <Image src={'/icon.png'} alt='IconImage' width={100} height={100}></Image>
        </Link>
      </div>
    </header>
  )
}
