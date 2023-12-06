interface UpdateGraphQLQueryParams {
  query: string;
  variables: Record<string, any>;
}

export const updateTextGraphQLQuery = async (params: UpdateGraphQLQueryParams) => {
  const { query, variables } = params;

  try {
    const response = await fetch('/your-graphql-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw new Error(`GraphQL mutation failed: ${result.message}`);
    }
  } catch (error: any) {
    throw new Error(`GraphQL mutation failed: ${error.message}`);
  }
};
