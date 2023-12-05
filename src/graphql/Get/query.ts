interface GraphQLQuery {
  query: string;
}

export async function getGraphQLQuery({query}: GraphQLQuery) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await fetch(`${endpoint}?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL 쿼리 실패:', error);
    throw error;
  }
}
