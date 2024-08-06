import React from "react";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/auth/sign-in');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      toast.error(`Registration error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" alt="Pattern" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your name</Typography>
            <Input
              size="lg"
              placeholder="Your name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("name", { required: "Name is required" })}
              labelProps={{ className: "before:content-none after:content-none" }}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your email</Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("email", { required: "Email is required" })}
              labelProps={{ className: "before:content-none after:content-none" }}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your password</Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("password", { required: "Password is required" })}
              labelProps={{ className: "before:content-none after:content-none" }}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Your phone number</Typography>
            <Input
              size="lg"
              placeholder="123-456-7890"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("phone", { required: "Phone number is required" })}
              labelProps={{ className: "before:content-none after:content-none" }}
            />
            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a href="#" className="font-normal text-black transition-colors hover:text-gray-900 underline">Terms and Conditions</a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            {...register("terms", { required: "You must agree to the terms and conditions" })}
          />
          {errors.terms && <span className="text-red-500">{errors.terms.message}</span>}
          
          <Button className="mt-6" fullWidth type="submit">Register Now</Button>

          <div className="space-y-4 mt-8">
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/auth/sign-in" className="text-black transition-colors hover:text-gray-900 underline ml-1">
                Sign In
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
