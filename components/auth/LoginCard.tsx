"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LoginCardProps = {
	children: ReactNode;
	className?: string;
};

type MotionDivProps = ComponentPropsWithoutRef<"div"> & MotionProps;

const MotionDiv = motion.div as unknown as React.FC<MotionDivProps>;

export default function LoginCard({ children, className }: LoginCardProps) {
	return (
		<MotionDiv
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`relative rounded-[28px] border border-white/20 bg-white/10 p-6 shadow-[0_30px_80px_rgba(1,10,32,0.45)] backdrop-blur-[28px] sm:p-8 ${
				className || ""
			}`}
		>
			<div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)]" />
			<div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
			<div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]" />
			<div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" />
			<div className="relative z-10">{children}</div>
		</MotionDiv>
	);
}
