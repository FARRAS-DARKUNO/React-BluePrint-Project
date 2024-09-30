import HeaderBoard from "./HeaderBoard";
import SideBar from "./SideBar";
import useBoard from "./useBoard";
import Button from '../../components/Button/Button';
import { useTranslation } from "react-i18next";
const Board = () => {

    const {
        handleDarkMode,
        handleToggleDropdown,
        handleLanguage,
        ParentActiveChange,
        dropdowns,
        languages,
        parentActive,
        modalRef
    } = useBoard()

    const { t } = useTranslation();
    return (
        <div className="flex w-100% flex-col bg-background-light dark:bg-background-dark">
            <HeaderBoard
                handleDarkMode={handleDarkMode}
                handleToggleDropdown={handleToggleDropdown}
                handleLanguage={handleLanguage}
                dropdowns={dropdowns}
                languages={languages}
                modalRef={modalRef}
            />
            <div className="mt-[64px] flex">
                <SideBar
                    ParentActiveChange={ParentActiveChange}
                    parentActive={parentActive}
                />
                <div className={`flex-1 p-4 bg-white h-[1000px] ${parentActive === 'CloseAll' ? "ml-[64px]" : "ml-[320px]"}`}>
                    <h1>{t('main_content')}</h1>
                    <p>{t('sidebar_affect')}</p>


                    <div className="p-4">
                        {/* Input String dengan batasan default */}
                        <Button type="string" />

                        {/* Input Number dengan nilai minimum dan maksimum default */}
                        <Button type="number" />

                        {/* Input Decimal dengan nilai minimum dan maksimum default */}
                        <Button type="decimal" />

                        {/* Input DateTime tanpa batasan khusus */}
                        <Button type="datetime" />

                        {/* Input Password dengan batasan default */}
                        <Button isPassword type="string" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;