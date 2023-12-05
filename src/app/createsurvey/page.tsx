'use client'

import { useState } from 'react';

export default function Home() {
  const [isChecked, setChecked] = useState(false);
  const [problems, setProblems] = useState([{ id: 1, title: '', options: [{ id: 1, text: '' }] }]);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const addProblem = () => {
    const newProblem = { id: problems.length + 1, title: '', options: [{ id: 1, text: '' }] };
    setProblems([...problems, newProblem]);
  };


  const addOption = (problemIndex: number, optionIndex: number) => {
    const newOption = { id: problems[problemIndex].options.length + 1, text: '' };
    const updatedOptions = [...problems[problemIndex].options, newOption];
    const updatedProblems = [...problems];
    updatedProblems[problemIndex].options = updatedOptions;
    setProblems(updatedProblems);
  };

  return (
    <main className='flex-col w-full h-full p-[30px] pt-[60px]'>
      <section className='titleSection w-full h-[200px]  flex items-center justify-center '>
        <div className='titleDiv w-[500px]  flex-col items-center justify-center'>
          <input
            type="text"
            placeholder='설문지 제목을 적어주세요.'
            className='text-center text-[30px] w-full font-bold'
          />
        </div>
      </section>
      <section className='explainSection w-full h-full  flex items-center justify-center mb-[120px]'>
        <div className='explainDiv w-[800px] h-[130px] shadow-sm shadow-slate-400 rounded-md p-[30px] cursor-pointer hover:bg-slate-400 transition-all'>
          <input type='text' placeholder='설문지를 설명해주세요.' className='w-full h-full bg-transparent border-none'/>
        </div>
      </section>
      <section className='problemSection w-full min-h-[400px]  '>
        <ul className='problemUl flex-col list-decimal  pl-[30px]'>
          {problems.map((problem, problemIndex) => (
            <li key={problem.id} className='mb-[30px]'>
              <input
                type="text"
                placeholder={`문제 ${problemIndex + 1} 제목을 입력해주세요`}
                className='ml-[10px] pl-[10px] w-full'
              />
              <div className='flex mt-[20px]'>
                {problem.options.map((option, optionIndex) => (
                  <button
                    key={option.id}
                    className='mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'
                  >
                    <div className='bg-slate-300 w-[23px] h-[23px] rounded-full inline-block mr-[10px]'>
                      <span>{option.id}</span>
                    </div>
                    <input type='text' placeholder='문항을 입력하세요.' className='bg-transparent'/>
                  </button>
                ))}
                <button
                  className='mr-[30px] p-[10px] w-[50px] h-[50px] shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'
                  onClick={() => addOption(problemIndex, problem.options.length)}
                >
                  <span>+</span>
                </button>
              </div>
              
            </li>
          ))}
        </ul>
        <div className='problemPlusDiv mt-[30px]'>
          <button
            className='w-full py-[10px] rounded-md shadow-sm shadow-slate-400 hover:bg-slate-400 transition-all'
            onClick={addProblem}
          >
            문항 추가하기 +
          </button>
        </div>
      </section>
    </main>
  );
}
