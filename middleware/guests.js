export default function ({ app, redirect }) {
    if (app.$cookies.get("email") !== undefined) {
      redirect("/listing")
    }   
}