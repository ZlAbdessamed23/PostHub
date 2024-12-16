import { type Component } from "solid-js"
import { clientOnly } from "@solidjs/start";
const ClientOnlyComp = clientOnly(() => import("~/components/PostComponent"));

interface PostComponentProps {
    post: CreatedPost;
};

const ClientOnlyCards : Component<PostComponentProps> = (props) => {
  return (
    <ClientOnlyComp post={props.post} />
  )
}

export default ClientOnlyCards