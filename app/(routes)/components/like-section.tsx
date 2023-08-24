import { HeartIcon } from "@radix-ui/react-icons";
import { InboxIcon, MessageSquare } from "lucide-react";

interface LikeSectionProps {}

const LikeSection: React.FC<LikeSectionProps> = ({}) => {
    return (
        <div className="flex gap-6">
        <div className="flex items-center gap-1">
            <HeartIcon className="h-6 w-6 text-rose-500"/>
            <p className="text-xs text-muted-foreground en">20 Likes</p>
        </div>
        <div className="flex items-center gap-1">
            <MessageSquare className="h-5 w-5 text-blue-500"/>
            <p className="text-xs text-muted-foreground en">20 Comments</p>
        </div>
        </div>
    );
}

export default LikeSection;