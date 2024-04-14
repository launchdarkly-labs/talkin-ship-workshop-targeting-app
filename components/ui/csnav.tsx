import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useRouter } from "next/router";
import { CSCard } from "./ldcscard";
import { motion } from "framer-motion";

export function CSNav() {
  const router = useRouter();

  function goTargeting() {
    router.push("/airways");
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={24} className="text-white cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll" side="left">
        <SheetHeader className="mx-4">
          <SheetTitle className="font-sohne text-2xl">
            <img src='logo.png' className='w-64' />
          </SheetTitle>
          
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
          
         
         
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div onClick={goTargeting}>
                <CSCard
                  className="bg-gradient-targeting cursor-pointer"
                  herotext="Navigate to Targeted and Personalized Experiences"
                />
              </div>
              
            </motion.div>
          </div>
        </div>
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
