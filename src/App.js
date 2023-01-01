

import * as React from 'react';
import UIRoot from './Component/UIRoot.js';
import Loading from './Loading';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from 'react-query'

import css from './App.css';
import { ReactQueryDevtools } from 'react-query/devtools'

function queryErrorHandler(error){
  console.log(error);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});



 function App() {


  // const categoryMemo = React.useMemo(()=> [...categorys], [categorys]);

  return (
    <QueryClientProvider client={queryClient}>
      <UIRoot></UIRoot>
      <Loading></Loading>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
