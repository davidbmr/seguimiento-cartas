import React from "react";
import style from "./ContentBox.module.css";

interface ContentBoxProps {
  children: React.ReactNode;
  backgroundActive?: boolean;
  additionalClassName?: string;
}

export const ContentBox = ({ children, backgroundActive = false, additionalClassName = "" }: ContentBoxProps) => {
  const combinedClassNames = `${style.contentBox__container} ${backgroundActive && style.backgroundActive} ${additionalClassName}`;

  return (
    <div className={combinedClassNames}>
      {children}
    </div>
  );
};
