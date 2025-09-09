import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

interface TrainingSessionProps {
  onClick?: () => void;
}

export function TrainingSession({ onClick }: TrainingSessionProps) {
  return (
    <Card 
      className="w-full bg-card border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden cursor-pointer hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent animate-pulse"></div>
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Training Session</h2>
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-primary/20 transition-all duration-200"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-sm text-muted-foreground">
          Continue training your AI assistant to better categorize messages and generate responses.
        </p>
      </CardContent>
    </Card>
  );
}