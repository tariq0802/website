"use client";

import { useEffect, useState } from "react";

type LanguageWrapperProps = {
  children: React.ReactNode;
};

const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const rootElement = document.documentElement;
    const language = rootElement.getAttribute("lang");
    if (language) {
      setLang(language);
    }
    console.log("language: ",language);
  }, []);

  

  const langClass = lang === "bn" ? "bn" : "en";

  return <div className={langClass}>{children}</div>;
};

export default LanguageWrapper;
