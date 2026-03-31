export function OrbFallback() {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 50%, transparent 70%)",
        }}
      />
      {/* Inner core */}
      <div
        className="absolute inset-[15%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)",
        }}
      />
      {/* Fresnel ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 0 60px rgba(255,255,255,0.03)",
        }}
      />
    </div>
  );
}
