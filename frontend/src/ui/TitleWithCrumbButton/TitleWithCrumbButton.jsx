import React from "react";
import Title from "../Title/Title";
import Divider from "../Divider/Divider";
import CrumbButton from "../BreadCrumbs/CrumbButton/CrumbButton";

const TitleWithCrumbButton = ({ title, to, buttonTitle }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-[var(--m-bottom-title-xs)] md:mb-[var(--m-bottom-title-md)]">
      <Title>{title}</Title>
      <div className="flex w-full items-center">
        <Divider />
        <CrumbButton to={to}>{buttonTitle}</CrumbButton>
      </div>
    </div>
  );
};

export default TitleWithCrumbButton;
