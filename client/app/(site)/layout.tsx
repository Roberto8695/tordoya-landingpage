import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SelectCountry from "@/components/SelectCountry";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="min-h-full flex flex-col bg-white text-foreground">
			<SelectCountry />
			<Header />
			<main className="flex-1 ">{children}</main>
			<Footer />
			<WhatsAppButton />
		</div>
	);
}
