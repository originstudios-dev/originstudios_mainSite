varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;
uniform float uOpacity;

void main() {
  // Fresnel effect — bright edges
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);

  // Internal glow — white core
  float core = smoothstep(0.8, 0.0, length(vUv - 0.5));

  // Mouse influence — energy shifts toward cursor
  vec2 mouseOffset = uMouse * 0.5;
  float mouseGlow = smoothstep(1.5, 0.0, length(vUv - 0.5 - mouseOffset));

  // Combine: fresnel edges + core glow + mouse interaction
  float intensity = fresnel * 0.6 + core * 0.3 + mouseGlow * 0.15;

  // Subtle caustic shimmer
  float caustic = sin(vUv.x * 20.0 + uTime) * sin(vUv.y * 20.0 - uTime * 0.7) * 0.05;
  intensity += caustic;

  vec3 color = vec3(intensity);

  gl_FragColor = vec4(color, (fresnel * 0.5 + core * 0.4 + 0.1) * uOpacity);
}
