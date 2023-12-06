export async function getSurveyDataGraphQLQuery(query: string, surveyId: string) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        query: query,
        variables: { surveyId: surveyId },
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL query failed:', error);
    throw error;
  }
}