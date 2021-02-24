import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../index";

export interface VideogameAttributes {
  id?: number;
  name: string;
  description: string;
  releaseDate?: Date;
  rating?: number;
  platforms: string[];
}

export interface VideogameCreationAttributes
  extends Optional<VideogameAttributes, "id"> {}

export interface VideogameInterface
  extends Model<VideogameAttributes, VideogameCreationAttributes>,
    VideogameAttributes {}

// -- * -- * -- *
export interface GenreAttributes {
  id?: number;
  name: string;
}

export interface GenreCreationAttributes
  extends Optional<GenreAttributes, "id"> {}

export interface GenreInterface
  extends Model<GenreAttributes, GenreCreationAttributes>,
    GenreAttributes {}

// -------------------------------------------------------------------------------- //
export const VideogameModel = sequelize.define<VideogameInterface>(
  "videogame",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  }
);

export const GenreModel = sequelize.define<GenreInterface>("genre", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
});

// RELATIONSHIPS
VideogameModel.belongsToMany(GenreModel, { through: "genre" });
GenreModel.belongsToMany(VideogameModel, { through: "genre" });

// HOOKS
// VideogameModel.addHook("beforeValidate", (videogame) => {
//   var tmp = videogame._attributes.name.replace(/\s+/g, "_").replace(/\W/g, "");
//   videogame._attributes.name = tmp;
// });
