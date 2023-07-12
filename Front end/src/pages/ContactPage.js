import React from "react";
import ContactInfo from "../components/ContactInfo";
import HeroSlider from "../components/HeroSlider";


const ContactPage = () => {
  return (
    <>
      <HeroSlider />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <ContactInfo />
          </div>
          <div className="md:w-1/2">
            {/* Add the data input form here */}
            <form>
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="name">Name:</label>
                <input className="border border-gray-400 rounded px-4 py-2 w-full" type="text" id="name" name="name" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="email">Email:</label>
                <input className="border border-gray-400 rounded px-4 py-2 w-full" type="email" id="email" name="email" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="message">Message:</label>
                <textarea className="border border-gray-400 rounded px-4 py-2 w-full" id="message" name="message" rows="6" required></textarea>
              </div>
              <button className="bg-accent mb-[120px] text-white rounded px-6 py-3" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default ContactPage;
