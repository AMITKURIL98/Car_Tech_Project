import { useState } from "react";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { Menu, MenuHandler, MenuList, MenuItem,Card ,CardHeader } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSignUpMutation } from "../services/authAPI";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cartechlogo2 from "/cars/cartechlogo2.png";
export function SimpleRegistrationForm() {
  const [SignUp] = useSignUpMutation();
  const navigate = useNavigate();
  const { countries } = useCountries();
  const defaultCountryIndex = countries.findIndex(
    (country) => country.name === "India"
  );
  const [country, setCountry] = useState(
    defaultCountryIndex !== -1 ? defaultCountryIndex : 0
  );
  const { name, flags, countryCallingCode } = countries[country];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    mobileNo: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    password: Yup.string().required("Password is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    area: Yup.string().required("Area is required"),
    status: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  const handleSubmit = async ( values, { setSubmitting }) => {
    try {
      const  {data , error} = await SignUp(values);
      if(error?.status === 400){
        toast.error(error?.data?.message);
      }
      else{
        toast.success(data?.message);
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    } catch (error) {
      toast.error("Register Unsuccessfully");
    }
    setSubmitting(false);
  };

  return (
    <>
    <div className="">
    <div className=" md:mt-2  md:ml-8 ml-5">
      <Link to={"/"}>
      <div className=" flex text-blue-gray-900 mr-4 cursor-pointer font-bold text-2xl gap-2 ">
      <img
            src={cartechlogo2}
            alt="logo"
            className="  w-12 lg:w-[70px] lg:h-[64px] "
          />
           <span className="mt-3">CarTechIndia</span> 
    </div>
       
</Link>
</div>
    <div className="h-auto mt-10 flex justify-center items-center">
      <Card className="p-5 border border-blue-400 shadow-md bg-white shadow-black">
      <ToastContainer />
        {/* <Typography variant="h3" className="text-center text-indego-500">
          Sign Up
        </Typography> */}
         <div className="items-center mb-5 "></div>
        <CardHeader
          variant="gradient"
          // color="gray"
          className="mb-4 grid h-20 place-items-center bg-[#8a90d4]"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>

        <Formik
          initialValues={{
            email: "",
            password: "",
            mobileNo: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            roles: "USER",
            document: 0,
            area: "",
            status: false,
            userType: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
              <Form
              className="mt-2 mb-2 w-full max-w-screen-lg sm:w-full md:w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  First Name
                </Typography>
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="border border-gray-400 rounded-md h-10 p-2"
                />
                <ErrorMessage name="firstName" component="span" className="text-red-500 mt-1" />
              </div>

            
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Last Name
                  </Typography>
                  <Field name="lastName" type="text" placeholder="Enter your last name"  className="border border-gray-400 rounded-md h-10 p-2"  />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />

                </div>
            
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Email
                  </Typography>
                  <Field name="email" type="email" placeholder="Email"  className="border border-gray-400 rounded-md h-10 p-2"  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>
            
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Mobile Number
                  </Typography>
                  <div className="relative flex w-full max-w-[24rem]">
                    <Menu placement="bottom-start">
                      <MenuHandler>
                        <Button
                          ripple={false}
                          variant="text"
                          color="blue-gray"
                          className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-4 w-4 rounded-full object-cover"
                          />
                          {countryCallingCode}
                        </Button>
                      </MenuHandler>
                      <MenuList className="max-h-[20rem] max-w-[18rem]">
                        {countries.map(({ name, flags, countryCallingCode }, index) => (
                          <MenuItem
                            key={name}
                            value={name}
                            className="flex items-center gap-2"
                            onClick={() => setCountry(index)}
                          >
                            <img
                              src={flags.svg}
                              alt={name}
                              className="h-5 w-5 rounded-full object-cover"
                            />
                            {name} <span className="ml-auto">{countryCallingCode}</span>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                    <Field
                    name="mobileNo"
                    type="text"
                    placeholder="Mobile Number"
                    className="border border-gray-400 rounded-md h-10 p-2 w-full" 
                  />
                  </div>
                  <ErrorMessage name="mobileNo" component="div" className="text-red-500" />
                </div>
            
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Password
                  </Typography>
                  <Field name="password" type="password" placeholder="Password" className="border border-gray-400 rounded-md h-10 p-2 w-full"  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>
            
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Address
                  </Typography>
                  <Field name="address" placeholder="Address" className="border border-gray-400 rounded-md h-10 p-2 w-full" />
                <ErrorMessage name="address" component="div" className="text-red-500" />
                </div>
            
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    City
                  </Typography>
                  <Field name="city" placeholder="City" className="border border-gray-400 rounded-md h-10 p-2 w-full"  />
                <ErrorMessage name="city" component="div" className="text-red-500" />

                </div>
            
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Area
                  </Typography>
                  <Field name="area" placeholder="Area"  className="border border-gray-400 rounded-md h-10 p-2 w-full" />
                  <ErrorMessage name="area" component="div" className="text-red-500" />
                </div>
              </div>
            
              <div className="ml-4 mt-4">
              <Field name="status" type="checkbox">
                  {({ field }) => (
                    <Checkbox
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center font-normal"
                        >
                          I agree to the
                          <Link
                            to="#"
                            className="font-medium transition-colors hover:text-gray-900"
                          >
                            &nbsp;Terms and Conditions
                          </Link>
                        </Typography>
                      }
                      containerProps={{ className: "-ml-2.5" }}
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500" />
              </div>
            
              <div className="flex justify-center mt-6">
                <Button className="w-full bg-[#8a90d4]" fullWidth type="submit" disabled={isSubmitting}>
                  Sign Up
                </Button>
              </div>
            
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to="/signin" className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
    </div>
    </>
  );
}

export default SimpleRegistrationForm;
