import FetchFactory from "@/repositories/factory";
import { ApiResponse } from "@/repositories/response";
interface companyTypes {
  id: number;
  title: string;
}
class CompanyModule extends FetchFactory {
  private RESOURCE = "manager/Company";

  async GetAllCompanyTypes() {
    return await this.apiDataModifierCaller<ApiResponse<Array<companyTypes>>>(
      `${this.RESOURCE}/GetAllCompanyTypes`,

      "GET",
      "تایپ ها با موفقیت دریافت شدند",
      undefined, // undefined if method is GET
    );
  }
  async Get(id: number) {
    return await this.apiDataModifierCaller<ApiResponse<Array<companyTypes>>>(
      `${this.RESOURCE}/Get/${id}`,
      "GET",
      "شرکت موفقیت دریافت شد",
      undefined, // undefined if method is GET
    );
  }
}
export default CompanyModule;
