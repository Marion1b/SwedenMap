interface dataToSendRegister {
    email: string,
    username: string,
    password: string
}

export default class Routes{
    private apiUrl:string|undefined = import.meta.env.dev.VITE_API_URL;

    public async register(data:dataToSendRegister){
        try{
            if(!this.apiUrl){
                return console.error('api url is undefined');
            }
            const response = await fetch(`${this.apiUrl}/users/register`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
            })

            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            const apiResponse = await response.json();
            return {apiResponse, error:null, status:'success'};
        }catch(error){
            console.log(error);
            return{apiResponse:null, error:error, status:'error'};
        }
    }
}