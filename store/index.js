  export const state = () => ({
    log: ''
  })
  
  export const mutations = {
    login(state, email) {
      state.log = email
    }
  }

  