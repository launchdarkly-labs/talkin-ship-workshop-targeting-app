//@ts-nocheck
import * as React from "react";
import { useContext, useState } from "react";
import { PanelTopOpen } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import LoginContext from "@/utils/contexts/login";
import { Button } from "./button";
import BookedFlights from "./airwayscomponents/bookedFlights";
import { useRouter } from 'next/router';


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "./dropdown-menu";
import LaunchClubStatus from "./airwayscomponents/launchClubStatus";
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
  ({ launchClubLoyalty, cart, setCart, className, variant, handleLogout, ...props }, ref) => {
    const { isLoggedIn, enrolledInLaunchClub, user, loginUser } = useContext(LoginContext);
    let navChild, navLogo, navLinkMobileDropdown, navLinksGroup;
    const navLinkStyling =
      "hidden sm:block pb-12 pt-1.5 bg-transparent mr-4 flex items-start text-sm font-sohnelight font-medium transition-colors bg-no-repeat bg-bottom";

    const { personas } = useContext(PersonaContext);
    const chosenPersona = personas.find(
      (persona) => persona.personaname === user
    );
    const { launchClubStatus } = useContext(LoginContext);


    navChild = (
      <>
        {!isLoggedIn ? null : (
          <div className="flex space-x-3 sm:space-x-6 ml-auto mr-0 sm:mr-4 items-center">
            <div className="hidden sm:block">
              {launchClubLoyalty && enrolledInLaunchClub && <LaunchClubStatus />}
            </div>

            <div className="hidden sm:block lg:hidden">
              <BookedFlights />
            </div>
            <div className="cursor-pointer hidden sm:block">
            </div>

            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      chosenPersona?.personaimage || 'ToggleAvatar.png'
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
                        chosenPersona?.personaimage || 'ToggleAvatar.png'
                      }
                      className="rounded-full h-48"
                    />
                  </div>
                  <div className="mx-auto text-center">
                    <p className="text-2xl font-normal text-black font-shone mt-4">
                      Hi {chosenPersona?.personaname}
                    </p>
                  </div>
                  <div className="mx-auto text-center">
                    <p className="text-md uppercase font-normal tracking-widest text-[#939598] font-shone mt-0">
                      {launchClubStatus} MEMBER
                    </p>
                  </div>
                  <div className="mx-auto text-center">
                    <Button
                      onClick={handleLogout}
                      className="text-xl bg-gradient-airways text-white hover:bg-gradient-airways-grey hover:text-white font-shone items-center mt-4 w-full rounded-none"
                    >
                      Logout
                    </Button>
                    <QuickLoginDialog personas={personas} variant={variant} />
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40"
          width="50"
          className="pr-2"
        >
          <image
            href="/launch-airways.svg"
            height="40"
            width="40"
            alt="Launch Airways"
          />
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

            {launchClubLoyalty && enrolledInLaunchClub && (
              <div className="block sm:hidden hover:bg-gray-100 p-[.30rem] rounded-sm">
                <LaunchClubStatus />
              </div>
            )}

            <div className="cursor-pointer block sm:hidden hover:bg-gray-100 p-[.30rem] rounded-sm">
              <BookedFlights />
            </div>
          </>
        ) : null}
        <div className="flex justify-between">

          <div className="cursor-pointer">
          </div>
        </div>
      </>
    );

    navLinksGroup = (
      <>
        <button
          href="/airways"
          className={`${navLinkStyling} ml-12 text-white  hover:text-white focus:text-airlinetext hover:bg-gradient-airline-buttons bg-[length:100%_3px] bg-no-repeat bg-bottom bg-gradient-airline-buttons outline-none cursor-auto`}
        >
          Book
        </button>
        <div className="hidden lg:flex">
          <BookedFlights />
        </div>
        <button
          href="/airways"
          className={`"${navLinkStyling} mx-6  text-airlineinactive focus:text-airlinetext  hover:text-white hover:bg-gradient-airline-buttons bg-[length:100%_3px] cursor-auto`}
        >
          Check-In
        </button>
        {/* {enrolledInLaunchClub && <LaunchClub />} */}
      </>
    );

    return (
      <nav className="sticky w-full flex top-0 bg-[#282828] z-40 font-audimat transition-all duration-150 h-full sm:h-20 p-4 sm:p-6">
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
          <div className="hidden lg:flex sm:gap-x-2 lg:gap-x-6">
            {navLinksGroup}
          </div>
        ) : null}
        {navChild}
      </nav>
    );
  }
);

export default NavBar;
