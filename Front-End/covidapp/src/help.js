export const sortData=(data)=>{
    const sortedData=[...data]
    sortedData.sort((a,b)=>{
        if(a.cases>b.cases){
            return -1
        }
        else {return 1;}
    })
    return sortedData
}



//got from Quora, also got the .then chain from the yt channel for the .then chain