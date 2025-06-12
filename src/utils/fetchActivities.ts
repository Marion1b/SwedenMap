interface Activity{
    name:string;
    description:string;
    geoloc:[number,number];
    category:string;
}

interface ActivityData{
    [key:string]:Activity;
}

type ExpectedReturnType = {
    data: ActivityData | null;
    loading: boolean;
    errorReturn: Error | null;
};

export const fetchDataActivities = async():Promise<ExpectedReturnType>  =>{

    let data : ActivityData|null = null;
    let loading : boolean = true;
    let errorReturn : Error | null = null;

    try{
        const response = await fetch("./lib/activities.json");
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        data = responseData;
    }catch(error){
        if(error instanceof(Error)){
            errorReturn = error;
        }else{
            errorReturn = new Error('An unknowed error occured');
        }
        console.log(error);
    }finally{
        loading=false;
    }
    return {data, loading, errorReturn};
}