const sequelize = require('./db')
const { DataTypes, INTEGER } = require('sequelize')

const UserDoctor = sequelize.define('userDoctor', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true}, 
  chatId: {type: DataTypes.STRING, unique: true},
  fist_name: {type: DataTypes.STRING},
  second_name: {type: DataTypes.STRING},
  phoneNumber: {type: DataTypes.STRING},
  patients: {type: DataTypes.STRING},
  specialist: {type: DataTypes.STRING},
  organization: {type: DataTypes.STRING},
  adress: {type: DataTypes.STRING},
  locationDataX: {type: DataTypes.INTEGER},
  locationDataY: {type: DataTypes.INTEGER},
  workingTime: {type: DataTypes.STRING},
  busy: {type: DataTypes.BOOLEAN},
})

const UserPatient = sequelize.define('userPatient', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  chatId: {type: DataTypes.STRING, unique: true},
  fist_name: {type: DataTypes.STRING},
  second_name: {type: DataTypes.STRING},
  phoneNumber: {type: DataTypes.STRING},
  birthYear: {type: DataTypes.DATE},
})

const Cases = sequelize.define('cases', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  patient: {type: DataTypes.INTEGER},
  diagnosis: {type: DataTypes.STRING},
  date: {type: DataTypes.DATE}, 
  complaints: {type: DataTypes.STRING}
})

module.exports = {UserDoctor, UserPatient, Cases}