import { IconName } from "../components/Icon";

export const MenuData = [
    {
        menuName: "Dashboard",
        unikName: "dashboard",
        icon: "FaAngular" as IconName,
        childMenu: []
    },
    {
        menuName: "Info Profile",
        unikName: "profile",
        icon: "FaAvianex" as IconName,
        childMenu: []
    },
    {
        menuName: "Table",
        unikName: "table",
        icon: "FaAngular" as IconName,
        childMenu: []
    },
    {
        menuName: "Setting",
        unikName: "setting",
        icon: "FaAngular" as IconName,
        childMenu: [
            {
                menuName: "User-Permition",
                unikName: "user-P",
            },
            {
                menuName: "Menu Setting",
                unikName: "user-S",
            },
            {
                menuName: "User-Permition",
                unikName: "user-permition",
            },
            {
                menuName: "Menu Setting",
                unikName: "user-Setting",
            }
        ]
    },
    {
        menuName: "Setting2",
        unikName: "setting2",
        icon: "FaAngular" as IconName,
        childMenu: [
            {
                menuName: "User-Permition2",
                unikName: "user-permition2",
            },
            {
                menuName: "Menu Setting2",
                unikName: "user-Setting2",
            }
        ]
    },

]


export const listNotification = [
    {
        id: 1,
        title: "Non-Active Data",
        Description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
        icon: "FaAngular" as IconName
    },
    {
        id: 2,
        title: "Non-Active Data",
        Description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
        icon: "FaAvianex" as IconName
    },
    {
        id: 3,
        title: "Non-Active Data",
        Description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
        icon: "FaAngular" as IconName
    },
    {
        id: 4,
        title: "Non-Active Data",
        Description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
        icon: "FaAvianex" as IconName
    }
]