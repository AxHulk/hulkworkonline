import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } },
        );
        const json = await res.json();
        if (json.valid) setState("valid");
        else if (json.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setState("done");
      else if (data?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <Layout>
      <SEO title="Отписка от рассылки — HulkWork Studio" description="Управление подпиской на email-уведомления." />
      <section className="container mx-auto max-w-md px-4 py-24">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
          {state === "loading" && (
            <>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Проверяем ссылку…</p>
            </>
          )}
          {state === "valid" && (
            <>
              <h1 className="font-heading text-2xl font-bold text-foreground">Подтвердите отписку</h1>
              <p className="mt-3 text-muted-foreground">
                Вы больше не будете получать email-уведомления от HulkWork Studio.
              </p>
              <Button onClick={confirm} size="lg" className="mt-6 w-full">
                Отписаться
              </Button>
            </>
          )}
          {state === "submitting" && (
            <>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Обрабатываем…</p>
            </>
          )}
          {state === "done" && (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Готово</h1>
              <p className="mt-2 text-muted-foreground">
                Вы успешно отписаны от email-уведомлений.
              </p>
            </>
          )}
          {state === "already" && (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Уже отписаны</h1>
              <p className="mt-2 text-muted-foreground">Этот адрес уже исключён из рассылки.</p>
            </>
          )}
          {(state === "invalid" || state === "error") && (
            <>
              <XCircle className="mx-auto h-12 w-12 text-destructive" />
              <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">
                {state === "invalid" ? "Ссылка недействительна" : "Произошла ошибка"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Попробуйте ещё раз или напишите нам в Telegram.
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UnsubscribePage;
