import notFoundImg from "../../assets/404.png";
import Title from "../../ui/Title/Title";
import Button from "../../ui/Button/Button";
import { ROUTES } from "../../utils/routes";

const NotFoundPage = () => {
  return (
    <div className="my-10 md:my-20 w-full max-w-[690px] m-auto flex flex-col gap-8 items-center">
      <img src={notFoundImg} alt="Page Not Found" className="h-32 md:h-70" />
      <div className="flex flex-col gap-4 items-center">
        <Title className="text-center">Page Not Found</Title>
        <p className="text-main-grey text-center">
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
      </div>
      <Button className="max-w-[200px] w-full" to={ROUTES.MAIN}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
