// LectureList.jsx
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import {FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Notice from "../../components/Notice";
import ScrollToTop from "../../components/ScrollToTop";

const LectureList = () => {
  const { courseLecture } = useSelector((state) => state?.course);
  const navigate = useNavigate();
   const {state} = useLocation();
   
  const [selectedLecture, setSelectedLecture] = useState(courseLecture[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    setSidebarOpen(false); // Close sidebar after selecting a lecture
  };

  useEffect(() => {
    setSelectedLecture(courseLecture[0]);
  }, [courseLecture]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Hamburger Icon */}
      {courseLecture.length > 0 && (
        <>
          <div className="bg-purple-500 h-[50px]  sticky flex text-white items-center justify-between px-4 ">
            <div
              className=" cursor-pointer flex items-center space-x-1 border-r-2 pr-2 h-full hover:bg-purple-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <div className="text-2xl">
                <FaBars />
              </div>
              <p className="">Lectures</p>
            </div>
            
            <div
              className="flex items-center space-x-1 border-l-2 h-full px-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <div>
                <FaHome />
              </div>
              <p>Back to course</p>
            </div>
          </div>
           
           {/* notice board */}
           <Notice noticeData = {state?.notice}/>
          {/* Sidebar with Lecture Titles */}
          <div
            className={`fixed top-0 left-0 w-64 bg-white shadow-md p-4 h-full z-20 transition-transform transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-500">Lectures</h2>
              <button
                className="text-2xl hover:border-2 p-2 border-purple-500 text-purple-500"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {courseLecture &&
                courseLecture?.map((lecture, index) => (
                  <div
                    key={index}
                    className={`flex items-center h-full  cursor-pointer space-x-2 ${
                      lecture === selectedLecture
                        ? "border-l-4"
                        : "hover:border-l-4"
                    } border-purple-700 pl-2`}
                    onClick={() => handleLectureClick(lecture)}
                  >
                    <div className="text-lg">{index + 1} </div>
                    <div>
                      <span className="text-lg">{lecture?.title}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{selectedLecture?.title}</h2>
            </div>
            <div className="mb-4 flex flex-col w-[100%] items-center justify-center">
              <video
                className="w-[100%] lg:w-[80%]"
                controls
                controlsList="nodownload"
                autoPlay
                title={selectedLecture?.title}
                src={selectedLecture?.lecture?.secure_url}
              >
                Your browser does not support the video tag.
              </video>
              <div className="text-lg pl-3 w-[100%] lg:w-[80%]  mt-5 pb-6">
                {selectedLecture?.description}
              </div>
            </div>
          </div>
        </>
      )}

      {courseLecture.length === 0 && (
        <>
          <div className="bg-purple-500 h-[50px]  sticky flex text-white items-center justify-end px-4 ">
            <div
              className="flex items-center space-x-1 border-l-2 h-full px-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <div>
                <FaHome />
              </div>
              <p>Back to course</p>
            </div>
          </div>
          <Notice noticeData = {state?.notice}/>
          <div className="h-[70vh] flex justify-center items-center ">
            Currently there is no lecture
          </div>
        </>
      )}
    </div>
  );
};

export default LectureList;
