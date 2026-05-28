import { HiOutlineShieldCheck } from "react-icons/hi";

export default function SecurityBadge() {
	return (
		<div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/85 shadow-[0_0_22px_rgba(0,183,250,0.28)]">
			<HiOutlineShieldCheck className="h-4 w-4 text-[--color-accent]" aria-hidden="true" />
			Acceso seguro
		</div>
	);
}
