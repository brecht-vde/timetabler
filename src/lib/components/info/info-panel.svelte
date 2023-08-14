<script>
	import { ParkingCircle, PlusCircle } from 'lucide-svelte';
	import CreditsPanel from './credits-panel.svelte';
</script>

<div class="space-y-4">
	<h1 class="h3">What is this app?</h1>
	<p>
		This is an app that takes patient & therapist schedules as input and tries to match them for
		sessions.
	</p>

	<hr class="line" />

	<h1 class="h3">How do I use it?</h1>
	<p>Step 1: You add patients & mark their availability using the checkbox grid.</p>
	<p>
		Step 2: You add therapists & mark their availability using the checkbox grid. Optionally, you
		can dedicate a single patient to a therapist. You can also exclude certain patients for a
		therapist.
	</p>
	<p>
		Step 3: You generate a planning for a week by default. You also regenerate as much as you'd like
		and lock the days you don't need regeneration for.
	</p>

	<hr class="line" />

	<h1 class="h3">How does the algorithm work?</h1>
	<p>
		The algorithm uses the patient & therapist details to generate a solution. It calculates 100
		possible combinations and gives them a score based on a set of rules. When the generation is
		over, it will show the planning with the highest score. Because of the different rules, the
		algorithm cannot guarantee the most optimal solution.
	</p>

	<hr class="line" />

	<h1 class="h3">What are the rules?</h1>
	<ul class="list-disc list-inside">
		<li>A session can only be planned when both parties are available.</li>
		<li>
			There are 2 sessions per day for each patient, one in the morning and one in the afternoon.
		</li>
		<li>A therapist should not see the same patient twice a day.</li>
		<li>When a therapist has a dedicated patient, they must see them once a day.</li>
		<li>When a therapist has an excluded patient, they must not see them at all.</li>
		<li>
			If a therapist is not assigned, they'll be marked as open (<PlusCircle
				class="icon-sm inline"
			/>).
		</li>
		<li>
			A therapist may also have a special session (<ParkingCircle
				class="icon-sm inline"
			/>) this should occur max once a day.
		</li>
	</ul>

	<hr class="line" />

	<h1 class="h3">How is it built?</h1>
	<CreditsPanel />
</div>
