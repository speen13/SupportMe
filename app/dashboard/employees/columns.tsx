"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
    id: string
    firstName: number
    lastName: "pending" | "processing" | "success" | "failed"
    teamName: string
    isTeamLeader: boolean
    avatar?: string
}

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "avatar",
        header: "",
        cell: ({row}) => {
            const avatar: string = row.getValue("avatar")
            const firstName: string = row.getValue("firstName")
            const lastName: string  = row.getValue("lastName")

            return <Avatar>
                {!!avatar && <Image width={40} height={40} src={avatar} alt={`${firstName} ${lastName} avatar`} />}
                <AvatarFallback className='uppercase'>
                    {firstName[0]}{lastName[0 ]}
                </AvatarFallback>
            </Avatar>
        }
    },
    {
        accessorKey: "firstName",
        header: "FirstName",
    },
    {
        accessorKey: "lastName",
        header: "LastName",
    },
    {
        accessorKey: "teamName",
        header: "Team",
    },
    {
        accessorKey: "isTeamLeader",
        header: "",
        cell: ({row}) => {
            const isTeamLeader: boolean = row.getValue("isTeamLeader")
            return isTeamLeader? <Badge variant='success'>Team Leader</Badge> : null
        }
    },
]
