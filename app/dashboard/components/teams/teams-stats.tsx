
"use client"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

import {
    ListCheckIcon, PartyPopperIcon, PieChartIcon, StarIcon,
    UsersIcon,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import cm from '@/public/images/34 - cm.jpg'
import tf from '@/public/images/34 - tf.jpg'
import rl from '@/public/images/34 - rl.jpg'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import TeamDistributionChart from "@/app/dashboard/components/teams/teams-distribution-chart";
import SupportTicketsResolved from "@/app/dashboard/components/teams/support-teckets-resolved";

const teamLeaders = [
    {firstName: 'John', lastName: 'Murray', avatar: cm},
    {firstName: 'Anna', lastName: 'Smith',},
    {firstName: 'David', lastName: 'Johnson', avatar: tf},
    {firstName: 'Emma', lastName: 'Williams',},
    {firstName: 'Michael', lastName: 'Brown', },
    {firstName: 'Sophia', lastName: 'Davis',},
    {firstName: 'Isabella', lastName: 'Miller', },
    {firstName: 'Emily', lastName: 'Wilson', },
    {firstName: 'Olivia', lastName: 'Anderson', avatar: rl},

]
export default function TeamsStats() {

    return (
        <>
            <div className='grid lg:grid-cols-3 gap-4'>
                <Card>
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-base'>
                            Total teams
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <UsersIcon />
                            <div className='text-5xl font-bold'>8</div>
                        </div>
                        <div>
                            <Button size='xs' asChild>
                                <Link href='/dashboard/teams'>
                                    View All
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>


                <Card >
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-base flex justify-between items-center'>
                            <span>Teams leaders</span>
                            <StarIcon className='text-yellow-500' />
                        </CardTitle>
                        <CardContent className='flex flex-wrap gap-2' t>
                            {teamLeaders.map((leader) => (
                                <TooltipProvider key={`${leader.firstName}${leader.lastName}`}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Avatar>
                                            {!!leader.avatar && <Image src={leader.avatar} alt={`${leader.firstName} ${leader.lastName} avatar`}/>}
                                            <AvatarFallback>
                                                {leader.firstName[0]}
                                                {leader.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {leader.firstName} {leader.lastName}
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ))}
                        </CardContent>
                    </CardHeader>

                    <CardFooter className='flex gap-2 items-center text-xs text-muted-foreground mt-auto'>

                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-base flex justify-between items-center'>
                            <span>Teams distribution</span>
                            <PieChartIcon />
                        </CardTitle>
                    </CardHeader>

                    <CardContent className='pb-0'>
                        <TeamDistributionChart />
                    </CardContent>

                </Card>
            </div>
            <Card className='my-4'>
                <CardHeader>
                    <CardTitle className='text-lg flex items-center gap-2'>
                        <ListCheckIcon />
                        <span>Support tickets resolved</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className='pl-0'>
                    <SupportTicketsResolved />
                </CardContent>
            </Card>
        </>
    )
}