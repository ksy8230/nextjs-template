import Link from "next/link";
import React from "react";
import { Nav } from "./style";

const TopNavigation = () => {
  return (
    <Nav>
      <Link href="/home">Home</Link>
      <Link href="/project">Project</Link>
      <Link href="/blog">Blog</Link>
    </Nav>
  );
};

export default TopNavigation;
