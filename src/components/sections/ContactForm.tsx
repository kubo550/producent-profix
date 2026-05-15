'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/content/site';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? siteConfig.web3formsKey;
    setStatus('sending');
    const data = new FormData(form);
    data.set('access_key', accessKey);
    data.set('subject', `PROFIX - nowe zapytanie z formularza (${data.get('topic') ?? 'inne'})`);
    data.set('from_name', 'profix.pl');

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const json = (await res.json()) as { success?: boolean };
      if (res.ok && json.success) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div
        role="status"
        className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-paper)] p-8 shadow-[var(--shadow-soft-lg)] sm:p-12"
      >
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)]">
          <Send size={22} strokeWidth={1.75} />
        </div>
        <h3
          className="font-display text-3xl font-medium leading-[1.05] sm:text-4xl"
          style={{ fontVariationSettings: '"SOFT" 50, "opsz" 48' }}
        >
          {t('successTitle')}
        </h3>
        <p className="mt-4 text-pretty text-base leading-[1.7] text-fg-muted sm:text-lg">
          {t('successBody')}
        </p>
        <a
          href={`tel:${siteConfig.phone}`}
          className="group mt-6 inline-flex items-center gap-2 text-base font-medium text-[var(--color-accent)] transition-all hover:gap-3"
        >
          <Phone size={18} strokeWidth={1.75} />
          <span className="border-b border-[var(--color-accent)] pb-0.5">
            {t('successUrgent', { phone: siteConfig.phoneDisplay })}
          </span>
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t('name')} required>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t('namePlaceholder')}
            className="h-input"
          />
        </Field>
        <Field id="email" label={t('email')} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t('emailPlaceholder')}
            className="h-input"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label={t('phone')}>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t('phonePlaceholder')}
            className="h-input"
          />
        </Field>
        <Field id="topic" label={t('topic')} required>
          <select id="topic" name="topic" required defaultValue="" className="h-input">
            <option value="" disabled>
              {t('topic')}
            </option>
            <option value="offer">{t('topicOptions.offer')}</option>
            <option value="technical">{t('topicOptions.technical')}</option>
            <option value="distributor">{t('topicOptions.distributor')}</option>
            <option value="other">{t('topicOptions.other')}</option>
          </select>
        </Field>
      </div>

      <Field id="message" label={t('message')} required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t('messagePlaceholder')}
          className="h-input resize-none"
        />
      </Field>

      <label className="flex items-start gap-3 border-t border-[var(--color-border)] pt-5 text-sm text-fg-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 flex-none accent-[var(--color-accent)]"
        />
        <span>
          {t('consent')}{' '}
          <Link
            href="/polityka-prywatnosci"
            className="text-[var(--color-accent)] underline-offset-2 hover:underline"
          >
            {t('consentLink')}
          </Link>
          .
        </span>
      </label>

      {/* Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-4">
        <Button type="submit" disabled={status === 'sending'}>
          <Send size={16} strokeWidth={1.75} />
          {status === 'sending' ? t('sending') : t('submit')}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-red-600" role="status">
            {t('error')}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--color-fg)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--color-accent)]">*</span>}
      </label>
      {children}
    </div>
  );
}
