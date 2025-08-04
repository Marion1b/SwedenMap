interface dataToSendRegister {
    email: string;
    username: string;
    password: string;
}

interface dataToSendLogin{
    email:string;
    password:string;
}

interface dataToSendUpdate{
    username?:string;
    password?:string;
    email?:string;
    avatar?: string;
    country?:string;
    city?:string;
}

export default class Routes{
    private apiUrl:string|undefined = import.meta.env.VITE_API_URL;

    public async register(data:dataToSendRegister){
        try{
            if(!this.apiUrl){
                return console.error('api url is undefined');
            }
            const response = await fetch(`${this.apiUrl}/users/register`,{
                method:'POST',
                credentials: 'include',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(data)
            })

            const apiResponse = await response.json();

            if(!response.ok){
                console.error(response);
                return {apiResponse, error:"response not ok", status:"error"};
            }
            return {apiResponse, error:null, status:'success'};
        }catch(error){
            console.error(error);
            return{apiResponse:null, error:error, status:'error'};
        }
    }

    public async login(data:dataToSendLogin){
        try{
            if(!this.apiUrl){
                return console.error('api url is undefined');
            }
            const response = await fetch(`${this.apiUrl}/users/login`, {
                method:'POST',
                credentials: 'include',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(data)
            })

            const apiResponse = await response.json();

            if(!response.ok){
                console.error(response);
                return {apiResponse, error:"response not ok", status:"error"};
            }
            return{apiResponse, error:null, status:'success'};
        }catch(error){
            console.error(error);
            return{apiResponse:null, error:error, status:'error'};
        }
    }

    public async update(data:dataToSendUpdate){
        try{
            if(!this.apiUrl){
                return console.error('api url is undefined');
            }
            const response = await fetch(`${this.apiUrl}/users/update`, {
                method:'PUT',
                credentials: 'include',
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,

                },
                body: JSON.stringify(data)
            })

            const apiResponse = await response.json();

            if(!response.ok){
                console.error(response);
                return {apiResponse, error:"response not ok", status:"error"};
            }
            return{apiResponse, error:null, status:'success'};
        }catch(error){
            console.error(error);
            return{apiResponse:null, error:error, status:'error'};
        }
    }
}