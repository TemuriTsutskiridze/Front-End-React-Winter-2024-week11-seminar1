import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Inputs {
  name: string;
  lastName: string;
  email: string;
}

const schema = yup.object({
  name: yup.string().required("Name input must not be empty"),
  lastName: yup
    .string()
    .max(15, "Last name must not be more thatn 15 characters")
    .test(
      "no-spaces",
      "Last name must include space character",
      (value) => !value?.includes(" ")
    )
    .required("LastName input must not be empty"),
  email: yup.string().email().required("Email input must not be empty"),
});

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

  console.log("errors", errors);

  const name = watch("name");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setValue("name", "algouni");
  };

  return (
    <>
      <div>{name}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input type="text" {...register("name")} placeholder="name" id="name" />
        {errors.name && <p>{errors.name.message}</p>}
        <label htmlFor="lastName">LastName:</label>
        <input
          type="text"
          {...register("lastName")}
          placeholder="lastName"
          id="lastName"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          {...register("email")}
          placeholder="email"
          id="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
