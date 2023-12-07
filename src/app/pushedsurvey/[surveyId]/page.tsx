'use client'

import { createOptionGraphQLQuery } from '@/graphql/Option/createOption';
import { updateTextAndScoreGraphQLQuery } from '@/graphql/Option/pushOptionTextAndScore';
import { sendGraphQLQuery } from '@/graphql/Problem/createProblem';
import { updateTextGraphQLQuery } from '@/graphql/Problem/pushQuestionText';
import { deleteGraphQLQuery } from '@/graphql/Survey/deleteSurvey';
import { getSurveyDataGraphQLQuery } from '@/graphql/Survey/getSurveyData';
import { updateGraphQLQuery } from '@/graphql/Survey/updateSurveyTitle';
import { useEffect, useState } from 'react';

interface Survey {
  s_id: string;
  title: string;
  description: string;
  user: string;
}

interface Question {
  q_id: string;
  text: string;
  survey: Survey;
  options: Option[];
  selectedOption?: Option;
}

interface Option {
  o_id: string;
  text: string;
  score: number;
  newText: string; 
  newScore: number;
}

export default function Home({ params }: {
  params: { surveyId:string}
}) {
  const surveyId = params.surveyId;
  const [isThisSurveyPublic, setIsThisSurveyPublic] = useState<boolean>()
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [originTitle, setOriginTitle] = useState<string>('')
  const [originDescription, setOriginDescription] = useState<string>('');
  const [Questions, setQuestions] = useState<Question[]>([]);
  
  const saveAnswers = async () => {
    const answers: { questionId: string; optionId: any; }[] = [];

    console.log(answers)

    Questions.forEach((question) => {
      if (question.selectedOption) {
        answers.push({
          questionId: question.q_id,
          optionId: question.selectedOption.o_id,
        });
      }
    });

    const mutation = `
      mutation SaveAnswers($surveyId: String!, $answers: [AnswerInput]!) {
        saveAnswers(surveyId: $surveyId, answers: $answers) {
          success
          message
        }
      }
    `;

    try {
      const result = await sendGraphQLQuery(mutation, {
        surveyId: surveyId,
        answers: answers,
      });

      if (result.data.saveAnswers.success) {

      } else {
        console.error('답변 저장 실패:', result.data.saveAnswers.message);
      }
    } catch (error) {
      console.error('답변 저장 실패:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
        const query = `
          mutation GetSurveyData($surveyId: String!) {
            getSurveyData(surveyId: $surveyId) {
              title
              description
              questions {
                q_id
                text
                createdAt
                options {
                  o_id
                  text
                  score
                }
              }
            }
          }
          `
    try {
      const result = await getSurveyDataGraphQLQuery(query, surveyId);
      const surveyData = result.data.getSurveyData;

      setOriginTitle(surveyData.title);
      setOriginDescription(surveyData.description);


      const mappedQuestions = surveyData.questions
        .map((question: { q_id: string; text: string; options: any; createdAt: Date }) => {
          return {
            q_id: question.q_id,
            text: question.text,
            survey: surveyData,
            options: question.options || [],
            createdAt: new Date(question.createdAt),
          };
        })
        .sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => a.createdAt.getTime() - b.createdAt.getTime());
        
        setQuestions(mappedQuestions);
      } catch (error) {
        console.error('설문지 데이터 로딩 실패:', error);
      }
    };
    

    if (surveyId) {
      fetchData();
    }
  }, [surveyId, isClicked]);
  
  return (
    <main className='flex-col w-full h-full p-[30px] pt-[60px]'>
      <section className='titleSection w-full h-[200px]  flex items-center justify-center '>
        <div className='titleDiv w-[500px]  flex items-center justify-center'>
          <span className='text-center text-[30px] w-full font-bold'>{originTitle}</span>
        </div>
      </section>
      <section className='descriptoionSection w-full h-full  flex items-center justify-center mb-[120px]'>
        <div className='descriptoionDiv min-w-[800px] h-[130px] flex shadow-sm shadow-slate-400 rounded-md p-[30px] cursor-pointer'>
          <span className='w-full h-full bg-transparent border-none'>{originDescription}</span>
        </div>
      </section>
      <section className='problemSection w-full min-h-[400px]  '>
        {Questions.length > 0 && (
          <ul className='problemUl flex-col list-decimal  pl-[30px]'>
            {Questions.map((Question, QuestionIndex) => (
              <li key={Question.q_id} className='mb-[60px] ml-[30px]'>
                <div className='px-[20px] w-[600px] py-[10px] flex items-center'>
                  <span
                    className='ml-[10px] pl-[10px] w-[500px]'
                  >{Question.text}</span>
                </div>
                <div className='flex mt-[20px] h-[60px]'>
                  {Question.options && Question.options.map((option, optionIndex) => (
                    <div
                      key={option.o_id}
                      className={`mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 hover:bg-slate-300 rounded-sm cursor-pointer transition-all flex items-center ${
                        Question.selectedOption && Question.selectedOption.o_id === option.o_id
                          ? 'bg-blue-200'
                          : ''
                      }`}
                      onClick={() => {
                        // 옵션을 클릭하면 선택 상태를 업데이트
                        const updatedOptions = Question.options.map((o) => ({
                          ...o,
                          selected: o.o_id === option.o_id,
                        }));
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = [...prevQuestions];
                          const targetQuestionIndex = updatedQuestions.findIndex(
                            (q) => q.q_id === Question.q_id
                          );
                          updatedQuestions[targetQuestionIndex].options = updatedOptions;
                          updatedQuestions[targetQuestionIndex].selectedOption = option;
                          return updatedQuestions;
                        });
                      }}
                    >
                      <div className='bg-slate-300 flex items-center justify-center w-[35px] h-[35px] rounded-full mr-[10px]'>
                        <span>{optionIndex + 1}</span>
                      </div>
                      <div className='flex flex-col items-center justify-between'>
                        <span>{option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              
              </li>
            ))}
          </ul>
        )}
        <div className='problemPlusDiv mt-[30px]'>
          <button
            className='w-full py-[10px] rounded-md shadow-sm shadow-slate-400 hover:bg-slate-400 transition-all'
            onClick={()=>saveAnswers}
          >
            제출하기
          </button>
        </div>
      </section>
    </main>
  );
}
