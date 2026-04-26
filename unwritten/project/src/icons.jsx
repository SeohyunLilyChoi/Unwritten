// Icons — thin line, 1.6 stroke
const Ico = {
  Send: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12 L20 5 L13 20 L11 13 Z"/>
    </svg>
  ),
  Chevron: ({s=18, dir="down", c="currentColor"}) => {
    const rot = {down:0, up:180, right:-90, left:90}[dir];
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transform:`rotate(${rot}deg)`, transition:'transform .2s'}}>
        <path d="M6 9 L12 15 L18 9"/>
      </svg>
    );
  },
  Thumb: ({s=18, c="currentColor", down=false}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{transform: down? 'rotate(180deg)' : 'none'}}>
      <path d="M7 10v10H4V10h3zm0 0l4-7c1.5 0 2.5 1 2.5 2.5V9h5.5a2 2 0 0 1 2 2.3l-1.3 7a2 2 0 0 1-2 1.7H7"/>
    </svg>
  ),
  Plus: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
  ),
  Close: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
  ),
  Chat: ({s=22, c="currentColor", fill=false}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:'none'} stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6z"/>
    </svg>
  ),
  Grid: ({s=22, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="7" height="7" rx="1.5"/>
      <rect x="13" y="4" width="7" height="7" rx="1.5"/>
      <rect x="4" y="13" width="7" height="7" rx="1.5"/>
      <rect x="13" y="13" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  People: ({s=22, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3"/>
      <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/>
      <circle cx="17" cy="9" r="2.5"/>
      <path d="M15 15c3 0 6 1.5 6 5"/>
    </svg>
  ),
  User: ({s=22, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5"/>
      <path d="M4.5 20c0-4 3.5-6 7.5-6s7.5 2 7.5 6"/>
    </svg>
  ),
  Arrow: ({s=16, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  Bookmark: ({s=16, c="currentColor", fill=false}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill?c:'none'} stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12v17l-6-4-6 4V4z"/>
    </svg>
  ),
  Heart: ({s=14, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>
    </svg>
  ),
  Comment: ({s=14, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6z"/>
    </svg>
  ),
  Sparkle: ({s=14, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>
    </svg>
  ),
  Dot: ({s=8, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill={c}/></svg>
  ),
  Clock: ({s=14, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
};

window.Ico = Ico;
