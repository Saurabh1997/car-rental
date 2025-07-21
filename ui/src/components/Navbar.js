import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ options }) {
  const nav_menu = options.map((menu) => {
    return (
      <li key={menu?.displayName} className={`text-xl font-bold text-center`}>
        <Link to={`${menu?.path}`}>{menu?.displayName}</Link>
      </li>
    );
  });

  return (
    <div>
      <nav
        className={
          "bg-slate-950 shadow-md p-2 p-2 m-0 list-none overflow-hidden flex justify-between border-b border-slate-700"
        }
      >
        {nav_menu}
      </nav>
    </div>
  );
}
