import CompanyModule from "@/repositories/companyRepository";
interface IApiInstance {
    //manager repo's
    company : CompanyModule
}
const fetchOptions = {
    baseURL : "https://crmservice.riraproduct.ir/api/",
}

const repository : IApiInstance   = {
    company : new CompanyModule(fetchOptions),
}

export default repository;