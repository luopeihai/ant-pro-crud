<%
   const data = [];
   let indexApiParams="",createApiParams="",updateApiParams="",detailApiParams="",deleteApiParams="";
   if(indexApi){
    data.push('QueryType')
    indexApiParams = getParams(method)
   }

   if(createApi){
    data.push('CreateType')
    createApiParams = getParams(createMethod)
   }

   if(updateApi){
    data.push('UpdateType')
    updateApiParams = getParams(updateMethod)
   }

   if(detailApi){
    detailApiParams = getParams(detailMethod)
   }


   if(deleteApi){
    data.push('DeleteType')
    deleteApiParams = getParams(deleteMethod)
   }


   function getParams(method = 'get'){
     console.log('method',method)
     if(method === 'get'){
       return "params"
     }else {
       return `method : '${method}',data:params`
     }
   }

%>
import request from "@/utils/request";
import {<%=data.join(",") %>} from "./data.d";


<% if(indexApi){%>

// 列表
export async function queryList(params: QueryType): Promise<any> {
  return request( '<%=indexApi%>', {<%- indexApiParams %>}).then((res) => ({
    data: res.data.list,
    page: res.data.pageSize,
    success: res.code === 200,
    total: res.data.total,
  }));
}

<%
  }
%>


<% if(createApi){%>

//创建
export async function create(params: CreateType): Promise<any> {
  return request( '<%=createApi%>', {<%- createApiParams %>})
}

<%
  }
%>




<% if(updateApi){%>

  //更新
  export async function update(params: UpdateType): Promise<any> {
    return request( '<%=updateApi%>', {<%- updateApiParams %>})
  }
  
  <%
    }
  %>


  <% if(detailApi){%>

    //详情
    export async function detail(params: string): Promise<any> {
      return request( '<%- detailApi  %>')
    }
    
    <%
      }
    %>



    <% if(deleteApi){%>

      //删除
      export async function deleteItem(params: DeleteType): Promise<any> {
        return request( '<%=deleteApi%>', {<%- deleteApiParams %>})
      }
      
    <%
        }
    %>




