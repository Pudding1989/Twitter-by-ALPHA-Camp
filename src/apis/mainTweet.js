import { apiHelper } from '../utils/helper.js'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },

  getOtherPost(id) {
    // console.log('id',id)
    return apiHelper.get(`/tweets/${id}`)
  },
  getTweetReplies(id) {
    return apiHelper.get(`/tweets/${id}/replies`)
  },

  addLike(userId) {
    return apiHelper.post(`/tweets/${userId}/like`, null)
  },

  deleteLike(userId) {
    return apiHelper.post(`/tweets/${userId}/unlike`)
  },

  addPostLike(tweetId) {
    return apiHelper.post(`/tweets/${tweetId}`)
  }
}
