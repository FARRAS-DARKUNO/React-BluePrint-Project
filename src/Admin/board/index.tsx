import HeaderBoard from "./HeaderBoard/HeaderBoard";
import SideBar from "./SideBar/SideBar";
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
                ParentActiveChange={ParentActiveChange}
                dropdowns={dropdowns}
                languages={languages}
                modalRef={modalRef}
                parentActive={parentActive}
            />
            <div className="mt-[64px] flex">
                <SideBar
                    ParentActiveChange={ParentActiveChange}
                    parentActive={parentActive}
                />
                <div className={`flex-1 p-4 bg-white h-[1000px] ${parentActive === 'CloseAll' ? "lg:ml-[64px]" : "lg:ml-[320px]"}`}>
                    <h1>Konten Utama</h1>
                    <p>Sidebar ini mempengaruhi lebar konten di sebelahnya.</p>
                </div>
            </div>
        </div>
    );
}

export default Board;