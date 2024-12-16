import { type Component } from "solid-js"
import { clientOnly } from "@solidjs/start";
const ClientOnlyComp = clientOnly(() => import("~/components/SignUp"));

const signup : Component = () => {
  return (
    <ClientOnlyComp />
  )
}

export default signup