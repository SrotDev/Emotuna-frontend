import { useState } from "react";
import { Filter, Instagram, Facebook, Twitter, Youtube, MessageCircle, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface FilterDropdownProps {
  selectedPlatforms: string[];
  selectedTypes: string[];
  onPlatformToggle: (platform: string) => void;
  onTypeToggle: (type: string) => void;
}

const platforms = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "twitter", label: "Twitter", icon: Twitter },
  { id: "youtube", label: "YouTube", icon: Youtube },
];

const types = [
  { id: "comment", label: "Comment", icon: MessageCircle },
  { id: "dm", label: "DM", icon: Mail },
];

export function FilterDropdown({ 
  selectedPlatforms, 
  selectedTypes, 
  onPlatformToggle, 
  onTypeToggle 
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 hover:bg-secondary/50"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-card border-border shadow-2xl"
        align="end"
      >
        <DropdownMenuLabel className="text-foreground">Filter by Platform</DropdownMenuLabel>
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <DropdownMenuCheckboxItem
              key={platform.id}
              checked={selectedPlatforms.includes(platform.id)}
              onCheckedChange={() => onPlatformToggle(platform.id)}
              className="flex items-center gap-2 text-foreground hover:bg-secondary/50"
            >
              <IconComponent className="h-4 w-4" />
              {platform.label}
            </DropdownMenuCheckboxItem>
          );
        })}
        
        <DropdownMenuSeparator className="bg-border/50" />
        
        <DropdownMenuLabel className="text-foreground">Filter by Type</DropdownMenuLabel>
        {types.map((type) => {
          const IconComponent = type.icon;
          return (
            <DropdownMenuCheckboxItem
              key={type.id}
              checked={selectedTypes.includes(type.id)}
              onCheckedChange={() => onTypeToggle(type.id)}
              className="flex items-center gap-2 text-foreground hover:bg-secondary/50"
            >
              <IconComponent className="h-4 w-4" />
              {type.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}