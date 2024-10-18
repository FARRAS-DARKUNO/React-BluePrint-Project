import { useState } from "react";
import Icon from "../../../components/Icon";
import { PerentSideType } from "../../../utils/type";
import { MenuData } from "../../../utils/dummie";

interface Props {
    parentActive: PerentSideType
}

const MenusBar: React.FC<Props> = ({ parentActive }) => {

    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const toggleMenu = (unikName: string) => {
        if (expandedMenu === unikName) {
            setExpandedMenu(null);
        } else {
            setExpandedMenu(unikName);
        }
    };
    return (
        <>
            {(parentActive == 'Menus-ON' || parentActive == 'Menus-Mini-ON') && (
                <div
                    className={`fixed flex-shrink-0 w-64 bg-background-light dark:bg-background-dark border-indigo-100 
                    transform transition-transform duration-300 ease-in-out border-r-2 shadow-lg rounded-tr-3xl rounded-br-3xl lg:static py-5 px-1
                    ${parentActive === 'Menus-Mini-ON' ? 'mt-[64px] h-[calc(100vh-64px)]' : 'rounded-tr-3xl rounded-br-3xl'} z-50`}
                >
                    <ul className="font-medium">
                        {MenuData.map((menu) => (
                            <li key={menu.unikName} className="cursor-pointer">
                                <h6
                                    onClick={() => {
                                        toggleMenu(menu.unikName);
                                    }}
                                    className={`flex items-center p-2 ${menu.unikName === menu.unikName ? "text-primary-light" : "text-text"} rounded-lg dark:text-white hover:text-primary-light dark:hover:bg-gray-700 group`}
                                >
                                    <Icon name={menu.icon} />
                                    <span className="ms-2">{menu.menuName}</span>
                                    {/* Add icon to indicate expand/collapse */}
                                    {menu.childMenu.length > 0 && (
                                        <span className={`ml-auto transition-transform duration-300 ease-in-out ${expandedMenu === menu.unikName ? "rotate-180" : "rotate-0"}`}>
                                            {"🠋"}
                                        </span>
                                    )}
                                </h6>
                                {menu.childMenu.length > 0 && (
                                    <ul
                                        className={`pl-5 transition-all duration-300 ease-in-out overflow-hidden 
                                        ${expandedMenu === menu.unikName ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none m-0'}`}
                                    >
                                        {menu.childMenu.map((child) => (
                                            <li key={child.unikName} className={``}>
                                                <h6
                                                    className={`flex items-center p-2 ${child.unikName === child.unikName ? "text-primary-light" : "text-gray-900"} 
                                                    rounded-lg dark:text-white hover:text-primary-light dark:hover:bg-gray-700 group`}
                                                >
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
        </>
    )
}

export default MenusBar