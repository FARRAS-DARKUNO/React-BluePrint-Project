
import { useState } from "react";
import MTC from "../../MTC";
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const tougle = () => {
        console.log(isModalOpen)
        setIsModalOpen(true)
    }


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
                <div className={`flex flex-1 p-4 flex-col overflow-y-auto bg-background dark:bg-background-dark h-[calc(100vh-64px)] ${parentActive === 'CloseAll' ? "lg:ml-[64px]" : "lg:ml-[320px]"}`}>
                    <MTC.Button.Normal onClick={tougle} />
                    <MTC.Modal.Parent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
                        <MTC.Modal.Message meesage="Hallo"/>
                        <MTC.Input.Field/>
                    </MTC.Modal.Parent>
                </div>
            </div>
        </div>
    );
}

export default Board;