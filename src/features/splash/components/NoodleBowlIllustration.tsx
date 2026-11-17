import noodleBowlImg from "@/assets/illustrations/noodle-bowl.jpg";
import { cn } from "@/lib/utils";

export function NoodleBowlIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto flex items-center justify-center", className)}>
      <img
        src={noodleBowlImg}
        alt="Lolacat>< ramen noodle bowl"
        className="h-56 w-56 rounded-full object-cover mix-blend-multiply sm:h-72 sm:w-72"
      />
    </div>
  );
}
