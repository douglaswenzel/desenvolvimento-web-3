import { BrandModel } from "../models/brand.models";
import { Brand } from "../interfaces/brand.interface";

export const listAll = async (): Promise<Brand[]> => {
   const brands = await BrandModel.findAll();
   return brands;
}