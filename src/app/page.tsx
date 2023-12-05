import { gql, useMutation } from '@apollo/client';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CREATE_SURVEY = gql`
  mutation CreateSurvey($input: SurveyInput!) {
    createSurvey(input: $input)
  }
`;

export default function Home() {
  const router = useRouter();


    const [createSurvey] = useMutation(CREATE_SURVEY);

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
          onClick={async () => {
            try {
              const { data } = await createSurvey({
                variables: {
                  input: {
                  },
                },
              });
              router.push(`/survey/${data.createSurvey}`);
            } catch (error) {
              console.error('설문 생성 중 오류:', error);
            }
          }}
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
