import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between max-w-[80rem] m-auto pt-4 pb-4 border-t border-[#C0C0C0] text-[#1F1C1D] text-sm">
      <div className="title">Copyright © ksy8230. All Rights Reserved.</div>
      <div className="flex items-center">
        <a href="mailto:mollog8230@gmail.com" className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
            />
          </svg>
        </a>
        <a href="https://github.com/ksy8230">git</a>
      </div>
    </footer>
  );
};

export default Footer;
