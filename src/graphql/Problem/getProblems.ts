interface GraphQLQuery {
  query: string;
}

export async function mapQuestionsToProblems(query: any, variables: any) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await fetch(`${endpoint}?query=${encodeURIComponent(query)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL 쿼리 실패:', error);
    throw error;
  }
}
