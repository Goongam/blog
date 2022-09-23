

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


const queryClient = new QueryClient();



 function App() {


  // const categoryMemo = React.useMemo(()=> [...categorys], [categorys]);

  return (
    <QueryClientProvider client={queryClient}>
      <UIRoot></UIRoot>
    </QueryClientProvider>
  );
}
export default App;
