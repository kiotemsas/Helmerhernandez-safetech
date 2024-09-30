import { uniqueId } from "lodash";

import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconLockAccess,
  IconAppWindow,
} from "@tabler/icons-react";


const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "SafeTech",
    icon: IconChartDonut3,
    image: "/images/svgs/icon-cars.svg",
    href: "/",
    chip: "",
    chipColor: "secondary",
  },

  {
    id: uniqueId(),
    title: "Login",
    icon: IconChartDonut3,
    chip: "",
    chipColor: "secondary",
    href: "auth/auth1/login",
  },

  {
    id: uniqueId(),
    title: "Enlace 3",
    icon: IconChartDonut3,
    chip: "",
    chipColor: "secondary",
    href: "#",
  },


  {
    id: uniqueId(),
    title: "Enlace 4",
    icon: IconChartDonut3,
    chip: "",
    chipColor: "secondary",
    href: "#",
  },


  {
    id: uniqueId(),
    title: "Enlace 5",
    icon: IconChartDonut3,
    chip: "",
    chipColor: "secondary",
    href: "#",
  },

];

export default Menuitems;
