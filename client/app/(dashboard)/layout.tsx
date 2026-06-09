export default function DashboardLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <div className="min-h-full bg-light">{children}</div>;
}