const CardSkeleton = () => {
  return (
    <div className="w-full p-2">
      <div className="animate-pulse bg-white rounded-xl shadow p-4 space-y-4">
        <div className="bg-gray-300 h-40 rounded-md w-full" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
};

export default CardSkeleton;
