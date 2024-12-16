import { type Component } from "solid-js"
import { clientOnly } from "@solidjs/start";
const ClientOnlyComp = clientOnly(() => import("~/components/AddPostModal"));
interface ModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const ClientOnlyModal : Component<ModalProps> = (props) => {
  return (
    <ClientOnlyComp isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
  )
}

export default ClientOnlyModal