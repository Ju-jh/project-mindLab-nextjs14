interface GraphQLMutation {
  mutation: string;
  variables: Record<string, any>;
}

export async function deleteGraphQLMutation({ mutation, variables }: GraphQLMutation) {
  const endpoint = 'https://mind-lab-be-bffdf1dcb8ba.herokuapp.com/graphql';

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ query: mutation, variables }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL DELETE mutation 실패:', error);
    throw error;
  }
}
