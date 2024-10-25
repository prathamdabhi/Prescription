import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-10 text-gray-700">
        <p>
          ABOUT <span className=" text-gray-900 font-medium">US</span>
        </p>
      </div>

      <div className="mx-10 mt-4 flex md:flex-row flex-col gap-10">
        {/* LEFT IMAGE */}
        <img className="w-full max-w-[360px]" src={assets.about_image} alt="" />
        <div className="flex  flex-col gap-6 justify-center md:w-1/2 text-sm text-gray-600">
          <p>
            Welcome to our prescription platform, where patients can securely
            manage their medical prescriptions online. You can access your
            prescribed medications, track refill dates, and communicate with
            healthcare providers for renewals or adjustments. This service
            offers convenience and improves medication adherence by providing
            timely reminders and digital records.
          </p>
          <p>
            Healthcare professionals benefit from this system by easily issuing
            and tracking prescriptions electronically. It reduces paperwork,
            minimizes errors, and ensures that patients receive the correct
            dosages on time. Overall, the platform enhances the efficiency of
            the medical process and improves patient care.
          </p>
          <strong className="text-gray-800">Our Vision</strong>
          <p>
            Our platform offers a secure way to manage prescriptions, view
            medical history, and receive personalized health advice. By
            streamlining communication with healthcare providers, it ensures
            timely care and improved health outcomes.
          </p>
        </div>
      </div>

      <div className="text-xl my-4 mt-6">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex md:flex-row flex-col mt-6 mb-15">
        <div className="border px-10 md:px-16 py-8 md:py-14 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl mx-1">
          <b>EFFICIENCY:</b>
          <p>
            The platform boosts efficiency by simplifying prescription
            management, reducing errors, and streamlining communication between
            patients and healthcare providers.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-14 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl mx-1">
          <b>CONVENIENCE:</b>
          <p>
            The platform offers convenience by allowing patients to manage
            prescriptions, track refills, and access medical records anytime
            from any device.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-14 flex flex-col gap-4 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-xl mx-1">
          <b>PERSONALIZATION:</b>
          <p>
            The platform enhances personalization by providing tailored health
            advice and reminders based on individual medication needs and
            medical history.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
