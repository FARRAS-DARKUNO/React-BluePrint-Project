import { useState } from 'react';
import Icon from '../../components/Icon';

const HeaderBoard = () => {

    type dropdownName = 'isDarkMode' | 'isOpenAccount' | 'isOpenLanguage' | 'closeAll'

    type languageType = 'Eng' | 'Ind'

    const [isDarkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const [dropdowns, setDropdowns] = useState({
        isOpenAccount: false,
        isOpenLanguage: false,
        isOpenDarkMode: false,
        isLightMode: true
    });

    const [languages, setLanguage] = useState<languageType>('Eng')

    const handleToggleDropdown = (dropdownName: dropdownName) => {
        setDropdowns(prevState => ({
            ...prevState,
            isOpenAccount: dropdownName === 'isOpenAccount' ? !prevState.isOpenAccount : false,
            isOpenLanguage: dropdownName === 'isOpenLanguage' ? !prevState.isOpenLanguage : false,
        }));
    };

    const handleLanguage = (language: languageType) => {
        setLanguage(language)
        handleToggleDropdown('closeAll')
    }

    return (
        <header className="flex fixed top-0 left-0 w-full bg-blue-500 text-white p-3 items-center justify-between">
            <img src="./public/Logo-Bank-Mandiri.png" alt="logo mandiri" className="h-12" />
            <div className="flex flex-row-reverse items-center" >
                <div id='Profile'>
                    <button className="flex items-center gap-2 m-0 p-0 bg-transparent hover:bg-transparent" id="avatarButton" onClick={() => handleToggleDropdown('isOpenAccount')} typeof="button" >
                        <img className="w-10 h-10 rounded-full" src="./public/pp.jpg" alt="" />
                        <div className="font-medium dark:text-white">
                            <h6 className='text-left' >Jese Leos</h6>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Web Developer</p>
                        </div>
                    </button>
                    {dropdowns.isOpenAccount && (
                        <div id="userDropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 top-14">
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>Bonnie Green</div>
                                <div className="font-medium ">name@flowbite.com</div>
                            </div>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    )}
                </div>
                <div id='Change Language' className='mr-4'>
                    <button className="flex items-center gap-2 m-0 p-0 bg-transparent hover:bg-transparent" typeof="button" onClick={() => handleToggleDropdown('isOpenLanguage')}>
                        <img className="w-8 h-8 rounded-full" src={languages == 'Eng' ? "./public/english.png" : "./public/indo.png"} alt="" />
                        <p className='text-left' >{languages == 'Eng' ? "Eng" : "Ind"}</p>
                        <Icon name='FaAngleDown' size={14} />
                    </button>
                    {dropdowns.isOpenLanguage && (
                        <div id="userDropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 top-14">
                            <div className="py-1">
                                <a onClick={() => handleLanguage('Ind')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                                    Indonesia
                                </a>
                            </div>
                            <div className="py-1">
                                <a onClick={() => handleLanguage('Eng')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                                    English
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <label className='themeSwitcherThree relative inline-flex cursor-pointer select-none items-center mr-4'>
                    <input
                        type='checkbox'
                        checked={isDarkMode}
                        onChange={handleDarkMode}
                        className='sr-only'
                    />

                    <div className='shadow-card flex h-[46px] w-[82px] items-center justify-center rounded-md bg-white'>
                        <span
                            className={`flex h-9 w-9 items-center justify-center rounded ${!isDarkMode ? 'bg-primary text-white' : 'text-body-color'
                                }`}
                        >
                            <Icon name='FaSun' color={!isDarkMode ? '#00ff00' : '#000000'} />
                        </span>
                        <span
                            className={`flex h-9 w-9 items-center justify-center rounded ${isDarkMode ? 'bg-primary text-white' : 'text-body-color'
                                }`}
                        >
                            <Icon name='FaMoon' color={isDarkMode ? '#00ff00' : '#000000'} />
                        </span>
                    </div>
                </label>

            </div>
        </header>

    )
}

export default HeaderBoard