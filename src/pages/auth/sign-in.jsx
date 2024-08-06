import React from "react";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        console.log('Login response:', response.data);

        const userRole = response.data.role;
        console.log('User Role:', userRole);

        if (userRole === 'admin') {
          console.log('Redirecting to /dashboard/home');
          setTimeout(() => {
            console.log('Checking token before navigating to /dashboard/home');
            if (localStorage.getItem('token')) {
              console.log('Token exists, navigating to /dashboard/home');
              navigate('/dashboard/home', { replace: true });
              console.log('Navigated to /dashboard/home');
            } else {
              console.log('Token not found');
            }
          }, 500);
        } else if (userRole === 'employee') {
          console.log('Redirecting to /user');
          setTimeout(() => {
            console.log('Checking token before navigating to /user');
            if (localStorage.getItem('token')) {
              console.log('Token exists, navigating to /user');
              navigate('/user', { replace: true });
              console.log('Navigated to /user');
            } else {
              console.log('Token not found');
            }
          }, 500);
        } else {
          toast.error('Unknown user role.');
        }
      } else {
        toast.error('No token received.');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Please check your email and password.');
    }
  };
  

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("email", { required: "Email is required" })}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              {...register("password", { required: "Password is required" })}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>          
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/public/img/login-image.jpg"
          alt="Login illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}

export default SignIn;
