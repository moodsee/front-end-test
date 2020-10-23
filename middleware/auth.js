export default function ({ app, redirect }) {
  if (!app.$cookies.get("email")) {
    redirect("/login")
  }   
}