
import { createRef, useCallback, useEffect, useLayoutEffect, useState } from "react";
import "./ResultTable.scss";

interface ResultPanelProps{
    tableData:Array<any>
}
const PAGE_SIZE = 10;
export const ResultPanel:React.FC<ResultPanelProps> = ({tableData})=>{
    const headers = tableData.length ? [...tableData[0]] : []
    const tableRowWrapperRef = createRef() as React.RefObject<HTMLDivElement>
    const [rowsToDisplay,setRowsToDisplay] = useState([] as Array<any>)
    const [startIndex,setStartIndex] = useState(0)
    const [totalRows,setTotalRows] = useState([] as Array<any>)
    const rows:Array<any> = tableData.slice(1)
    useEffect(()=>{
        setTotalRows(rows as Array<any>)
    },[rows.length])
    useEffect(()=>{
        if(totalRows.length){
            const freshRowsToDisplay = totalRows.slice(startIndex,startIndex+PAGE_SIZE)
            setRowsToDisplay(rowsToDisplay.concat(freshRowsToDisplay))
            setStartIndex(startIndex+PAGE_SIZE)
        }
        
    },[totalRows])

    const loadMore = useCallback(()=>{
        const freshRowsToDisplay = totalRows.slice(startIndex,startIndex+PAGE_SIZE)
        setRowsToDisplay(rowsToDisplay.concat(freshRowsToDisplay))
        setStartIndex(startIndex+PAGE_SIZE)
    },[startIndex,PAGE_SIZE])
    
    useLayoutEffect(()=>{
        setTimeout(()=>{
            const el = tableRowWrapperRef?.current as HTMLElement
            el.scrollTop = el.scrollHeight
        },100)
        
    },[startIndex])
    return(
        <div className="wrapper">
  {tableData.length > 0 && <div className="Rtable Rtable--5cols Rtable--collapse">
    <div className="Rtable-row Rtable-row--head">
        {headers.map((header:string)=><div key={header} className="Rtable-cell date-cell column-heading">{header}</div>)}
     
    </div>
    <div className={"Rtable-row-wrapper"} ref={tableRowWrapperRef}>
    {rowsToDisplay.map((row,i)=>{
        return(
            <div key={i} className={`Rtable-row ${i % 2 === 0 ? 'is-striped' : ''}`}>
                {row.map((data:any)=>{
                    return(
                        <div key={data} className=" Rtable-cell Rtable-cell--content date-content">{data}</div>
                    )
                })}
            </div>
        )
    })}
</div>
  </div>}
  <button onClick={loadMore}>Load {PAGE_SIZE} More</button>
</div>
    )
}