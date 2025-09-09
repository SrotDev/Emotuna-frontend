import { Bell, Inbox, User, Instagram, Facebook, Twitter, Youtube, Plus, Settings, LogOut, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "./ui/dropdown-menu";

interface TopBarProps {
  onNotificationClick: () => void;
  onInboxClick: () => void;
  onUserClick: () => void;
}

export function TopBar({ onNotificationClick, onInboxClick, onUserClick }: TopBarProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-primary">Inbox Intelligence</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-secondary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-card border-border shadow-2xl" align="end">
            <DropdownMenuLabel className="text-foreground">Recent Notifications</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-start gap-3 p-3 hover:bg-secondary/50">
              <Instagram className="h-4 w-4 text-pink-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">New collaboration request</p>
                <p className="text-xs text-muted-foreground">@brand_partner wants to collaborate</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3 hover:bg-secondary/50">
              <Twitter className="h-4 w-4 text-blue-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Spam message detected</p>
                <p className="text-xs text-muted-foreground">Crypto scam automatically filtered</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3 p-3 hover:bg-secondary/50">
              <Facebook className="h-4 w-4 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">New partnership inquiry</p>
                <p className="text-xs text-muted-foreground">Brand wants to discuss sponsorship</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Platforms Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-secondary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
            >
              <Inbox className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-card border-border shadow-2xl" align="end">
            <DropdownMenuLabel className="text-foreground">Connected Platforms</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-secondary/50">
              <Instagram className="h-4 w-4 text-pink-500" />
              <span className="text-foreground">Instagram</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-secondary/50">
              <Facebook className="h-4 w-4 text-blue-500" />
              <span className="text-foreground">Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-secondary/50">
              <Twitter className="h-4 w-4 text-blue-400" />
              <span className="text-foreground">Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-secondary/50">
              <Youtube className="h-4 w-4 text-red-500" />
              <span className="text-foreground">YouTube</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="flex items-center gap-2 text-primary hover:bg-primary/10">
              <Plus className="h-4 w-4" />
              <span>Add New Platform</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-secondary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-card border-border shadow-2xl" align="end">
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-secondary/50">
              <Settings className="h-4 w-4" />
              <span className="text-foreground">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-secondary/50">
              <HelpCircle className="h-4 w-4" />
              <span className="text-foreground">Report a problem</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}