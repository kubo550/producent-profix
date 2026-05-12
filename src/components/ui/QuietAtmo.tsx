/**
 * Marker component that triggers a CSS rule (`body:has(.atmo-quiet)::before`)
 * dimming the body atmospheric gradient on detail / content pages.
 * Render once at the top of any page that should have a calmer feel.
 */
export function QuietAtmo() {
  return <span className="atmo-quiet sr-only" aria-hidden />;
}
