const BannerFull = ({ src, children }) => {
  return (
    <section className="relative w-full h-[450px] md:h-[600px] py-20">
      <div
        className="absolute top-0 left-1/2 bg-center bg-cover h-full transform -translate-x-1/2 w-screen max-w-[1440px]"
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full ">{children}</div>
    </section>
  );
};

export default BannerFull;
