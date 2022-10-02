import { useRef, useState } from "react"
import { xhr,CSV } from "../http/HttpService"
import { ResultPanel } from "./ResultPanel"

const validateQuery = (queryList:Array<string>)=>{
    const blacklistedTerms = /(?:^|(?<= ))(update|insert|drop)(?:(?= )|$)/ 
    const invalidQueries = queryList.filter((query)=>{
        return blacklistedTerms.test(query.trim())
    })
    return invalidQueries.length === 0
    
}
export const QueryRunnerForm:React.FC<{}> = ()=>{
    const inputRef = useRef(null)
    const [data,setData] = useState([])
    const onSubmit = (event:any)=>{
        const el:any = inputRef?.current
        const values = el.value.split(";")
        const isValidQuery = validateQuery(values)
        if(isValidQuery){
            xhr(`data/northwind/csv`,{
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'text/csv',
                },
                body:{
                    query: values//.map((value:string)=>window.atob(value))
                }
            }).then((res)=>{
                setData(CSV.parse(res))
                //console.log()
            })
        }
        event.preventDefault()
        return;
    }
    return(
        <>
        <form onSubmit={onSubmit}>
        <textarea ref={inputRef}/>
        <button type="submit" >Submit</button>
        <p>Only select queries are allowed</p>
        </form>
        <><ResultPanel tableData={data}/></>
        </>
    )
}