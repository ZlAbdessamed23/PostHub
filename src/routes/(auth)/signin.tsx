import { type Component } from "solid-js"
import { clientOnly } from "@solidjs/start";
const ClientOnlyComp = clientOnly(() => import("~/components/SignIn"));

const signin : Component = () => {
  return (
    <ClientOnlyComp />
  )
}

export default signin