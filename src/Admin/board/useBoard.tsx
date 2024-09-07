import { useEffect, useRef, useState } from "react";
import { LanguageType, PerentSideType } from "../../utils/type";
import { toggleDarkMode } from "../../store/themeSlice/themeSlice";
import { useDispatch } from "react-redux";

export type dropdownName = 'isDarkMode' | 'isOpenAccount' | 'isOpenLanguage' | 'closeAll'

const useBoard = () => {
    const dispatch = useDispatch();

    const handleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            console.log('hallo')
            handleToggleDropdown('closeAll')
        }
    }

    const [dropdowns, setDropdowns] = useState({
        isOpenAccount: false,
        isOpenLanguage: false,
        isOpenDarkMode: false,
        isLightMode: true
    });

    const [languages, setLanguage] = useState<LanguageType>('Eng')

    const [parentActive, setParetntActive] = useState<PerentSideType>('CloseAll')

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



    const ParentActiveChange = (parent: PerentSideType) => {
        console.log(parent)
        setParetntActive(parent)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [parentActive]);

    return {
        handleDarkMode,
        handleToggleDropdown,
        handleLanguage,
        ParentActiveChange,
        dropdowns,
        languages,
        parentActive,
        modalRef
    }
}

export default useBoard