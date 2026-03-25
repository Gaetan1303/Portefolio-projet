import { NextResponse } from 'next/server';

type LiveState = 'live' | 'starting' | 'offline';

type ServiceTarget = {
  key: 'cafeterie' | 'cafeterie-back' | 'aether-engine' | 'mmo-rpg';
  url: string | null;
};

function normalizeEnvUrl(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

const targets: ServiceTarget[] = [
  {
    key: 'cafeterie',
    url: normalizeEnvUrl(process.env.DEMO_CAFETERIE_URL) ?? normalizeEnvUrl(process.env.NEXT_PUBLIC_DEMO_CAFETERIE_URL)
  },
  {
    key: 'cafeterie-back',
    url: normalizeEnvUrl(process.env.DEMO_CAFETERIE_BACK_URL) ?? normalizeEnvUrl(process.env.NEXT_PUBLIC_DEMO_CAFETERIE_BACK_URL)
  },
  {
    key: 'aether-engine',
    url: normalizeEnvUrl(process.env.DEMO_AETHER_ENGINE_URL) ?? normalizeEnvUrl(process.env.NEXT_PUBLIC_DEMO_AETHER_ENGINE_URL)
  },
  {
    key: 'mmo-rpg',
    url: normalizeEnvUrl(process.env.DEMO_MMO_RPG_URL) ?? normalizeEnvUrl(process.env.NEXT_PUBLIC_DEMO_MMO_RPG_URL)
  }
];

async function checkTarget(url: string | null): Promise<{ state: LiveState; latencyMs: number | null; reachableUrl: string | null }> {
  if (!url) {
    return {
      state: 'offline',
      latencyMs: null,
      reachableUrl: null
    };
  }

  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'user-agent': 'portfolio-live-check/1.0'
      }
    });

    const latencyMs = Date.now() - startedAt;

    if (response.ok) {
      return {
        state: latencyMs > 3500 ? 'starting' : 'live',
        latencyMs,
        reachableUrl: url
      };
    }

    if (response.status >= 500) {
      return {
        state: 'starting',
        latencyMs,
        reachableUrl: url
      };
    }

    return {
      state: 'offline',
      latencyMs,
      reachableUrl: url
    };
  } catch {
    return {
      state: 'offline',
      latencyMs: null,
      reachableUrl: url
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const checkedAt = new Date().toISOString();

  const entries = await Promise.all(
    targets.map(async (target) => {
      const result = await checkTarget(target.url);
      return [
        target.key,
        {
          ...result,
          checkedAt
        }
      ] as const;
    })
  );

  return NextResponse.json(
    {
      services: Object.fromEntries(entries)
    },
    {
      headers: {
        'cache-control': 'no-store'
      }
    }
  );
}
