import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { PersonStanding, PlaneIcon, Wifi } from "lucide-react";
import { useContext } from "react";
import LoginContext from "@/utils/contexts/login";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";

export default function CheckIn({ trip }: any) {
  // Make sure you get the correct flag keys from Advanced Targeting in Talkin Ship
  const { launchClubLoyalty, priorityBoarding } = useFlags();
  // The add the correct flag key to the array above 
  const { enrolledInLaunchClub } = useContext(LoginContext);
  const client = useLDClient();

  const handleCheckIn = async () => {
    const context = await client?.getContext();

    // Add the experience context here from Advanced Targeting in Talkin Ship
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full"
          onClick={handleCheckIn}
        >
          Check In
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ready to Check In?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid lg:flex mx-auto items-center justify-center space-x-4 mt-4">
              {enrolledInLaunchClub && launchClubLoyalty && (
                <>
                  {priorityBoarding && (
                    <p className="flex text-black  py-2 font-sohne bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600   ">
                      <PersonStanding className="text-blue-700 mr-2" /> Launch
                      Priority
                    </p>
                  )}

                  <p className="flex text-black  py-2 font-sohne bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-red-600  ">
                    <Wifi className="text-green-700 mr-2" /> Free WiFi
                  </p>
                </>
              )}
              {/* Add the code from Advanced Targeting in Talkin Ship that includes mealPromoExperience */}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Check In</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
