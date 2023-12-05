import axios from 'axios';

interface GraphQLQuery {
  query: string;
}

export async function getGraphQLQuery({ query }: GraphQLQuery) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await axios.get(endpoint, {
      params: { query },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('GraphQL 쿼리 실패:', error);
    throw error;
  }
}
