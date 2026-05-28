export default function LoginBackground() {
	return (
		<div className="absolute inset-0 overflow-hidden">
			<div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(1,12,48,0.98)_0%,rgba(1,21,90,0.88)_45%,rgba(3,40,122,0.92)_100%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(0,183,250,0.22),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(120,189,255,0.18),transparent_46%),radial-gradient(circle_at_20%_85%,rgba(21,91,179,0.32),transparent_55%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(255,255,255,0.08),transparent_45%)]" />

			<div className="absolute -left-24 -top-45 h-130 w-130 rounded-full bg-[rgba(0,183,250,0.28)] blur-[160px]" />
			<div className="absolute -right-24 -bottom-55 h-140 w-140 rounded-full bg-[rgba(21,91,179,0.38)] blur-[180px]" />
			<div className="absolute left-[15%] top-[35%] h-48 w-48 rounded-full bg-[rgba(255,255,255,0.08)] blur-[80px]" />

			<div className="absolute inset-0 opacity-30 mix-blend-screen">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[48px_48px]" />
			</div>
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_45%)]" />
			</div>
			<div className="absolute inset-0 opacity-[0.12] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2270%22 height=%2270%22 viewBox=%220 0 70 70%22%3E%3Cfilter id=%22n%22 x=%220%22 y=%220%22 width=%22100%25%22 height=%22100%25%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%2270%22 height=%2270%22 filter=%22url(%23n)%22 opacity=%220.25%22/%3E%3C/svg%3E')]" />
			<div className="absolute inset-0 opacity-40">
				<div className="absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/50 blur-[1px]" />
				<div className="absolute left-[28%] top-[60%] h-1 w-1 rounded-full bg-white/40 blur-[1px]" />
				<div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/40 blur-[1px]" />
				<div className="absolute right-[30%] bottom-[18%] h-1 w-1 rounded-full bg-white/35 blur-[1px]" />
			</div>
		</div>
	);
}
