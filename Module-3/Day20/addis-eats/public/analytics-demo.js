// Stand-in for a third-party analytics tag.
window.__pageviews = (window.__pageviews || 0) + 1;
console.log("[analytics-demo] loaded, pageviews:", window.__pageviews);