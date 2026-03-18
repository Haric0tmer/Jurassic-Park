"use client";

import { Ticket, MapIcon, Info, Home } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
	{ title: "Accueil", url: "/", icon: Home },
	{ title: "Billeterie", url: "/tickets", icon: Ticket },
	{ title: "Carte du Parc", url: "/map", icon: MapIcon },
	{ title: "Encyclopédie", url: "/dinosaurs", icon: Info },
];

export function AppSidebar() {
	return (
		<Sidebar className='border-r w-64 bg-sidebar text-sidebar-foreground transition-colors duration-300'>
			<SidebarContent>
				{/* Padding top pour éviter le bouton trigger fixe */}
				<SidebarGroup className='pt-16'>
					<SidebarGroupLabel className='px-4 text-xs font-semibold uppercase tracking-wider opacity-70'>
						Menu Principal
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className='gap-1 px-2'>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className='flex items-center gap-3 px-3 py-6 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all rounded-lg group'
									>
										<Link
											href={item.url}
											className='flex items-center gap-3 w-full'
										>
											<item.icon className='h-5 w-5 shrink-0 opacity-80 group-hover:opacity-100' />
											<span className='font-medium text-sm md:text-base truncate'>
												{item.title}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
