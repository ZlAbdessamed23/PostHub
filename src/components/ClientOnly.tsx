import { createSignal, onMount, ParentProps, Show } from 'solid-js';

export default function ClientOnly(props : ParentProps) {
  const [flag, setFlag] = createSignal(false);
  
  onMount(() => setFlag(true));
  
  return <Show when={flag()}>{props.children}</Show>;
}