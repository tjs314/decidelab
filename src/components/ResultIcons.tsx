export function GrowthIcon({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 78 78" fill="none">
      <rect width="78" height="78" rx="8" fill="#1EC33F"/>
      <rect x="8" y="50" width="18" height="20" fill="white"/>
      <rect x="30" y="30" width="18" height="40" fill="white"/>
      <rect x="52" y="8" width="18" height="62" fill="white"/>
    </svg>
  );
}

export function StartupIcon({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 78 78" fill="none">
      <path d="M0 39C0 17.4609 17.4609 0 39 0H67.1478C73.1413 0 78 4.85868 78 10.8522V39C78 60.5391 60.5391 78 39 78C17.4609 78 0 60.5391 0 39Z" fill="#FE4C1B"/>
      <path d="M61 12.7578L64.3643 9.39355L68.6064 13.6367L65.2432 17H70V23H65.2422L68.6064 26.3643L64.3643 30.6064L61 27.2422V32H55V27.2422L51.6357 30.6064L47.3936 26.3643L50.7578 23H46V17H50.7578L47.3936 13.6357L51.6357 9.39355L55 12.7578V8H61V12.7578Z" fill="white"/>
    </svg>
  );
}

export function TransitionIcon({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 78 78" fill="none">
      <clipPath id="ic1"><rect width="78" height="78" rx="8" fill="white"/></clipPath>
      <g clipPath="url(#ic1)">
        <ellipse cx="39" cy="66" rx="39" ry="12" fill="#811EC3"/>
        <ellipse cx="39" cy="48" rx="39" ry="12" fill="#9736D7"/>
        <ellipse cx="39" cy="30" rx="39" ry="12" fill="#811EC3"/>
        <ellipse cx="39" cy="12" rx="39" ry="12" fill="#9736D7"/>
      </g>
    </svg>
  );
}

export function BurnoutIcon({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 78 78" fill="none">
      <clipPath id="ic2"><rect width="78" height="78" rx="8" fill="white"/></clipPath>
      <g clipPath="url(#ic2)">
        <path d="M55 0C67.7026 0 78 10.2975 78 23C78 29.2189 75.5307 34.8602 71.5205 39C75.5307 43.1398 78 48.7811 78 55C78 67.7026 67.7026 78 55 78C48.7811 78 43.1398 75.5307 39 71.5205C34.8602 75.5307 29.2189 78 23 78C10.2975 78 0 67.7026 0 55C0 48.7814 2.46861 43.1398 6.47852 39C2.46861 34.8602 0 29.2186 0 23C0 10.2975 10.2975 0 23 0C29.2186 0 34.8602 2.46861 39 6.47852C43.1398 2.46861 48.7814 0 55 0Z" fill="#F4C506"/>
        <rect x="32.2426" y="28.2426" width="24" height="6" transform="rotate(45 32.2426 28.2426)" fill="white"/>
        <rect x="49.2426" y="32.2426" width="24" height="6" transform="rotate(135 49.2426 32.2426)" fill="white"/>
      </g>
    </svg>
  );
}

export function ExploreIcon({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 78 78" fill="none">
      <clipPath id="ic3"><rect width="78" height="78" rx="8" fill="white"/></clipPath>
      <g clipPath="url(#ic3)">
        <path d="M39 0C60.5391 0 78 17.4609 78 39C78 60.5391 60.5391 78 39 78C17.4609 78 0 60.5391 0 39C0 17.4609 17.4609 0 39 0Z" fill="#BCBECC"/>
        <circle cx="39" cy="17.5714" r="3.57143" fill="white"/>
        <circle cx="60.4286" cy="39" r="3.57143" fill="white"/>
        <circle cx="23.8476" cy="54.1523" r="3.57143" fill="white"/>
        <circle cx="39" cy="60.4285" r="3.57143" fill="white"/>
        <circle cx="17.5715" cy="39" r="3.57143" fill="white"/>
        <circle cx="54.1524" cy="23.8479" r="3.57143" fill="white"/>
        <circle cx="23.8477" cy="23.8476" r="3.57143" fill="white"/>
        <circle cx="54.1521" cy="54.1524" r="3.57143" fill="white"/>
      </g>
    </svg>
  );
}

export function getIconSvgString(key: string, size = 100): string {
  const icons: Record<string, string> = {
    growth: `<svg width="${size}" height="${size}" viewBox="0 0 78 78" fill="none"><rect width="78" height="78" rx="8" fill="#1EC33F"/><rect x="8" y="50" width="18" height="20" fill="white"/><rect x="30" y="30" width="18" height="40" fill="white"/><rect x="52" y="8" width="18" height="62" fill="white"/></svg>`,
    startup: `<svg width="${size}" height="${size}" viewBox="0 0 78 78" fill="none"><path d="M0 39C0 17.4609 17.4609 0 39 0H67.1478C73.1413 0 78 4.85868 78 10.8522V39C78 60.5391 60.5391 78 39 78C17.4609 78 0 60.5391 0 39Z" fill="#FE4C1B"/><path d="M61 12.7578L64.3643 9.39355L68.6064 13.6367L65.2432 17H70V23H65.2422L68.6064 26.3643L64.3643 30.6064L61 27.2422V32H55V27.2422L51.6357 30.6064L47.3936 26.3643L50.7578 23H46V17H50.7578L47.3936 13.6357L51.6357 9.39355L55 12.7578V8H61V12.7578Z" fill="white"/></svg>`,
    transition: `<svg width="${size}" height="${size}" viewBox="0 0 78 78" fill="none"><clipPath id="ic1"><rect width="78" height="78" rx="8" fill="white"/></clipPath><g clip-path="url(#ic1)"><ellipse cx="39" cy="66" rx="39" ry="12" fill="#811EC3"/><ellipse cx="39" cy="48" rx="39" ry="12" fill="#9736D7"/><ellipse cx="39" cy="30" rx="39" ry="12" fill="#811EC3"/><ellipse cx="39" cy="12" rx="39" ry="12" fill="#9736D7"/></g></svg>`,
    burnout: `<svg width="${size}" height="${size}" viewBox="0 0 78 78" fill="none"><clipPath id="ic2"><rect width="78" height="78" rx="8" fill="white"/></clipPath><g clip-path="url(#ic2)"><path d="M55 0C67.7026 0 78 10.2975 78 23C78 29.2189 75.5307 34.8602 71.5205 39C75.5307 43.1398 78 48.7811 78 55C78 67.7026 67.7026 78 55 78C48.7811 78 43.1398 75.5307 39 71.5205C34.8602 75.5307 29.2189 78 23 78C10.2975 78 0 67.7026 0 55C0 48.7814 2.46861 43.1398 6.47852 39C2.46861 34.8602 0 29.2186 0 23C0 10.2975 10.2975 0 23 0C29.2186 0 34.8602 2.46861 39 6.47852C43.1398 2.46861 48.7814 0 55 0Z" fill="#F4C506"/><rect x="32.2426" y="28.2426" width="24" height="6" transform="rotate(45 32.2426 28.2426)" fill="white"/><rect x="49.2426" y="32.2426" width="24" height="6" transform="rotate(135 49.2426 32.2426)" fill="white"/></g></svg>`,
    explore: `<svg width="${size}" height="${size}" viewBox="0 0 78 78" fill="none"><clipPath id="ic3"><rect width="78" height="78" rx="8" fill="white"/></clipPath><g clip-path="url(#ic3)"><path d="M39 0C60.5391 0 78 17.4609 78 39C78 60.5391 60.5391 78 39 78C17.4609 78 0 60.5391 0 39C0 17.4609 17.4609 0 39 0Z" fill="#BCBECC"/><circle cx="39" cy="17.5714" r="3.57143" fill="white"/><circle cx="60.4286" cy="39" r="3.57143" fill="white"/><circle cx="23.8476" cy="54.1523" r="3.57143" fill="white"/><circle cx="39" cy="60.4285" r="3.57143" fill="white"/><circle cx="17.5715" cy="39" r="3.57143" fill="white"/><circle cx="54.1524" cy="23.8479" r="3.57143" fill="white"/><circle cx="23.8477" cy="23.8476" r="3.57143" fill="white"/><circle cx="54.1521" cy="54.1524" r="3.57143" fill="white"/></g></svg>`,
  };
  return icons[key] || '';
}

export function getIconByKey(key: string, size = 100) {
  switch (key) {
    case 'growth': return <GrowthIcon size={size} />;
    case 'startup': return <StartupIcon size={size} />;
    case 'transition': return <TransitionIcon size={size} />;
    case 'burnout': return <BurnoutIcon size={size} />;
    case 'explore': return <ExploreIcon size={size} />;
    default: return null;
  }
}
