'use client'

import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

async function sendGraphQLQuery(query: any, variables: any) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL query failed:', error);
    throw error;
  }
}


export default function Home() {

  async function createSurvey() {
    const query = `
      mutation CreateSurvey {
        createSurvey {
          s_id
        }
      }
    `;
    try {
      const result = await sendGraphQLQuery(query, {});

      console.log('새 설문지가 생성되었습니다:', result.data.createSurvey);
    } catch (error) {
      console.error('새 설문지 생성 실패:', error);
    }
  }

  async function getServerSideProps() {
    const query = `
      query GetMySurvey {
        getMySurvey {
          s_id
          title
        }
      }
    `;
    try {
      const result = await sendGraphQLQuery(query, {});
      const mySurveys = result.data.getMySurvey || [];
      return { props: { mySurveys } };
    } catch (error) {
      console.error('Error while getting my surveys:', error);
      return { props: { mySurveys: [] } };
    }
  }

  return (
    <main className='main flex-col w-full min-h-[1400px] p-[30px] pt-[90px] text-center'>
      <div className='my-[20px]'>
        <span className='font-bold text-[22px]'>내가 만든 설문지</span>
      </div>
      <div className='cardsDiv flex items-start justify-start flex-wrap gap-[30px] w-full h-[300px] shadow-sm shadow-slate-400 rounded-md p-[30px] mt-[20px]'>
        <div className='w-[250px] h-[150px]'>
          <Link href={'/mysurvey'}>
            <button
              className='buttonDiv flex flex-col items-center justify-center w-full h-full rounded-lg shadow-md shadow-slate-400 text-[16px] hover:text-[18px] hover:bg-slate-300 transition-all'
            >
              <span className=''>내가만든 설문지 제목</span>
            </button>
          </Link>
          <button className='absolute flex flex-col items-center justify-center translate-x-[235px] translate-y-[-160px]  w-[30px] h-[30px] rounded-full bg-green-300 hover:bg-green-500'>
            <FontAwesomeIcon icon={faX} className='w-[40%]'/>
          </button>
        </div>
        <button
          onClick={createSurvey}
          className='newCardDiv flex flex-col items-center justify-center w-[250px] h-[150px] rounded-lg shadow-md shadow-slate-400 text-[55px] hover:text-[70px] hover:bg-slate-300 transition-all'>
          <span>+</span>
        </button>
      </div>
      <div className='my-[20px]'>
        <span className='font-bold text-[22px]'>참여하는 설문지</span>
      </div>
      <div className='cardsDiv flex items-start justify-start flex-wrap gap-[30px] w-full h-[300px] shadow-sm shadow-slate-400 rounded-md p-[30px] mt-[20px]'>
        <div className='w-[250px] h-[150px]'>
          <Link href={'/survey'}>
            <button
              className='buttonDiv flex flex-col items-center justify-center w-full h-full rounded-lg shadow-md shadow-slate-400 text-[16px] hover:text-[18px] hover:bg-slate-300 transition-all'
            >
              <span className=''>참여하는 설문지 제목</span>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
