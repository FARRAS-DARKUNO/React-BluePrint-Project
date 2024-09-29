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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted data:', formData);
    };

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
                <div className={`flex flex-1 p-4 flex-col bg-background dark:bg-background-dark h-[1000px] ${parentActive === 'CloseAll' ? "lg:ml-[64px]" : "lg:ml-[320px]"}`}>
                    <form onSubmit={handleSubmit}>
                        <MTC.Input.Field
                            magic={{
                                regex: emailRegex,
                                errorMessage:"hallos",
                                inputValue: formData.email,
                                setInputValue: (value) => handleChange('email', value)
                            }}
                            required
                        />
                        <MTC.Input.Field
                            helperText="Please enter your password"
                            magic={{
                                type: "password",
                                inputValue: formData.password,
                                setInputValue: (value) => handleChange('password', value)
                            }}
                        />
                        <MTC.Button.Normal buttonType="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Board;