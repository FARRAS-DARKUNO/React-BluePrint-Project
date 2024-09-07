import { useState } from "react";
import Icon from "../../components/Icon"
import { MenuData } from "../../utils/dummie"
import { PerentSideType } from "../../utils/type";

interface SideBarProps {
    ParentActiveChange: (parent: PerentSideType) => void;
    parentActive: PerentSideType
}

const SideBar: React.FC<SideBarProps> = ({ ParentActiveChange, parentActive }) => {

    const [unikMenu, setUnikMenu] = useState<string>('dashboard')

    const ChangeMenuHandler = (value: string) => {
        setUnikMenu(value)
    }
    return (

        <div
            className="h-[calc(100vh-64px)] w-[64px] flex flex-row"
            style={{ position: "fixed" }}
        >
            <nav
                className="flex flex-col p-3 pt-6 bg-secondary-light gap-4 rounded-r-xl h-[calc(100vh-64px)] border-primary-dark border-r-2"
                style={{
                    boxShadow: "4px 0 10px rgba(0, 0, 0, 0.4)",
                }}
            >
                <button
                    onClick={() => ParentActiveChange(parentActive == 'Menus-ON' ? 'CloseAll' : 'Menus-ON')}
                    className={`p-2 text-gray-400 ${parentActive == 'Menus-ON' ? 'bg-tertiary-light rounded-lg' : 'bg-transparent'}  shadow-md hover:bg-primary-light `}
                >
                    <Icon name='FaBarsStaggered' color='#ffffff' />
                </button>
                <button
                    onClick={() => ParentActiveChange(parentActive == 'Notification-ON' ? 'CloseAll' : 'Notification-ON')}
                    className={`p-2 text-gray-400 ${parentActive == 'Notification-ON' ? 'bg-tertiary-light rounded-lg' : 'bg-transparent'}  shadow-md hover:bg-primary-light `}
                >
                    <Icon name='FaBell' color='#ffffff' />
                </button>
            </nav>
            {parentActive == 'Menus-ON' && (
                <div
                    className="fixed flex-shrink-0 w-64 bg-background-light dark:bg-background-dark border-indigo-100 border-r-2 shadow-lg sm:left-16 rounded-tr-3xl rounded-br-3xl lg:static py-5 px-1"
                >
                    <ul className="font-medium">
                        {MenuData.map((menu) => (
                            <li key={menu.unikName} onClick={() => ChangeMenuHandler(menu.unikName)} className="cursor-pointer" >
                                <h6 className={`flex items-center p-2 ${unikMenu == menu.unikName ? "text-primary-light" : "text-text"} rounded-lg dark:text-white hover:text-primary-light dark:hover:bg-gray-700 group`}>
                                    <Icon name={menu.icon} />
                                    <span className="ms-2">{menu.menuName}</span>
                                </h6>
                                {menu.childMenu.length > 0 && (
                                    <ul className="pl-5">
                                        {menu.childMenu.map((child) => (
                                            <li key={child.unikName}>
                                                <h6 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-primary-light dark:hover:bg-gray-700 group">
                                                    <span className="ms-2">{child.menuName}</span>
                                                </h6>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SideBar