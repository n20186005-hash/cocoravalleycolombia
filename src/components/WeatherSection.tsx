'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site-config';

type Current = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  uv_index: number;
};

type Daily = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: (number | null)[];
  uv_index_max: number[];
  wind_speed_10m_max: number[];
};

type WeatherData = { current: Current; daily: Daily };

type Cond = { emoji: string; key: string };

/** 天气码 -> 展示用分类（页面只显示翻译后的词语） */
function conditionOf(code: number): Cond {
  if (code === 0) return { emoji: '☀️', key: 'clear' };
  if (code === 1 || code === 2) return { emoji: '🌤️', key: 'partly' };
  if (code === 3) return { emoji: '☁️', key: 'cloudy' };
  if (code === 45 || code === 48) return { emoji: '🌫️', key: 'fog' };
  if (code >= 51 && code <= 57) return { emoji: '🌦️', key: 'drizzle' };
  if (code >= 61 && code <= 67) return { emoji: '🌧️', key: 'rain' };
  if (code >= 71 && code <= 77) return { emoji: '🌨️', key: 'snow' };
  if (code >= 80 && code <= 82) return { emoji: '🌧️', key: 'showers' };
  if (code >= 85 && code <= 86) return { emoji: '🌨️', key: 'snow' };
  if (code >= 95) return { emoji: '⛈️', key: 'thunderstorm' };
  return { emoji: '🌥️', key: 'partly' };
}

type AdviceTip = { risk?: string[]; wear?: string; plan?: string; pack?: string[] };

function isRainy(code: number) {
  return (code >= 51 && code <= 57) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82);
}

function isHeavy(code: number) {
  return code === 65 || code === 82;
}

function isModerate(code: number) {
  return code === 63 || code === 81;
}

/** 天气码 -> 今日建议规则 key */
function tipKeyOf(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 61) return 'lightRain';
  if (isModerate(code)) return 'moderateRain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95) return 'stormRisk';
  return 'partly';
}

function uvLevelOf(uv: number): string {
  if (uv < 3) return 'low';
  if (uv < 6) return 'moderate';
  if (uv < 8) return 'high';
  if (uv < 11) return 'veryHigh';
  return 'extreme';
}

type Advice = { wear: string[]; plan: string[]; pack: string[]; risk: string[] };

/**
 * 把天气数据翻译成游客能直接执行的建议。
 * 只输出「满足条件」的条目，不满足的类别返回空数组，界面不渲染。
 */
function buildAdvice(now: Current, daily: Daily, smart: Record<string, AdviceTip>): Advice {
  const wear: string[] = [];
  const plan: string[] = [];
  const pack: string[] = [];
  const risk: string[] = [];
  const seen = new Set<string>();

  const push = (arr: string[], item?: string) => {
    if (!item) return;
    if (seen.has(item)) return;
    seen.add(item);
    arr.push(item);
  };
  const useTip = (key: string) => {
    const tip = smart[key];
    if (!tip) return;
    (tip.risk ?? []).forEach((r) => push(risk, r));
    push(wear, tip.wear);
    push(plan, tip.plan);
    (tip.pack ?? []).forEach((p) => push(pack, p));
  };

  const codeNow = now.weather_code;
  const codeToday = daily.weather_code[0];
  const tMax = daily.temperature_2m_max[0];
  const tMin = daily.temperature_2m_min[0];
  const probToday = daily.precipitation_probability_max?.[0] ?? 0;
  const uvToday = Math.max(now.uv_index ?? 0, daily.uv_index_max?.[0] ?? 0);
  const windToday = Math.max(now.wind_speed_10m, daily.wind_speed_10m_max?.[0] ?? 0);

  const stormNow = codeNow >= 95;
  const heavyNow = isHeavy(codeNow);

  // —— 高风险优先级最高：雷暴 > 强降雨 > 降雪 > 常规天气 ——
  if (stormNow) {
    useTip('stormRisk');
  } else if (heavyNow) {
    useTip('heavyRainRisk');
  } else if (isRainy(codeNow) || isRainy(codeToday)) {
    // 正在下雨（以当前实测优先）
    if (isHeavy(codeToday) || isHeavy(codeNow)) useTip('heavyRainRisk');
    else if (isModerate(codeToday) || isModerate(codeNow)) useTip('moderateRain');
    else useTip('lightRain');
  } else {
    const mainKey = tipKeyOf(codeToday);
    useTip(mainKey); // clear / partly / cloudy / fog / snow / stormRisk
  }

  const rainingNow = isRainy(codeNow) || codeNow >= 95;
  const hasRisk = risk.length > 0;

  // —— 概率性降雨：只在没有明确风险且当前没在下雨时提示 ——
  if (!hasRisk && probToday >= 60 && !rainingNow) {
    useTip('rainChance');
  }

  // —— 大风 ——
  if (!hasRisk) {
    if (windToday >= 50) useTip('strongWindRisk');
    else if (windToday >= 29) useTip('moderateWind');
  }

  // —— 紫外线（下雨天与已出现风险时不重复提醒防晒） ——
  if (!rainingNow && risk.length === 0) {
    if (uvToday >= 8) useTip('uvHigh');
    else if (uvToday >= 5) useTip('uvModerate');
  }

  // —— 温度感受 ——
  if (!hasRisk && tMax >= 32) useTip('hot');
  if (!hasRisk && tMax <= 10) useTip('cold');
  if (!hasRisk && tMax - tMin > 8) useTip('bigTempDiff');

  return { wear, plan, pack, risk };
}

function buildUrl() {
  const base = 'https://api.open-meteo.com/v1/forecast';
  const params = new URLSearchParams({
    latitude: String(SITE.latitude),
    longitude: String(SITE.longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,uv_index',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max',
    timezone: 'America/Bogota',
    forecast_days: '7',
  });
  return `${base}?${params.toString()}`;
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [data, setData] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(buildUrl());
      if (!res.ok) throw new Error('bad response');
      const json = (await res.json()) as WeatherData;
      setData(json);
      setFailed(false);
      setUpdatedAt(new Date());
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 30 * 60 * 1000); // 每 30 分钟自动刷新
    return () => window.clearInterval(timer);
  }, [load]);

  const now = data?.current;
  const daily = data?.daily;
  const smart = (t.raw('smart.tips') as unknown) as Record<string, AdviceTip>;
  const advice = now && daily ? buildAdvice(now, daily, smart) : null;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {failed && !data && (
          <p className="text-sm rounded-xl p-5" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
            {t('unavailable')}
          </p>
        )}

        {!now && !failed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse" aria-hidden="true">
            <div className="rounded-xl h-64" style={{ background: 'var(--bg-tertiary)' }} />
            <div className="rounded-xl h-64" style={{ background: 'var(--bg-tertiary)' }} />
            <div className="rounded-xl h-36 md:col-span-2" style={{ background: 'var(--bg-tertiary)' }} />
          </div>
        )}

        {now && daily && advice && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6 mb-6">
            {/* ============ 当前天气卡片 ============ */}
            <div
              className="rounded-xl p-6 sm:p-8 xl:col-span-3"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-6xl leading-none" aria-hidden="true">
                    {conditionOf(now.weather_code).emoji}
                  </span>
                  <div>
                    <p className="text-5xl font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(now.temperature_2m)}°
                    </p>
                    <p className="text-sm mt-1 font-medium" style={{ color: 'var(--accent)' }}>
                      {t(`conds.${conditionOf(now.weather_code).key}` as any)}
                    </p>
                  </div>
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <p>
                    {t('feelsLike')}: {Math.round(now.apparent_temperature)}°C
                  </p>
                  <p>
                    {t('humidity')}: {now.relative_humidity_2m}%
                  </p>
                </div>
              </div>

              <div
                className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl text-center"
                style={{ background: 'var(--border-color)' }}
              >
                <div className="py-3 px-1" style={{ background: 'var(--bg-tertiary)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{t('wind')}</p>
                  <p className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(now.wind_speed_10m)} km/h
                  </p>
                </div>
                <div className="py-3 px-1" style={{ background: 'var(--bg-tertiary)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{t('uvLabel')}</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t(`uvLevels.${uvLevelOf(now.uv_index)}` as any)}
                  </p>
                </div>
                <div className="py-3 px-1" style={{ background: 'var(--bg-tertiary)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{t('precipChance')}</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    {daily.precipitation_probability_max?.[0] == null ? '–' : `${daily.precipitation_probability_max[0]}%`}
                  </p>
                </div>
              </div>

              {updatedAt && (
                <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                  {t('updatedLabel')}: {updatedAt.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>

            {/* ============ 智能建议卡片 ============ */}
            <div
              className="rounded-xl p-6 sm:p-7 xl:col-span-2"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {t('smart.title')}
              </h3>

              {advice.risk.length > 0 && (
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{ background: 'rgba(225, 29, 72, 0.10)', border: '1px solid rgba(225, 29, 72, 0.45)' }}
                >
                  <p className="text-sm font-bold mb-2" style={{ color: '#f43f5e' }}>
                    ⚠️ {t('smart.riskLabel')}
                  </p>
                  <ul className="space-y-1.5">
                    {advice.risk.map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: '#f43f5e' }} aria-hidden="true" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {advice.wear.length > 0 && (
                <AdviceGroup label={t('smart.wearLabel')}>
                  {advice.wear.map((w, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden="true" />
                      <span>{w}</span>
                    </li>
                  ))}
                </AdviceGroup>
              )}

              {advice.plan.length > 0 && (
                <AdviceGroup label={t('smart.planLabel')}>
                  {advice.plan.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </AdviceGroup>
              )}

              {advice.pack.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    🎒 {t('smart.packLabel')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {advice.pack.map((p, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ 未来 7 天 ============ */}
        {daily && (
          <div className="rounded-xl p-5 sm:p-6 mb-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('nextDaysTitle')}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
              {daily.time.map((day, i) => {
                const code = daily.weather_code[i];
                const cond = conditionOf(code);
                const p = daily.precipitation_probability_max?.[i];
                const date = new Date(`${day}T12:00:00`);
                const dateLabel = date.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
                return (
                  <div
                    key={day}
                    className="flex flex-col items-center text-center gap-1 rounded-xl p-3 sm:p-4 w-24 sm:w-28 shrink-0"
                    style={{
                      border: `1px solid ${i === 0 ? 'var(--accent)' : 'var(--border-color)'}`,
                      background: i === 0 ? 'rgba(128, 128, 128, 0.06)' : 'transparent',
                    }}
                    aria-label={t(`conds.${cond.key}` as any)}
                  >
                    <span className="text-xs font-medium truncate w-full" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {i === 0 ? t('todayLabel') : dateLabel}
                    </span>
                    <span className="text-2xl sm:text-3xl my-1" title={t(`conds.${cond.key}` as any)} aria-hidden="true">
                      {cond.emoji}
                    </span>
                    <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(daily.temperature_2m_max[i])}°{' '}
                      <span style={{ color: 'var(--text-muted)' }}>{Math.round(daily.temperature_2m_min[i])}°</span>
                    </span>
                    {p != null && (
                      <span className="text-xs whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                        💧 {p}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {daily && (
          <p
            className="rounded-xl p-4 sm:p-5 text-sm leading-relaxed flex items-start gap-3"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
          >
            <span aria-hidden="true">💡</span>
            <span>{t('tip')}</span>
          </p>
        )}
      </div>
    </section>
  );
}

function AdviceGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-4">
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}
