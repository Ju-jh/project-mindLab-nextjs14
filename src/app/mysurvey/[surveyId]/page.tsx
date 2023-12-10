'use client'



import { createOptionGraphQLQuery } from '@/graphql/Option/createOption';
import { updateTextAndScoreGraphQLQuery } from '@/graphql/Option/pushOptionTextAndScore';
import { sendGraphQLQuery } from '@/graphql/Problem/createProblem';
import { updateTextGraphQLQuery } from '@/graphql/Problem/pushQuestionText';
import { deleteGraphQLQuery } from '@/graphql/Survey/deleteSurvey';
import { getSurveyDataGraphQLQuery } from '@/graphql/Survey/getSurveyData';
import { faCheck, faFloppyDisk, faLock, faShareFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
}

interface Option {
  localScore: number;
  localText: string;
  o_id: string;
  text: string;
  score: number;
  newText: string; 
  newScore: number;
}

export default function Home({ params }: { params: { surveyId: string } }) {
  const { surveyId } = params;

  const [isThisSurveyPublic, setIsThisSurveyPublic] = useState<boolean | undefined>();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const [originTitle, setOriginTitle] = useState<string>('');
  const [surveyTitle, setSurveyTitle] = useState<string>(originTitle);

  const [originDescription, setOriginDescription] = useState<string>('');
  const [surveyDescription, setSurveyDescription] = useState<string>(originDescription);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [questionTexts, setQuestionTexts] = useState<string[]>([]);
  const [optionTexts, setOptionTexts] = useState<string[][]>([]);
  const [optionScores, setOptionScores] = useState<number[][]>([]);

  const PushSurveyTitle = async (surveyId: string, newTitle: string) => {
    const query = `
      mutation UpdateMySurveyTitle($surveyId: String!, $newTitle: String!) {
        updateMySurveyTitle(surveyId: $surveyId, newTitle: $newTitle) {
          success
          message
        }
      }
    `;
    try {
      const result = await sendGraphQLQuery(query, { surveyId, newTitle });
      if (result.data.updateMySurveyTitle.success) {
        console.log(result.data.updateMySurveyTitle.message);
      }
    } catch (error) {
      console.error('설문지 제목 수정 실패:', error);
    }
  };

  const PushSurveyDescription = async (surveyId: string, newDescription: string) => {
    const query = `
      mutation UpdateMySurveyDescription($surveyId: String!, $newDescription: String!) {
        updateMySurveyDescription(surveyId: $surveyId, newDescription: $newDescription) {
          success
          message
        }
      }
    `;
    try {
      const result = await sendGraphQLQuery(query, { surveyId, newDescription });
      if (result.data.updateMySurveyDescription.success) {
        console.log(result.data.updateMySurveyDescription.message);
      }
    } catch (error) {
      console.error('설문지 설명 수정 실패:', error);
    }
  };

  const createQuestion = async (surveyId: string) => {
    const mutation = `
      mutation CreateQuestion($surveyId: String!) {
        createQuestion(surveyId: $surveyId) {
          success
          message
          q_id
        }
      }
    `;
    const variables = {
      surveyId: surveyId,
    };

    try {
      const result = await sendGraphQLQuery(mutation, variables);
      if (result.data.createQuestion.success) {
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
          setIsClicked(false);
        } else {
          setIsClicked(true);
        }
      }
    } catch (error) {
      console.error('Question creation failed:', error);
    }
  };

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

  const removeQuestion = async (surveyId: string, questionId: string) => {
    const mutation = `
      mutation DeleteQuestion($surveyId: String!, $questionId: String!) {
        deleteQuestion(surveyId: $surveyId, questionId: $questionId) {
          success
          message
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
          setIsClicked(false);
        } else {
          setIsClicked(true);
        }
      }
    } catch (error) {
      console.error('Failed to delete questions:', error);
    }
  };

  const addOption = async (surveyId: string, questionId: string) => {
    const mutation = `
      mutation CreateQuestion($surveyId: String!) {
        createQuestion(surveyId: $surveyId) {
          success
          message
        }
      }
    `;
    const variables = {
      surveyId: surveyId,
      questionId: questionId,
    };
    try {
      const result = await createOptionGraphQLQuery(mutation, variables);
      if (result.data.createOption) {
        if (isClicked) {
          setIsClicked(false);
        } else {
          setIsClicked(true);
        }
      }
    } catch (error) {
      console.error('Option creation failed:', error);
    }
  };

  const pushOptionTextAndScore = async (optionId: string, newText: string, newScore: number) => {
    const mutation = `
      mutation UpdateOptionTextAndScore($optionId: String!, $newText: String!, $newScore: Float!) {
        updateOptionTextAndScore(optionId: $optionId, newText: $newText, newScore: $newScore) {
          success
          message
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

      if (result.data.updateOptionTextAndScore.success) {
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

  const deleteOption = async (optionId: string) => {
    const mutation = `
      mutation DeleteOption($optionId: String!) {
        deleteOption(optionId: $optionId) {
          success
          message
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
          setIsClicked(false);
        } else {
          setIsClicked(true);
        }
      }
    } catch (error) {
      console.error('Failed to delete option:', error);
    }
  };

  const updateMySurveyIsPublic = async (surveyId: string) => {
    const mutation = `
      mutation UpdateMySurveyIsPublic($surveyId: String!) {
        updateMySurveyIsPublic(surveyId: $surveyId) {
          success
          message
        }
      }
    `;

    const variables = {
      surveyId,
    };

    try {
      const result = await sendGraphQLQuery(mutation, variables);
      if (result.data.updateMySurveyIsPublic.success) {
        if (isClicked) {
          setIsClicked(false);
        } else {
          setIsClicked(true);
        }
        return result.data.updateMySurveyIsPublic.success;
      }
    } catch (error) {
      console.error('Failed to update survey public status:', error);
      throw error;
    }
  };

  const updateQuestionText = (questionIndex: number, text: string) => {
    const updatedTexts = [...questionTexts];
    updatedTexts[questionIndex] = text;
    setQuestionTexts(updatedTexts);
  };

  const updateOptionText = (questionIndex: number, optionIndex: number, text: string) => {
    const updatedTexts = [...optionTexts];
    updatedTexts[questionIndex][optionIndex] = text;
    setOptionTexts(updatedTexts);
  };

  const updateOptionScore = (questionIndex: number, optionIndex: number, score: number) => {
    const updatedScores = [...optionScores];
    updatedScores[questionIndex][optionIndex] = score;
    setOptionScores(updatedScores);
  };

  
  useEffect(() => {
    const fetchData = async () => {
        const query = `
          mutation GetSurveyData($surveyId: String!) {
            getSurveyData(surveyId: $surveyId) {
              success
              message
              survey {
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
          }
          `
      
      const result = await getSurveyDataGraphQLQuery(query, surveyId);
      
      try {
        if (result.data.getSurveyData.success) {
          const surveyData = result.data.getSurveyData.survey;
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
    
          setOriginTitle(surveyData.title);
          setOriginDescription(surveyData.description);
          setQuestions(mappedQuestions);
        } else {
          console.log(result.data.getSurveyData.message)
        }
      } catch (error) {
        console.error(result.data.getSurveyData.message, error);
      }
    };
    
    const checkMySurveyIsPublic = async (surveyId: string) => {
    const query = `
      mutation CheckMySurveyIsPublic($surveyId: String!) {
        checkMySurveyIsPublic(surveyId: $surveyId) {
          success
          message
          public
        }
      }
    `;

    const variables = {
      surveyId,
    };
      
    const result = await sendGraphQLQuery(query, variables);

    try {
      if (result.data.checkMySurveyIsPublic.success) {
        setIsThisSurveyPublic(result.data.checkMySurveyIsPublic.public)
        return result.data.checkMySurveyIsPublic.public;
      } else {
        console.log(result.data.checkMySurveyIsPublic.message)
      }
    } catch (error) {
      console.error(result.data.checkMySurveyIsPublic.message, error);
      throw error;
    }
    };

    if (surveyId) {
      fetchData();
      checkMySurveyIsPublic(surveyId);
    }
  }, [surveyId, isClicked]);

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
        {questions && questions.length > 0 && (
          <ul className='problemUl flex-col list-decimal  pl-[30px]'>
            {questions.map((question, questionIndex) => (
              <li key={question.q_id} className='mb-[60px] ml-[30px]'>
                <button
                  onClick={() => removeQuestion(surveyId, question.q_id)}
                  className='bg-red-600 flex items-center justify-center absolute w-[30px] h-[30px] rounded-full translate-x-[-60px] translate-y-[-4px] hover:bg-slate-400 transition-all'
                >
                  <span className='text-white text-[40px]'>-</span>
                </button>
                <div className='px-[20px] w-[600px] py-[10px] shadow-sm shadow-slate-400 rounded-sm flex items-center'>
                  {
                    questionTexts &&(
                  <input
                    type="text"
                    placeholder={question.text}
                    className='ml-[10px] pl-[10px] w-[500px]'
                    value={optionTexts[questionIndex]}
                    onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                  />)
                  }
                  <button
                    className='w-[50px] h-full shadow-sm rounded-md hover:slate-300'
                  >
                    저장
                  </button>
                </div>
                <div className='flex mt-[20px] h-[80px]'>
                  {question.options && question.options.map((option, optionIndex) => (
                    <div
                      key={option.o_id}
                      className='mr-[30px] px-[20px] py-[10px] shadow-sm shadow-slate-400 rounded-sm transition-all flex items-center'
                    >
                      <div className='bg-slate-300 flex items-center justify-center w-[35px] h-[35px] rounded-full mr-[10px]'>
                        <span>{optionIndex + 1}</span>
                      </div>
                      <div className='flex flex-col items-center justify-between'>
                        {optionTexts && optionScores &&(
                          <input
                            type='text'
                            placeholder={`${option.text}`}
                            value={optionTexts[questionIndex][optionIndex]}
                            onChange={(e) => updateOptionText(questionIndex, optionIndex, e.target.value)}
                          />)}
                        {optionTexts && optionScores && (
                          <input
                            type='number'
                            placeholder='점수를 입력하세요.'
                            className='bg-transparent pl-[60px]'
                            value={optionScores[questionIndex][optionIndex]}
                            onChange={(e) => updateOptionScore(questionIndex, optionIndex, Number(e.target.value))}
                          />
                        )}
                      </div>
                      <button
                        className='w-[40px] text-[20px] h-full rounded-sm shadow-sm hover:bg-blue-600 hover:text-white'
                          onClick={() => pushOptionTextAndScore(option.o_id, option.localText, option.localScore)}
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
                    onClick={() => addOption(surveyId, question.q_id)}
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
