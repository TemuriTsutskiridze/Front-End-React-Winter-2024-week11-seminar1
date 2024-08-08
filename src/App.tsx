import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { useState } from "react";

const schema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(8, "name must be at least 8 characters")
    .max(30, "name must be maximum 30 characters")
    .test(
      "includes-space",
      "You should include both first and last names",
      (value) => value.includes(" ")
    ),
  cardNumber: yup
    .string()
    .required("card number is required")
    .min(19, "card number must be 16 characters"),
  mm: yup
    .string()
    .required("mm is required")
    .min(2, "month must be at least 2 characters")
    .test(
      "month validation",
      "month must be valid",
      (value) => parseInt(value) > 0 && parseInt(value) <= 12
    ),
  yy: yup
    .string()
    .required("yy is required")
    .min(2, "year must be at least 2 characters")
    .test(
      "year validation",
      "year must be valid",
      (value) => parseInt(value) >= 24 && parseInt(value) <= 40
    ),
  cvc: yup
    .string()
    .required("cvc is required")
    .min(3, "cvc must be at least 3 characters"),
});

interface Inputs {
  name: string;
  cardNumber: string;
  mm: string;
  yy: string;
  cvc: string;
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setSubmited(true);
    // const repsonse = await fetch("api link", {
    //   method: "POST",
    //   "Content-Type": "application/json",
    //   body: JSON.stringify(data),
    // });
  };

  const name = watch("name");
  const cardNumber = watch("cardNumber");
  const mm = watch("mm");
  const yy = watch("yy");
  const cvc = watch("cvc");

  const [submited, setSubmited] = useState(false);

  const clearInputs = () => {
    setValue("name", "");
    setValue("cardNumber", "");
    setValue("mm", "");
    setValue("yy", "");
    setValue("cvc", "");
  };

  return (
    <>
      {submited ? (
        <div>
          <h1>Thank You</h1>
          <button
            onClick={() => {
              setSubmited(false);
              clearInputs();
            }}
          >
            Go back
          </button>
        </div>
      ) : (
        <div>
          <div>
            <h2>{name || "JANE APPLESEED"}</h2>
            <h2>{cardNumber || "0000 0000 0000 0000"}</h2>
            <h2>
              {mm || "00"} / {yy || "00"}
            </h2>
            <h2>{cvc || "000"}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">CARDHOLDER NAME</label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Jane Appleseed"
                {...register("name")}
              />
              {errors.name ? <p>{errors.name.message}</p> : null}
            </div>
            <div>
              <label htmlFor="cardNumber">CARD NUMBER</label>
              <InputMask
                mask="9999 9999 9999 9999"
                maskChar=""
                type="text"
                id="cardNumber"
                placeholder="e.g. 1234 5678 9123 0000"
                {...register("cardNumber")}
              />
              {errors.cardNumber ? <p>{errors.cardNumber.message}</p> : null}
            </div>
            <div>
              <label htmlFor="mm">MM</label>
              <InputMask
                type="text"
                id="mm"
                placeholder="MM"
                {...register("mm")}
                mask="99"
                maskChar=""
                onBlur={() => {
                  setValue("mm", mm.padStart(2, "0"));
                }}
              />
              {errors.mm ? <p>{errors.mm.message}</p> : null}
            </div>
            <div>
              <label htmlFor="yy">YY</label>
              <input type="text" id="yy" placeholder="YY" {...register("yy")} />
              {errors.yy ? <p>{errors.yy.message}</p> : null}
            </div>
            <div>
              <label htmlFor="cvc">CVC</label>
              <InputMask
                type="text"
                id="cvc"
                placeholder="CVC"
                {...register("cvc")}
                mask="999"
                maskChar=""
              />
              {errors.cvc ? <p>{errors.cvc.message}</p> : null}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
