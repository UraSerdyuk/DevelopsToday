import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/new">
            <a>createPost</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;
