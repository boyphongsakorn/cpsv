<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './Home.svelte';
  // import About from './About.svelte';
</script>

<Router>
  <Route path="/" component={Home} />
  <!-- <Route path="/about" component={About} /> -->
</Router>