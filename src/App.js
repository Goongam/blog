

import * as React from 'react';
import UIRoot from './Component/UIRoot.js';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from 'react-query'

import css from './App.css';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();



 function App() {


  // const categoryMemo = React.useMemo(()=> [...categorys], [categorys]);

  return (
    <QueryClientProvider client={queryClient}>
      <UIRoot></UIRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
