import React, { useEffect, useState } from "react";
import logo from "../../public/logos.png";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
//import css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Home() {
  //fetch the data into the backend
  const [course, setcourse] = useState([]);

  //user loged in (use state)

  const [isLogedin, setlogedin] = useState(false);

  //recive a token in login.jsx with useeffect hook

  useEffect(()=>{
    const token=localStorage.getItem("user");
    if(token)
    {
      setlogedin(true)
    }
    else{
      setlogedin(false)
    }
  },[])

  //create function of logout

  const handlelogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      alert(response.data.message);
      setlogedin(false); //if your log out
    } catch (error) {
      console.log("Error in logging out", error);
      alert("Error in logout" || error.response.data.errors);
    }
  };

  useEffect(() => {
    const Fetchcourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/course/courses",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.courses);
        setcourse(response.data.courses);
      } catch (error) {
        console.log("Error in fetch courses", error);
      }
    };
    Fetchcourses();
  }, []);

  //for slider
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to to-blue-950 h-screen-full ">
      <div className="h-screen-full text-white container mx-auto p-6 space-y-10">
        {/* header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 rounded-full gap-3"
            />
            <h1 className="text-2xl text-orange-500 font-bold">TECH-COURSES</h1>
          </div>
          <div className="space-x-5">

            {/* //if user logged in */}
            {isLogedin ? (
              <button
                onClick={handlelogout}
                className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent text-white border px-4 py-2 border-white cursor-pointer hover:bg-orange-500 hover:border-none hover:text-black rounded-md hover:font-bold duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* main section */}

        <section className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-orange-500">
            TECH-COURSES
          </h1>
          <p className="text-gray-500">
            Sharpen your skills with courses crafed by experts.
          </p>
          <div className="space-x-4">
            <button className="bg-green-500 text-white rounded font-semibold hover:bg-white duration-300 hover:text-black px-4 py-2 cursor-pointer">
              Explore Courses
            </button>
            <button className="bg-white text-black rounded font-semibold hover:bg-green-500 duration-300 hover:text-white px-4 py-2 cursor-pointer">
              Courses Videos
            </button>
          </div>
        </section>
        <section>
          <Slider {...settings}>
            {course.map((courses) => {
              return (
                <div key={courses._id} className="p-4">
                  <div className="relative flex-shrink-0 w-85 transition-transform duration-300 transform hover:scale-105">
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <img
                        className="h-32 w-full object-contain pt-5"
                        src={courses.image.url}
                        alt="image"
                      />
                      <div className="p-6 text-center">
                        <h2 className="text-xl font-bold text-white">
                          {courses.title}
                        </h2>
                        <button className="mt-4 bg-orange-500 text-black font-semibold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white duration-300 cursor-pointer">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </section>

        <hr />
        {/* footer */}

        <footer className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-5">
                <img
                  src={logo}
                  alt="logo"
                  className="w-10 1-20 rounded-full gap-3"
                />
                <h1 className="text-xl text-orange-500 font-bold">
                  TECH-COURSES
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-6">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a
                    className="text-2xl"
                    href="https://github.com/kuldeep525-bot?tab=repositories"
                  >
                    <FaGithub />
                  </a>
                  <a className="text-2xl" href="">
                    <FaLinkedin />
                  </a>
                  <a className="text-2xl" href="">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4 ">Connects</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300 ">
                  LinkedIn
                </li>
                <li className="hover:text-white cursor-pointer duration-300 ">
                  Github
                </li>
                <li className="hover:text-white cursor-pointer duration-300 ">
                  Instagram
                </li>
              </ul>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4 ">Copy rights:2025</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300 ">
                  Terms and Conditons
                </li>
                <li className="hover:text-white cursor-pointer duration-300 ">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300 ">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
