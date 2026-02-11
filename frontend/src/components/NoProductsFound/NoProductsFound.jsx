import React from "react";
import SearchImg from "../../assets/search.svg";

const NoProductsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-secondary-grey rounded-full p-2 mb-6 w-10 h-10 animate-pulse">
        <img src={SearchImg} alt="search icon" />
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-main-black mb-4">
        No products found
      </h2>
      <p className="text-main-grey text-base sm:text-lg max-w-md">
        We couldn’t find any products matching your search. Try adjusting your
        filters or using different keywords.
      </p>
    </div>
  );
};

export default NoProductsFound;
