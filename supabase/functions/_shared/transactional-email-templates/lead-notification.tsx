/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
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

interface LeadNotificationProps {
  source?: string
  name?: string
  contact?: string
  message?: string
  pageUrl?: string
  estimatedPriceUsd?: number
  estimatedDays?: number
  contactChannel?: string
  quizAnswers?: Record<string, any>
  submittedAt?: string
  formLang?: string
}

const LeadNotificationEmail = ({
  source = 'unknown',
  name = '—',
  contact = '—',
  message,
  pageUrl,
  estimatedPriceUsd,
  estimatedDays,
  contactChannel,
  quizAnswers,
  submittedAt,
  formLang,
}: LeadNotificationProps) => {
  const isQuiz = source === 'quiz_submission'
  const isSeoQuiz = source === 'seo_quiz_submission'
  const isMarketingQuiz = source === 'marketing_quiz_submission'
  const langBadge = formLang === 'en' ? ' 🇬🇧 EN' : ''
  const title = isQuiz
    ? `🎯 Новая заявка из опросника «Узнать цену»${langBadge}`
    : isSeoQuiz
    ? `🎯 Новая заявка из SEO-опросника${langBadge}`
    : isMarketingQuiz
    ? `🎯 Новая заявка из опросника по маркетингу/SMM${langBadge}`
    : `📩 Новая заявка с сайта${langBadge}`

  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>{`${title} — ${name}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{title}</Heading>

          <Section style={card}>
            <Row label="Источник" value={prettySource(source)} />
            {formLang ? <Row label="Язык формы" value={formLang.toUpperCase()} /> : null}
            <Row label="Имя" value={name} />
            <Row
              label={contactChannel ? `Контакт (${contactChannel})` : 'Контакт'}
              value={contact}
            />
            {message ? <Row label="Сообщение" value={message} /> : null}
            {pageUrl ? <Row label="Страница" value={pageUrl} /> : null}
            {submittedAt ? <Row label="Время" value={submittedAt} /> : null}
          </Section>

          {isQuiz && (estimatedPriceUsd || estimatedDays) ? (
            <>
              <Hr style={hr} />
              <Heading as="h2" style={h2}>
                Расчёт по опроснику
              </Heading>
              <Section style={cardHighlight}>
                {estimatedPriceUsd ? (
                  <Row label="Стоимость" value={`$${estimatedPriceUsd}`} />
                ) : null}
                {estimatedDays ? (
                  <Row label="Срок" value={`${estimatedDays} дн.`} />
                ) : null}
              </Section>
            </>
          ) : null}

          {(isQuiz || isSeoQuiz || isMarketingQuiz) && quizAnswers ? (
            <>
              <Hr style={hr} />
              <Heading as="h2" style={h2}>
                Ответы клиента
              </Heading>
              <Section style={card}>
                {Object.entries(quizAnswers).map(([key, value]) => (
                  <Row
                    key={key}
                    label={prettyKey(key)}
                    value={formatValue(value)}
                  />
                ))}
              </Section>
            </>
          ) : null}

          <Text style={footer}>
            HulkWork Studio · автоматическое уведомление
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div style={row}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value}</Text>
  </div>
)

function prettySource(s: string): string {
  const map: Record<string, string> = {
    home_cta: 'Главная — форма CTA',
    contacts_form: 'Контакты — форма',
    web_development: 'Услуги: Веб-разработка',
    quiz_submission: 'Опросник «Узнать цену»',
    seo_quiz_submission: 'SEO-опросник',
    marketing_quiz_submission: 'Опросник «Маркетинг и SMM»',
    home_cta_seo: 'Главная — выбор SEO',
    home_cta_behavioral: 'Главная — выбор «Поведенческие факторы»',
    seo_page_hero: 'Страница SEO — Hero',
    seo_page_cta: 'Страница SEO — CTA',
    behavioral_page_hero: 'Страница ПФ — Hero',
    behavioral_page_cta: 'Страница ПФ — CTA',
    invite_banner: 'Всплывающий баннер опросника',
    smm_invite_banner: 'SMM — всплывающий баннер опросника',
    smm_page_hero: 'Страница SMM — Hero',
  }
  return map[s] ?? s
}

function prettyKey(k: string): string {
  const map: Record<string, string> = {
    idea: 'Идея проекта',
    siteType: 'Тип сайта',
    targetAudience: 'Целевая аудитория',
    competitors: 'Конкуренты',
    inspirationSites: 'Сайты-вдохновение',
    likes: 'Что нравится',
    dislikes: 'Что не нравится',
    pages: 'Страницы',
    functionality: 'Функциональность',
    designStyle: 'Стиль дизайна',
    hasContent: 'Готовый контент',
    externalServices: 'Внешние сервисы',
    hasUserAccount: 'Личный кабинет',
    accountFunctionality: 'Функции ЛК',
    // SEO quiz
    siteUrl: 'Ссылка на сайт',
    goal: 'Главная бизнес-задача',
    keywords: 'Ключевые запросы / направления',
    prevExperience: 'Предыдущий опыт продвижения',
    contentParticipation: 'Участие в создании контента',
    devSupport: 'Технический специалист',
    flexibility: 'Готовность менять структуру/дизайн',
    pace: 'Темп работы',
    budget: 'Ежемесячный бюджет',
    turbo: 'Турбо-режим (поведенческие факторы)',
  }
  return map[k] ?? k
}

function formatValue(v: any): string {
  if (v === null || v === undefined || v === '') return '—'
  if (Array.isArray(v)) {
    if (v.length === 0) return '—'
    if (typeof v[0] === 'object') {
      return v
        .map((item) =>
          Object.values(item)
            .filter(Boolean)
            .join(' — ')
        )
        .join('\n')
    }
    return v.join(', ')
  }
  if (typeof v === 'object') return JSON.stringify(v)
  return String(v)
}

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    data?.source === 'quiz_submission'
      ? `🎯 Заявка опросника от ${data?.name ?? 'клиента'}`
      : `📩 Новая заявка с сайта от ${data?.name ?? 'клиента'}`,
  displayName: 'Уведомление о новой заявке',
  to: 'Prezidenthulk@gmail.com',
  previewData: {
    source: 'home_cta',
    name: 'Иван Петров',
    contact: '@ivan_petrov',
    message: 'Хочу сайт-визитку для салона красоты',
    pageUrl: 'https://hulkwork.online/',
    submittedAt: new Date().toLocaleString('ru-RU'),
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Inter', Arial, sans-serif",
  margin: 0,
  padding: 0,
}
const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '32px 24px',
}
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#1A0A2E',
  margin: '0 0 24px',
  fontFamily: "'Montserrat', Arial, sans-serif",
}
const h2 = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#6B2FA0',
  margin: '24px 0 12px',
  fontFamily: "'Montserrat', Arial, sans-serif",
}
const card = {
  border: '1px solid #E9DEF5',
  borderRadius: '12px',
  padding: '8px 18px',
  backgroundColor: '#FAF6FE',
}
const cardHighlight = {
  border: '1px solid #6B2FA0',
  borderRadius: '12px',
  padding: '8px 18px',
  backgroundColor: '#F0E8F8',
}
const row = {
  borderBottom: '1px solid #EADCF8',
  padding: '10px 0',
}
const rowLabel = {
  fontSize: '12px',
  color: '#6B2FA0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: 0,
  fontWeight: 600,
}
const rowValue = {
  fontSize: '14px',
  color: '#1A0A2E',
  margin: '4px 0 0',
  whiteSpace: 'pre-wrap' as const,
  wordBreak: 'break-word' as const,
}
const hr = {
  borderTop: '1px solid #E9DEF5',
  margin: '24px 0',
}
const footer = {
  fontSize: '12px',
  color: '#999999',
  margin: '32px 0 0',
  textAlign: 'center' as const,
}
