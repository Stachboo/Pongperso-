'use client';

import React from 'react';

/* ══════════════════════════════════════════════════════════════════════════════
   WMC — LOGO COMPOSANT SVG
   World Music Contest — Jamaican Riddim Database
   ══════════════════════════════════════════════════════════════════════════════ */

interface LogoProps {
  /** Taille de base en px — scale proportionnel via viewBox (défaut 120) */
  size?: number;
  /** full = cercle + texte · icon = cercle seul · horizontal = cercle + texte en ligne */
  variant?: 'full' | 'icon' | 'horizontal';
  /** Active les animations : rotation anneau + pulsation cercle */
  animated?: boolean;
  /** Classe CSS externe optionnelle */
  className?: string;
}

/* ── Palette ── */
const C = {
  bg:        '#0A0A0A',
  gold:      '#F5A623',
  goldLight: '#FFD166',
  goldDark:  '#C17D0A',
  green:     '#1DB954',
  red:       '#E63946',
  white:     '#FFFFFF',
} as const;

/* ── Couleurs des 8 triangles orbitaux ── */
const TRI_FILLS = [
  C.red, C.gold, C.green, C.red,
  C.gold, C.green, C.red, C.gold,
] as const;

/* ── ViewBox par variant ── */
const VIEWBOXES: Record<NonNullable<LogoProps['variant']>, string> = {
  full:       '0 0 120 150',
  icon:       '0 0 90 90',
  horizontal: '0 0 220 60',
};

/* ── Ratio hauteur/largeur par variant ── */
const RATIOS: Record<NonNullable<LogoProps['variant']>, number> = {
  full:       150 / 120,
  icon:       1,
  horizontal: 60 / 220,
};


/* ═══════════════════════════════════════════════════════════════════════════
   Utilitaire — points d'un triangle équilatéral
   ═══════════════════════════════════════════════════════════════════════════ */

function triPoints(size: number, rotation: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 3; i++) {
    const a = rotation + (i * 2 * Math.PI) / 3;
    pts.push(
      `${(size * Math.cos(a)).toFixed(1)},${(size * Math.sin(a)).toFixed(1)}`
    );
  }
  return pts.join(' ');
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Logo({
  size = 120,
  variant = 'full',
  animated = false,
  className,
}: LogoProps) {
  const viewBox = VIEWBOXES[variant];
  const uid = `wmc-${variant}`;
  const gradId = `${uid}-grad`;

  /* ── Defs : dégradé + animations ── */
  const defs = (
    <defs>
      {/* Dégradé radial or pour le cercle central */}
      <radialGradient id={gradId} cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor={C.goldLight} />
        <stop offset="100%" stopColor={C.goldDark} />
      </radialGradient>

      {animated && (
        <style>{`
          .${uid}-ring {
            animation: ${uid}-spin 20s linear infinite;
            transform-origin: center;
            transform-box: fill-box;
          }
          .${uid}-pulse {
            animation: ${uid}-pulse 3s ease-in-out infinite;
            transform-origin: center;
            transform-box: fill-box;
          }
          @keyframes ${uid}-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes ${uid}-pulse {
            0%, 100% { transform: scale(1); }
            50%      { transform: scale(1.03); }
          }
        `}</style>
      )}
    </defs>
  );

  /* ── Emblème circulaire (cercle + anneau + note + triangles) ── */
  const emblem = (cx: number, cy: number, scale: number = 1) => {
    const orbitR = 46;
    const triSize = 5;

    return (
      <g transform={`translate(${cx},${cy})${scale !== 1 ? ` scale(${scale})` : ''}`}>

        {/* ── Anneau extérieur vert ── */}
        <circle
          r={42}
          fill="none"
          stroke={C.green}
          strokeWidth={2}
          className={animated ? `${uid}-ring` : undefined}
        />

        {/* ── Cercle principal dégradé or ── */}
        <circle
          r={38}
          fill={`url(#${gradId})`}
          className={animated ? `${uid}-pulse` : undefined}
        />

        {/* ── Note de musique ♫ (double croche) ── */}
        <g fill={C.bg}>
          {/* Tête de note gauche */}
          <ellipse cx={-7} cy={8} rx={5.5} ry={3.5} transform="rotate(-30,-7,8)" />
          {/* Tête de note droite */}
          <ellipse cx={5} cy={5} rx={5.5} ry={3.5} transform="rotate(-30,5,5)" />
          {/* Hampe gauche */}
          <rect x={-3} y={-12} width={2} height={21} rx={0.5} />
          {/* Hampe droite */}
          <rect x={9} y={-15} width={2} height={21} rx={0.5} />
          {/* Ligature supérieure */}
          <polygon points="-3,-12 11,-15 11,-12 -3,-9" />
          {/* Ligature inférieure */}
          <polygon points="-3,-7 11,-10 11,-7 -3,-4" />
        </g>

        {/* ── 8 triangles géométriques en orbite ── */}
        {TRI_FILLS.map((color, i) => {
          const angle = (i * Math.PI) / 4;
          const tx = orbitR * Math.cos(angle);
          const ty = -orbitR * Math.sin(angle);
          const rot = angle + Math.PI / 6;
          return (
            <polygon
              key={i}
              points={triPoints(triSize, rot)}
              fill={color}
              transform={`translate(${tx.toFixed(1)},${ty.toFixed(1)})`}
            />
          );
        })}
      </g>
    );
  };

  /* ── Brush stroke décoratif (trait de pinceau irrégulier) ── */
  const brushStroke = (x: number, y: number, w: number) => (
    <path
      d={`M${x},${y} C${x + w * 0.12},${y - 2.5} ${x + w * 0.3},${y + 2.5} ${x + w * 0.48},${y - 0.5} C${x + w * 0.62},${y - 3} ${x + w * 0.82},${y + 2} ${x + w},${y - 1}`}
      fill="none"
      stroke={C.gold}
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.8}
    />
  );


  /* ═══════════════════════════════════════════════════════════════════════════
     VARIANT : FULL — Cercle + texte complet vertical
     ═══════════════════════════════════════════════════════════════════════════ */

  if (variant === 'full') {
    return (
      <svg
        width={size}
        height={size * RATIOS.full}
        viewBox={viewBox}
        role="img"
        aria-label="WMC World Music Contest"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {defs}

        {/* Emblème centré en haut */}
        {emblem(60, 50)}

        {/* ── Texte "WMC" — Bebas Neue ── */}
        <text
          x={60}
          y={112}
          textAnchor="middle"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={28}
          letterSpacing="0.15em"
          fill={C.white}
        >
          WMC
        </text>

        {/* ── Texte "World Music Contest" — Dancing Script ── */}
        <text
          x={60}
          y={130}
          textAnchor="middle"
          fontFamily="'Dancing Script', cursive"
          fontWeight={700}
          fontSize={13}
          fill={C.gold}
        >
          World Music Contest
        </text>

        {/* ── Brush stroke sous le texte script ── */}
        {brushStroke(22, 136, 76)}
      </svg>
    );
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     VARIANT : ICON — Cercle seul, sans texte
     ═══════════════════════════════════════════════════════════════════════════ */

  if (variant === 'icon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        role="img"
        aria-label="WMC World Music Contest"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {defs}

        {/* Emblème centré */}
        {emblem(45, 45)}
      </svg>
    );
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     VARIANT : HORIZONTAL — Cercle à gauche + texte à droite
     ═══════════════════════════════════════════════════════════════════════════ */

  return (
    <svg
      width={size}
      height={size * RATIOS.horizontal}
      viewBox={viewBox}
      role="img"
      aria-label="WMC World Music Contest"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs}

      {/* Emblème réduit à gauche */}
      {emblem(34, 30, 0.56)}

      {/* ── "WMC" à droite — Bebas Neue ── */}
      <text
        x={72}
        y={26}
        fontFamily="'Bebas Neue', sans-serif"
        fontSize={24}
        letterSpacing="0.15em"
        fill={C.white}
        dominantBaseline="central"
      >
        WMC
      </text>

      {/* ── "World Music Contest" — Dancing Script ── */}
      <text
        x={72}
        y={44}
        fontFamily="'Dancing Script', cursive"
        fontWeight={700}
        fontSize={11}
        fill={C.gold}
      >
        World Music Contest
      </text>

      {/* ── Brush stroke ── */}
      {brushStroke(72, 51, 62)}
    </svg>
  );
}
