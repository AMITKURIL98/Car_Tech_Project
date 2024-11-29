/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSignInMutation } from "../services/authAPI";
import { setToken } from "../features/authSlice";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import cartechlogo2 from "/cars/cartechlogo2.png";
export function LoginCard() {
  const [formStateData, setFormStateData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormStateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data , error} = await signIn(formStateData);
            
      if (data) {
         
        const jwtDecodes = jwtDecode(data);
        const jwtDecodesJson = JSON.stringify(jwtDecodes);
        localStorage.setItem("userInfo", jwtDecodesJson);
        
        toast.success("Login Sucessfully");
        setTimeout(() => {
          navigate("/");
        }, 1000); 
        dispatch(setToken(data));
      } else {
        if(error.status === 401){
          toast.error(error.data.message);
        }else{

          toast.error("email and password is not match");
        }
      }

      // Handle successful sign-in, such as redirecting to a different page
    } catch (error) {
      // console.log(error);
      // Handle sign-in error
    }

    
  };

  return (
    <>
    
   <div className=" ">
     
     <div className="md:mt-2 mt-5 md:ml-8 ml-5">
      <Link to={"/"}>
      <div className=" flex text-blue-gray-900 cursor-pointer font-bold text-2xl gap-2  ">
      <img
            src={cartechlogo2}
            alt="logo"
            className="  w-12 lg:w-[70px] lg:h-[64px] "
          />
           <span className="mt-3">CarTechIndia</span> 
    </div>
       
</Link>
</div>


    <div className="flex justify-center items-center mx-2 mt-10" 
    
    
    // style={{
    //     backgroundImage: "url('../public/new/bgn6.jpg')",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     margin: "0px 0px 0px 0px",
    //     height: "90vh"
    //   }}
      >
   
   
    <ToastContainer autoClose={2000} />
    
      <Card className="w-96 bg-white shadow-black border border-blue-400 shadow-md ">
      
      <div className=" mb-12 ">
<Link to={"/"}>
          {/* <Typography className="flex cursor-pointer mt-2  font-bold text-3xl justify-center items-center 
           ">
            CarTechIndia
          </Typography> */}


        </Link>
        </div>


      
        <CardHeader
          variant="gradient"
          // color="gray"
          className="grid h-28 place-items-center bg-[#8a90d4]"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-1">
          <Typography variant="h6" color="blue-gray" className="">
                  Email
                </Typography>
            <Input
              placeholder="Enter your email-id"
              name="username"
              type="email"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formStateData.username}
              onChange={handleChange}
            />
             <Typography variant="h6" color="blue-gray" className="">
                  Password
                </Typography>
            <Input placeholder="enter your password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formStateData.password}
              onChange={handleChange}
              labelProps={{
                className: "hidden",
              }}
              icon={showPassword ? <VisibilityOff onClick={handleTogglePassword} className="cursor-pointer" /> : <Visibility onClick={handleTogglePassword} className="cursor-pointer" />} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button  className="bg-[#8a90d4]" fullWidth type="submit">
              Sign In
            </Button>
            <div className="flex items-center justify-center mt-4">
            <Typography variant="small" className="flex justify-center">
  Don&apos;t have an account?{' '}
</Typography>

              <Link to="/signup">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold "
                >
                  Sign up
                </Typography>
              </Link>
            </div>
            <div className="flex justify-center">
                <Link to="/forgetPassword">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Forget Password ?
                </Typography>
              </Link>
              </div>
          </CardFooter>
        </form>
      </Card>
    </div>
    </div>
    </>
  );
}
