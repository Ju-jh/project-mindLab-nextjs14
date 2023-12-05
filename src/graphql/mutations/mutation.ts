import { gql } from '@apollo/client';


export const CREATE_SURVEY = gql`
  mutation CreateSurvey($input: SurveyInput!) {
    createSurvey(input: $input)
  }
`;