import { useCallback, useRef, useState } from "react";
import { xhr } from "../http/HttpService";
import { ResultPanel } from "./ResultPanel";
import "./QueryRunnerForm.scss";
import { CSV } from "../utils/CSVParser";
/**
 * Function to check if query is valid
 * Only select queries will be valid (any other query will be marked erronous)
 * @param queryList Array of sql strings
 * @returns Boolean
 */
const validateQuery = (queryList: Array<string>) => {
  const blacklistedTerms = /(?:^|(?<= ))(update|insert|drop)(?:(?= )|$)/;
  const invalidQueries = queryList.filter((query) => {
    return blacklistedTerms.test(query.trim());
  });
  return invalidQueries.length === 0;
};
export const QueryRunnerForm: React.FC<{}> = () => {
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const onSubmit = (event: any) => {
    const el: any = inputRef?.current;
    const values = el.value.split(";");
    const isValidQuery = validateQuery(values);
    if (isValidQuery) {
      xhr(`data/northwind/csv`, {
        method: "GET",
        headers: {
          "Content-Type": "text/csv",
        },
        body: {
          query: values, 
          /* When using real world application
          sql queries should be encrypted */
        },
      }).then((res) => {
        setData(CSV.parse(res));
      });
    }

    event.preventDefault();
    return;
  };
  const resetQuery = useCallback(() => {
    setData([]);
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-wrapper">
          <div className="form-section">
            <textarea ref={inputRef} placeholder="Write Your Query" />
          </div>
          <div className="form-section">
            <p className="info">
              <sup>*</sup>Only select queries are allowed
            </p>
            <p className="info">
              <sup>*</sup>Multiple Queries should be separated by semicolon(;)
            </p>
          </div>
          <div className="form-section">
            <button type="submit" className="form-button">
              Run Query
            </button>
            <button onClick={resetQuery} type="reset" className="form-button">
              Reset
            </button>
          </div>
        </div>
      </form>
      <>
        <ResultPanel tableData={data} />
      </>
    </>
  );
};
