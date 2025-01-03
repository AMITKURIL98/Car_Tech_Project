/* eslint-disable no-unused-vars */
import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, CardBody, Typography, Input } from "@material-tailwind/react";
import CardUi from "../ui/CardUi";
import { useSignUpMutation } from "../services/authAPI";

export function AddInspectorForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [SignUp] = useSignUpMutation();

  const initialFormData = {
    email: "",
    password: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    roles: "INSPECTOR",
    document: 0,
    shopName: "",
    area: "",
    status: true,
    userType: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await SignUp(formData).unwrap(); // Assuming `unwrap` for RTK Query
      if (response?.success) {
        alert("Registered Successfully!");
        setFormData(initialFormData); // Reset form
        setOpen(false); // Close dialog
      } else {
        alert("Registration Unsuccessful!");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="indigo" className="flex gap-2">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Inspector
      </Button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <CardUi>
          <div className="md:flex justify-center m-5 md:m-0">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Add Inspector
              </Typography>
              {error && (
                <Typography color="red" variant="small">
                  {error}
                </Typography>
              )}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex md:flex-row flex-col md:gap-2 gap-3">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Mobile Number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <Button color="indigo" type="submit">
                  Add
                </Button>
              </form>
            </CardBody>
          </div>
        </CardUi>
      </Dialog>
    </>
  );
}
