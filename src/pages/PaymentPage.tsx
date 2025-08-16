import PayWithCardForm from "@/components/PayWithCardForm";

import ApplePayButton from "@/components/ApplePayButton";
import BackButton from "@/components/BackButton";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import LegalInfo from "@/components/LegalInfo";
import OrderInfo from "@/components/OrderInfo";

import Arrow from "@/assets/Arrow.svg?react";
import LanguageToggle from "@/components/LanguegeToggle";

export default function PaymentPage() {
  return (
    <div className="p-4">
      <div className="mx-auto w-fit">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-4 lg:grid-cols-1 lg:justify-items-end">
          <Arrow className="size-6 lg:hidden justify-self-start" />
          <span className="text-lg leading-8 font-semibold lg:hidden justify-self-center">
            Checkout
          </span>
          <LanguageToggle className="justify-self-end" />
        </div>
        <div className="flex max-lg:flex-col gap-8">
          <div className="max-w-md basis-md shrink-0 flex flex-col gap-6">
            <BackButton className="max-lg:hidden" />
            <div className="max-lg:text-center">
              <div className="font-semibold text-2xl leading-8 ">
                5 days free
              </div>
              <div className="font-medium leading-5">
                then 299.99 UAH per 14 days
              </div>
            </div>
            <ApplePayButton />
            <Divider />
            <div className="space-y-2">
              <PayWithCardForm />
              <LegalInfo />
            </div>
          </div>
          <OrderInfo className="max-w-md lg:basis-md shrink-0" />
        </div>
        <Footer className="max-lg:mb-9 mt-8 lg:mt-14 mx-auto" />
      </div>
    </div>
  );
}
