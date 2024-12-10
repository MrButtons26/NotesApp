export const product:[string,string][]=[['AI','Integrated AI assistant'],['Docs','Simple and Powerful'],['WIKI','Centralise your knowledge'],['Projects','For every team and size'],['Calender','Time and work,Together'],['Sites','Publish anything fast'],['Forums','Capture responses and requests'],['Marketplace','Templates to get you Started'],['Integrattion','Connect your tools to Notes']]
export const teams: string[]=['Product','Engineering','Design','IT','Start Ups','Enterprise']
export const individuals:string[]=['Personal','Students','Teachers','Creators']
export const download :string[]=['Notion','Calender','Web Clipper']


export function valueCheck(value:number|undefined):boolean|undefined{
if(value>=2&&value<=4){
    return true;
}
}