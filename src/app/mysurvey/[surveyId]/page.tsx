'use client'



import { createOptionGraphQLQuery } from '@/graphql/Option/createOption';
import { updateTextAndScoreGraphQLQuery } from '@/graphql/Option/pushOptionTextAndScore';
import { sendGraphQLQuery } from '@/graphql/Problem/createProblem';
import { updateTextGraphQLQuery } from '@/graphql/Problem/pushQuestionText';
import { deleteGraphQLQuery } from '@/graphql/Survey/deleteSurvey';
import { getSurveyDataGraphQLQuery } from '@/graphql/Survey/getSurveyData';
import { updateGraphQLQuery } from '@/graphql/Survey/updateSurveyTitle';
import { faCheck, faFloppyDisk, faLock, faShareFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';


  / ////////////////////////////////////////     interface      //////////////////////////////////////////////////

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

  / ////////////////////////////////////////     const      //////////////////////////////////////////////////

  const surveyId = params.surveyId;

  const [isThisSurveyPublic, setIsThisSurveyPublic] = useState<boolean>()
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const [originTitle, setOriginTitle] = useState<string>('')
  const [surveyTitle, setSurveyTitle] = useState<string>(originTitle);

  const [originDescription, setOriginDescription] = useState<string>('');
  const [surveyDescription, setSurveyDescription] = useState<string>(originDescription);
  
  const [originQuestions, setOriginQuestions] = useState<Question[]>([]);
  const [Questions, setQuestions] = useState<Question[]>(originQuestions);

  const [originOption, setOriginOption] = useState({
    text: '',
    score: 0,
  });

  const [newoption, setOption] = useState({
    newText: originOption.text,
    newScore: originOption.score,
  });
  
  

  / ////////////////////////////////////////     function      //////////////////////////////////////////////////


  const PushSurveyTitle = async (surveyId: string, newTitle: string) => {
  
    const query = `
    mutation UpdateMySurveyTitle($surveyId: String!, $newTitle: String!) {
        updateMySurveyTitle(surveyId: $surveyId, newTitle: $newTitle) {
          title
        }
      }
    `;
    try {
      const result = await updateGraphQLQuery(query, { surveyId, newTitle });
      if (result.data.PushSurveyTitle) {
        alert('수정 완료되었습니다.')
      }
    } catch (error) {
      console.error('설문지 제목 수정 실패:', error);
    }
  };

  const PushSurveyDescription = async (surveyId: string, newDescription: string) => {
    const query = `
      mutation UpdateMySurveyDescription($surveyId: String!, $newDescription: String!) {
        updateMySurveyDescription(surveyId: $surveyId, newDescription: $newDescription) {
          description
        }
      }
    `;
    try {
      const result = await updateGraphQLQuery(query, {surveyId, newDescription});
      if (result.data.PushSurveyDescription) {
        alert('수정 완료되었습니다.')
      }
    } catch (error) {
      console.error('설문지 설명 수정 실패:', error);
    }
  };



  const createQuestion = async (surveyId: string) => {

    const mutation = `
      mutation CreateQuestion($surveyId: String!) {
        createQuestion(surveyId: $surveyId) {
          q_id
        }
      }
    `;
    const variables = {
      surveyId: surveyId,
    };

    try {
      const result = await sendGraphQLQuery(mutation, variables);
      if (result.data.createQuestion) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          {
            q_id: result.data.createQuestion.q_id,
            text: '',
            survey: { s_id: surveyId, title: '', description: '', user: '' },
            options: [],
          },
        ]);
        if (isClicked) {
          setIsClicked(false)
        } else {
          setIsClicked(true)
        }
      }
    } catch (error) {
      console.error('Question creation failed:', error);
    }
  };

  const removeQuestion = async (surveyId: string, questionId: string) => {
    const mutation = `
      mutation DeleteQuestion($surveyId: String!, $questionId: String!) {
        deleteQuestion(surveyId: $surveyId, questionId: $questionId) {
          q_id
        }
      }
    `;

    const variables = {
      surveyId: surveyId,
      questionId: questionId,
    };

    try {
      const result = await deleteGraphQLQuery(mutation, variables);
      if (result) {
        if (isClicked) {
          setIsClicked(false)
        } else {
          setIsClicked(true)
        }
      }
    } catch (error) {
      console.error('Failed to delete questions:', error);
    }
  };

  const addOption = async (surveyId: string, questionId: string) => {
    const mutation = `
      mutation CreateOption($surveyId: String!, $questionId: String!) {
        createOption(surveyId: $surveyId, questionId: $questionId) {
          o_id
        }
      }
    `;
    const variables = {
      surveyId: surveyId,
      questionId: questionId
    };
    try {
      const result = await createOptionGraphQLQuery(mutation, variables);
      if (result.data.createOption) {
        if (isClicked) {
          setIsClicked(false)
        } else {
          setIsClicked(true)
        }
      }
    } catch (error) {
      console.error('Option creation failed:', error);
    }
  };

  const deleteOption = async (optionId: string) => {

    const mutation = `
      mutation DeleteOption($optionId: String!) {
        deleteOption(optionId: $optionId) {
          o_id
        }
      }
    `;

    const variables = {
      optionId: optionId,
    };

    try {
      const result = await deleteGraphQLQuery(mutation, variables);
      if (result.data.deleteOption) {
        if (isClicked) {
          setIsClicked(false)
        } else {
          setIsClicked(true)
        }
      }
    } catch (error) {
      console.error('Failed to delete option:', error);
    }
  };


  const pushQuestionIndex = async (questionId: string, questionIndex: []) => {

  } 


  const pushQuestionText = async (surveyId: string, questionId: string, newText: string) => {
    const query = `
      mutation UpdateQuestionText($surveyId: String!, $questionId: String!, $newText: String!) {
        updateQuestionText(surveyId: $surveyId, questionId: $questionId, newText: $newText) {
          text
        }
      }
    `;
    try {
      const result = await updateTextGraphQLQuery({
        query,
        variables: { surveyId, questionId, newText },
      });
      if (result.data.updateQuestionText) {
        if (isClicked) {
          setIsClicked(false)
        } else {
          setIsClicked(true)
        }
      }
    } catch (error) {
      console.error('질문 제목 수정 실패:', error);
    }
  }

  const pushOptionScore = async (optionId: string, newText: string, newScore: number) => {
    const mutation = `
      mutation UpdateOptionTextAndScore($optionId: String!, $newText: String!, $newScore: Float!) {
        updateOptionTextAndScore(optionId: $optionId, newText: $newText, newScore: $newScore) {
          o_id
          text
          score
        }
      }
    `;

    const variables = {
      optionId: optionId,
      newText: newText,
      newScore: newScore,
    };

    try {
      const result = await updateTextAndScoreGraphQLQuery({
        query: mutation,
        variables: variables,
      });

      if (result.data.updateOptionTextAndScore) {
        if (isClicked) {
          setIsClicked(false)
        } else {
          setIsClicked(true)
        }
      }
    } catch (error) {
      console.error('옵션 업데이트 실패:', error);
    }
  };



  const updateMySurveyIsPublic = async (surveyId: string) => {
    const mutation = `
      mutation UpdateMySurveyIsPublic($surveyId: String!) {
        updateMySurveyIsPublic(surveyId: $surveyId) {
          public
        }
      }
    `

    const variables = {
      surveyId,
    }

    try {
      const result = await sendGraphQLQuery(mutation, variables);
      if (isClicked) {
        setIsClicked(false)
      } else {
        setIsClicked(true)
      }
      return result.data.updateMySurveyIsPublic;
    } catch (error) {
      console.error('Failed to update survey public status:', error);
      throw error;
    }
  };


    / ////////////////////////////////////////     useEffect      //////////////////////////////////////////////////

  
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
                  createdAt
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
      setOriginQuestions(surveyData.questions)
      setOriginOption(surveyData.options)
      console.log('fetch되었습니다')

      const mappedQuestions = surveyData.questions
        .map((question: { options: any[]; createdAt: Date; }) => {
          const sortedOptions = question.options.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          return {
            ...question,
            options: sortedOptions,
            createdAt: new Date(question.createdAt),
          };
        })
        .sort((a: { createdAt: { getTime: () => number; }; }, b: { createdAt: { getTime: () => number; }; }) => a.createdAt.getTime() - b.createdAt.getTime());

        setQuestions(mappedQuestions);
      } catch (error) {
        console.error('설문지 데이터 로딩 실패:', error);
      }
    };
    
    const checkMySurveyIsPublic = async (surveyId: string) => {
    const query = `
      mutation CheckMySurveyIsPublic($surveyId: String!) {
        checkMySurveyIsPublic(surveyId: $surveyId) {
          public
        }
      }
    `;

    const variables = {
      surveyId,
    };

    try {
      const result = await sendGraphQLQuery(query, variables);
      setIsThisSurveyPublic(result.data.checkMySurveyIsPublic.public)
      return result.data.checkMySurveyIsPublic.public;
    } catch (error) {
      console.error('Failed to fetch survey information:', error);
      throw error;
    }
    };

    if (surveyId) {
      fetchData();
      checkMySurveyIsPublic(surveyId);
    }
  }, [surveyId, isClicked]);

    / ////////////////////////////////////////     html      //////////////////////////////////////////////////

  
  return (
    <main className='flex-col w-full h-full p-[30px] pt-[60px]'>
      <section className='w-full h-[100px]  flex items-center justify-end pr-[50px]'>
          <button
            className='w-[150px] h-[50px] p-[5px] rounded-md shadow-md ml-[20px] bg-slate-200 hover:bg-blue-400'
            onClick={()=>updateMySurveyIsPublic(surveyId)}
          >
              <span className='font-bold text-[20px] mr-[10px]'>저장하기</span>
              <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
        {
          (isThisSurveyPublic === false) &&
          <button
            className='w-[150px] h-[50px] p-[5px] rounded-md shadow-md ml-[20px] bg-slate-200 hover:bg-blue-400'
            onClick={()=>updateMySurveyIsPublic(surveyId)}
          >
              <span className='font-bold text-[20px] mr-[10px]'>Puplic</span>
              <FontAwesomeIcon icon={faShareFromSquare} />
          </button> } 
        {
          (isThisSurveyPublic === true) &&
          <button
          className='w-[150px] h-[50px] p-[5px] rounded-md shadow-md ml-[20px] bg-slate-200 hover:bg-blue-400'
          onClick={() => updateMySurveyIsPublic(surveyId)}
          >
              <span className='font-bold text-[20px] mr-[10px]'>Private</span>
              <FontAwesomeIcon icon={faLock} />
            </button> 
        }
      </section>
      <section className='titleSection w-full h-[200px]  flex items-center justify-center '>
        <div className='titleDiv w-[500px]  flex items-center justify-center'>
          <input
            type="text"
            placeholder={`${originTitle}`}
            className='text-center text-[30px] w-full font-bold'
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
          />
          <button
            className='absolute translate-x-[300px] w-[80px] p-[5px] rounded-md shadow-md bg-slate-200 hover:bg-blue-400'
            onClick={() => PushSurveyTitle(surveyId, surveyTitle)}
          >
            제목 저장
          </button>
        </div>
      </section>
      <section className='descriptoionSection w-full h-full  flex items-center justify-center mb-[120px]'>
        <div className='descriptoionDiv min-w-[800px] h-[130px] flex shadow-sm shadow-slate-400 rounded-md p-[30px] cursor-pointer'>
          <input
            type='text'
            placeholder={`${originDescription}`}
            className='w-full h-full bg-transparent border-none'
            value={surveyDescription}
            onChange={(e) => setSurveyDescription(e.target.value)}
          />
          <button
            className='w-[120px] h-full p-[5px] rounded-md shadow-md bg-slate-200 hover:bg-blue-400'
            onClick={() => PushSurveyDescription(surveyId, surveyDescription)}
          >
            설명 저장
          </button>
        </div>
      </section>
      <section className='problemSection w-full min-h-[400px]  '>
        {Questions.length > 0 && (
          <ul className='problemUl flex-col list-decimal  pl-[30px]'>
            {Questions.map((Question, QuestionIndex) => (
              <li key={Question.q_id} className='mb-[60px] ml-[30px]'>
                <button
                  onClick={() => removeQuestion(surveyId, Question.q_id)}
                  className='bg-red-600 flex items-center justify-center absolute w-[30px] h-[30px] rounded-full translate-x-[-60px] translate-y-[-4px] hover:bg-slate-400 transition-all'
                >
                  <span className='text-white text-[40px]'>-</span>
                </button>
                <div className='px-[20px] w-[600px] py-[10px] shadow-sm shadow-slate-400 rounded-sm flex items-center'>
                  <input
                    type="text"
                    placeholder={Question.text}
                    className='ml-[10px] pl-[10px] w-[500px]'
                    value={Questions[QuestionIndex].text}
                    onChange={(e) => {
                      const newText = e.target.value;
                      setQuestions((prevQuestions) => {
                        const updatedQuestions = [...prevQuestions];
                        updatedQuestions[QuestionIndex] = {
                          ...updatedQuestions[QuestionIndex],
                          text: newText,
                        };
                        return updatedQuestions;
                      });
                    }}
                  />
                  <button
                    className='w-[50px] h-full shadow-sm rounded-md hover:slate-300'
                    onClick={() => pushQuestionText(surveyId, Question.q_id, Question.text)}
                  >
                    저장
                  </button>
                </div>
                <div className='flex mt-[20px] h-[80px]'>
                  {Question.options && Question.options.map((option, optionIndex) => (
                    <div
                      key={option.o_id}
                      className='mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm transition-all flex items-center'
                    >
                      <div className='bg-slate-300 flex items-center justify-center w-[35px] h-[35px] rounded-full mr-[10px]'>
                        <span>{optionIndex + 1}</span>
                      </div>
                      <div className='flex flex-col items-center justify-between'>
                        <input
                          type='text'
                          placeholder={`${option.text}`}
                          value={option.newText}
                          onChange={(e) => {
                            setOption((prevOption) => ({
                              ...prevOption,
                              newText: e.target.value,
                            }));
                          }}
                          className='bg-transparent'
                        />
                        <input
                          type='number'
                          placeholder='점수를 입력하세요.'
                          value={option.newScore}
                          onChange={(e) => {
                            setOption((prevOption) => ({
                              ...prevOption,
                              newScore: parseFloat(e.target.value),
                            }));

                          }}
                          className='bg-transparent pl-[60px]'
                        />
                      </div>
                      <button
                        onClick={()=>pushOptionScore(option.o_id, newoption.newText, newoption.newScore)}
                        className='w-[40px] text-[20px] h-full rounded-sm shadow-sm hover:bg-blue-600 hover:text-white'
                      >
                        <FontAwesomeIcon icon={faCheck} className='text-[20px]' />
                      </button>
                      <button
                        className='w-[40px] text-[20px] h-full rounded-sm shadow-sm hover:bg-red-600 hover:text-white'
                        onClick={()=>deleteOption(option.o_id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className='text-[20px]' />
                      </button>
                    </div>
                  ))}
                  <button
                    className='mr-[30px] p-[10px] w-[100px] h-full shadow-sm shadow-slate-400 rounded-sm hover:bg-slate-400 transition-all'
                    onClick={() => addOption(surveyId, Question.q_id)}
                  >
                    <span className=''>문항 추가 +</span>
                  </button>
                </div>
              
              </li>
            ))}
          </ul>)}
        <div className='problemPlusDiv mt-[30px]'>
          <button
            className='w-full py-[10px] rounded-md shadow-sm shadow-slate-400 hover:bg-slate-400 transition-all'
            onClick={()=>createQuestion(surveyId)}
          >
            문제 추가하기 +
          </button>
        </div>
      </section>
    </main>
  );
}
