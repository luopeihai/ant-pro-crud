import request from "@/utils/request";

import {
  queryListParams,
  
      createParams,
    
  
    updateParams,
 
 
   
    deleteParams
 
} from "./data.d";


export async function queryList(params: queryListParams): Promise<any> {
    return request( '/config/banner/listBanner', { 
      
        
         data:params,
          
      

    
    }).then((res) => ({
      data: res.data.list,
      page: res.data.pageSize,
      success: res.code === 200,
      total: res.data.total,
    }));
}




export async function create(params: createParams): Promise<any> {
    return request('/config/banner/addQuestionToBanner', { 
      
         
         method :'post',
          
      
         
          data:params,
           
        
    });
}





export async function update(params: updateParams): Promise<any> {
    return request('/config/banner', {

      
        
        method :'put',
         
     
        
         data:params,
          
      
    });
}




export async function deleteItem(params: deleteParams): Promise<any> {
    return request('/config/banner/removeQuestionFromBanner/{bannerId}/{mainId}', {

      
        
        method :'delete',
         
     
        
         data:params,
          
      
    });
}


