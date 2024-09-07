
import fetchReducer from './fetchingData/reducer';
import darkModeSlice from './themeSlice/themeSlice'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        fetchData: fetchReducer,
        themeChsnge : darkModeSlice 
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;