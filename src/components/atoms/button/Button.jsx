import { Link } from "react-router-dom";

const styles = {
   default:
      "hover:bg-amber-50 hover:text-amber-900 text-yellow-700 py-2 min-w-22 rounded",
};

export const ButtonBasic = ({ title, href, type, styledCustom, onClick }) => {
   if (!href)
      return (
         <button
            type={type}
            className={styles.default + " " + styledCustom}
            onClick={onClick}>
            {title}
         </button>
      );
   return (
      <Link to={href}>
         <button className={styles.default + " " + styledCustom}>
            {title}
         </button>
      </Link>
   );
};

export const ButtonLink = ({
   disabled,
   children,
   type,
   onClick,
   href,
   styledCustom,
}) => {
   if (href) {
      return (
         <a
            onClick={onClick}
            className="mt-4 inline-flex gap-2 cursor-pointer justify-center rounded-md border border-green-600 bg-green-100 px-4 py-2 text-sm text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
            {children}
         </a>
      );
   }

   return (
      <button
         onClick={onClick}
         type={type}
         disabled={disabled}
         className={`${styledCustom} ${
            disabled
               ? "cursor-not-allowed border-transparent bg-gray-50 text-gray-400"
               : "cursor-pointer hover:bg-green-200 border-green-800 text-green-900"
         }  mt-4 items-center inline-flex gap-2 justify-evenly rounded sm:rounded-md border bg-green-100 px-2 py-1.5 sm:px-4 sm:py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`}>
         {children}
      </button>
   );
};

export const ButtonIcon = ({ children, onClick, pd }) => {
   return (
      <button
         className={`items-center flex justify-center ${pd || "p-2"} shadow-md`}
         onClick={onClick}>
         {children}
      </button>
   );
};

export const ButtonIconTitleResponsive = ({
   sizeIcon,
   title,
   onClick,
   icon,
   styledCustom,
   active,
}) => {
   const Icon = icon;
   return (
      <button
         onClick={onClick}
         className={`flex justify-center sm:py-2 sm:px-3 items-center cursor-pointer hover:bg-yellow-50 rounded ${styledCustom} ${
            active && "bg-yellow-400 text-white"
         }`}>
         <>
            <span className="flex sm:hidden z-50 p-3 top-0">
               <Icon size={sizeIcon} />
            </span>
            <span className="hidden sm:block">{title}</span>
         </>
      </button>
   );
};
