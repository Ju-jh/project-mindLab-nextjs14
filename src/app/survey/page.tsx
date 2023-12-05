'use client'

import { useState } from 'react';

export default function Home() {
  const [isChecked, setChecked] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleButtonToggle = (problemIndex: number, buttonIndex: number) => {
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[problemIndex] = buttonIndex;
    setSelectedButtons(newSelectedButtons);
  };

  const handleSubmission = () => {
    // 여기서 selectedButtons 배열을 사용하여 제출 로직을 수행할 수 있습니다.
    console.log('선택된 버튼:', selectedButtons);
    // 여기에서 제출 로직을 수행합니다.
  };

  return (
    <main className='flex-col w-full h-full p-[30px] pt-[60px]'>
      <section className='titleSection w-full h-[200px]  flex items-center justify-center '>
        <div className='titleDiv w-[500px]  flex-col items-center justify-center'>
          <h1 className='text-center text-[30px] font-bold'>설문지 제목</h1>
        </div>
      </section>
      <section className='explainSection w-full h-full  flex items-center justify-center mb-[120px]'>
        <div className='explainDiv w-[800px] h-[130px] shadow-sm shadow-slate-400 rounded-md p-[30px]'>
          <span>설문지 설명</span>
        </div>
      </section>
      <section className='problemSection w-full min-h-[400px]  '>
        <ul className='problemUl flex-col list-decimal  pl-[30px]'>
          <li>
            {true ? <p className='ml-[10px] pl-[10px] w-full'>질문</p> : null}
            <div className='flex mt-[20px]'>
              {Array.from({ length: 4 }, (_, index) => (
                <button
                  key={index + 1}
                  className={`mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all ${
                    selectedButtons[0] === index + 1 ? 'bg-slate-400' : ''
                  }`}
                  onClick={() => handleButtonToggle(0, index + 1)}
                >
                  <div className='bg-slate-300 w-[23px] h-[23px] rounded-full inline-block mr-[10px]'>
                    <span>{index + 1}</span>
                  </div>
                  <span>객관식 {index + 1}번 문항</span>
                </button>
              ))}
            </div>
          </li>
        </ul>
      </section>

      <div className='w-full h-[40px]'>
        <button
          onClick={handleSubmission}
          className={`w-full h-[40px] rounded-md shadow-md ${
            isChecked ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-200 hover:bg-slate-400'
          }`}
        >
          제출하기
        </button>
      </div>
    </main>
  );
}
