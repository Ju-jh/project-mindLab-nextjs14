'use client'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MySurvey() {
  const router = useRouter();

  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <main className='flex-col w-full h-full p-[30px] pt-[60px]'>
      <section className='titleSection w-full h-[200px]  flex items-center justify-center '>
        <div className='titleDiv w-[500px]  flex-col items-center justify-center'>
          <input type="text" placeholder={`${ router.query.id }설문지 제목을 적어주세요.`} className='text-center text-[30px] w-full font-bold'/>
          { false ? <h1 className='text-center text-[30px] font-bold'>휴가 때 가고싶은 해외여행</h1> : null}
        </div>
      </section>
      <section className='explainSection w-full h-full  flex items-center justify-center mb-[120px]'>
        <div className='explainDiv w-[800px] h-[130px] shadow-sm shadow-slate-400 rounded-md p-[30px] cursor-pointer hover:bg-slate-400 transition-all'>
          <span>본 설문은 다가올 휴가 동안에 가고 싶은 해외여행에 대한 의견을 묻는 설문입니다. 작성하신 설문 내용은 통계법 33조(비밀의 보호)에 의거하여 개인의 비밀에 대한 사항은 엄격히 보호됩니다. 설문 종료 후 기재되는 개인정보는 설문조사 응답여부 검증에만 활용되며 통계작성 이외의 목적으로는 사용되지 않습니다.</span>
        </div>
      </section>
      <section className='problemSection w-full min-h-[700px]  '>
        <ul className='problemUl flex-col list-decimal  pl-[30px]'>
          <li>
            <input type="text" placeholder='문제 제목을 입력해주세요' className='ml-[10px] pl-[10px] w-full'/>
            <div className='flex mt-[20px]'>
              <button key={1} className='mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'>
                <div className='bg-slate-300 w-[23px] h-[23px] rounded-full inline-block mr-[10px]'>
                  <span>1</span>
                </div>
                <span>객관식 1번 문항</span>
              </button>
              <button key={2} className='mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'>
                <div className='bg-slate-300 w-[23px] h-[23px] rounded-full inline-block mr-[10px]'>
                  <span>2</span>
                </div>
                <span>객관식 2번 문항</span>
              </button>
              <button key={3} className='mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'>
                <div className='bg-slate-300 w-[23px] h-[23px] rounded-full inline-block mr-[10px]'>
                  <span>3</span>
                </div>
                <span>객관식 3번 문항</span>
              </button>
              <button key={4} className='mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'>
                <div className='bg-slate-300 w-[23px] h-[23px] rounded-full inline-block mr-[10px]'>
                  <span>4</span>
                </div>
                <span>객관식 4번 문항</span>
              </button>
              <button className='mr-[30px] p-[10px] w-[50px] h-[50px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'>
                <span>+</span>
              </button>
            </div>
          </li>
        </ul>
        <div className='problemPlusDiv mt-[30px]'>
          <button className='w-full py-[10px] rounded-md shadow-sm shadow-slate-400 hover:bg-slate-400 transition-all'>문항 추가하기 +</button>
        </div>
      </section>
    </main>
  )
}
