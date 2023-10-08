import * as React from "react"
import Logo from "../res/logo.svg";
import { Link } from "gatsby"

const Header = ({  }) => (
  <header aria-label="Site Header" class="shadow-sm print:hidden">
    <div class="mx-auto max-w-screen-lg p-0 flex flew-row gap-4">
      <div class="flex items-center justify-center">
        <Link activeClassName="m-0 p-0 mr-4" class="m-0 p-0 mr-4" to="/">
          <img class="h-20" src={Logo} alt="ReRoto Logo" />
        </Link>
      </div>
      <div class="flex items-center justify-center gap-4 lg:gap-10">
        <nav
          aria-label="Site Nav"
          class="gap-4 text-sm font-medium flex md:gap-8 items-between w-full"
        >
          <Link class="text-gray-500 no-underline" to="/features">Features</Link>
          <Link class="text-gray-500 no-underline" to="/solutions">Solutions</Link>
          <Link class="text-gray-500 no-underline" to="/pricing">Pricing</Link>
          {/* <Link class="text-gray-500 no-underline" to="/contact">Contact</Link> */}
          
        </nav>
      </div>
      <div class="w-full"></div>
      <div class="flex items-center justify-center gap-4 lg:gap-10">
        <nav
          aria-label="Site Nav"
          class="gap-4 text-sm font-medium flex md:gap-8 items-between w-full"
        >
          <Link class="text-white font-bold p-3 rounded px-8 bg-primary no-underline whitespace-nowrap" activeClassName="whitespace-nowrap" to="/signup">Sign Up</Link>
        </nav>
      </div>
    </div>
  </header>

)

export default Header
