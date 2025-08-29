import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Buy() {
  //fetch course id from courses.jsx in the buy
  const { courseId } = useParams();
  const [loading, setloading] = useState(false); //loading
  const token = JSON.parse(localStorage.getItem("user")); //receive token from localstroage
  const navigate=useNavigate()

  console.log(token);

  //declaring a handlepurchase function
  const handlepurchase = async () => {
    //handle purchase code
    if (!token) {
      alert("please login to purchase courses");
      navigate("/login")
      return;
    }

    try {
      setloading(true); //if data in not coming to from purchase
      const response = await axios.post(
        `http://localhost:4000/api/v1/course/buy/${courseId}`,
        {}, //also define emplty object it is complsory because if user does not send any data then emplty object send to the backend
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      alert("course purchased successfully" || response.data.message);
      setloading(false);
      navigate("/purchase")
    } catch (error) {
      setloading(false);

      if(error?.response?.status===400)
      {
        alert("you have already purchase this course")
             navigate("/courses")
      }
      else{
            console.log("Error in course purchasing", error);
      alert("Error in course purchasing" || error.response?.data?.errors);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to to-blue-950  flex h-screen items-center justify-center">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-300"
        onClick={handlepurchase}
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
}

export default Buy;
