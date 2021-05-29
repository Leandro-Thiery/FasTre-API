/**
 * Class of Hospital data
 */
class Hospital {
  /**
   * Constructor
   * @param {*} id
   * @param {*} address
   * @param {*} email
   * @param {*} location
   * @param {*} name
   * @param {*} phoneNum
   * @param {*} telephoneNum
   */
  constructor(id, address, email, location, name, phoneNum, telephoneNum) {
    this.id = id;
    this.address = address;
    this.email = email;
    this.location = location;
    this.name = name;
    this.phoneNum = phoneNum;
    this.telephoneNum = telephoneNum;
  }
}

module.exports = Hospital;
