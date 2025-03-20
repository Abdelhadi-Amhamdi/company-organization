import Filter from "../dashbaoard/filter";
import MyTable from "../dashbaoard/table";
import React from "react";




export default function RootLayout() {
    const [ data, setData ] = React.useState([])
    const [ query, setQuery ] = React.useState('')

    const [ filterQuery, SetFilterQuery ] = React.useState<null | string>(null)

    const [ offset, setOffset ] = React.useState<string[]>([])
    const [ currentOffset, setCurrentOffset ] = React.useState<string | null>(null)
    const [ 
        lastAppliedFilters,
        setLastAppliedFilter 
    ] = React.useState<{lQuery : string | null, lFilter : string | null}>({lQuery: null, lFilter : null})
    
    async function fetchData() {

        const baseId = import.meta.env.VITE_BASE_ID
        const token = import.meta.env.VITE_TOKEN

        let url = `https://api.airtable.com/v0/${baseId}/company?pageSize=25`

        
        if (currentOffset) {
            url += `&offset=${currentOffset}`
        }
        
        if (filterQuery) {
            if (query != "") {
                url += `&filterByFormula=AND(${encodeURIComponent(filterQuery)}`
                url += encodeURIComponent(`, FIND('${query}', {Name}))`)
            } else {
                url += `&filterByFormula=${encodeURIComponent(filterQuery)}`
            }
        } else if (query) {
            url += `&filterByFormula=FIND('${query}', {Name})`
        }

        try {
            const response = await fetch(url, {
                method : 'GET',
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            })

            if (!response.ok) {
                const { error } = await response.json()
                throw Error(`${error.message}`)
            }

            const res_data = await response.json();
            setOffset((prev) => {
                if (res_data.offset) {
                    return [...prev, res_data.offset]
                }
                return prev
            })
            setData(res_data.records)

        } catch(err) {
            console.log(err)
        }

    }


    React.useEffect(() => {
        const timer = setTimeout(() => {
            const isNewFilter = lastAppliedFilters.lQuery !== query || lastAppliedFilters.lFilter !== filterQuery
            
            if (isNewFilter) {
                setCurrentOffset(null)
                setOffset([])
                setLastAppliedFilter({lQuery : query, lFilter : filterQuery})
            }

            fetchData()
        }, 300)

        return () => clearTimeout(timer)
    }, [query, currentOffset, filterQuery])

    const handleNext = () => {
        const nextOffset = offset[offset.length - 1];
        if (nextOffset) {
            setCurrentOffset(nextOffset);
        }
    };
    
    
    const handlePrev = () => {
        if (offset.length > 1) {
            setOffset((prev) => prev.slice(0, -2));
            setCurrentOffset(offset[offset.length - 3]);
        }
    };

    return (
        <div className="max-w-[1000px] mx-auto">
            <div className="flex space-x-4">
                <div className="w-[200px] min-w-[200px]">
                    <Filter setFilterQuery={SetFilterQuery} />
                </div>
                <div className="flex-grow">
                    <MyTable 
                        data={data} 
                        setQuery={setQuery}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    />
                </div>
            </div>
        </div>
    )
}