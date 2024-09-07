import HeaderBoard from "./HeaderBoard";
import useBoard from "./useBoard";

const Board = () => {

    const {
        handleDarkMode,
        handleToggleDropdown,
        handleLanguage,
        dropdowns,
        languages,
     } = useBoard()

    return (
        <div className="flex w-100% flex-col bg-slate-400">
            <HeaderBoard
                handleDarkMode={handleDarkMode}
                handleToggleDropdown={handleToggleDropdown}
                handleLanguage={handleLanguage}
                dropdowns={dropdowns}
                languages={languages}
            />
            <div style={{ height: '9000px' }} >
                This div has a height of 100px.
            </div>
        </div>
    );
}

export default Board;