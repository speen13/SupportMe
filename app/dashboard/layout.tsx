'use client'

import MainMenu from "@/app/dashboard/components/main-menu";
import MenuTitle from "@/app/dashboard/components/menu-title";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {MenuIcon} from "lucide-react";
import {useMediaQuery} from "@/hooks/use-media-query";


export default function DashboardLayout({children}: {children: React.ReactNode}) {

    const isDesktop = useMediaQuery('(min-width: 768px)')
    return (


            <div className='grid md:grid-cols-[250px_1fr] h-screen '>
                <MainMenu className='hidden md:flex'/>
                {!isDesktop && (
                    <div
                        className='p-4 flex justify-between md:hidden sticky left-0 top-0 bg-background border-b border-border'>
                        <MenuTitle/>
                        <Drawer>
                            <DrawerTrigger>
                                <MenuIcon/>
                            </DrawerTrigger>
                            <DrawerContent>
                                <MainMenu/>
                            </DrawerContent>
                        </Drawer>
                    </div>
                )}
                <div className='overflow-auto py-2 px-4'>
                    <h1 className='pb-4'>Welcome back Tom!</h1>
                    {children}

                </div>
            </div>

    )
}