// const store = {
//     data: {},
//     error: {},
//     loading: {},
//   } satisfies {
//     data: Record<string, unknown>;
//     error: Record<string, Error | null>;
//     loading: Record<string, boolean>;
//   };
  
//   function updateData<T>(payload: { uri: string; data: T }) {
//     store.data[payload.uri] = payload.data;
//   }
  
//   function updateError<T>(payload: { uri: string; error: T | null }) {
//     store.error[payload.uri] = payload.error;
//   }
  
//   function updateLoading(payload: { uri: string; loading: boolean }) {
//     store.loading[payload.uri] = payload.loading;
//   }
  
//   updateError({
//     uri: '',
//     error: new Error(''),
//   });
  
//   updateLoading({
//     uri: '',
//     loading: true,
//   });
  
//   // Hooks
  
//   function useManipulatorData(uri: string, autoFetch: boolean) {
//     const { data, error, loading } = useSelector(store, (state) => ({
//       data: state.data[uri],
//       error: state.data[uri],
//       loading: state.data[uri],
//     }));
  
//     const fetchData = async () => {
//       // Set data...
//     }
  
//     useEffect(() => {
//       if (autoFetch) {
//         fetchData()
//       }
//     }, [])
  
//     return {
//       data, 
//       error, 
//       loading, 
//       fetchData
//     }
//   }
  
  
//   // Page 1
//   const {data, loading} = useManipulatorData('', true);
  
//   // Page 1 > Bread Crumb
//   const {data} = useManipulatorData('', false);