export const withNgrokBypass = (url?: string) => {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (u.hostname.endsWith('ngrok-free.dev')) {
      u.searchParams.set('ngrok-skip-browser-warning', 'true');
      // optional: tránh cache cũ
      u.searchParams.set('v', String(Date.now()));
    }
    return u.toString();
  } catch {
    return url;
  }
};
