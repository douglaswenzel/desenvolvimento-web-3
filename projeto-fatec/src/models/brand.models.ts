import {  DataTypes, Model, Optional } from "sequelize";
import { Brand } from "../interfaces/brand.interface";
import sequelize from "../config/database";


// Os atributo definido "id" definimos como opcional
export type BrandCreationalAttributes = Optional<Brand, "id">; 

export class BrandModel extends Model<Brand> {
    public id!: number;
    public description!: string;
}


BrandModel.init(
  {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_marca",
        type: DataTypes.INTEGER,
    },
    description: {
        primaryKey: true,
        allowNull: false,
        field: "descricao",
        type: DataTypes.STRING
    },
  },
  {
    modelName: "Brand",
    tableName: "Marca",
    sequelize,
    timestamps: false
  }

);

export default Brand