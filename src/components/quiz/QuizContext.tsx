import { createContext, useCallback, useContext, useState, ReactNode } from "react";

interface QuizContextValue {
  open: boolean;
  openQuiz: (source?: string) => void;
  closeQuiz: () => void;
  source: string;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("unknown");

  const openQuiz = useCallback((src: string = "unknown") => {
    setSource(src);
    setOpen(true);
  }, []);

  const closeQuiz = useCallback(() => setOpen(false), []);

  return (
    <QuizContext.Provider value={{ open, openQuiz, closeQuiz, source }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
};