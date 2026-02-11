import warningAlert from "../../assets/triangle-alert.svg";

const ErrorInfo = () => {
  return (
    <div className="flex items-center justify-center min-h-max">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="animate-bounce">
            <img src={warningAlert} alt="error" className="w-16 h-16 mx-auto" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">
          Sorry, there’s an issue with our server.
        </h2>
        <p className="text-base text-main-grey">
          Don’t worry — we’re on it. Please try refreshing the page, or come
          back a bit later.
        </p>
      </div>
    </div>
  );
};

export default ErrorInfo;
