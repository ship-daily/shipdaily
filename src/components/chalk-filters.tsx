// SVG filters referenced from CSS (.chalk, .chalk-rough) to give text and doodles a chalk edge.
export function ChalkFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="chalk" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="8" result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.1 0 0 0 1.55" result="mask" />
        <feComposite in="displaced" in2="mask" operator="in" />
      </filter>
      <filter id="chalk-soft" x="-2%" y="-10%" width="104%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="6" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="1" seed="9" result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.8 0 0 0 1.4" result="mask" />
        <feComposite in="displaced" in2="mask" operator="in" />
      </filter>
      <filter id="chalk-rough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="2" result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.8 0 0 0 1.85" result="mask" />
        <feComposite in="displaced" in2="mask" operator="in" />
      </filter>
    </svg>
  );
}
