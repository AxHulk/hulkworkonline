import { createContext, useCallback, useContext, useState, ReactNode } from "react";

export type QuizTrack = "website" | "seo";

interface QuizContextValue {
  open: boolean;
  openQuiz: (source?: string, track?: QuizTrack) => void;
  closeQuiz: () => void;
  source: string;
  track: QuizTrack;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const [track, setTrack] = useState<QuizTrack>("website");

  const openQuiz = useCallback((src: string = "unknown", t: QuizTrack = "website") => {
    setSource(src);
    setTrack(t);
    setOpen(true);
  }, []);

  const closeQuiz = useCallback(() => setOpen(false), []);

  return (
    <QuizContext.Provider value={{ open, openQuiz, closeQuiz, source, track }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
};