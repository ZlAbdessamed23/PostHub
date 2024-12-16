import { type Component } from "solid-js"
import { clientOnly } from "@solidjs/start";
const ClientOnlyComp = clientOnly(() => import("~/components/AddPostButton"));

const ClientOnlyButton : Component = (props) => {
  return (
    <ClientOnlyComp />
  )
}

export default ClientOnlyButton