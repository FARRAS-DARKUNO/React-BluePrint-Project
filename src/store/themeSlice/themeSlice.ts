import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import KEY from '../../utils/TypeKey';
import { IDarkMode } from '../type';
import { generalLoging } from '../../utils/loging';


const initialState: IDarkMode = {
    isDarkMode: Cookies.get(KEY.DarkModeSetting)
        ? JSON.parse(Cookies.get(KEY.DarkModeSetting) as string)
        : false,
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
            Cookies.set(KEY.DarkModeSetting, JSON.stringify(state.isDarkMode));
            if (state.isDarkMode == true) {
                generalLoging("Change Theme to Darkmode")
                document.documentElement.classList.add('dark');
            } else {
                generalLoging("Change Theme to LightMode")
                document.documentElement.classList.remove('dark');
            }
        },
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.isDarkMode = action.payload;
            Cookies.set(KEY.DarkModeSetting, JSON.stringify(state.isDarkMode));
            if (state.isDarkMode == true) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
    },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;