import { useState } from "react";
import { LanguageType } from "../../utils/type";
import { toggleDarkMode } from "../../store/themeSlice/themeSlice";
import { useDispatch } from "react-redux";

export type dropdownName = 'isDarkMode' | 'isOpenAccount' | 'isOpenLanguage' | 'closeAll'

const useBoard = () => {
    const dispatch = useDispatch();

    const handleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    const [dropdowns, setDropdowns] = useState({
        isOpenAccount: false,
        isOpenLanguage: false,
        isOpenDarkMode: false,
        isLightMode: true
    });

    const [languages, setLanguage] = useState<LanguageType>('Eng')

    const handleToggleDropdown = (dropdownName: dropdownName) => {
        setDropdowns(prevState => ({
            ...prevState,
            isOpenAccount: dropdownName === 'isOpenAccount' ? !prevState.isOpenAccount : false,
            isOpenLanguage: dropdownName === 'isOpenLanguage' ? !prevState.isOpenLanguage : false,
        }));
    };

    const handleLanguage = (language: LanguageType) => {
        setLanguage(language)
        handleToggleDropdown('closeAll')
    }

    return {
        handleDarkMode,
        handleToggleDropdown,
        handleLanguage,
        dropdowns,
        languages,
    }
}

export default useBoard