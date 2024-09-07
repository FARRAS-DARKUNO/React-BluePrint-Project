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
                unikName: "user-permition",
            },
            {
                menuName: "Menu Setting",
                unikName: "user-permition",
            }
        ]
    },

]