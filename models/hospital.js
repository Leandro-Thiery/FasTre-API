/**
 * Class of Hospital data
 */
class Hospital {
  /**
   * Constructor
   * @param {*} id
   * @param {*} address
   * @param {*} email
   * @param {*} photo1
   * @param {*} photo2
   * @param {*} photo3
   * @param {*} latitude
   * @param {*} longitude
   * @param {*} name
   * @param {*} phoneNum
   * @param {*} telephoneNum
   */
  constructor(id, address, email, photo1, photo2, photo3,
      latitude, longitude, name, phoneNum, telephoneNum) {
    this.id = id;
    this.address = address;
    this.email = email;
    this.photo1 = photo1;
    this.photo2 = photo2;
    this.photo3 = photo3;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.phoneNum = phoneNum;
    this.telephoneNum = telephoneNum;
  }
}

module.exports = Hospital;
