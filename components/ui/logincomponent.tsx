//@ts-nocheck
import * as React from "react";
import { useRef, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PersonaContext } from "../personacontext";

interface LoginComponentProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loginUser: any;
  name: string;
}

export function LoginComponent({
  isLoggedIn,
  setIsLoggedIn,
  loginUser,
  name,
}: LoginComponentProps) {
  const inputRef = useRef();
  const [activeElement, setActiveElement] = useState(null);
  const [defaultEmail, setDefaultEmail] = useState("jenn@launchmail.io");
  const [newPersona, setNewPersona] = useState({
    name: "",
    type: "",
    image: "",
    email: "",
  });
  const { personas, getPersonas } = useContext(PersonaContext);
  const [setIsAddUserDropdownOpen] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewPersonaChange = (e) => {
    setNewPersona({ ...newPersona, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getPersonas();
  }, [isLoading]);

  const showBackButton = () => {
    setIsAddUserDropdownOpen(false);
    setSubmitError(null);
  };

  function handleLogin(e) {
    let loggedInUser = {};
    const activePersona = personas.find((p) => p.personaemail === defaultEmail);
    if (activePersona) {
      loggedInUser.email = activePersona.personaemail;
      loggedInUser.name = activePersona.personaname;
      loggedInUser.role = activePersona.personatype;
    } else {
      loggedInUser.email = defaultEmail;
      let name = loggedInUser.email.split("@")[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
      loggedInUser.name = name;
      loggedInUser.role = "Standard User";
    }
    loginUser(loggedInUser);
    setIsLoggedIn(true);
  }

  const handleSetActive = (personaname, personaemail) => {
    setActiveElement(personaname);
    setDefaultEmail(personaemail);
  };

  useEffect(() => {
    if (activeElement) {
      handleLogin();
    }
  }, [activeElement]);

  return (
    <div className="w-full  bg-white font-audimat shadow-xl mx-auto">
      <div className="flex flex-col justify-center mx-auto text-center">
        <img
          src={"/launch-airways.svg"}
          width={64}
          className="pt-10 mx-auto pb-4"
        />
        <p className="text-3xl sm:text-4xl font-sohnelight pb-12 3xl:pb-24 !font-thin">
          <span className="!font-extrabold">{name}</span>
        </p>
      </div>
      <div className="w-full px-8">
        <div>
          <Input
            placeholder="Email"
            value={defaultEmail || "jenn@launchmail.io"}
            ref={inputRef}
            className="mb-8 3xl:mb-24 outline-none border-0 border-b-2 text-xl"
            onChange={(e) => setDefaultEmail(e.target.value)}
          />
        </div>

        <Button
          onClick={handleLogin}
          className={`mb-4 w-full h-full mx-auto font-audimat rounded-none  text-xl bg-gradient-to-r from-airlinepurple to-airlinepink text-white`}
        >
          Login with SSO
        </Button>

        <Dialog
          onDismiss={() => {
            setIsAddUserDropdownOpen(false);
          }}
          className="z-10"
        >
          <DialogTrigger
            className={`mb-4 p-2 w-full h-full mx-auto font-audimat rounded-none text-xl bg-gradient-to-r from-airlinepurple to-airlinepink text-white hover:bg-gray-800`}
          >
            Switch SSO User
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Switch SSO User</DialogTitle>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <img src="loading-spinner.gif"></img>
                </div>
              ) : (
                <div className="overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center mb-4 pt-6">
                    {personas.map((item: Persona) => (
                      <div
                        className="flex flex-col items-center cursor-pointer hover:brightness-[120%]"
                        key={item.personaemail}
                      >
                        <img
                          src={item.personaimage}
                          className={`w-24 rounded-full mb-4 ${
                            activeElement === item.personaname
                              ? "border-4 border-black"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActive(item.personaname, item.personaemail)
                          }
                          alt={item.personaname}
                        />
                        <p className="text-xs sm:text-sm md:text-base text-center font-bold font-sohnelight">
                          {item.personaname}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-center font-bold font-sohnelight">
                          {item.personatype}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid  sm:flex-row  justify-between px-8 pb-8">
        <div className="pb-3">
          <p>Forgot Password?</p>
        </div>
        <div>
          <p>
            Don't have an account?{" "}
            <a href={window.location.href} className="text-blue-600 ml-2">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
