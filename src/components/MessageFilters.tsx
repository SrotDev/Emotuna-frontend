import { Button } from "./ui/button";

type MessageCategory = "all" | "important" | "spam" | "offensive";

interface MessageFiltersProps {
  selectedCategory: MessageCategory;
  onCategoryChange: (category: MessageCategory) => void;
}

export function MessageFilters({ selectedCategory, onCategoryChange }: MessageFiltersProps) {
  const categories = [
    { id: "important" as const, label: "Important" },
    { id: "spam" as const, label: "Spam" },
    { id: "offensive" as const, label: "Offensive" },
  ];

  return (
    <div className="flex items-center gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-transparent border border-primary text-muted-foreground hover:text-foreground hover:bg-primary/10"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}