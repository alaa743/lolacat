export function SteamAnimation() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex items-end justify-center gap-4 pb-1"
    >
      <svg
        width="20"
        height="46"
        viewBox="0 0 20 46"
        fill="none"
        className="text-brand-burgundy/40 animate-steam-1"
      >
        <path
          d="M10 44C4 34 16 24 10 14C6 8 11 3 12 2"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <svg
        width="22"
        height="54"
        viewBox="0 0 22 54"
        fill="none"
        className="text-brand-burgundy/55 animate-steam-2"
      >
        <path
          d="M11 52C17 40 5 28 11 16C15 9 10 3 9 2"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
      <svg
        width="20"
        height="44"
        viewBox="0 0 20 44"
        fill="none"
        className="text-brand-burgundy/40 animate-steam-3"
      >
        <path
          d="M10 42C15 32 5 23 10 13C13 7 9 3 8 2"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
