import HeaderBoard from "./HeaderBoard";
import SideBar from "./SideBar";
import useBoard from "./useBoard";

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
                    <h1>Konten Utama</h1>
                    <p>Sidebar ini mempengaruhi lebar konten di sebelahnya.</p>
                </div>
            </div>
        </div>
    );
}

export default Board;