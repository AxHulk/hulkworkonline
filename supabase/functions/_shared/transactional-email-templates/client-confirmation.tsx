/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ClientConfirmationProps {
  name?: string
  formLang?: string
  track?: string // 'web' | 'seo' | 'smm' | 'behavioral' | 'general'
}

const COPY = {
  ru: {
    preview: (name: string) => `Спасибо, ${name}! Мы получили вашу заявку.`,
    greeting: (name: string) => `Здравствуйте, ${name}!`,
    intro:
      'Мы получили вашу заявку и уже взяли её в работу. Менеджер HulkWork Studio свяжется с вами в ближайшее время — обычно в течение нескольких часов в рабочее время.',
    whatNextTitle: 'Что дальше?',
    steps: [
      'Изучим вашу задачу и подготовим первичные вопросы.',
      'Свяжемся по указанному контакту и обсудим детали.',
      'Предложим оптимальное решение и честную цену — без лишних слов.',
    ],
    meanwhileTitle: 'А пока — ознакомьтесь с нами',
    meanwhileText:
      'Если хотите узнать больше о подходе и команде — посмотрите наш сайт или напишите нам в Telegram, мы отвечаем за 5 минут.',
    ctaSite: 'Открыть сайт',
    ctaTelegram: 'Написать в Telegram',
    signature: 'С уважением, команда HulkWork Studio',
    footer: 'HulkWork Studio · автоматическое подтверждение заявки',
    subject: (name: string) => `Спасибо за заявку, ${name}! — HulkWork Studio`,
    siteUrl: 'https://hulkwork.online/',
  },
  en: {
    preview: (name: string) => `Thanks, ${name}! We received your request.`,
    greeting: (name: string) => `Hi ${name},`,
    intro:
      'Thanks for reaching out — we have received your request and started looking into it. A HulkWork Studio manager will get back to you shortly, usually within a few hours during business time.',
    whatNextTitle: 'What happens next?',
    steps: [
      'We will review your task and prepare initial questions.',
      'We will reach out via the contact you provided to discuss details.',
      'We will propose an optimal solution and a fair price — no fluff.',
    ],
    meanwhileTitle: 'In the meantime',
    meanwhileText:
      'Want to learn more about our approach and team? Check the site or message us on Telegram — we usually reply within 5 minutes.',
    ctaSite: 'Open website',
    ctaTelegram: 'Message on Telegram',
    signature: 'Best regards, the HulkWork Studio team',
    footer: 'HulkWork Studio · automatic request confirmation',
    subject: (name: string) => `Thanks for reaching out, ${name}! — HulkWork Studio`,
    siteUrl: 'https://hulkwork.online/en',
  },
}

const ClientConfirmationEmail = ({
  name = '',
  formLang = 'ru',
}: ClientConfirmationProps) => {
  const lang = formLang === 'en' ? 'en' : 'ru'
  const t = COPY[lang]
  const displayName = name?.trim() || (lang === 'en' ? 'there' : 'друг')

  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{t.preview(displayName)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>HulkWork Studio</Heading>

          <Text style={greeting}>{t.greeting(displayName)}</Text>
          <Text style={paragraph}>{t.intro}</Text>

          <Section style={card}>
            <Heading as="h2" style={h2}>{t.whatNextTitle}</Heading>
            {t.steps.map((s, i) => (
              <Text key={i} style={stepRow}>
                <span style={stepNum}>{i + 1}.</span> {s}
              </Text>
            ))}
          </Section>

          <Hr style={hr} />

          <Heading as="h2" style={h2}>{t.meanwhileTitle}</Heading>
          <Text style={paragraph}>{t.meanwhileText}</Text>

          <Section style={{ textAlign: 'center', margin: '24px 0' }}>
            <Button href={t.siteUrl} style={btnPrimary}>{t.ctaSite}</Button>
            <span style={{ display: 'inline-block', width: '12px' }} />
            <Button href="https://t.me/HulkWorkStudio" style={btnSecondary}>{t.ctaTelegram}</Button>
          </Section>

          <Text style={signature}>{t.signature}</Text>
          <Text style={footer}>{t.footer}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ClientConfirmationEmail,
  subject: (data: Record<string, any>) => {
    const lang = data?.formLang === 'en' ? 'en' : 'ru'
    const name = (data?.name as string)?.trim() || (lang === 'en' ? 'there' : 'друг')
    return COPY[lang].subject(name)
  },
  displayName: 'Подтверждение заявки клиенту',
  previewData: {
    name: 'Иван',
    formLang: 'ru',
    track: 'web',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Inter', Arial, sans-serif",
  margin: 0,
  padding: 0,
}
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 24px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#6B2FA0',
  margin: '0 0 24px',
  fontFamily: "'Montserrat', Arial, sans-serif",
  textAlign: 'center' as const,
}
const h2 = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#1A0A2E',
  margin: '0 0 12px',
  fontFamily: "'Montserrat', Arial, sans-serif",
}
const greeting = {
  fontSize: '16px',
  color: '#1A0A2E',
  margin: '0 0 12px',
  fontWeight: 600,
}
const paragraph = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#1A0A2E',
  margin: '0 0 16px',
}
const card = {
  border: '1px solid #E9DEF5',
  borderRadius: '12px',
  padding: '16px 20px',
  backgroundColor: '#FAF6FE',
  margin: '8px 0',
}
const stepRow = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#1A0A2E',
  margin: '0 0 8px',
}
const stepNum = {
  color: '#6B2FA0',
  fontWeight: 700,
  marginRight: '6px',
}
const btnPrimary = {
  backgroundColor: '#6B2FA0',
  color: '#ffffff',
  padding: '12px 22px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
}
const btnSecondary = {
  backgroundColor: '#FAF6FE',
  color: '#6B2FA0',
  padding: '12px 22px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
  border: '1px solid #E9DEF5',
}
const hr = { borderTop: '1px solid #E9DEF5', margin: '24px 0' }
const signature = {
  fontSize: '14px',
  color: '#1A0A2E',
  margin: '24px 0 8px',
  fontStyle: 'italic' as const,
}
const footer = {
  fontSize: '12px',
  color: '#999999',
  margin: '24px 0 0',
  textAlign: 'center' as const,
}