/**
 * Class of Hospital data
 */
class Hospital {
  /**
   * Constructor
   * @param {*} id
   * @param {*} address
   * @param {*} email
   * @param {*} imgURL
   * @param {*} location
   * @param {*} name
   * @param {*} phoneNum
   * @param {*} telephoneNum
   */
  constructor(id, address, email, imgURL,
      location, name, phoneNum, telephoneNum) {
    this.id = id;
    this.address = address;
    this.email = email;
    this.imgURL = imgURL;
    this.location = location;
    this.name = name;
    this.phoneNum = phoneNum;
    this.telephoneNum = telephoneNum;
  }
}

module.exports = Hospital;
