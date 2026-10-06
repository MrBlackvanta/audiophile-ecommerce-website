"use client";

import { CashOnDeliveryIcon } from "@/components/icons";
import {
  clearCart,
  summariseCart,
  useCartLines,
  type CartSummary,
} from "@/lib";
import { useState, type SubmitEventHandler } from "react";
import Field from "./field";
import OrderConfirmation from "./order-confirmation";
import OrderSummary from "./order-summary";
import PaymentOption from "./payment-option";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  zip: "",
  city: "",
  country: "",
  eMoneyNumber: "",
  eMoneyPin: "",
};

type FormValues = typeof emptyForm;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const noErrors: FormErrors = {};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emptyMessage = "Can’t be empty";

const addressFields = [
  "name",
  "email",
  "phone",
  "address",
  "zip",
  "city",
  "country",
] as const;

const eMoneyFields = ["eMoneyNumber", "eMoneyPin"] as const;

function validate(values: FormValues, payByEMoney: boolean): FormErrors {
  const errors: FormErrors = {};
  const fields = payByEMoney
    ? [...addressFields, ...eMoneyFields]
    : addressFields;

  for (const field of fields) {
    if (!values[field].trim()) errors[field] = emptyMessage;
  }

  if (!errors.email && !emailPattern.test(values.email)) {
    errors.email = "Wrong format";
  }

  return errors;
}

export default function CheckoutForm() {
  const [values, setValues] = useState(emptyForm);
  const [payment, setPayment] = useState("e-money");
  const [attempt, setAttempt] = useState(0);
  const [order, setOrder] = useState<CartSummary | null>(null);

  const summary = summariseCart(useCartLines());
  const payByEMoney = payment === "e-money";
  const errors = attempt > 0 ? validate(values, payByEMoney) : noErrors;

  const update = (field: keyof FormValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const submit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const found = validate(values, payByEMoney);
    const [firstInvalid] = Object.keys(found);

    if (firstInvalid || summary.items.length === 0) {
      setAttempt((count) => count + 1);
      const control = event.currentTarget.elements.namedItem(
        firstInvalid ?? "",
      );
      const target = control instanceof RadioNodeList ? control[0] : control;
      if (target instanceof HTMLElement) target.focus();
      return;
    }

    setOrder(summary);
    clearCart();
  };

  return (
    <div className="v-container grid gap-8 lg:grid-cols-[45.625rem_1fr] lg:items-start lg:gap-x-7.5">
      <form
        id="checkout"
        noValidate
        onSubmit={submit}
        className="rounded-lg bg-white px-6 pt-6 pb-8 md:px-7 md:py-7.5 lg:px-12 lg:pt-13.5 lg:pb-12"
      >
        <h1 className="text-h2-sm md:text-h3 uppercase">Checkout</h1>

        <fieldset className="mt-8 md:mt-10.25">
          <legend className="text-subtitle text-brand uppercase">
            Billing Details
          </legend>
          <div className="mt-4 grid gap-x-4 gap-y-6 md:grid-cols-2">
            <Field
              id="name"
              label="Name"
              placeholder="Alexei Ward"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              error={errors.name}
              attempt={attempt}
            />
            <Field
              id="email"
              label="Email Address"
              type="email"
              placeholder="alexei@mail.com"
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              error={errors.email}
              attempt={attempt}
            />
            <Field
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="+1 202-555-0136"
              autoComplete="tel"
              value={values.phone}
              onChange={update("phone")}
              error={errors.phone}
              attempt={attempt}
            />
          </div>
        </fieldset>

        <fieldset className="mt-8 md:mt-13.25">
          <legend className="text-subtitle text-brand uppercase">
            Shipping Info
          </legend>
          <div className="mt-4 grid gap-x-4 gap-y-6 md:grid-cols-2">
            <Field
              id="address"
              label="Your Address"
              placeholder="1137 Williams Avenue"
              autoComplete="street-address"
              value={values.address}
              onChange={update("address")}
              error={errors.address}
              attempt={attempt}
              className="md:col-span-2"
            />
            <Field
              id="zip"
              label="ZIP Code"
              placeholder="10001"
              autoComplete="postal-code"
              value={values.zip}
              onChange={update("zip")}
              error={errors.zip}
              attempt={attempt}
            />
            <Field
              id="city"
              label="City"
              placeholder="New York"
              autoComplete="address-level2"
              value={values.city}
              onChange={update("city")}
              error={errors.city}
              attempt={attempt}
            />
            <Field
              id="country"
              label="Country"
              placeholder="United States"
              autoComplete="country-name"
              value={values.country}
              onChange={update("country")}
              error={errors.country}
              attempt={attempt}
            />
          </div>
        </fieldset>

        <fieldset className="mt-8 md:mt-15.25">
          <legend className="text-subtitle text-brand uppercase">
            Payment Details
          </legend>

          <div className="mt-4 md:grid md:grid-cols-2 md:gap-x-4">
            <p id="payment-method" className="text-label">
              Payment Method
            </p>
            <div
              role="radiogroup"
              aria-labelledby="payment-method"
              className="mt-4 space-y-4 md:mt-0"
            >
              <PaymentOption
                value="e-money"
                label="e-Money"
                checked={payByEMoney}
                onChange={setPayment}
              />
              <PaymentOption
                value="cash"
                label="Cash on Delivery"
                checked={!payByEMoney}
                onChange={setPayment}
              />
            </div>
          </div>

          {payByEMoney ? (
            <div className="mt-8 grid gap-x-4 gap-y-6 md:mt-6 md:grid-cols-2">
              <Field
                id="eMoneyNumber"
                label="e-Money Number"
                inputMode="numeric"
                placeholder="238521993"
                autoComplete="off"
                value={values.eMoneyNumber}
                onChange={update("eMoneyNumber")}
                error={errors.eMoneyNumber}
                attempt={attempt}
              />
              <Field
                id="eMoneyPin"
                label="e-Money PIN"
                inputMode="numeric"
                placeholder="6891"
                autoComplete="off"
                value={values.eMoneyPin}
                onChange={update("eMoneyPin")}
                error={errors.eMoneyPin}
                attempt={attempt}
              />
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-8 text-center md:mt-7.5 md:flex-row md:text-left">
              <CashOnDeliveryIcon className="text-brand-on-dark size-12 shrink-0" />
              <p className="text-body text-muted">
                The &lsquo;Cash on Delivery&rsquo; option enables you to pay in
                cash when our delivery courier arrives at your residence. Just
                make sure your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          )}
        </fieldset>
      </form>

      <OrderSummary summary={summary} />
      <OrderConfirmation order={order} />
    </div>
  );
}
