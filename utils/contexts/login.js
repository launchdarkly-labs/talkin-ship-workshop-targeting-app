// TripsContext.js
import { useLDClient } from "launchdarkly-react-client-sdk";
import { createContext, useState, useEffect } from "react";

const LoginContext = createContext();

export default LoginContext;

// Continue in TripsContext.js
export const LoginProvider = ({ children }) => {
  const client = useLDClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState({});
  const [enrolledInLaunchClub, setEnrolledInLaunchClub] = useState(false);
  const [launchClubStatus, setLaunchClubStatus] = useState("economy");

  const loginUser = async (loggedInUser) => {
    setIsLoggedIn(true);
    setUser(loggedInUser.name);
    setEmail(loggedInUser.email);

    // get the context from LaunchDarkly
    const context = await client?.getContext();
    console.log("loginUser", context);

    // set the user context
    context.user = {
      name: loggedInUser.name,
      email: loggedInUser.email,
      role: loggedInUser.role,
      key: loggedInUser.email,
      launchclub: launchClubStatus,
    };
    await client.identify(context);
  };

  const logoutUser = async () => {
    setIsLoggedIn(false);
    setUser("anonymous");
    setEnrolledInLaunchClub(false);
    const context = client?.getContext();
    context.user = {
      anonymous: true,
    };
    client.identify(context);
  };

  const setPlaneContext = async (plane) => {
    const context = await client?.getContext();
    console.log("setPlaneContext", context);
    context.experience.airplane = plane;
    console.log("Plane context registered for trip as - " + plane);
    client.identify(context);
  };

  const upgradeLaunchClub = async (status) => {
    const context = await client?.getContext();
    console.log("upgradeLaunchClub", context);
    setLaunchClubStatus(status);
    context.user.launchclub = status;
    console.log("User upgraded to " + status + " status");
    client.identify(context);
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        email,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        enrolledInLaunchClub,
        upgradeLaunchClub,
        setPlaneContext,
        setEnrolledInLaunchClub,
        launchClubStatus,
        setLaunchClubStatus,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
