import React from "react";

import { Footer } from "react-daisyui";
const FooterFC: React.FC<{}> = () => {
  return (
    <Footer className=" justify-between p-10 bg-gray-200 px-20 text-neutral-content">
      <div>
        <img src="./image/logo.webp" alt="Logo" />
        <br />
        <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </div>

      <div>
        <Footer.Title>Services</Footer.Title>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <Footer.Title>Company</Footer.Title>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <Footer.Title>Legal</Footer.Title>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </Footer>
  );
};

export default FooterFC;
