/**
 * Constructor of Queue
 */
class Queue {
  /**
   *
   * @param {*} id
   * @param {*} date
   * @param {*} postTitle
   * @param {*} postContent
   * @param {*} imgURL
   */
  constructor(id, date, postTitle, postContent, imgURL) {
    this.id = id;
    this.date = date;
    this.postTitle = postTitle;
    this.postContent = postContent;
    this.imgURL = imgURL;
  }
}
module.exports = Queue;
