import { Instagram, Facebook, Twitter, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PlatformSwitcherProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-500" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "text-blue-400" },
];

export function PlatformSwitcher({ selectedPlatforms, onPlatformToggle }: PlatformSwitcherProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-secondary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter Platforms
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-popover border border-border">
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Select Platforms</h3>
          <div className="space-y-2">
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.id);
              
              return (
                <Button
                  key={platform.id}
                  variant={isSelected ? "secondary" : "ghost"}
                  className="w-full justify-start hover:bg-secondary/50"
                  onClick={() => onPlatformToggle(platform.id)}
                >
                  <IconComponent className={`h-4 w-4 mr-2 ${platform.color}`} />
                  {platform.name}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}