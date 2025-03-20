import React from "react"
import { filters } from './filter-data'
import { Checkbox } from "@/components/ui/checkbox"



type FilterValueType = {
    name : string,
    apply : boolean,
    description? :string
}

type FilterItemType = {
    name : string,
    values : FilterValueType[]
}


function CategorieItem(
{
    filter, handler
}:
{
    filter : FilterValueType,
    handler : React.Dispatch<React.SetStateAction<FilterItemType[]>>
}) {
    return (
         <div className="flex items-center space-x-2 my-4">
            <Checkbox
                id={filter.name}
                checked={filter.apply}
                onCheckedChange={() => handler(prev => prev.map(f => ({
                    ...f,
                    values : f.values.map(v => {
                        if (v.name === filter.name) {
                            return {...v, apply : !v.apply}
                        }
                        return v
                    }) 
                })))}
            />
            <label
                htmlFor={filter.name}
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {filter.name}
                {filter.description && ` - ${filter.description}`}
            </label>
        </div> 
    )
}



function FilterCategorie(
{ categorie, setFilterItems } : {
    categorie : FilterItemType,
    setFilterItems : React.Dispatch<React.SetStateAction<FilterItemType[]>>
}) {
    return (
        <div className="my-2 font-bold border-r-[1px] p-2">
            <h1 >{categorie.name}</h1>
            {
                categorie.values.map(c => 
                    <CategorieItem 
                        handler={setFilterItems} 
                        key={c.name} 
                        filter={c} 
                    />)
            }
        </div>
    )
}

export default function Filter(
{ setFilterQuery } : { setFilterQuery : React.Dispatch<React.SetStateAction<string | null>>}
) {
    const [ filterItems, setFilterItems ] = React.useState<FilterItemType[]>(filters)

    React.useEffect(() => {
        let baseFilter = ""
        let baseHasN = 0;
        filterItems.map(categorie => {
            let subFilter = ""
            let subHasN = 0;
            categorie.values.map(value => {
                if (value.apply) {
                    
                    if (subHasN != 0) {
                        subFilter += ", "
                    }
                    subFilter += `{${categorie.name}} = "${value.name}"`
                    subHasN++;
                }
            })
            if (baseHasN > 0 && subHasN > 0)
            {
                baseFilter += ", "
            }
            if (subHasN > 1)
            {
                baseFilter += (" OR(" + subFilter + ")");
                baseHasN++;
            } 
            else if (subHasN === 1)
            {
                baseFilter += subFilter
                baseHasN++;
            }
        })
       
        if (baseHasN > 0)
        {
            let tmp = ""
            if (baseHasN > 1)
            {
                tmp = ("AND(" + baseFilter + ")")
            } 
            else
            {
                tmp = baseFilter
            }
            setFilterQuery(tmp)
        } 
        else
        {
            setFilterQuery(null)
        }
    }, [filterItems])
    
    return (
        <div className="text-black/80">
            {
                filterItems.map(categorie => 
                    <FilterCategorie 
                        key={categorie.name} 
                        categorie={categorie}
                        setFilterItems={setFilterItems}
                    />)
            }
        </div>
    )
}