<script>
	import { ParkingCircle, PlusCircle } from 'lucide-svelte';
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
		The algorithm uses the patient & therapist details to generate possible outcomes. It calculates
		100 possible combinations and gives it a score based on a set of rules. When the calculation is
		over, it will show the planning with the highest score of this generation. Because of the
		different rules, the algorithm cannot guarantee the most optimal solution.
	</p>

	<hr class="line" />

	<h1 class="h3">What are the rules?</h1>
	<ul class="list-disc list-inside">
		<li>A session can only be planned when both parties are available.</li>
		<li>There are 2 sessions per day for each patient.</li>
		<li>A therapist should not see the same patient twice in a day.</li>
		<li>When a therapist has a dedicated patient, they must see them once in a day.</li>
		<li>When a therapist has an excluded patient, they must not see them at all.</li>
		<li>
			If a therapist is not assigned, they'll be marked as open (<PlusCircle
				class="icon-sm inline"
			/>).
		</li>
		<li>
			A therapist may also have a special a special session (<ParkingCircle
				class="icon-sm inline"
			/>) this should occur max once a day.
		</li>
	</ul>

	<hr class="line" />

	<h1 class="h3">How is it built?</h1>
	<div class="flex flex-row gap-8">
		<a href="https://www.skeleton.dev/" class="icon-link">
			<svg class="fill-token w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
				><path
					fill-rule="evenodd"
					d="M19.855 10.21c5.07 0 9.398 1.736 12.495 4.588l.057-.017c.388-.12.72-.244.994-.37.879-.406 2.032-1.236 3.46-2.492-.232 2.188-.48 3.794-.747 4.818a19.306 19.306 0 0 1-.662 1.994 15.855 15.855 0 0 1 1.707 4.672c1.221 6.057-.871 8.735-5.727 10.23.037.18.065.373.086.58.173 1.772-.733 4.633-1.82 4.633-.716 0-1.181-.986-1.68-2.426-.155 1.666-.923 3.58-1.813 3.58-.958 0-1.467-1.767-2.21-4.022C23.618 37.75 23.05 40 22.046 40c-1.02 0-.46-3.177-2.181-4.523-8.721.47-16.057-2.718-16.057-11.916 0-1.693.405-3.346 1.147-4.88-.132-.257-.255-.51-.37-.761-.58-1.264-1.275-3.176-2.085-5.737 2.074 1.53 3.665 2.442 4.772 2.735.11.029.226.055.346.077 2.906-2.879 7.248-4.785 12.237-4.785ZM17.82 22.62c-2.947 0-5.336 2.294-5.336 5.124 0 2.83 2.389 5.124 5.336 5.124 2.946 0 5.335-2.294 5.335-5.124 0-2.76-2.27-5.009-5.115-5.12Zm7.573 6.4c-.891 0-1.362 1.883-1.362 2.727 0 .66.224 1.024.589 1.09.885.082.615-1.194 1.056-1.194.47 0 1.02 1.305 1.48 1.128.547-.322.338-1.024.149-1.578-.665-1.394-1.02-2.173-1.912-2.173Zm5.801-6.7c-2.03 0-3.676 2.014-3.676 4.5 0 2.485 1.646 4.5 3.676 4.5 2.03 0 3.677-2.015 3.677-4.5 0-2.486-1.646-4.5-3.677-4.5ZM18.5 25a3 3 0 1 1-.5 5.958 3 3 0 0 0 0-5.917c.162-.027.33-.041.5-.041ZM31 24c1.38 0 2.5 1.343 2.5 3s-1.12 3-2.5 3c-.171 0-.339-.02-.5-.06 1.141-.278 2-1.489 2-2.94 0-1.451-.859-2.662-2-2.94.161-.04.329-.06.5-.06Zm.284-18.586.324.207c.146.093.19.288.096.434l-2.39 3.655a.314.314 0 0 1-.433.093l-.324-.207a.314.314 0 0 1-.095-.434l2.39-3.655a.314.314 0 0 1 .432-.093Zm-23.177.554 1.94 2.75c.1.141.066.337-.076.437l-.319.22a.314.314 0 0 1-.435-.077l-1.94-2.749a.314.314 0 0 1 .076-.438l.318-.22a.314.314 0 0 1 .436.077ZM20.683 0l.58 4.826 2.146-2.385.06 5.942-.426-.094c-1.242-.273-2.369-.41-3.379-.41a9.635 9.635 0 0 0-2.821.399l-.474.143.382-7.432 1.967 3.675L20.683 0Z"
				/></svg
			>
			<span>skeleton</span>
		</a>
		<a href="https://kit.svelte.dev/" class="icon-link">
			<svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.25 122.88"
				><defs /><title>svelte</title><path
					class="fill-base-token dark:fill-dark-token"
					d="M95.73,16.26C84.32-.07,61.78-4.91,45.49,5.47L16.87,23.71A32.83,32.83,0,0,0,2,45.69a35.13,35.13,0,0,0-.55,6.14,34.69,34.69,0,0,0,4,16.06A33,33,0,0,0,.54,80.16a35,35,0,0,0,6,26.46c11.41,16.33,34,21.17,50.24,10.79L85.37,99.17a32.76,32.76,0,0,0,14.83-22,34.08,34.08,0,0,0,.55-6.13A34.72,34.72,0,0,0,96.8,55a33,33,0,0,0,4.91-12.26,36,36,0,0,0,.54-6.13,34.93,34.93,0,0,0-6.52-20.33Zm0,0Z"
				/><path
					class="fill-dark-token dark:fill-base-token"
					d="M42.69,108.16a22.94,22.94,0,0,1-5.72.73A22.7,22.7,0,0,1,18.3,99.11a21,21,0,0,1-3.92-12.23,21.6,21.6,0,0,1,.32-3.68,20.52,20.52,0,0,1,.69-2.67l.54-1.64L17.39,80a37.13,37.13,0,0,0,11.2,5.6l1.06.32-.1,1.06c0,.18,0,.37,0,.55a6.36,6.36,0,0,0,1.18,3.7,6.82,6.82,0,0,0,5.62,3,6.65,6.65,0,0,0,1.72-.22,6.28,6.28,0,0,0,1.76-.77L68.42,74.91a6,6,0,0,0,2.79-5.09A6.35,6.35,0,0,0,70,66.13a6.85,6.85,0,0,0-5.63-2.94,6.65,6.65,0,0,0-1.72.22,6,6,0,0,0-1.75.77L50,71.14a21.06,21.06,0,0,1-5.81,2.55,23.06,23.06,0,0,1-5.72.73A22.73,22.73,0,0,1,19.8,64.65a21.05,21.05,0,0,1-3.92-12.23,21.6,21.6,0,0,1,.32-3.68,19.82,19.82,0,0,1,8.92-13.23L53.74,17.28a21,21,0,0,1,5.81-2.56A23,23,0,0,1,65.27,14,22.74,22.74,0,0,1,84,23.76,21.05,21.05,0,0,1,87.87,36a21.72,21.72,0,0,1-.32,3.69,20.52,20.52,0,0,1-.69,2.67L86.32,44l-1.46-1.07a36.9,36.9,0,0,0-11.2-5.6L72.6,37l.1-1.06c0-.18,0-.37,0-.55a6.42,6.42,0,0,0-1.18-3.71,6.85,6.85,0,0,0-5.62-2.94A6.65,6.65,0,0,0,64.2,29a5.89,5.89,0,0,0-1.76.77L33.82,48a6,6,0,0,0-2.69,4A6.92,6.92,0,0,0,31,53.06a6.35,6.35,0,0,0,1.18,3.69,6.84,6.84,0,0,0,5.62,2.94,6.65,6.65,0,0,0,1.72-.22,6,6,0,0,0,1.76-.77l10.92-7a20.93,20.93,0,0,1,5.81-2.55,23,23,0,0,1,5.72-.73,22.74,22.74,0,0,1,18.68,9.77,21.05,21.05,0,0,1,3.92,12.23A20.64,20.64,0,0,1,86,74.14a19.78,19.78,0,0,1-8.92,13.23L48.51,105.6a21,21,0,0,1-5.82,2.56Zm0,0Z"
				/></svg
			>
			<span>svelte kit</span>
		</a>
		<a href="https://vercel.com/" class="icon-link">
			<svg
				class="w-10 h-10 fill-token"
				viewBox="0 0 1155 1000"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
			</svg>
			<span>vercel</span>
		</a>
	</div>
</div>
