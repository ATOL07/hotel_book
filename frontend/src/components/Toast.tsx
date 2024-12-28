// import { useEffect } from "react";

// type ToastProps = {
//   message: string;
//   type: "SUCCESS" | "ERROR";
//   onClose:()=>void;
// }

// const Toast = ({message,type,onClose}:ToastProps) => {

//     useEffect(()=>{
//         const timer = setTimeout(()=>{
//             onClose(); 
//         },5000);

//         return ()=>{
//             clearTimeout(timer);
//         }

//     },[onClose]);

//      const styles=type==="SUCCESS"? " fixed top-4 right-4 z-40 p-4 rounded-md bg-green-500 text-white max-w-md":
//      "fixed top-4 right-4 z-40 p-4 rounded-md bg-red-600 text-white max-w-md";

//   return (
//     <div className={ styles }>
//         <div className="flex justify-center items-center" >
//             <span className="text-white font-bold tracking-tight">
//                 {message}

//             </span>
//         </div>
//     </div>
//   )
// }

// export default Toast;

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-green-500 text-white max-w-sm animate-fade-in-up"
      : "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-red-600 text-white max-w-sm animate-fade-in-up";

  return (
    <div className={styles}>
      <div className="flex items-center">
        <span className="mr-3">
          {type === "SUCCESS" ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </span>
        <span className="text-sm font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-xl font-bold leading-none focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
