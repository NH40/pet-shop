const SkeletonProductPage = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 w-full items-start animate-pulse">
      <div className="flex flex-col xl:flex-row gap-4 w-full lg:w-[55%] mb-4 md:mb-8">
        <div className="w-full aspect-square rounded-xl bg-gray-200 xl:order-1 md:max-h-[500px] lg:max-h-none" />

        <div className="flex xl:flex-col gap-4 w-full lg:w-auto justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[30%] lg:w-auto lg:flex-1 aspect-square rounded-xl bg-gray-200 max-h-[180px] lg:max-h-[150px] xl:max-h-[200px]"
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[45%] flex flex-col gap-6 items-center lg:items-start">
        <div className="h-8 md:h-10 w-3/4 bg-gray-200 rounded" />

        <div className="flex items-end gap-4">
          <div className="h-12 md:h-16 w-24 md:w-32 bg-gray-200 rounded" />
          <div className="h-8 md:h-10 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-10 bg-gray-200 rounded" />
        </div>

        <div className="flex w-full flex-col lg:flex-row gap-4 lg:gap-8 items-center">
          <div className="w-[200px] h-[60px] bg-gray-200 rounded-md" />
          <div className="w-full md:max-w-[300px] h-[60px] bg-gray-200 rounded-md" />
        </div>

        <div className="w-full space-y-2">
          <div className="h-5 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-5 w-24 bg-gray-200 rounded mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductPage;
