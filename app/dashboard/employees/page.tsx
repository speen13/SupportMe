'use client'
import {setTimeout} from 'timers/promises'
import Loading from "@/app/dashboard/employees/loading";
import cm from '@/public/images/34 - cm.jpg'
import rl from '@/public/images/34 - rl.jpg'
import tf from '@/public/images/34 - tf.jpg'
import cms from '@/public/images/38 - cm.jpg'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {DataTable} from "@/components/ui/data-table";
import {columns, type Employee} from "@/app/dashboard/employees/columns";


export default function EmployeesPage() {

    const employees:Employee[] = [
        {id: 1, firstName: "John", lastName: "Murray", teamName: 'alpha', isTeamLeader: true, avatar: cm},
        {id: 2, firstName: "Jane", lastName: "Doe", teamName: 'beta', isTeamLeader: false},
        {id: 3, firstName: "Mike", lastName: "Smith", teamName: 'gamma', isTeamLeader: false, avatar: cms},
        {id: 4, firstName: "Sarah", lastName: "Johnson", teamName: 'delta', isTeamLeader: false, avatar: rl},
        {id: 5, firstName: 'Tom', lastName: "President", teamName: 'beta', isTeamLeader: false},
        {id: 6, firstName: "Emma", lastName: "Watson", teamName: 'gamma', isTeamLeader: false, avatar: tf},
        {id: 7, firstName: "David", lastName: "Jones", teamName: 'delta', isTeamLeader: false},
        {id: 8, firstName: "Olivia", lastName: "Brown", teamName: 'alpha', isTeamLeader: true},
        {id: 9, firstName: "Olivia", lastName: "Brown", teamName: 'alpha', isTeamLeader: false},
    ]
    // await setTimeout(5000)
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Employees
                </CardTitle>
            </CardHeader>
            <CardContent >
             <DataTable columns={columns} data={employees} />
            </CardContent>
        </Card>
    )
}