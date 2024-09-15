import Icon from "../../../components/Icon"
import { PerentSideType } from "../../../utils/type";
import MenusBar from "./MenusBar";
import NotificationBar from "./NotificationBar";
interface SideBarProps {
    ParentActiveChange: (parent: PerentSideType) => void;
    parentActive: PerentSideType
}

const SideBar: React.FC<SideBarProps> = ({ ParentActiveChange, parentActive }) => {

    return (
        <div
            className="h-[calc(100vh-64px)] w-[64px] flex flex-row max-lg:hidden"
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
                    className={`p-2 text-gray-400 ${parentActive == 'Menus-ON' ? `bg-tertiary-light rounded-lg` : 'bg-transparent'}  shadow-md hover:bg-primary-light `}
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
            <MenusBar parentActive={parentActive} />
            <NotificationBar parentActive={parentActive} />
        </div>
    )
}

export default SideBar