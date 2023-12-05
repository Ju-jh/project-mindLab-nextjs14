export async function deleteGraphQLQuery(mutation: any, variables: any) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL 쿼리 실패:', error);
    throw error;
  }
}