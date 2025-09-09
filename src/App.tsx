import { useState } from "react";
import { TopBar } from "./components/TopBar";
import { TrainingSession } from "./components/TrainingSession";
import { TrainingSessionModal } from "./components/TrainingSessionModal";
import { MessageSection } from "./components/MessageSection";
import { MessageFilters } from "./components/MessageFilters";
import { FilterDropdown } from "./components/FilterDropdown";
import { Button } from "./components/ui/button";

// Mock data
const importantMessages = [
  {
    id: "1",
    platform: "instagram" as const,
    username: "example_user",
    snippet: "Hey! I love your content. Would you be interested in collaborating on a project?",
    tag: "@auto message: please let's collaborate",
    fullMessage: "Hey! I love your content. Would you be interested in collaborating on a project? I have some ideas that might be perfect for your audience.",
    aiDraftReply: "Thank you so much for reaching out! I'm always interested in meaningful collaborations. Could you tell me more about your project and how you envision us working together? I'd love to learn more about your ideas!"
  },
  {
    id: "2",
    platform: "twitter" as const,
    username: "marketing_pro",
    snippet: "Saw your latest post and wanted to reach out about a potential partnership...",
    tag: "business inquiry",
    fullMessage: "Saw your latest post and wanted to reach out about a potential partnership. We're looking for influencers in your niche to promote our new product line.",
    aiDraftReply: "Hi there! Thanks for the partnership opportunity. I'd be happy to learn more about your product line and how we might work together. Could you share more details about the collaboration scope and your brand values?"
  },
  {
    id: "6",
    platform: "facebook" as const,
    username: "brand_manager",
    snippet: "Would love to discuss a paid sponsorship opportunity...",
    tag: "sponsorship",
    fullMessage: "Would love to discuss a paid sponsorship opportunity with our luxury brand. We think your aesthetic would be perfect for our upcoming campaign.",
    aiDraftReply: "Thank you for considering me for your campaign! I'd be interested in learning more about your brand values and the specific collaboration details. Could we schedule a call to discuss further?"
  },
  {
    id: "7",
    platform: "instagram" as const,
    username: "creative_agency",
    snippet: "We're hosting an exclusive event and would love to invite you...",
    tag: "event invitation",
    fullMessage: "We're hosting an exclusive event for content creators and would love to invite you as our VIP guest. The event will feature networking and brand collaboration opportunities.",
    aiDraftReply: "This sounds like an amazing opportunity! I'd love to attend your event. Could you please send me more details about the date, location, and what to expect?"
  }
];

const spamMessages = [
  {
    id: "3",
    platform: "instagram" as const,
    username: "fake_account",
    snippet: "CONGRATULATIONS! You've won $1000! Click here to claim...",
    tag: "spam",
    isSpam: true,
    fullMessage: "CONGRATULATIONS! You've won $1000! Click here to claim your prize now! Limited time offer!",
    aiDraftReply: "🚨 SPAM DETECTED: This message has been flagged as a potential scam. Recommended action: Block user and report to Instagram. Do not click any links or provide personal information."
  },
  {
    id: "4",
    platform: "facebook" as const,
    username: "bot_user",
    snippet: "Make money fast with this one simple trick...",
    tag: "spam",
    isSpam: true,
    fullMessage: "Make money fast with this one simple trick that financial advisors don't want you to know!",
    aiDraftReply: "🚨 SPAM DETECTED: This appears to be a get-rich-quick scheme. Recommended action: Delete message, block user, and report to Facebook for spam/scam activity."
  },
  {
    id: "8",
    platform: "twitter" as const,
    username: "crypto_scammer",
    snippet: "Invest in our new cryptocurrency and earn 500% returns...",
    tag: "spam",
    isSpam: true,
    fullMessage: "Invest in our new cryptocurrency and earn 500% returns in just 24 hours! Don't miss this once-in-a-lifetime opportunity!",
    aiDraftReply: "🚨 SPAM DETECTED: This is likely a cryptocurrency scam. Recommended action: Report user to Twitter for fraudulent investment schemes and block immediately."
  },
  {
    id: "9",
    platform: "instagram" as const,
    username: "fake_giveaway",
    snippet: "FREE IPHONE GIVEAWAY! Just follow these simple steps...",
    tag: "spam",
    isSpam: true,
    fullMessage: "FREE IPHONE GIVEAWAY! Just follow these simple steps: 1. Follow us 2. Like this post 3. Share with 10 friends. Winners announced tomorrow!",
    aiDraftReply: "🚨 SPAM DETECTED: Fake giveaway attempt. These are typically used to gain followers or collect personal data. Recommended action: Block user and report fake giveaway to Instagram."
  }
];

const offensiveMessages = [
  {
    id: "5",
    platform: "twitter" as const,
    username: "toxic_user",
    snippet: "Your content is terrible and you should...",
    tag: "offensive content",
    isOffensive: true,
    fullMessage: "Your content is terrible and you should stop posting. Nobody wants to see this garbage.",
    aiDraftReply: "Thank you for your feedback. I appreciate that everyone has different tastes and opinions. I'll continue creating content that resonates with my audience. Have a great day!"
  },
  {
    id: "10",
    platform: "facebook" as const,
    username: "hater_account",
    snippet: "You're so fake and your followers are probably bots...",
    tag: "offensive content",
    isOffensive: true,
    fullMessage: "You're so fake and your followers are probably bots. Stop pretending to be someone you're not.",
    aiDraftReply: "I understand we may have different perspectives. My community means a lot to me, and I work hard to create authentic content. I wish you all the best."
  },
  {
    id: "11",
    platform: "instagram" as const,
    username: "troll_user",
    snippet: "Nobody cares about your opinion...",
    tag: "offensive content",
    isOffensive: true,
    fullMessage: "Nobody cares about your opinion and you should just disappear from social media.",
    aiDraftReply: "I respect that not everyone will connect with my content. I'll continue sharing what I'm passionate about for those who do find value in it. Take care!"
  }
];

type MessageCategory = "all" | "important" | "spam" | "offensive";

export default function App() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(["instagram", "facebook", "twitter"]);
  const [selectedTypes, setSelectedTypes] = useState(["comment", "dm"]);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory>("important");
  const [showMoreImportant, setShowMoreImportant] = useState(false);
  const [showMoreSpam, setShowMoreSpam] = useState(false);
  const [showMoreOffensive, setShowMoreOffensive] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filterMessagesByPlatform = (messages: any[]) => {
    return messages.filter(msg => selectedPlatforms.includes(msg.platform));
  };

  const getCurrentMessages = () => {
    switch (selectedCategory) {
      case "important":
        return showMoreImportant ? importantMessages : importantMessages.slice(0, 2);
      case "spam":
        return showMoreSpam ? spamMessages : spamMessages.slice(0, 2);
      case "offensive":
        return showMoreOffensive ? offensiveMessages : offensiveMessages.slice(0, 1);
      default:
        return [];
    }
  };

  const getCurrentTitle = () => {
    switch (selectedCategory) {
      case "important":
        return "Important";
      case "spam":
        return "Spam";
      case "offensive":
        return "Offensive";
      default:
        return "Messages";
    }
  };

  const getShowMoreState = () => {
    switch (selectedCategory) {
      case "important":
        return showMoreImportant;
      case "spam":
        return showMoreSpam;
      case "offensive":
        return showMoreOffensive;
      default:
        return false;
    }
  };

  const handleShowMoreToggle = () => {
    switch (selectedCategory) {
      case "important":
        setShowMoreImportant(!showMoreImportant);
        break;
      case "spam":
        setShowMoreSpam(!showMoreSpam);
        break;
      case "offensive":
        setShowMoreOffensive(!showMoreOffensive);
        break;
    }
  };

  const getMaxInitialCount = () => {
    switch (selectedCategory) {
      case "important":
        return 2;
      case "spam":
        return 2;
      case "offensive":
        return 1;
      default:
        return 2;
    }
  };

  const getTotalMessageCount = () => {
    switch (selectedCategory) {
      case "important":
        return importantMessages.length;
      case "spam":
        return spamMessages.length;
      case "offensive":
        return offensiveMessages.length;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar 
        onNotificationClick={() => {}}
        onInboxClick={() => {}}
        onUserClick={() => {}}
      />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        <TrainingSession onClick={() => setIsTrainingModalOpen(true)} />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Messages</h2>
            <FilterDropdown
              selectedPlatforms={selectedPlatforms}
              selectedTypes={selectedTypes}
              onPlatformToggle={handlePlatformToggle}
              onTypeToggle={handleTypeToggle}
            />
          </div>
          
          <MessageFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <div className="space-y-4">
            <MessageSection 
              title={getCurrentTitle()}
              messages={filterMessagesByPlatform(getCurrentMessages())}
              isSpam={selectedCategory === "spam"}
            />
            
            {getTotalMessageCount() > getMaxInitialCount() && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="hover:bg-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  onClick={handleShowMoreToggle}
                >
                  {getShowMoreState() 
                    ? `Show Less ${getCurrentTitle()}` 
                    : `Show More ${getCurrentTitle()}`}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <TrainingSessionModal
        isOpen={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
      />
    </div>
  );
}