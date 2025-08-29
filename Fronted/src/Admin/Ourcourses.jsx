import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Ourcourses() {
  const navigate = useNavigate();
  const [courses, setcourse] = useState([]);
  //loading page
  const [loading, setloading] = useState(true);
  const AdminToken = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    const Fetchcourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/course/courses",
          {
            withCredentials: true,
          }
        );
        // console.log(response.data.courses);
        setcourse(response.data.courses);
        setloading(false);
      } catch (error) {
        console.log("Error in fetch courses", error);
      }
    };
    Fetchcourses();
  }, []);

  //if admin not login

  if (!AdminToken) {
    alert("please login to admin");
    navigate("/admin/login");
  }

  //delete courses code

 const handledeleteCourse = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/course/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${AdminToken}`, // Include the token in the headers
        },
        withCredentials: true,
      }
    );
    if (response && response.data) {
      alert(response.data.message);
      const updatedcourses = courses.filter((course) => course._id !== id);
      setcourse(updatedcourses);
    } else {
      alert("Failed to delete course. Please try again later.");
    }
  } catch (error) {
    console.log("Error in deleting courses", error);
    if (error.response && error.response.data && error.response.data.errors) {
      alert(error.response.data.errors);
    } else {
      alert("Error in deleting courses. Please check your network connection.");
    }
  }
};

  //ui design

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 p-8 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      <Link
        className="bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300"
        to={"/admin/dashboard"}
      >
        Go to dashboard
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
            {/* Course Image */}
            <img
              src={course?.image?.url}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            {/* Course Title */}
            <h2 className="text-xl font-semibold mt-4 text-gray-800">
              {course.title}
            </h2>
            {/* Course Description */}
            <p className="text-gray-600 mt-2 text-sm">
              {course.description.length > 200
                ? `${course.description.slice(0, 200)}...`
                : course.description}
            </p>
            {/* Course Price */}
            <div className="flex justify-between mt-4 text-gray-800 font-bold">
              <div>
                {" "}
                ₹{course.price}{" "}
                <span className="line-through text-gray-500">₹300</span>
              </div>
              <div className="text-green-600 text-sm mt-2">10 % off</div>
            </div>

            <div className="flex justify-between">
              <Link
                to={`/admin/update-course/${course._id}`}
                className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
              >
                Update
              </Link>
              <button
                onClick={() => handledeleteCourse(course._id)}
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ourcourses;


