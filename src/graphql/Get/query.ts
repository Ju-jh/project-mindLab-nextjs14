export async function getGraphQLQuery(query: any, variables: any) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await fetch(endpoint, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL query failed:', error);
    throw error;
  }
}