'use client'

import { sendGraphQLQuery } from '@/graphql/Post/mutation';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
// import { useEffect, useState } from 'react';




// async function getGraphQLQuery(query: any) {
//   const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

//   try {
//     const response = await fetch(endpoint, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('GraphQL query failed:', error);
//     throw error;
//   }
// }

export default function Home() {
  // const [mySurveys, setMySurveys] = useState<Array<{
  //   s_id: string;
  //   title: string;
  // }>>([]);

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const query = `
  //         query GetMySurvey {
  //           getMySurvey {
  //             s_id
  //             title
  //           }
  //         }
  //       `;
  //       const result = await getGraphQLQuery(query);
  //       setMySurveys(result.data.getMySurvey || []);
  //     } catch (error) {
  //       console.error('Error while getting my surveys:', error);
  //     }
  //   };

  //   fetchData();
  //   }, [createSurvey]); 

  const mySurveys = [{
        "s_id": "0c453259-64b9-47ff-918d-4c057369cdf4",
        "title": ""
      },
      {
        "s_id": "f704fe26-dd9e-4616-9363-11b09ad145af",
        "title": ""
    }]
  
  return (
    <main className='main flex-col w-full min-h-[1400px] p-[30px] pt-[90px] text-center'>
      <div className='my-[20px]'>
        <span className='font-bold text-[22px]'>내가 만든 설문지</span>
      </div>
      <div className='cardsDiv flex items-start justify-start flex-wrap gap-[30px] w-full h-[300px] shadow-sm shadow-slate-400 rounded-md p-[30px] mt-[20px]'>
        { mySurveys ? mySurveys.map((survey) => (
          <div key={survey.s_id} className='w-[250px] h-[150px]'>
            <Link href={`/mysurvey/${survey.s_id}`}>
              <button
                className='buttonDiv flex flex-col items-center justify-center w-full h-full rounded-lg shadow-md shadow-slate-400 text-[16px] hover:text-[18px] hover:bg-slate-300 transition-all'
              >
                <span>{survey.title}</span>
              </button>
            </Link>
            <button className='absolute flex flex-col items-center justify-center translate-x-[235px] translate-y-[-160px]  w-[30px] h-[30px] rounded-full bg-green-300 hover:bg-green-500'>
              <FontAwesomeIcon icon={faX} className='w-[40%]'/>
            </button>
          </div>
        )):null}
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



