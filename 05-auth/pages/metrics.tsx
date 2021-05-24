import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { Can } from '../component/Can';
import { AuthContext } from '../contexts/AuthContext';
import { useCan } from '../hooks/useCan';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>

      <button onClick={() => Router.push('/dashboard')}>Dashboard</button>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');

    return {
      props: {},
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
);
