// import React from "react";

// const CharAvatar = ({ fullName, width, height, style }) =>{
//     return <div className={` ${width || 'w-12'} ${height || 'h-12'} ${style || 'bg-slate-400 rounded-full flex items-center justify-center'} felx items-center justify-center text-gray-900 font-medium bg-gray-100`}>
//        {getInitials(fullName || "")};
//         </div>
    
// }

// export default CharAvatar;


import React from "react";

const CharAvatar = ({ fullName, width, height, style }) => {

  const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");

    return words
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || "text-sm"
      } rounded-full flex items-center justify-center text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;