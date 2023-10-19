import React from "react";

export default function CheckBox({
  indeterminate,
  ...rest
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { indeterminate: any; rest: any }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (typeof indeterminate === "boolean" && ref && ref.current) {
      //@ts-ignore
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);
  //generate random id and no repeat
  const id = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);

  return (
    <>
      <fieldset className="form-check p-0 m-0">
        <input
          className="form-check-input table-check"
          id={id}
          type="checkbox"
          ref={ref}
          {...rest}
        />
        <label className="form-check-label" htmlFor={id} />
      </fieldset>
    </>
  );
}
