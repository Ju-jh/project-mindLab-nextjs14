'use client'

import {faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Home() {


  return (
    <main className='main flex-col w-full min-h-[1400px] p-[30px] pt-[90px]'>
      <div className='cardsDiv flex items-start justify-start flex-wrap gap-[30px] w-full h-[700px] shadow-sm shadow-slate-400 rounded-md p-[30px]'>
        <div className='w-[350px] h-[300px]'>
          <Link href={'/survey'}>
            <button
              className='buttonDiv flex flex-col items-center justify-center w-full h-full rounded-lg shadow-md shadow-slate-400 text-[22px] hover:text-[24px] hover:bg-slate-300 transition-all'
            >
              <span className=''>휴가 때 가고싶은 해외여행</span>
            </button>
          </Link>
          <button className='absolute flex flex-col items-center justify-center translate-x-[335px] translate-y-[-310px]  w-[30px] h-[30px] rounded-full bg-green-300 hover:bg-green-500'>
            <FontAwesomeIcon icon={faX} className='w-[40%]'/>
          </button>
        </div>

        <button className='newCardDiv flex flex-col items-center justify-center w-[350px] h-[300px] rounded-lg shadow-md shadow-slate-400 text-[55px] hover:text-[70px] hover:bg-slate-300 transition-all'>
          <span>+</span>
        </button>
      </div>
    </main>
  )
}
