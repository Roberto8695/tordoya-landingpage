export default function AuthLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <div className="h-screen overflow-hidden bg-[--color-primary]">{children}</div>;
}
