import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;

    margin-bottom: 2rem;
  }

  input {
    height: 4rem;
    width: 100%;

    padding: 0 1.5rem;

    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;

    background: #e7e9ee;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type='submit'] {
    width: 100%;
    height: 4rem;

    padding: 0 1.5rem;
    background: var(--green);
    color: #fff;

    border: 0;
    border-radius: 0.25rem;

    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 200ms ease;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
