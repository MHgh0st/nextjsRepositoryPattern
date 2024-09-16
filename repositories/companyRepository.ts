import FetchFactory from "@/repositories/factory";
import { ApiResponse } from "@/repositories/response";
interface companyTypes {
  id: number;
  title: string;
}
class CompanyModule extends FetchFactory {
  private RESOURCE = "manager/Company";

  async GetAllCompanyTypes() {
    return await this.apiCaller<ApiResponse<Array<companyTypes>>>(
      `${this.RESOURCE}/GetAllCompanyTypes`,
      "GET",
      undefined, // undefined if method is GET
    );
  }
}
export default CompanyModule;
