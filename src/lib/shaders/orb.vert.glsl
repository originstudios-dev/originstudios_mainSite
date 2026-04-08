varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vUv = uv;

  // Subtle vertex displacement based on mouse proximity
  vec3 pos = position;
  float dist = length(uMouse - pos.xy);
  float influence = smoothstep(2.0, 0.0, dist);
  pos += normal * influence * 0.05 * sin(uTime * 2.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
