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
        password: '',
        selectedFile: null,
        search: '',
        categoryValue: 'all',
        searchDropdown: '',
        counter: 0,
    });

    const category = ['Hallo kamuu', "hallo Aku", "Hallo KitA Semua"]

    const handleSearch = () => {
        console.log(formData.search)
    }

    const handleChange = (field: string, value: any) => {
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
                                errorMessage: "hallos",
                                inputValue: formData.email,
                                setInputValue: (value) => handleChange('email', value)
                            }}
                        />
                        <MTC.Input.Field
                            helperText="Please enter your password"
                            magic={{
                                type: "password",
                                inputValue: formData.password,
                                setInputValue: (value) => handleChange('password', value)
                            }}
                        />
                        <MTC.Input.FileUploader
                            style={{ spaceY: 2, roundedSize: 'xl' }}
                            magic={{
                                selectedFile: formData.selectedFile,
                                setSelectedFile: (value) => handleChange('selectedFile', value),
                                isConvertBase64: true,
                                accept: '.png, .pdf'

                            }}

                        />
                        <MTC.Input.SearchBar magic={{ onSearch: handleSearch, searchTerm: formData.search, setSearchTerm: (value) => handleChange('search', value) }} />
                        <MTC.Input.SearchDropdown magic={{
                            categories: category,
                            searchTerm: formData.searchDropdown,
                            setSelectedCategory: (value) => handleChange('categoryValue', value),
                            onSearch: () => {
                                console.log(formData.categoryValue)
                                console.log(formData.searchDropdown)
                            },
                            selectedCategory: formData.categoryValue,
                            setSearchTerm: (value) => handleChange('searchDropdown', value),
                        }} />
                        <MTC.Input.FieldDropDown magic={{
                            options: [
                                { label: "hallo", value: "Mantap" },
                                { label: "hallo2", value: "Mantap2" },
                                { label: "hallo3", value: "Mantap4" }
                            ]
                        }} />
                        <MTC.Input.Counter magic={{
                            inputValue: formData.counter,
                            setInputValue: (value) => handleChange('counter', value),
                            maximum: 10,
                            minimum:1
                        }} />
                        <MTC.Button.Normal buttonType="submit" />
                        <MTC.Button.Neon buttonType="submit" />
                        <MTC.Button.GradationBorder buttonType="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Board;