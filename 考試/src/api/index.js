import axios from "axios";

const instance = axios.create({
  baseURL: "https://demo.mercuryfire.com.tw:49110/crudTest"
});

export const apiRead = ()=> instance.get("/a");
export const apiCreate = (name, age) => instance.post("", { name, Age: age });
export const apiDelete = (id) => instance.delete(`/${id}`);
export const apiEdit = (id,name,age)=>instance.patch("",{id,name,age})