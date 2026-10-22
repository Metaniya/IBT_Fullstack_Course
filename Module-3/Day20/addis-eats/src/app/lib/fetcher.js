// One fetcher for every query. It throws on non-OK responses so SWR's `error` is set.
export async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`);
    err.status = res.status;
    try {
      err.info = await res.json();
    } catch {}
    throw err;
  }
  return res.json();
}