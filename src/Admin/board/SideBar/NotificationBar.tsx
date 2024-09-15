import Icon from "../../../components/Icon";
import { PerentSideType } from "../../../utils/type";
import { listNotification } from "../../../utils/dummie";

interface Props {
    parentActive: PerentSideType
}

const NotificationBar: React.FC<Props> = ({ parentActive }) => {
    return (
        <>
            {(parentActive == 'Notification-ON' || parentActive == 'Notification-Mini-ON') && (
                <div className={`fixed flex-shrink-0 w-64 overflow-y-auto bg-background-light dark:bg-background-dark border-indigo-100 border-r-2 shadow-lg  lg:static py-5 px-1 ${parentActive === 'Notification-Mini-ON' ? 'mt-[64px] h-[calc(100vh-64px)] right-0 rounded-tl-3xl rounded-bl-3xl' : 'rounded-tr-3xl rounded-br-3xl'}`}>
                    <ul className="font-medium">
                        {listNotification.map((Notification) => (
                            <li key={Notification.id} className="cursor-pointer hover:text-primary-light">
                                <h6
                                    className={`flex items-center p-2 text-text rounded-lg dark:text-white dark:hover:bg-gray-700 group`}
                                >
                                    <Icon name={Notification.icon} />
                                    <span className="ms-2">{Notification.title}</span>
                                </h6>
                                <p className="p-2 dark:text-white">
                                    {Notification.Description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default NotificationBar