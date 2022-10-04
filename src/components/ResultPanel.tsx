import {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./ResultTable.scss";

interface ResultPanelProps {
  tableData: Array<any>;
}
const PAGE_SIZE = 10;
const ResultPanel: React.FC<ResultPanelProps> = ({ tableData }) => {
  const headers = tableData.length ? [...tableData[0]] : [];
  const tableRowWrapperRef = createRef() as React.RefObject<HTMLDivElement>;
  const [rowsToDisplay, setRowsToDisplay] = useState([] as Array<any>);
  const [startIndex, setStartIndex] = useState(0);
  const [totalRows, setTotalRows] = useState([] as Array<any>);
  const rows: Array<any> = tableData.slice(1);
  useEffect(() => {
    setTotalRows(rows as Array<any>);
    setRowsToDisplay([]);
    setStartIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);
  useEffect(() => {
    if (totalRows.length) {
      const freshRowsToDisplay = totalRows.slice(
        startIndex,
        startIndex + PAGE_SIZE
      );
      setRowsToDisplay(rowsToDisplay.concat(freshRowsToDisplay));
      setStartIndex(startIndex + PAGE_SIZE);
    } else {
      setStartIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalRows]);

  const loadMore = useCallback(() => {
    const freshRowsToDisplay = totalRows.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
    setRowsToDisplay(rowsToDisplay.concat(freshRowsToDisplay));
    setStartIndex(startIndex + PAGE_SIZE);
  }, [startIndex, rowsToDisplay, totalRows]);

  useLayoutEffect(() => {
    /*
    Scroll to the end of the div to show latest data
    */
    setTimeout(() => {
      const el = tableRowWrapperRef?.current as HTMLElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex]);
  const currentCount = rowsToDisplay.length;
  const totalCount = totalRows.length;
  const disableLoadMore = rowsToDisplay.length < PAGE_SIZE;
  return (
    <div className="result-wrapper">
      {tableData.length > 0 && (
        <>
          <span>
            Showing {currentCount} of {totalCount}
          </span>
          <div className="result-table">
            <div className="table-row table-row--head">
              {headers.map((header: string) => (
                <div key={header} className="table-cell  column-heading">
                  {header}
                </div>
              ))}
            </div>
            <div className={"table-row-wrapper"} ref={tableRowWrapperRef}>
              {rowsToDisplay.map((row, i) => {
                return (
                  <div
                    key={i}
                    className={`table-row ${i % 2 === 0 ? "is-striped" : ""}`}
                  >
                    {row.map((data: any, rowIndex: number) => {
                      return (
                        <div
                          key={data + i + rowIndex}
                          className="table-cell table-cell-content "
                        >
                          {data}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {tableData.length > 0 && (
        <div className="load-more-wrapper">
          <button onClick={loadMore} disabled={disableLoadMore}>
            Load {PAGE_SIZE} More
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultPanel;
