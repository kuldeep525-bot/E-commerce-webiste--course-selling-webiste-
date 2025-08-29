import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function Updatecourse() {
  // Destructure the id from useParams
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const {data}= await axios.get(
          `http://localhost:4000/api/v1/course/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(data)
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPrice(data.course.price);
        setImagePreview(data.course.image.url); // Set the existing image as the initial preview
        setLoading(false);
      } catch (error) {
        // console.log("Error in fetch courses", error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    const AdminToken = JSON.parse(localStorage.getItem("admin"));
    if (!AdminToken) {
      alert("Please login first");
      navigate("/admin/login");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
          withCredentials: true,
        }
      );
      alert(response.data.message || "Course updated successfully");
      navigate("/admin/ourcourses"); // Redirect to ourcourses list or another appropriate route
    } catch (error) {
      console.log("Error in update courses", error);
      if (error.response && error.response.data && error.response.data.errors) {
        alert(error.response.data.errors);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Update Course</h3>

          <form onSubmit={handleUpdateCourse} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Description</label>
              <input
                type="text"
                placeholder="Enter your course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Price</label>
              <input
                type="number"
                placeholder="Enter your course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Course Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Course Image"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updatecourse;