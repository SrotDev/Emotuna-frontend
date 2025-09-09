import { useState } from "react";
import { ChevronDown, ChevronUp, Instagram, Facebook, Twitter, Edit, Save, Send, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";

interface MessageCardProps {
  id?: string;
  platform: "instagram" | "facebook" | "twitter";
  username: string;
  snippet: string;
  tag?: string;
  isSpam?: boolean;
  isOffensive?: boolean;
  fullMessage?: string;
  aiDraftReply?: string;
}

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
};

const platformColors = {
  instagram: "text-pink-500",
  facebook: "text-blue-500",
  twitter: "text-blue-400",
};

export function MessageCard({
  id,
  platform,
  username,
  snippet,
  tag,
  isSpam = false,
  isOffensive = false,
  fullMessage,
  aiDraftReply,
}: MessageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [draftReply, setDraftReply] = useState(aiDraftReply || "");
  const IconComponent = platformIcons[platform];

  return (
    <Card 
      className={`w-full bg-card border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 ${
        isSpam ? 'border-destructive/30 opacity-80' : 'border-border'
      } ${isOffensive ? 'border-destructive/50' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <IconComponent className={`h-5 w-5 mt-1 ${platformColors[platform]}`} />
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">@{username}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-secondary/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <>
                    Collapse <ChevronUp className="h-3 w-3 ml-1" />
                  </>
                ) : (
                  <>
                    Expand <ChevronDown className="h-3 w-3 ml-1" />
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {isExpanded ? (fullMessage || snippet) : snippet}
              </p>
              
              {tag && (
                <Badge 
                  variant={isOffensive ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {tag}
                </Badge>
              )}
            </div>

            {isExpanded && aiDraftReply && (
              <>
                <Separator className="bg-border/50" />
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      isSpam ? 'text-destructive' : 
                      isOffensive ? 'text-yellow-500' : 
                      'text-primary'
                    }`}>
                      {isSpam ? 'AI Spam Response' : 
                       isOffensive ? 'AI Professional Response' : 
                       'AI Draft Reply'}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs hover:bg-secondary/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingReply(!isEditingReply);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {isEditingReply ? (
                    <div className="space-y-3">
                      <Textarea
                        value={draftReply}
                        onChange={(e) => setDraftReply(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-[80px] bg-input-background border-border resize-none text-sm"
                        placeholder="Edit your reply..."
                      />
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditingReply(false);
                            setDraftReply(aiDraftReply || "");
                          }}
                          className="text-xs h-7"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditingReply(false);
                          }}
                          className="text-xs h-7 hover:bg-secondary/50"
                        >
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs h-7 bg-primary hover:bg-primary/80"
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className={`p-3 rounded-md border ${
                        isSpam ? 'bg-destructive/10 border-destructive/30' :
                        isOffensive ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-secondary/20 border-border/50'
                      }`}>
                        <p className="text-sm text-foreground">{draftReply}</p>
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditingReply(true);
                          }}
                          className="text-xs h-7 hover:bg-secondary/50"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className={`text-xs h-7 ${
                            isSpam ? 'bg-destructive hover:bg-destructive/80' :
                            isOffensive ? 'bg-yellow-600 hover:bg-yellow-600/80' :
                            'bg-primary hover:bg-primary/80'
                          }`}
                        >
                          <Send className="h-3 w-3 mr-1" />
                          {isSpam ? 'Report & Block' : isOffensive ? 'Send Response' : 'Send Reply'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}