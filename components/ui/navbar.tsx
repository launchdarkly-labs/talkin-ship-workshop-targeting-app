//@ts-nocheck
import * as React from "react";
import { useContext } from "react";
import { Search, PanelTopOpen } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import LoginContext from "@/utils/contexts/login";
import { Button } from "./button";
import BookedFlights from "./airwayscomponents/bookedFlights";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "./dropdown-menu";
import LaunchClubStatus from "./airwayscomponents/launchClubStatus";
import QRCodeImage from "./QRCodeImage";
import { PersonaContext } from "../personacontext";
import { QuickLoginDialog } from "../quicklogindialog";

interface NavBarProps {
  cart: InventoryItem[];
  personas: Persona[];
  setCart: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  variant: string;
}

interface Persona {
  id: string | number;
  personaname: string;
  personatype: string;
  personaimage: string;
  personaemail: string;
}


const NavBar = React.forwardRef<any, NavBarProps>(
  ({ launchClubLoyalty, className, handleLogout, ...props }, ref) => {
    const { isLoggedIn, enrolledInLaunchClub, user } = useContext(LoginContext);
    let navChild, navLogo, navLinkMobileDropdown, navLinksGroup;
    const navLinkStyling =
      "hidden sm:block pb-12 pt-1.5 bg-transparent mr-4 flex items-start text-sm font-sohnelight font-medium transition-colors bg-no-repeat bg-bottom";

    const { personas } = useContext(PersonaContext);

    navChild = (
      <>
        {!isLoggedIn ? null : (
          <div className="flex space-x-6 ml-auto mr-0 sm:mr-4 items-center">
            {launchClubLoyalty && enrolledInLaunchClub && <LaunchClubStatus />}
            <Search className="cursor-pointer hidden sm:block" />
            <div className="block lg:hidden">
              <BookedFlights />
            </div>
            <div className="cursor-pointer hidden sm:block">
              <QRCodeImage className="" />
            </div>

            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      personas.find((persona) => persona.personaname === user)?.personaimage ||
                      "ToggleAvatar.png"
                    }
                    className=""
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-[300px] h-[440px]">
                <>
                  <div className="mx-auto flex place-content-center w-full">
                    <img
                      src={
                        personas.find((persona) => persona.personaname === user)?.personaimage ||
                        "ToggleAvatar.png"
                      }
                      className="rounded-full h-48"
                    />
                  </div>
                  <div className="mx-auto text-center items-center align-center flex text-black font-sohnelight pt-4  text-xl align-center">
                    <p className="pt-4">
                      Thank you{" "}
                      {personas.find((persona) => persona.personaname === user)?.personaname ||
                        user}{" "}
                      for flying Launch Airways with{"  "}
                      <br></br>
                      <span className="text-2xl">Platinum Tier</span>!
                    </p>
                  </div>
                  <div className="mx-auto text-center">
                    <Button
                      onClick={handleLogout}
                      className="text-xl bg-red-700 text-white font-audimat items-center my-2 w-full bg-gradient-to-r from-airlinepurple to-airlinepink  rounded-none"
                    >
                      Logout
                    </Button>
                    <QuickLoginDialog personas={personas} />
                  </div>
                </>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </>
    );

    navLogo = (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="50" className="pr-2">
          <image href="/launch-airways.svg" height="40" width="40" alt="Launch Airways" />
        </svg>
        <p className="text-base flex font-sohnelight text-white">
          <strong className="font-semibold font-sohne">Launch</strong>
          {"\u00A0"}
          {"\u00A0"}Airways
        </p>
      </>
    );

    navLinkMobileDropdown = (
      <>
        {isLoggedIn ? (
          <>
            <DropdownMenuItem href="/airways">Book</DropdownMenuItem>

            <DropdownMenuItem href="/airways">Check-In</DropdownMenuItem>
          </>
        ) : null}
        <div className="flex justify-between">
          <DropdownMenuItem>
            <Search className="cursor-pointer" />
          </DropdownMenuItem>
          <div className="cursor-pointer">
            <QRCodeImage />
          </div>
        </div>
      </>
    );

    navLinksGroup = (
      <>
        {" "}
        <button
          href="/airways"
          className={`${navLinkStyling} ml-12 text-white  hover:text-white focus:text-airlinetext hover:bg-gradient-to-r from-airlinepurple to-airlinepink bg-[length:100%_3px] bg-no-repeat bg-bottom bg-gradient-to-r from-airlinepurple to-airlinepink bg-[length:100%_3px] outline-none`}
        >
          Book
        </button>
        <BookedFlights />
        <button
          href="/airways"
          className={`"${navLinkStyling} mx-6  text-airlineinactive focus:text-airlinetext  hover:text-white hover:bg-gradient-to-r from-airlinepurple to-airlinepink bg-[length:100%_3px]`}
        >
          Check-In
        </button>
        {/* {enrolledInLaunchClub && <LaunchClub />} */}
      </>
    );

    return (
      <nav className="sticky w-full flex top-0 bg-black z-40 font-audimat transition-all duration-150 h-full sm:h-20 p-4 sm:p-6">
        <div className="ml-2 sm:ml-8 flex items-center">{navLogo}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-2 cursor-pointer block lg:hidden text-white">
              <PanelTopOpen size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent>{navLinkMobileDropdown}</DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
        {isLoggedIn ? (
          <div className="hidden lg:flex sm:gap-x-2 lg:gap-x-6">{navLinksGroup}</div>
        ) : null}
        {navChild}
      </nav>
    );
  }
);

export default NavBar;
