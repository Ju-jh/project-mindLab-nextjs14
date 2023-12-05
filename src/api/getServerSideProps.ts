import { sendGraphQLQuery } from '@/app/page';

export async function getServerSideProps() {
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