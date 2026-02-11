import CardSkeleton from "../../ui/CardSkeleton/CardSkeleton";

const ListCards = ({ children, loading = false, skeletonCount = 4 }) => {
  return (
    <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-8">
      {loading &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <CardSkeleton key={`skeleton-${i}`} />
        ))}
      {children}
    </div>
  );
};

export default ListCards;
