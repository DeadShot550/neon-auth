import{j as d}from"./index-1EgGcOm-.js";import{a as p}from"./vendor-icons-nj5F7-Aq.js";import{R as oe,T as te,g as ne,M as ae}from"./vendor-3d-canvas-Cp2KLNWz.js";const g=f=>{const a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);return a?[parseInt(a[1],16)/255,parseInt(a[2],16)/255,parseInt(a[3],16)/255]:[1,1,1]},re={center:0,left:1,right:2},ie=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ue=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uThreadCount;
uniform float uFrequency;
uniform float uSpread;
uniform float uTaper;
uniform float uPosition;
uniform float uFanMode;
uniform float uGlow;
uniform float uFalloff;
uniform float uThickness;
uniform float uBrightness;
uniform float uOpacity;
uniform float uMirror;
uniform float uShimmer;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uEnableMouse;
uniform float uMouseActive;
out vec4 fragColor;

#define TAU 6.28318530718
#define MAX_THREADS 10

float glow(float x, float str, float dist) {
  return dist / pow(max(x, 1e-4), str);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float n = max(uThreadCount, 1.0);

  float pinchX = uFanMode < 0.5 ? 0.5 : (uFanMode < 1.5 ? 0.0 : 1.0);
  if (uEnableMouse > 0.5) {
    pinchX = mix(pinchX, uMouse.x, clamp(uMouseStrength, 0.0, 1.0) * uMouseActive);
  }

  float spreadDx = uSpread * abs(uv.x - pinchX);
  float baseT = iTime * uSpeed;
  float tauOverN = TAU / n;
  float mirror = uMirror > 0.5 ? sign(pinchX - uv.x) : 1.0;
  bool doShimmer = uShimmer > 0.5;
  float shimmerT = iTime * 1.7;
  float invThickness = 1.0 / max(uThickness, 0.01);
  float xFreq = uv.x * uFrequency;
  float yOff = uv.y - uPosition;
  float ciScale = n > 1.0 ? 1.0 / (n - 1.0) : 0.0;

  vec3 col = vec3(0.0);
  float gsum = 0.0;

  for (int idx = 0; idx < MAX_THREADS; idx++) {
    float i = float(idx);
    if (i >= n) break;

    float amplitude = spreadDx * (1.0 + i * uTaper);
    float shimmer = doShimmer ? sin(shimmerT + i * 1.3) * 0.35 : 0.0;
    float phase = (baseT + i * tauOverN) * mirror + shimmer;

    float sdf = abs(yOff + sin(xFreq + phase) * amplitude) * invThickness;

    float g = glow(sdf, uFalloff, uGlow);
    float ci = i * ciScale;
    vec3 threadCol = mix(uColor1, uColor2, ci);

    col += g * threadCol;
    gsum += g;
  }

  float coreAmt = smoothstep(0.5, 2.2, gsum);
  col = mix(col, uColor3 * gsum, coreAmt * 0.5);

  float bright = uBrightness;
  if (uEnableMouse > 0.5) {
    vec2 md = uv - uMouse;
    float d2 = dot(md, md);
    bright += clamp(uMouseStrength, 0.0, 1.0) * uMouseActive * exp(-d2 * 6.0) * 0.6;
  }
  col *= bright;

  float alpha = clamp(gsum, 0.0, 1.0) * uOpacity;

  vec3 outRgb = col * alpha;

  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    alpha = clamp(alpha + gv, 0.0, 1.0);
  }

  fragColor = vec4(outRgb, alpha);
}
`,se=new WeakMap,me=({color1:f="#38bdf8",color2:a="#c084fc",color3:w="#ffffff",speed:b=.22,threadCount:M=6,frequency:x=4.5,spread:y=.22,taper:T=1,position:C=.5,fanMode:A="center",glow:F=.03,falloff:S=.55,thickness:E=1.2,brightness:R=.7,opacity:L=.85,mirror:G=!0,shimmer:O=!1,grain:k=!1,grainIntensity:N=.01,mouseInteraction:l=!0,mouseStrength:B=.3,className:J=""})=>{const W=p.useRef(null),[K,X]=p.useState(!1);return p.useEffect(()=>{const Q=typeof navigator<"u"&&navigator.hardwareConcurrency&&navigator.hardwareConcurrency<6,P=typeof window<"u"&&(window.innerWidth<768||window.matchMedia("(pointer: coarse)").matches||!!Q);if(X(P),P)return;const i=W.current;if(!i)return;let u,o;try{if(u=new oe({webgl:2,alpha:!0,premultipliedAlpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,1.5)}),o=u.gl,!o)throw new Error("WebGL not supported")}catch(e){console.warn("WebThreads WebGL Init failed, falling back to CSS:",e),X(!0);return}o.clearColor(0,0,0,0);const t=o.canvas;t.style.width="100%",t.style.height="100%",t.style.display="block",i.appendChild(t);const Z=new te(o),r=new ne(o,{vertex:ie,fragment:ue,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uSpeed:{value:b},uThreadCount:{value:M},uFrequency:{value:x},uSpread:{value:y},uTaper:{value:T},uPosition:{value:C},uFanMode:{value:re[A]||0},uGlow:{value:F},uFalloff:{value:S},uThickness:{value:E},uBrightness:{value:R},uOpacity:{value:L},uMirror:{value:G?1:0},uShimmer:{value:O?1:0},uGrain:{value:k?1:0},uGrainIntensity:{value:N},uColor1:{value:new Float32Array(g(f))},uColor2:{value:new Float32Array(g(a))},uColor3:{value:new Float32Array(g(w))},uMouse:{value:new Float32Array([.5,.5])},uMouseStrength:{value:B},uEnableMouse:{value:l?1:0},uMouseActive:{value:0}}}),v=new ae(o,{geometry:Z,program:r});se.set(i,{renderer:u,program:r,mesh:v});const j=()=>{const e=i.getBoundingClientRect(),n=Math.max(1,Math.floor(e.width)),s=Math.max(1,Math.floor(e.height));u.setSize(n,s);const Y=r.uniforms.iResolution.value;Y[0]=o.drawingBufferWidth,Y[1]=o.drawingBufferHeight,u.render({scene:v})},q=new ResizeObserver(j);q.observe(i),j();const c=[.5,.5];let m=0;const _=e=>{const n=t.getBoundingClientRect();c[0]=(e.clientX-n.left)/n.width,c[1]=1-(e.clientY-n.top)/n.height,m=1},z=()=>{m=1},D=()=>{m=0};l&&(window.addEventListener("mousemove",_,{passive:!0}),window.addEventListener("mouseenter",z),window.addEventListener("mouseleave",D));let h=0,I=!0,H=!document.hidden;const ee=performance.now(),V=new IntersectionObserver(([e])=>{I=e.isIntersecting});V.observe(i);const U=()=>{H=!document.hidden};document.addEventListener("visibilitychange",U);const $=e=>{if(h=requestAnimationFrame($),!I||!H)return;const n=(e-ee)*.001;if(r.uniforms.iTime.value=n,l){const s=r.uniforms.uMouse.value;s[0]+=(c[0]-s[0])*.1,s[1]+=(c[1]-s[1])*.1,r.uniforms.uMouseActive.value+=(m-r.uniforms.uMouseActive.value)*.08}u.render({scene:v})};return h=requestAnimationFrame($),()=>{cancelAnimationFrame(h),q.disconnect(),V.disconnect(),document.removeEventListener("visibilitychange",U),l&&(window.removeEventListener("mousemove",_),window.removeEventListener("mouseenter",z),window.removeEventListener("mouseleave",D)),t&&t.parentNode&&t.parentNode.removeChild(t)}},[f,a,w,b,M,x,y,T,C,A,F,S,E,R,L,G,O,k,N,l,B]),d.jsx("div",{ref:W,className:`web-threads-container ${J}`.trim(),children:K&&d.jsxs("div",{className:"absolute inset-0 pointer-events-none overflow-hidden",children:[d.jsx("div",{className:"absolute top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-br from-cyan-500/15 via-purple-500/10 to-transparent blur-[80px] rounded-full transform translate-z-0"}),d.jsx("div",{className:"absolute bottom-1/4 right-0 w-[80vw] h-[40vh] bg-gradient-to-tl from-purple-500/10 via-cyan-500/5 to-transparent blur-[70px] rounded-full transform translate-z-0"})]})})};export{me as W};
