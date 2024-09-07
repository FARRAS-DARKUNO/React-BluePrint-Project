import Icon from '../../components/Icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index'
import { LanguageType } from '../../utils/type';
import { dropdownName } from './useBoard';

interface HeaderBoardProps {
    handleDarkMode: () => void;
    handleToggleDropdown: (dropdownName: dropdownName) => void;
    handleLanguage: (language: LanguageType) => void;
    dropdowns: {
        isOpenAccount: boolean;
        isOpenLanguage: boolean;
        isOpenDarkMode: boolean;
    };
    languages: LanguageType
}

const HeaderBoard: React.FC<HeaderBoardProps> = ({
    handleDarkMode,
    handleToggleDropdown,
    handleLanguage,
    dropdowns,
    languages
}) => {
    const isDarkMode = useSelector((state: RootState) => state.themeChsnge.isDarkMode);

    return (
        <header className="flex fixed top-0 left-0 w-full bg-secondary dark:bg-secondary-dark p-3 items-center justify-between">
            <div className='flex items-center gap-7'>
                <button
                    className="p-2 text-gray-400 bg-tertiary-light rounded-lg shadow-md hover:bg-primary-light lg:hidden"
                >
                    <Icon name='FaBarsStaggered' color='#ffffff' />
                </button>
                <img src="./public/Logo-Bank-Mandiri.png" alt="logo mandiri" className="h-12" />
            </div>
            <div className="flex flex-row-reverse items-center gap-7 lg:hidden">
                <button
                    // onClick={handleButtonClick}
                    className="p-2  text-gray-400 bg-tertiary-light rounded-lg shadow-md hover:bg-primary-light "
                >
                    <Icon name='FaSliders' color='#ffffff' />
                </button>
                <button
                    // onClick={handleButtonClick}
                    className="p-2  text-gray-400 bg-tertiary-light rounded-lg shadow-md hover:bg-primary-light "
                >
                    <Icon name='FaBell' color='#ffffff' />
                </button>
            </div>
            <div className="flex flex-row-reverse items-center gap-7 max-lg:hidden" >
                <div id='Profile'>
                    <button className="flex items-center gap-2 m-0 p-0 bg-transparent hover:bg-transparent" id="avatarButton" onClick={() => handleToggleDropdown('isOpenAccount')} typeof="button" >
                        <img className="w-10 h-10 rounded-full" src="./public/pp.jpg" alt="" />
                        <div id="Profile Info">
                            <h6 className='text-left text-text-dark' >Jese Leos</h6>
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
                <div id='Change Language' >
                    <button className="flex items-center gap-2 m-0 p-0 bg-transparent hover:bg-transparent" typeof="button" onClick={() => handleToggleDropdown('isOpenLanguage')}>
                        <img className="w-8 h-8 rounded-full" src={languages == 'Eng' ? "./public/english.png" : "./public/indo.png"} alt="" />
                        <p className='text-left' >{languages == 'Eng' ? "Eng" : "Ind"}</p>
                        <Icon name='FaAngleDown' size={14} color='#ffffff' />
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
                <label className='themeSwitcherThree relative inline-flex cursor-pointer select-none items-center shadow-md'>
                    <input
                        type='checkbox'
                        checked={isDarkMode}
                        onChange={handleDarkMode}
                        className='sr-only'
                    />

                    <div className='shadow-card flex h-[46px] w-[82px] items-center justify-center rounded-md bg-background-dark' >
                        <span
                            className={`shadow-md flex h-9 w-9 items-center justify-center rounded ${!isDarkMode ? 'bg-primary-dark text-white' : 'text-body-color'
                                }`}
                        >
                            <Icon name='FaSun' color={!isDarkMode ? '#FFFFFF' : '#000000'} />
                        </span>
                        <span
                            className={`shadow-md flex h-9 w-9 items-center justify-center rounded ${isDarkMode ? 'bg-secondary-light text-white' : 'text-body-color'
                                }`}
                        >
                            <Icon name='FaMoon' color={isDarkMode ? '#FFFFFF' : '#000000'} />
                        </span>
                    </div>
                </label>

            </div>
        </header>

    )
}

export default HeaderBoard