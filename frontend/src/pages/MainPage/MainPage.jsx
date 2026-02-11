import BannerFull from "../../ui/BannerFull/BannerFull";
import Button from "../../ui/Button/Button";
import banner1 from "../../assets/banner/banner.png";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import FormSection from "../../components/FormSection/FormSection";
import SaleSection from "../../components/SaleSection/SaleSection";
import { ROUTES } from "../../utils/routes";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-20 mb-10 md:mb-20 -mt-[var(--m-bottom-title-xs)] md:-mt-[var(--m-bottom-title-md)]">
      <BannerFull src={banner1}>
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold mb-10">
          Amazing Discounts on Pets Products!
        </h1>
        <Button className="max-w-[220px]" to={ROUTES.SALES}>
          Check out
        </Button>
      </BannerFull>
      <CategoriesSection />
      <FormSection />
      <SaleSection />
    </div>
  );
};

export default MainPage;
