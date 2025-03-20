import React from "react"
import { ChevronDown } from "lucide-react"
import {
	ColumnDef,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export type CompnayFields = {
	"ID": number,
	"Name": string,
	"Description": string,
	"Headquarters Location" : string,
	"Type of Organization" : string,
	"Industry" : string,
	"Ownership Structure" : string,
	"Legal Structure" : string,
	"Year Founded" : "",
	"Geographical Scope" : string,
	"Size" : string,
	"Number of Owners/Members" : string,
	"Funding & Financial Information" : string,
	"Token Information (for crypto/DAO companies)" : string,
	"Governance Model" : string,
	"Links/Social Media" : string,
	"Contact Information" : string,
	"Certifications&Affiliations" : string,
	"tags" : string,
	"Date Added to Directory" : string,
	"Last Updated" : string
}

export type Company = {
	id: string
	fields: CompnayFields
	createdTime: string
}

export const columns: ColumnDef<Company>[] = [
	{
		accessorKey	:	"name",
		header		:	"Name",
		cell		:	({ row }) => 
			(<div className="capitalize">
				{
					row.original.fields.Name.length > 25 ?
					`${row.original.fields.Name.substring(0, 25)}...` :
					row.original.fields.Name
				}
			</div>),
	},
	{
		accessorKey	:	"ownership",
		header		:	"OwnerShip",
		cell		:	({ row }) => 
			(<div className="lowercase">
				{
					row.original.fields["Ownership Structure"]
				}
			</div>),
	},
	{
		accessorKey	:	"type",
		header		:	() => "Type",
		cell		:	({ row }) => 
			(<div className="font-medium">
				{
					row.original.fields["Type of Organization"]
				}
			</div>),
	},
	{
		accessorKey	:	"scope",
		header		:	() => "Scope",
		cell		:	({ row }) => 
			(<div className="font-medium">
				{
					row.original.fields["Geographical Scope"]
				}
			</div>),
	},
]

export default function DataTableDemo(
	{
		data,
		setQuery,
		handleNext,
		handlePrev
	} : {
		data : Company[]
		handleNext : () => void
		handlePrev : () => void
		setQuery : React.Dispatch<React.SetStateAction<string>>
	}
) {


	const [ 
		columnVisibility,
		setColumnVisibility 
	] = React.useState<VisibilityState>({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnVisibility,
			pagination : {
				pageIndex : 0,
				pageSize : 50
			}
		},
	})

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter compnay name..."
					className="max-w-sm"
					onChange={(e : React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value : boolean) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} >
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredRowModel().rows.length} row(s) founded.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={handlePrev}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={handleNext}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
