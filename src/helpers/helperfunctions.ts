const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

export const dateCalculator = ( date: string) =>{
    const stringtoDate = new Date(date);

                    const day = stringtoDate.getDate();
                    const month = monthNames[stringtoDate.getMonth()];
                    const year = stringtoDate.getFullYear();
                    const hr = stringtoDate.getHours();
                    const minute = stringtoDate.getMinutes();

                    return {day : day , month: month , year: year, hour: hr , minute: minute}
}

export type transaction = {
    amount: number;
    avatar: string;
    category: string;
    date: string;
    name: string;
    recurring: boolean;
  };


export const sortByDate = (data : transaction[]|undefined , direction : string )  =>{
    if(direction === "ascending"){
        const sortedarray = data?.sort((a: transaction,  b: transaction) => {
            return( new Date(b.date).getTime() - new Date(a.date).getTime());
        })
    
        return sortedarray

    }

    if(direction  === "descending"){
        const sortedarray = data?.sort((a: transaction,  b: transaction) => {
            return( new Date(a.date).getTime() - new Date(b.date).getTime());
        })
    
        return sortedarray
    }
    

}

export const sortBYName = ( data : transaction[]| undefined , direction : string) =>{
   
    console.log("data", data)
    if(direction === "ascending"){
        const sortedarray = data?.sort((a: transaction,  b: transaction) => {
            return (a.name > b.name ? 1 : a.name < b.name ? -1 :0)

        })
        return sortedarray;
    }

    if(direction === "descending"){
        const sortedarray = data?.sort((a: transaction,  b: transaction) => {
            return (a.name  < b.name ? 1 : a.name > b.name ? -1 :0)

        })
        return sortedarray;
    }
}

export const sortByAmount = ( data: transaction[]| undefined , direction : string) =>{
    if(direction  === "descending") {
        const sortedarray = data?.sort((a: transaction,  b: transaction) => {
            return (a.amount  < b.amount ? 1 : a.amount> b.amount ? -1 :0)

        })
        return sortedarray;
    }
    if(direction  === "ascending") {
        const sortedarray = data?.sort((a: transaction,  b: transaction) => {
            return (a.amount  > b.amount ? 1 : a.amount < b.amount ? -1 :0)

        })
        return sortedarray;
    }
}

export const filter = <arrayType>(arr : arrayType[], filterby : string) => {
    const filterbyvar = filterby
    return arr.filter((item: any )=> item?.filterbyvar === filterbyvar )

}