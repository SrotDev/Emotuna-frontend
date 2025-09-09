import { useState } from "react";
import { Edit, Save, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Textarea } from "./ui/textarea";

export function DraftReply() {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState("Thanks for reaching out! I'd love to collaborate with you. Let me know more about what you have in mind.");

  return (
    <Card className="fixed bottom-6 left-6 w-80 bg-card border border-border shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">Draft Reply</h4>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-secondary/50"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              className="min-h-[80px] bg-input-background border-border resize-none"
              placeholder="Type your reply..."
            />
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => setIsEditing(false)}
                className="text-xs bg-primary hover:bg-primary/80"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground line-clamp-3">
              {draftText}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="w-full text-xs hover:bg-secondary/50"
            >
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}