type Iprop = {
  id: string;
  options: string[] | undefined;
};

export default function DropDown({ id, options }: Iprop) {
  return (
    <div className="border border-grey-900 h-[30px] w-[200px]">
      <label htmlFor={id}></label>
      <select id={id} className=" border-grey-900 h-[30px] w-[200px]">
        <option value="alltransactions">all transactions</option>
        {options?.map((opt: string, idx: number) => {
          return (
            <option value={opt} id={idx.toString()}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
}
