<script>
    import Repeater from "../components/repeater.svelte";
	import { Days, Slots } from "../data/data";
</script>
<Repeater items={Days} let:item={item}>
    <p>{item.id} - {item.label}</p>
</Repeater>

<Repeater items={Slots} let:item={item}>
    <p>{item.id} - {item.label} - {item.day} - {item.group}</p>
</Repeater>