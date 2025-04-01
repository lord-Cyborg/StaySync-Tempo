import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

type Language = "en" | "es" | "pt-BR";

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void;
}

export default function LanguageSelector({
  onLanguageChange,
}: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    if (onLanguageChange) {
      onLanguageChange(language);
    }
    // Store language preference in localStorage
    localStorage.setItem("language", language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/80"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={`flex items-center gap-2 ${currentLanguage === "en" ? "bg-secondary/50" : ""}`}
        >
          <img
            src="https://flagcdn.com/w20/us.png"
            width="20"
            height="15"
            alt="English"
            className="rounded-sm"
          />
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("es")}
          className={`flex items-center gap-2 ${currentLanguage === "es" ? "bg-secondary/50" : ""}`}
        >
          <img
            src="https://flagcdn.com/w20/es.png"
            width="20"
            height="15"
            alt="Español"
            className="rounded-sm"
          />
          <span>Español</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("pt-BR")}
          className={`flex items-center gap-2 ${currentLanguage === "pt-BR" ? "bg-secondary/50" : ""}`}
        >
          <img
            src="https://flagcdn.com/w20/br.png"
            width="20"
            height="15"
            alt="Português"
            className="rounded-sm"
          />
          <span>Português</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
