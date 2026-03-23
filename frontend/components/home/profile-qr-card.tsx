'use client';

import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

type ProfileQrCardProps = {
  profileUrl: string;
};

export function ProfileQrCard({ profileUrl }: ProfileQrCardProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const downloadableName = useMemo(() => 'gaetan-profil-qr.svg', []);

  const handleDownload = () => {
    const svgElement = svgRef.current;

    if (!svgElement) {
      return;
    }

    const serializer = new XMLSerializer();
    const svgContent = serializer.serializeToString(svgElement);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = downloadableName;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <article className="glass-card flex h-full flex-col p-6" aria-label="Carte profil et QR code">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z" />
            <path d="M8 8h3v3H8zM13 13h3v3h-3zM8 13h3v3H8zM13 8h3v3h-3z" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold">Profil complet + QR code</h3>
      </div>

      <p className="mb-4 text-sm text-base-content/75">
        CV, LinkedIn, GitHub et documentation technique centralisés dans une page unique.
      </p>

      <div className="mb-5 inline-flex rounded-2xl border border-base-content/15 bg-white p-4">
        <QRCodeSVG
          ref={svgRef}
          value={profileUrl}
          size={170}
          bgColor="#ffffff"
          fgColor="#0f172a"
          includeMargin
          level="M"
        />
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <Link href="/profil" className="btn btn-primary btn-sm" aria-label="Voir le profil complet de Gaetan">
          Voir mon profil complet
        </Link>
        <button type="button" onClick={handleDownload} className="btn btn-outline btn-sm" aria-label="Télécharger le QR code du profil">
          Télécharger le QR code
        </button>
      </div>
    </article>
  );
}
